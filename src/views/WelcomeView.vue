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
          <p class="fs-24 fw-bold mb-60 border-top border-bottom py-24">
            Plan your day with weather insights!
          </p>

          <div class="d-block w-50 mb-24">
            <div
              id="g_id_onload"
              data-client_id="113193907332-b56f9ufbkq26svduhm10r9hctabge26o.apps.googleusercontent.com"
              data-ux_mode="redirect"
              data-login_uri="https://wei886-tw.github.io/C1imendar/#/"
            ></div>
            <div class="g_id_signin" data-type="standard"></div>
          </div>

          <div class="container d-flex justify-content-center gap-80">
            <router-link to="/about" class="d-block" style="width: 20%">
              <button
                class="btn btn-outline-google-color w-100 text-decoration-none text-dark fw-bold"
              >
                About
              </button>
            </router-link>
            <router-link to="/privacy" class="d-block" style="width: 20%">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
      redirectUri: 'https://wei886-tw.github.io/C1imendar/callback',
      userInfo: null,
      isActivate: false,
    }
  },
  methods: {
    initializeGoogle() {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse,
      })
      window.google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
        theme: 'outline',
        size: 'large',
      })
    },

    handleCredentialResponse(response) {
      const jwt = response.credential
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      this.userInfo = JSON.parse(jsonPayload)
    },
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => {
      window.handleCredentialResponse = (response) => {
        this.handleCredentialResponse(response)
      }
      this.initializeGoogle()
    }
    document.head.appendChild(script)
    this.isActivate = true
  },
}
</script>