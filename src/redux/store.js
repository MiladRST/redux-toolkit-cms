import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./store/users"
import coursesReducer from "./store/courses"
import articlesReducer from './store/articles'
import todosReducer from './store/todos'

const store = configureStore({
    reducer: {
        users: usersReducer,
        courses: coursesReducer,
        articles: articlesReducer,
        todos: todosReducer,
    }
})

export default store;