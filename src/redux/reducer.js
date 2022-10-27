//리듀서 - 전역공간에 초기데이터를 전달해주거나 기존데이터를 변경해주는 역할 (변경자)

import { combineReducers } from 'redux';

const initMember = {
    "members": [
        {
            "name": "Julia",
            "positon": "President",
            "pic": "member1.jpg"
        },
        {
            "name": "David",
            "positon": "Vice President",
            "pic": "member2.jpg"
        },
        {
            "name": "Emily",
            "positon": "UI Designer",
            "pic": "member3.jpg"
        },
        {
            "name": "Paul",
            "positon": "Front-end Engineer",
            "pic": "member4.jpg"
        },
        {
            "name": "sara",
            "positon": "Back-end Engineer",
            "pic": "member5.jpg"
        },
        {
            "name": "Michael",
            "positon": "Project Manager",
            "pic": "member6.jpg"
        }
    ]
}

//초기데이터를 state에 저장했다가 추후 action객체가 전달되면
//action객체의 타입에 따라서 기존 데이터를 변경해서 리턴
const memberReducer = (state = initMember, action) => {
    switch (action.type) {
        case 'SET_MEMBERS':
            return { ...state, members: action.payload }

        default:
            return state;
    }
}

//전달된 각각의 reducer 데이터를 하나로 합쳐서 반환
const reducers = combineReducers({ memberReducer });

export default reducers;