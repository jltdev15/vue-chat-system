import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref(localStorage.getItem('token') || '');
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);
  const conversationId = ref(null)
  const profileObj = reactive({
    name:'',
    username:'',
    imageUrl:''

  })

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
  const getProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      console.log(response.data.content);
      profileObj.name = response.data.content.fullName;
      profileObj.username = response.data.content.username;
      profileObj.imageUrl = response.data.content.profileImageUrl
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  const uploadProfile = async (payload) => {
    try {
      const response = await axios.post('/api/user/upload',payload);
      console.log(response);
      

    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const register = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/register', credentials);
      console.log(response);

    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const logout = async () => {
    authToken.value = '';
    currentUser.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  return { authToken, currentUser, login, register, logout,conversationId,getProfile,profileObj,uploadProfile };
});
