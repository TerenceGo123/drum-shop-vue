import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from "axios";

const apiKey = 'AIzaSyAD7trVpszBqSH1GnpCEPIdAkOoMGZW7gM' 
const axiosApiInstance = axios.create() 


export const useUserDataStore = defineStore('userData', () => {
    const userInfo = ref({
        token:'',
        email: '',
        userId: '',
        refreshToken: '',
        expirenIn: '',
        name: '',
        surname: '',
        cart: []
    }) 

    const error = ref('') 
    const loader = ref(false)
    const rememberMe = ref(false)
    const auth = async (payload, type) => {
        const stringUrl = type === 'signUp' ? 'signUp' : 'signInWithPassword'
        error.value = ''
        loader.value = true
        try {
            let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
                ...payload,
                returnSecureToken: true
            })
            userInfo.value = {
                token: response.data.idToken,
                email: response.data.email,
                userId: response.data.localId,
                refreshToken: response.data.refreshToken,
                expirenIn: response.data.expiresIn,
                cart: []
            }
            if(rememberMe.value) {
                localStorage.setItem('userInfoStorage', JSON.stringify({token: userInfo.value.token, refreshToken: userInfo.value.refreshToken}))
            }
        }catch(err) {
            console.log(err.response.data.error.message);
            switch (err.response.data.error.message) {
                case 'EMAIL_EXISTS':
                    error.value = 'Этот email уже используется'
                    break
                case 'OPERATION_NOT_ALLOWED':
                    error.value = 'Operation not allowed'
                    break
                case 'Too_MANY_ATTEMPTS_TRY_LATER':
                    error.value = 'Too many attempts, try later'
                    break
                case 'INVALID_LOGIN_CREDENTIALS':
                    error.value = 'Неверные учетные данные для входа в систему'
                    break
                case 'INVALID_EMAIL':
                    error.value = 'Неправильный email'
                    break
                case 'MISSING_PASSWORD':
                    error.value = 'Введите пароль'
                    break
                case 'WEAK_PASSWORD : Password should be at least 6 characters':
                    error.value = 'Пароль должен содержать минимум 6 символов'
                    break
                default: 
                    error.value = 'Ошибка'
                    break
            }
        }
        finally {
            loader.value = false
        }
    }

    const isProductInCart = (productId) => {
        return userInfo.value.cart.some(item => item.id === productId);
    };


    const fetchUserData = async () => {
        try {
            // Проверяем наличие токена
            const savedTokens = JSON.parse(localStorage.getItem('userInfoStorage'));
            if (!savedTokens?.token) return;
            
            // Запрашиваем данные пользователя с сервера
            const response = await axiosApiInstance.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            { idToken: savedTokens.token }
            );
            
            const userData = response.data.users[0];
            
            // Обновляем состояние
            userInfo.value = {
            token: savedTokens.token,
            refreshToken: savedTokens.refreshToken,
            email: userData.email,
            userId: userData.localId,
            name: userData.displayName?.split(' ')[0] || '',
            surname: userData.displayName?.split(' ')[1] || '',
            cart: []
            };
            
            // Загружаем корзину
            fetchCart();
            
        } catch (error) {
            console.error('Ошибка загрузки данных пользователя:', error);
            // Если токен невалидный - разлогиниваем
            if (error.response?.data?.error?.message === 'INVALID_ID_TOKEN') {
            logout();
            }
        }
    };


    const fetchCart = () => {
        // Получаем данные из localStorage
        const userCarts = JSON.parse(localStorage.getItem('userCarts')) || [];
        // Находим пользователя по userId
        const userCart = userCarts.find(user => user.userId === userInfo.value.userId);
        // Если пользователь найден, присваиваем его корзину
        if (userCart) {
            userInfo.value.cart = userCart.cart;
        }
        else {
            userCarts.push({userId: userInfo.value.userId, cart: []})
            localStorage.setItem('userCarts', JSON.stringify(userCarts))
        }
    } 


    const logout = () => {
        userInfo.value = {
            token:'',
            email: '',
            userId: '',
            refreshToken: '',
            expirenIn: '',
            name: '',
            surname: '',
            cart: []
        }
    } 

    return {
        auth, userInfo, error, loader, rememberMe, fetchCart, logout, isProductInCart, fetchUserData
    }
})





// import { defineStore } from "pinia";
// import { ref } from 'vue';
// import axios from "axios";
// import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 

// const apiKey = 'AIzaSyAD7trVpszBqSH1GnpCEPIdAkOoMGZW7gM';
// const db = getFirestore(); // Инициализация Firestore

// export const useUserDataStore = defineStore('userData', () => {
//     const userInfo = ref({
//         token: '',
//         email: '',
//         userId: '',
//         refreshToken: '',
//         expirenIn: '',
//         name: '',
//         surname: '',
//         cart: [] // Изначально корзина пустая
//     });

//     const error = ref('');
//     const loader = ref(false);

//     const auth = async (payload, type) => {
//         const stringUrl = type === 'signUp' ? 'signUp' : 'signInWithPassword';
//         error.value = '';
//         loader.value = true;
//         try {
//             let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
//                 ...payload,
//                 returnSecureToken: true
//             });
//             userInfo.value = {
//                 token: response.data.idToken,
//                 email: response.data.email,
//                 userId: response.data.localId,
//                 refreshToken: response.data.refreshToken,
//                 expirenIn: response.data.expiresIn,
//                 cart: [] // Инициализация корзины
//             };
//             localStorage.setItem('userInfoStorage', JSON.stringify({ token: userInfo.value.token, refreshToken: userInfo.value.refreshToken }));
//             await loadCart(); // Загрузка корзины после аутентификации
//         } catch (err) {
//             // Обработка ошибок
//             switch (err.response.data.error.message) {
//                 case 'EMAIL_EXISTS':
//                     error.value = 'Email already exists';
//                     break;
//                 case 'OPERATION_NOT_ALLOWED':
//                     error.value = 'Operation not allowed';
//                     break;
//                 case 'Too_MANY_ATTEMPTS_TRY_LATER':
//                     error.value = 'Too many attempts, try later';
//                     break;
//                 case 'INVALID_LOGIN_CREDENTIALS':
//                     error.value = 'Invalid login credentials';
//                     break;
//                 case 'INVALID_EMAIL':
//                     error.value = 'Invalid email';
//                     break;
//                 case 'MISSING_PASSWORD':
//                     error.value = 'Missing password';
//                     break;
//                 default:
//                     error.value = 'Error';
//                     break;
//             }
//         } finally {
//             loader.value = false;
//         }
//     };

//     const saveCart = async () => {
//         if (!userInfo.value.userId) return; // Проверка, что пользователь аутентифицирован
//         try {
//             await setDoc(doc(db, "users", userInfo.value.userId, "cart", "userCart"), {
//                 items: userInfo.value.cart
//             });
//         } catch (error) {
//             console.error("Ошибка при сохранении корзины:", error);
//         }
//     };

//     const loadCart = async () => {
//         if (!userInfo.value.userId) return; // Проверка, что пользователь аутентифицирован
//         try {
//             const docRef = doc(db, "users", userInfo.value.userId, "cart", "userCart");
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 userInfo.value.cart = docSnap.data().items || [];
//             } else {
//                 console.log("Нет данных корзины для этого пользователя.");
//             }
//         } catch (error) {
//             console.error("Ошибка при загрузке корзины:", error);
//         }
//     };

//     const addToCart = (item) => {
//         userInfo.value.cart.push(item);
//         saveCart(); // Сохранение корзины после добавления товара
//     };

//     const removeFromCart = (itemId) => {
//         userInfo.value.cart = userInfo.value.cart.filter(item => item.id !== itemId);
//         saveCart(); // Сохранение корзины после удаления товара
//     };

//     return {
//         auth,
//         userInfo,
//         error,
//         loader,
//         addToCart,
//         removeFromCart,
//         loadCart
//     };
// });
