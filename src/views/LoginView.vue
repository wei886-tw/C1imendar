<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="text-center mb-4">登入</h2>
      <GoogleLogin @error="handleError" />
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import GoogleLogin from '@/components/GoogleLogin.vue';
import { ref } from 'vue';

const errorMessage = ref('');

const handleError = (message) => {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 5000);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
}
</style>
