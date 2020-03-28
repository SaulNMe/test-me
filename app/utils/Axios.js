import axios from 'axios';

const qualificameApiAxios = axios.create();
const qualificameAuthAxios = axios.create();

qualificameApiAxios.defaults.headers.common['Content-Type'] = 'application/json';
qualificameAuthAxios.defaults.headers.common['Content-Type'] = 'application/json';
//Allow the use of array parameter with key value


export { qualificameApiAxios, qualificameAuthAxios };
