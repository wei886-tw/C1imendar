<template>
  <div class="container-fluid">
    <div class="container pt-96">
      <div v-if="user">
        <p>Welcome, {{ user.displayName }}</p>
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
      <router-link to="/dashboard" class="d-block">Dashboard</router-link>
      <router-link to="/calendar" class="d-block">Calendar</router-link>
      <router-link to="/weather" class="d-block">Weather</router-link>
      <router-link to="/privacy" class="d-block">Privacy</router-link>
    </div>
  </div>

</template>

<script setup>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = getAuth()
const user = ref(null)
const router = useRouter()

onMounted(() => {
  onAuthStateChanged(auth, (account) => {
    if (account) {
      user.value = account
    } else {
      user.value = null
    }
  })
})

const logout = () => {
  signOut(auth)
    .then(() => {
      alert("登出後回到首頁")
      router.push('/')
    })
    .catch(() => {
      // An error happened.
    })
}
</script>
