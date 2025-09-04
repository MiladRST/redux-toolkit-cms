import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTodos = createAsyncThunk( 
    'todos/getTodos',
    async (url) => {
        try {
            const res = await fetch(url)
            if(res.status === 200 ) {
                const data = await res.json()
                return data
            }
        } catch(err) {
            console.log(err);
            return null            
        }
    } 
)

export const slice = createSlice({
    name: "todos",
    initialState: {
        data: [],
        pending: false, 
        error: false
    },
    reducers: {
        addTodo : (todos, action) => {
            todos.push(action.payload)
        },
        removeTodo : (todos, action) => {            
            //code
            return todos.filter( todo => todo.id !== action.payload.id)
        },
        doneTodo : (todos, action) => {
            //code
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase( getTodos.pending, (state, action) => {
            console.log('getTodos pending => ', action)
            return {
                ...state,
                pending: true,
                error: false
            }
        })
        .addCase( getTodos.rejected, (state, action) => {
            console.log('getTodos rejected => ',action)
            return {
                ...state,
                pending: false,
                error: true
            }
        })
        .addCase(getTodos.fulfilled, (state, action) => {
            console.log('getTodos fulfilled => ',action)
            return {
                data : [...action.payload],
                pending: false, 
                error: false 
            }
            // Add user to the state array
            //state.entities.push(action.payload)
        })
    }
})
console.log('todo slice => ', slice)

export const { addTodo, removeTodo, doneTodo } = slice.actions
export default slice.reducer;
