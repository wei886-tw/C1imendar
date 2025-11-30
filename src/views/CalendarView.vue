<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 border-end border-2 border-white shadow shadow-lg vh-100">
        <navbar-view></navbar-view>
      </div>

      <div class="col-10 pt-40 px-12">
        <div v-if="isLoading" class="text-center mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p>正在載入日曆事件...</p>
        </div>
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        <FullCalendar v-else :options="calendarOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NavbarView from '../components/NavbarView.vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import listPlugin from '@fullcalendar/list';
import googleCalendarService from '@/services/googleCalendar.js';
import authService from '@/services/authService.js';

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin, listPlugin],
  themeSystem: 'bootstrap5',
  locale: 'zh-tw',
  initialView: 'dayGridMonth',
  height: '90vh',
  handleWindowResize: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,listWeek'
  },
  events: [],
});

const isLoading = ref(true);
const error = ref(null);

onMounted(() => {
  loadCalendarEvents();
});

const loadCalendarEvents = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // Check if user is logged in
    if (!authService.isLoggedIn()) {
      error.value = '請先登入 Google 帳戶';
      return;
    }

    await googleCalendarService.init();
    
    // Get events for the current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    let events = [];
    try {
      events = await googleCalendarService.getEventsForDateRange(startOfMonth, endOfMonth);
    } catch (err) {
      if (err.message.includes('Google Calendar access token is missing')) {
        try {
          await googleCalendarService.ensureCalendarAccess();
          events = await googleCalendarService.getEventsForDateRange(startOfMonth, endOfMonth);
        } catch (accessErr) {
          console.error('Failed to get calendar access:', accessErr);
          error.value = '無法取得 Google 日曆授權，請確認已允許彈出視窗並重試。';
          return;
        }
      } else {
        console.error('Failed to load calendar events:', err);
        error.value = '無法讀取日曆事件，請授權並稍後再試。';
        return;
      }
    }
    
    calendarOptions.value.events = events.map(event => ({
      id: event.id,
      title: event.summary || '無標題',
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      allDay: !event.start.dateTime,
      url: event.htmlLink,
    }));
  } finally {
    isLoading.value = false;
  }
};

</script>

<style>
/* todo 改  today 顏色 */
.fc-toolbar-chunk .fc-today-button .btn .btn-primary {
  color: #ffffff !important;
  background-color: #3485ff !important;
  border-color: #ffffff !important;
}

.fc-toolbar-chunk.btn-group {
  font-weight: 700 !important;
}
</style>

<style scoped>
.fc {
  max-width: 100%;
  margin: 0 auto;
}
</style>