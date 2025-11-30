import authService from './authService.js'

class GoogleCalendarService {
  constructor() {
    this.accessToken = localStorage.getItem('google_calendar_access_token') || null
    this.gapiInited = false
    this.gisInited = false
    this.tokenClient = null
    this.baseURL = 'https://www.googleapis.com/calendar/v3'
  }

  async init() {
    await this.initGapiClient()
    await this.initGisClient()
    if (this.accessToken) {
      this.setAccessToken(this.accessToken)
    }
  }

  initGapiClient() {
    return new Promise((resolve, reject) => {
      if (!window.gapi) {
        reject(new Error('Google API (gapi) not loaded'))
        return
      }
      
      window.gapi.load('client', () => {
        window.gapi.client
          .init({
            apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
          })
          .then(() => {
            this.gapiInited = true
            resolve()
          })
          .catch((error) => {
            console.error('Error initializing gapi client:', error)
            reject(error)
          })
      })
    })
  }

  initGisClient() {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.accounts) {
        reject(new Error('Google Identity Services not loaded'))
        return
      }
      
      this.tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        callback: (tokenResponse) => {
          this.accessToken = tokenResponse.access_token
        }
      })
      this.gisInited = true
      resolve()
    })
  }

  setAccessToken(token) {
    this.accessToken = token
    if (token) {
      window.gapi.client.setToken({ access_token: token })
      localStorage.setItem('google_calendar_access_token', token)
    } else {
      localStorage.removeItem('google_calendar_access_token')
    }
  }

  async getTodaysEvents() {
    // 檢查是否已登入
    if (!authService.isLoggedIn()) {
      throw new Error('用戶未登入')
    }

    if (!this.gapiInited || !this.gisInited) {
      await this.init()
    }
    
    // 檢查是否有 Calendar access token
    if (!this.accessToken) {
      this.accessToken = authService.getCalendarToken()
    }
    
    if (!this.accessToken) {
      throw new Error('Google Calendar access token is missing. Please request access.')
    }

    try {
      const now = new Date()
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: now.toISOString(),
        timeMax: endOfDay.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      })

      return response.result.items || []
    } catch (error) {
      console.error('獲取今日事件失敗:', error)
      if (error.status === 401) {
        // Token might have expired, try to get a new one
        this.accessToken = null
        localStorage.removeItem('google_calendar_access_token')
        await this.requestCalendarAccess()
        return this.getTodaysEvents()
      }
      throw error
    }
  }

  async getEventsForDateRange(startDate, endDate) {
    // 檢查是否已登入
    if (!authService.isLoggedIn()) {
      throw new Error('用戶未登入')
    }

    if (!this.gapiInited || !this.gisInited) {
      await this.init()
    }
    
    // 檢查是否有 Calendar access token
    if (!this.accessToken) {
      this.accessToken = authService.getCalendarToken()
    }
    
    if (!this.accessToken) {
      throw new Error('Google Calendar access token is missing. Please request access.')
    }

    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime'
      })

      return response.result.items || []
    } catch (error) {
      console.error('獲取事件失敗:', error)
      if (error.status === 401) {
        // Token might have expired, try to get a new one
        this.accessToken = null
        localStorage.removeItem('google_calendar_access_token')
        await this.requestCalendarAccess()
        return this.getEventsForDateRange(startDate, endDate)
      }
      throw error
    }
  }

  formatEventForTodo(event) {
    const startTime = event.start.dateTime || event.start.date
    const endTime = event.end.dateTime || event.end.date

    let timeText = ''
    if (event.start.dateTime) {
      const start = new Date(startTime)
      const end = new Date(endTime)
      timeText = `${start.toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit'
      })} - ${end.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      timeText = '全天'
    }

    return {
      id: `calendar-${event.id}`,
      text: `${event.summary} (${timeText})`,
      completed: false,
      isCalendarEvent: true,
      originalEvent: event
    }
  }

  requestCalendarAccess() {
    return new Promise((resolve, reject) => {
      if (!this.tokenClient) {
        reject(new Error('Google GIS not initialized'))
        return
      }

      // Store the original callback and create a new one that resolves the promise
      const originalCallback = this.tokenClient.callback
      this.tokenClient.callback = (tokenResponse) => {
        if (tokenResponse.error) {
          reject(new Error(tokenResponse.error))
          return
        }
        
        this.accessToken = tokenResponse.access_token
        this.setAccessToken(this.accessToken)
        resolve(this.accessToken)
        
        // Restore original callback if it existed
        if (originalCallback) {
          this.tokenClient.callback = originalCallback
        }
      }

      this.tokenClient.requestAccessToken({ prompt: 'consent' })
    })
  }

  async ensureCalendarAccess() {
    if (!this.gapiInited || !this.gisInited) {
      await this.init();
    }
    if (!this.accessToken) {
      await this.requestCalendarAccess();
    }
    return this.accessToken;
  }
}

export default new GoogleCalendarService()