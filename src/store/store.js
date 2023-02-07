import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    isLoggedIn: false,
    user: {},
    createdCharacter: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, user: action.payload }
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, user: {} }
        case 'CREATE_CHARACTER':
            if (!state.isLoggedIn) {
                return state;
            }
            return { ...state, createdCharacter: action.payload }
        default:
            return state
    }
}

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);

export default store;