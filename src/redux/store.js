//미들웨어 모듈 import
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';

//saga미들웨어 import
import createSagaMiddleware from '@redux-saga/core';

//미들웨어로 적용할 saga파일  import (비동기 데이터 대신 호출해서 결과값을 action객체로 반환)
import rootSaga from './saga';

//sagaMiddleware함수 활성화
const sagaMiddleware = createSagaMiddleware();

//store공간을 생성한 다음 전달된 reducers를 저장해서 내보냄
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//사가 작업물이 saga미들웨어를 통해서 적용되도록 인수 전달
sagaMiddleware.run(rootSaga);
export default store;