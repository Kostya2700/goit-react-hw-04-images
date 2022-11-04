import axios from 'axios';

const keyUrl = '29991996-b215bbe81df8b02481f14f1cd';
const apiSearch = async (search, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${keyUrl}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
export { apiSearch };
