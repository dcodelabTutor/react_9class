import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMembers } from './api';

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


//members 비동기 처리 함수
function* returnMembers() {
  const response = yield call(getMembers);
  yield put({ type: 'MEMBERS_SUCCESS', payload: response.data.members });
}
function* callMembers() {
  yield takeLatest('MEMBERS_START', returnMembers);
}

export default function* rootSaga() {
  yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
}