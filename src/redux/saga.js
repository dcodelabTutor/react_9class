import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMembers } from './api';
import * as types from './actionType';

//flickr 비동기 처리 함수
function* returnFlickr(action) {
  try {
    const response = yield call(getFlickr, action.Opt);
    yield put({ type: types.FLICKR.success, payload: response.data.photos.photo });
  } catch (err) {
    yield put({ type: types.FLICKR.fail, payload: err })
  }

}
function* callFlickr() {
  yield takeLatest(types.FLICKR.start, returnFlickr);
}

//youtube 비동기 처리 함수
function* returnYoutube() {
  try {
    const response = yield call(getYoutube);
    yield put({ type: types.YOUTUBE.success, payload: response.data.items });
  } catch (err) {
    yield put({ type: types.YOUTUBE.fail, payload: err });
  }

}
function* callYoutube() {
  yield takeLatest(types.YOUTUBE.start, returnYoutube);
}


//members 비동기 처리 함수
function* returnMembers() {
  try {
    const response = yield call(getMembers);
    yield put({ type: types.MEMBERS.success, payload: response.data.members });
  } catch (err) {
    yield put({ type: types.MEMBERS.fail, payload: err });
  }

}
function* callMembers() {
  yield takeLatest(types.MEMBERS.start, returnMembers);
}

export default function* rootSaga() {
  yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
}