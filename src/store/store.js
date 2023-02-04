import { configureStore } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, user: action.payload }
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, user: {} }
        default:
            return state
    }
}

const store = configureStore({
    reducer
});

export default store