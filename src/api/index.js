import axios from 'axios';
import { getCookie } from '../util/cookie';

const apiProvider = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

let authToken = getCookie('token');
if (authToken.length > 0) {
    apiProvider.defaults.headers.common['Authorization'] = authToken;
}

const login = async (username, password) => {
    return apiProvider.post('/login', { username, password })
        .then(response => {
            document.cookie = `token=${response.data.token}`;
            apiProvider.defaults.headers.common['Authorization'] = response.data.token;
        })
        .catch((e) => {
            console.log(e.response);
            throw new Error(e.response.data);
        });
}

const getUser = async () => {
    return apiProvider.get('/user')
    .then(response => response.data)
    .catch((e) => {
        console.log(e.response.data);
    })
}

export { login, getUser }