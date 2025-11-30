
import { auth } from './firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import googleCalendarService from './googleCalendar.js';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

const authService = {
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        googleCalendarService.setAccessToken(token);
      }
      return result;
    } catch (error) {
      console.error('Google login failed:', error);
      // 如果是使用者關閉彈出視窗，則不視為嚴重錯誤
      if (error.code === 'auth/popup-closed-by-user') {
        return null;
      }
      throw error;
    }
  },
  async logout() {
    // 清除 Calendar access token
    localStorage.removeItem('google_calendar_access_token');
    return signOut(auth);
  },
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },
  isLoggedIn() {
    return auth.currentUser !== null;
  },
  getCalendarToken() {
    return localStorage.getItem('google_calendar_access_token');
  }
};

export default authService;
