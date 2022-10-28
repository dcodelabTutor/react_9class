import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube } from './api';

//flickr 비동기 처리 함수
function* returnFlickr(action) {
  const response = yield call(getFlickr, action.Opt);
  yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
}
function* callFlickr() {
  yield takeLatest('FLICKR_START', returnFlickr);
}

//youtube 비동기 처리 함수
function* returnYoutube() {
  const response = yield call(getYoutube);
  console.log(response);
  yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
}
function* callYoutube() {
  yield takeLatest('YOUTUBE_START', returnYoutube);
}

export default function* rootSaga() {
  yield all([fork(callFlickr), fork(callYoutube)]);
}