<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 border-end border-2 border-white shadow shadow-lg ">
        <navbar-view class="vh-100"></navbar-view>
      </div>

      <div class="col-5 pt-40 px-24 d-flex flex-column">
        <!-- 上半部：今日行程 (50%) -->
        <div class="container" style="height: 50%; overflow-y: auto;">
          <div class="d-flex justify-content-between align-items-center mb-24">
            <h1 class="fs-40 noto-serif-tc fw-bold mb-0">接下來行程</h1>
            <button 
              @click="loadTodaysCalendarEvents" 
              :disabled="isLoadingCalendar"
              class="btn btn-outline-primary btn-sm"
            >
              <i class="bi bi-calendar-check me-1"></i>
              {{ isLoadingCalendar ? '載入中...' : '同步日曆' }}
            </button>
          </div>
          
          <div v-if="calendarError" class="alert alert-warning alert-dismissible fade show mb-3" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ calendarError }}
            <button type="button" class="btn-close" @click="calendarError = null"></button>
          </div>
          
          <!-- 條列式今日行程 -->
          <div class="calendar-events mb-4">
            <div
              v-for="event in calendarEvents"
              :key="event.id"
              class="border rounded rounded-3 p-3 mb-3 shadow-sm"
            >
              <div class="d-flex align-items-center">
                <i class="bi bi-calendar-event text-primary me-3"></i>
                <div class="flex-grow-1">
                  <div class="fs-18 fw-bold">{{ event.summary }}</div>
                  <div class="text-muted small">
                    {{ formatEventTime(event.start) }} - {{ formatEventTime(event.end) }}
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="calendarEvents.length === 0" class="text-center text-muted py-4">
              <i class="bi bi-calendar-x fs-1"></i>
              <p class="fs-18 mt-2">暫無接下來行程</p>
            </div>
          </div>
        </div>
        
        <!-- 下半部：Google Task 待辦事項 (50%) -->
        <div class="container" style="height: 50%; overflow-y: auto;">
          <h2 class="fs-32 noto-serif-tc fw-bold mb-3">未完成待辦事項</h2>
          
          <div class="mb-3">
            <input
              v-model="newTodo"
              type="text"
              class="form-control"
              placeholder="新增待辦事項..."
              @keyup.enter="addTodo"
            />
          </div>
          <div class="d-flex justify-content-end mb-3">
            <button @click="addTodo" class="btn btn-primary">新增</button>
          </div>
          
          <div class="todo-list">
            <div
              v-for="todo in todos"
              :key="todo.id"
              class="border rounded rounded-3 p-3 mb-3 shadow-sm d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <input
                  v-model="todo.completed"
                  type="checkbox"
                  class="form-check-input me-3"
                  :disabled="todo.isCalendarEvent"
                />
                <div class="flex-grow-1">
                  <span
                    :class="{ 'text-decoration-line-through text-muted': todo.completed }"
                    class="fs-18"
                  >
                    {{ todo.text }}
                  </span>
                  <div v-if="todo.isCalendarEvent" class="d-flex align-items-center mt-1">
                    <i class="bi bi-calendar-event text-primary me-1"></i>
                    <small class="text-muted">來自 Google 日曆</small>
                  </div>
                </div>
              </div>
              <button
                v-if="!todo.isCalendarEvent"
                @click="removeTodo(todo.id)"
                class="btn btn-outline-danger btn-sm"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
            
            <div v-if="todos.length === 0" class="text-center text-muted py-4">
              <i class="bi bi-check-circle fs-1"></i>
              <p class="fs-18 mt-2">暫時無待辦事項</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-5 pt-40 px-24">
        <div class="container">
          <h1 class="fs-40 noto-serif-tc fw-bold mb-24">今日天氣預覽</h1>
          <div class="container px-0 mb-4">
            <div class="border rounded rounded-3 p-4 shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="fs-28 noto-serif-tc fw-bold mb-0">台北市</h3>
                <img
                  v-if="weatherDescription"
                  :src="weatherPic[weatherDescription]"
                  alt="天氣圖片"
                  style="height: 80px; width: auto"
                />
              </div>
              <p class="fs-24 mb-2">天氣狀況：{{ weatherDescription }}</p>
              <p class="fs-24 mb-2">溫度：{{ parseInt(temp) || '--' }} °C</p>
              <p class="fs-24 mb-0">體感溫度：{{ parseInt(feelsLike) || '--' }} °C</p>
            </div>
          </div>
          
          <div class="row g-3">
            <div class="col-6">
              <div class="border rounded rounded-3 p-3 shadow-sm text-center">
                <i class="bi bi-thermometer-sun fs-2 text-warning"></i>
                <p class="fs-16 mb-1">最高溫度</p>
                <p class="fs-20 fw-bold mb-0">{{ parseInt(tempMax) || '--' }} °C</p>
              </div>
            </div>
            <div class="col-6">
              <div class="border rounded rounded-3 p-3 shadow-sm text-center">
                <i class="bi bi-thermometer-snow fs-2 text-info"></i>
                <p class="fs-16 mb-1">最低溫度</p>
                <p class="fs-20 fw-bold mb-0">{{ parseInt(tempMin) || '--' }} °C</p>
              </div>
            </div>
            <div class="col-6">
              <div class="border rounded rounded-3 p-3 shadow-sm text-center">
                <i class="bi bi-droplet fs-2 text-primary"></i>
                <p class="fs-16 mb-1">濕度</p>
                <p class="fs-20 fw-bold mb-0">{{ humidity || '--' }} %</p>
              </div>
            </div>
            <div class="col-6">
              <div class="border rounded rounded-3 p-3 shadow-sm text-center">
                <i class="bi bi-wind fs-2 text-success"></i>
                <p class="fs-16 mb-1">風速</p>
                <p class="fs-20 fw-bold mb-0">{{ speed || '--' }} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarView from '../components/NavbarView.vue'
import GoogleCalendarService from '../services/googleCalendar.js'
import authService from '../services/authService.js'

export default {
  name: 'DashboardView',
  components: { NavbarView },
  data() {
    return {
      newTodo: '',
      todos: [],
      nextId: 4,
      calendarEvents: [],
      isLoadingCalendar: false,
      calendarError: null,
      apiKey: import.meta.env.VITE_WEATHER_API_KEY,
      weatherDescription: null,
      temp: null,
      feelsLike: null,
      tempMin: null,
      tempMax: null,
      humidity: null,
      speed: null,
      weatherPic: {
        小雨: 'https://cdn-icons-png.flaticon.com/512/1779/1779927.png',
        中雨: 'https://cdn-icons-png.flaticon.com/512/1146/1146858.png',
        多雲: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
        '陰，多雲': 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
        晴: 'https://cdn-icons-png.flaticon.com/512/979/979585.png',
        陰: 'https://cdn-icons-png.flaticon.com/512/1146/1146856.png',
        雷雨: 'https://cdn-icons-png.flaticon.com/512/1146/1146860.png',
        大雨: 'https://cdn-icons-png.flaticon.com/512/1146/1146859.png',
        陣雨: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png',
        雪: 'https://cdn-icons-png.flaticon.com/512/642/642000.png',
        霧: 'https://cdn-icons-png.flaticon.com/512/1197/1197102.png',
      },
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: this.nextId++,
          text: this.newTodo.trim(),
          completed: false,
        })
        this.newTodo = ''
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    async loadTodaysCalendarEvents() {
      this.isLoadingCalendar = true
      this.calendarError = null
      
      try {
        if (!authService.isLoggedIn()) {
          this.calendarError = '請先登入 Google 帳戶'
          return
        }
        
        // 確保 GoogleCalendarService 已初始化
        await GoogleCalendarService.init()

        let calendarEvents = []
        try {
          calendarEvents = await GoogleCalendarService.getTodaysEvents()
        } catch (err) {
          if (err.message.includes('Google Calendar access token is missing')) {
            try {
              await GoogleCalendarService.ensureCalendarAccess()
              calendarEvents = await GoogleCalendarService.getTodaysEvents()
            } catch (accessErr) {
              console.error('Failed to get calendar access:', accessErr)
              this.calendarError = '無法取得 Google 日曆授權，請確認已允許彈出視窗並重試。'
              return
            }
          } else {
            console.error('載入日曆事件失敗:', err)
            this.calendarError = '載入日曆事件失敗，請稍後再試'
            return
          }
        }
        this.calendarEvents = calendarEvents
        
        const calendarTodos = calendarEvents.map(event => 
          GoogleCalendarService.formatEventForTodo(event)
        )
        
        this.todos = [
          ...this.todos.filter(todo => !todo.isCalendarEvent),
          ...calendarTodos
        ]
        
      } catch (error) {
        console.error('載入日曆事件失敗:', error)
        this.calendarError = '載入日曆事件失敗，請稍後再試'
      } finally {
        this.isLoadingCalendar = false
      }
    },
    
    async getCurrentWeather() {
      try {
        if (!this.apiKey) {
          console.error('Weather API key is missing')
          return
        }
        
        const res = await this.$http.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Taipei,TW&appid=${this.apiKey}&units=metric&lang=zh_tw`
        )
        this.weatherDescription = res.data.weather[0].description
        this.temp = res.data.main.temp
        this.feelsLike = res.data.main.feels_like
        this.tempMin = res.data.main.temp_min
        this.tempMax = res.data.main.temp_max
        this.humidity = res.data.main.humidity
        this.speed = res.data.wind.speed
        console.log('Weather data loaded successfully')
      } catch (err) {
        console.error('Failed to load weather data:', err.message)
        if (err.response) {
          console.error('Weather API response:', err.response.data)
        }
      }
    },
    
    formatEventTime(dateTime) {
      if (!dateTime) return ''
      
      const date = new Date(dateTime.dateTime || dateTime.date)
      
      if (dateTime.date) {
        return '全天'
      } else {
        return date.toLocaleTimeString('zh-TW', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })
      }
    },
    
    waitForGoogleAPIs() {
      return new Promise((resolve) => {
        const checkAPIs = () => {
          if (window.gapi && window.google && window.google.accounts) {
            resolve()
          } else {
            setTimeout(checkAPIs, 100)
          }
        }
        checkAPIs()
      })
    },
  },
  async mounted() {
    // 檢查用戶是否已登入
    if (!authService.isLoggedIn()) {
      this.$router.push('/login')
      return
    }
    
    // 等待 Google APIs 載入完成
    await this.waitForGoogleAPIs()
    
    this.getCurrentWeather()
    this.loadTodaysCalendarEvents()
  },
}
</script>

<style scoped>
.todo-list {
  max-height: 400px;
  overflow-y: auto;
}

.form-check-input:checked {
  background-color: #28a745;
  border-color: #28a745;
}

.height-100-percent{
  height: 100%
}
</style>

