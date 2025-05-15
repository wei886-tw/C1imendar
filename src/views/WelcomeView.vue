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
          <h1 class="fs-64 mb-24">Climendar</h1>
          <p class="fs-24 fw-bold mb-60 border-top border-bottom py-24">
            Plan your day with weather insights!
          </p>
          <router-link to="/home" class="d-block w-75">
            <button class="btn btn-primary w-100 mb-24 rounded-5 text-white text-decoration-none">
              Start
            </button>
          </router-link>

          <router-link to="/signin" class="d-block w-75">
            <button class="btn btn-primary w-100 mb-24 rounded-5 text-white text-decoration-none">
              Sign In With Google
            </button>
          </router-link>

          <router-link to="/about" class="d-block w-75">
            <button class="btn btn-primary w-100 mb-24 rounded-5 text-white text-decoration-none">
              About
            </button>
          </router-link>

          <router-link to="/privacy" class="d-block w-75">
            <button class="btn btn-primary w-100 mb-24 rounded-5 text-white text-decoration-none">
              Privacy Policy
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      googleOauthClientIds: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_IDS,
    }
  },
}
</script>