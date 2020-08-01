import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-burger-8b2ed.firebaseio.com/'
});

export default instance;