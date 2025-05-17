<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 border">
        <div class="g-signin2" data-onsuccess="onSignIn ">
          <div class="g_id_signin" data-type="standard"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: '113193907332-b56f9ufbkq26svduhm10r9hctabge26o.apps.googleusercontent.com',
      redirectUri: 'https://wei886-tw.github.io/C1imendar/callback', // GitHub 域名
      userInfo: null,
    }
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => this.initializeGoogle()
    document.head.appendChild(script)
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
  },
}
</script>


