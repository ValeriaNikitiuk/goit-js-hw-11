import axios from 'axios';

 export default async function onFetch(value, page) {
  const url = 'https://pixabay.com/api/';
  const key = '31921090-27d4ef087e87c171b6f0fd6ec';
  const filters = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

     return await axios.get(`${url}${filters}`)
    .then(res => res.data);
}
