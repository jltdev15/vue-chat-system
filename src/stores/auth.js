import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref(localStorage.getItem('token') || '');
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);
  const conversationId = ref(null)

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      authToken.value = response.data.token;
      currentUser.value = response.data.user;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const register = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/register', credentials);
      authToken.value = response.data.token;
      currentUser.value = response.data.user;
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = () => {
    authToken.value = '';
    currentUser.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  return { authToken, currentUser, login, register, logout,conversationId };
});
