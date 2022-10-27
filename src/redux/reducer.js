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

const memberReducer = (state = initMember, action) => {
    switch (action.type) {
        case 'SET_MEMBERS':
            return { ...state, members: action.payload }

        default:
            return state;
    }
}

const youtubeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_YOUTUBE':
            return { ...state, youtube: action.payload }

        default:
            return state;
    }
}


const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers;