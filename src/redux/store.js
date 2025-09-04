import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./store/users"
import coursesReducer from "./store/courses"
import articlesReducer from './store/articles'

const store = configureStore({
    reducer: {
        users: usersReducer,
        courses: coursesReducer,
        articles: articlesReducer,
    }
})

export default store;