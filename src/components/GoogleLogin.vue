<template>
  <button @click="login" class="btn btn-google-color w-100 text-dark fw-bold" :disabled="isLoading">
    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
    {{ isLoading ? '登入中...' : 'Login with Google' }}
  </button>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        await authService.loginWithGoogle();
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('登入失敗:', error);
        this.$emit('error', '登入失敗，請稍後再試');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
