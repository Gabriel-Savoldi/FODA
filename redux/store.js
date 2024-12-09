import { configureStore } from "@reduxjs/toolkit";
import dadosReducer from "./dadosReducer";

const store = configureStore({
    reducer:{
        'dados':dadosReducer
    }
});

export default store;