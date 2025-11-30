<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="container vh-100 d-flex align-items-center justify-content-center">
          <img src="../../public/pic/Weatherndar-pic.png" alt="Welcome Picture" class="w-100" />
        </div>
      </div>

      <div class="col-md-6">
        <div class="container vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1 class="fs-64 mb-24 ancizar-serif">Climendar</h1>
          <!-- <p class="fs-24 fw-bold mb-24 border-top border-bottom py-24">
            Plan your day with weather insights!
          </p> -->

          <div class="d-block w-50 mb-24 border border-2">
            <GoogleLogin />
          </div>

          <router-link to="/about" class="d-block w-50 mb-24  border border-1">
            <button
              class="btn btn-outline-google-color w-100 text-decoration-none text-dark fw-bold"
            >
              About
            </button>
          </router-link>

          <router-link to="/privacy" class="d-block w-50  border border-1">
            <button
              class="btn btn-outline-google-color w-100 text-dark text-decoration-none fw-bold"
            >
              Privacy
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from '../components/GoogleLogin.vue'
import GoogleCalendarService from '../services/googleCalendar.js'
import authService from '../services/authService.js'

export default {
  components: { GoogleLogin },
  data() {
    return {
      isLoggedIn: false,
      newTodo: '',
      todos: [],
      nextId: 1,
      calendarEvents: [],
      isLoadingCalendar: false,
      calendarError: null,
    }
  },
  methods: {
    async logout() {
      try {
        await authService.logout()
        this.isLoggedIn = false
        this.calendarEvents = []
        this.todos = []
        this.calendarError = null
      } catch (error) {
        console.error('登出失敗:', error)
      }
    },

    addTodo() {
      if (this.newTodo.trim() && this.isLoggedIn) {
        this.todos.push({
          id: this.nextId++,
          text: this.newTodo.trim(),
          completed: false,
        })
        this.newTodo = ''
      }
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },

    async loadTodaysCalendarEvents() {
      if (!this.isLoggedIn) return

      this.isLoadingCalendar = true
      this.calendarError = null

      try {
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

        const calendarTodos = calendarEvents.map((event) =>
          GoogleCalendarService.formatEventForTodo(event)
        )

        this.todos = [...this.todos.filter((todo) => !todo.isCalendarEvent), ...calendarTodos]
      } catch (error) {
        console.error('載入日曆事件失敗:', error)
        this.calendarError = '載入日曆事件失敗，請稍後再試'
      } finally {
        this.isLoadingCalendar = false
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
          hour12: false,
        })
      }
    },
  },

  mounted() {
    authService.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user
      if (this.isLoggedIn) {
        this.loadTodaysCalendarEvents()
      } else {
        this.calendarEvents = []
        this.todos = []
        this.calendarError = null
      }
    })
  },
}
</script>

