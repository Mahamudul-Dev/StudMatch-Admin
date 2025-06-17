import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { useToast } from '@/servicess/toastService';


export const AuthStore = defineStore('auth', () => {
  
  // authUser token isLoading variable define
  const Authuser = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : 'null');
  const token = ref(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const isLoading = ref(false);

  const router = useRouter();
  const { showToast } = useToast();

  const credentials = reactive({
    email: '',
    password: '',
  });


  // login function
  const login = async ()=>{
      isLoading.value = true;
      try {
        let res = await axios.post('https://api.studmatch.app/auth/adminLogin',credentials);

        if(res.data.error == false && res.data.token){
            localStorage.setItem('token', res.data.token);
            token.value = res.data.token;
            Authuser.value = res.data.data;
            localStorage.setItem('user', JSON.stringify(res.data.data))
        }

        if(localStorage.getItem('token')){
          router.push({name: 'Dashboard'});
        }
        showToast('Login Successfully', 'success', 'Login');
      } catch (error) {
        showToast(error.response.data.message, 'error', 'Login');
      }

      isLoading.value = false;
  }


  const authorizeImage = async (imageUrl) => {
    try {
        let res = await axios.get(imageUrl, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        });

        const imgBlob = new Blob([res.data],{ type: res.headers['content-type'] });
        return URL.createObjectURL(imgBlob);

    } catch (error) {
        console.log('error fatching imageUrl:', error );
        return '';
    }
}


  // logout function
  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token.value = '';
    Authuser.value = '';
    router.push({name: 'adminLogin'});
  }

  return { 
    credentials,
    isLoading,
    login,
    token,
    logout,
    Authuser,
    authorizeImage
   }
})
