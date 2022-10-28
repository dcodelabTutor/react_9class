import axios from 'axios';

export const getFlickr = async (opt) => {
  const key = '4612601b324a2fe5a1f5f7402bf8d87a';
  const method_interest = "flickr.interestingness.getList";
  const method_search = "flickr.photos.search";
  const method_user = "flickr.people.getPhotos";
  const num = 20;
  let url = '';

  if (opt.type === 'interest') {
    url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  }
  if (opt.type === 'search') {
    url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
  }
  if (opt.type === 'user') {
    url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
  }

  return await axios.get(url);
};

/*
  redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 부수효과를 발생시키지 않는 순수함수 형태로 제작
  부수효과 (Side Effect) : DOM같이 컴포넌트가 직접 제어해야 되는 화면의 변경점을 야기시키는 효과 
  순수함수 (Pure Function) : 부수효과를 발생시키지 않는 순수 자바스크립트로만 구현 가능한 함수
*/