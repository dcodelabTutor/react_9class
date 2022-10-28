/*
  takeLatest(제일 마지막 요청만 수행), takeEvery (들어오는 모든 요청을 전부수행)
  all (saga관련 메서드들을 비동기적으로 호출)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, 기존 dispatch랑 동일 )
  fork (saga명령어 실행함수)
  call (saga에서 api관련 axios함수를 호출하때 쓰는 함수, 두번째 인수값 전달가능)
*/

import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr } from './api';

//컴포넌트에서 action타입 요청시 api.js에 있는 axios함수를 연결해서 호출하는 함수
function* returnFlickr(action) {
  //컴포넌트 단에서 getFlickr에 필요한 옵션객체값만 action에 담아서 전달하면
  //saga가 call메서드로 getFLickr호출하면서 액션객체로 받은 옵션값을 getFlickr에 바인딩
  const response = yield call(getFlickr, action.Opt);
  yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}

//요청받은 action타입에 따라서 함수 호출
function* callFlickr() {
  //컴포넌트에서 FLICIKR_START타입 액션객체가 전달되면 해당 이벤트를 takeLatest가 받아서 returnFlickr함수 호출
  yield takeLatest('FLICKR_START', returnFlickr);
}

//store.js에 의해 reducer에 미들웨어로 적용할 rootSaga함수 생성
export default function* rootSaga() {
  yield all([fork(callFlickr)]);
}