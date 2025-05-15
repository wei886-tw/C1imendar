<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 border-end border-2 border-white shadow shadow-lg vh-100">
        <navbar-view></navbar-view>
      </div>

      <div class="col-10 pt-40 px-12">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import NavbarView from '../components/NavbarView.vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import googleCalendarPlugin from '@fullcalendar/google-calendar'

export default {
  components: { NavbarView, FullCalendar },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin, googleCalendarPlugin],
        themeSystem: 'bootstrap5',
        locale: 'zh-tw',
        initialView: 'dayGridMonth',
        height: '90vh',
        handleWindowResize: true,
        googleCalendarApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        events: {
          googleCalendarId: import.meta.env.VITE_GOOGLE_CALENDAR_ID,
        },
      },
    }
  },

  methods: {},

  mounted() {},
}
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