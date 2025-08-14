import axios from "axios";
import { useUserDataStore } from "./stores/UserData";
import router from "./router";

const apiKey = 'AIzaSyAD7trVpszBqSH1GnpCEPIdAkOoMGZW7gM' 

const axiosApiInstance = axios.create() 

axios.interceptors.request.use((config) => {
    const url = config.url
    if(!url.includes('signUp') && !url.includes('signInWithPassword')) {
        const userStore = useUserDataStore()
        let params = new URLSearchParams()
        params.append('auth', userStore.userInfo.token)
        config.params = params
    }
    return config
})


axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const userStore = useUserDataStore()
    const originalRequest = error.config
    if(error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const newTokens = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`,{
                grant_type: 'refresh_token',
                refresh_token: JSON.parse(localStorage.getItem('userInfoStorage')).refreshToken
            } )
            console.log(newTokens.data);
            userStore.userInfo.token = newTokens.data.access_token
            userStore.userInfo.refreshToken = newTokens.data.refresh_token
            localStorage.setItem('userInfoStorage', JSON.stringify({
                token: newTokens.data.access_token,
                refreshToken: newTokens.data.refresh_token
            }))
        }
        catch (err) {
            console.log(err);
            localStorage.removeItem('userInfoStorage')
            userStore.userInfo.token = ''
            router.push('/sign')
        }
    }
    console.log(error);
})