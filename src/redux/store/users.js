import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import api from '@/modules/apiService'
import Swal from "sweetalert2"

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async(url) => {
        try {
            const response = await api.get(url)
            if(response.success) {
                return response.data
            } else {
                return null
            }
        }catch(err) {
            return null
        }
    }
)

export const removeUser = createAsyncThunk(
    'users/removeUser',
    async(id) => {
        try {
            const response = await api.delete(`/users/${id}`)
            if(response.success) {
                return response.data
            }
        }catch(err) {
            return null
        }
    }
)

export const createUser = createAsyncThunk(
    'users/createUser',
    async(formData) => {
        try{
            const response = await api.post('/users', JSON.stringify(formData))
            if(response.success) {
                console.log(response);
                
                return response.data
            } else {
                return null
            }
        }catch(err) {
            return null
        }
    }
)

const slice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        pending: false,
        error: false,
        creatingUser: false,
    },
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(getUsers.pending , 
            (state, action) => {
            return {
                ...state,
                pending: true,
                error: false,
            }
        })
        .addCase(getUsers.rejected , 
            (state, action) => {
                return {
                    ...state,
                    pending: false,
                    error: true
                }
        })
        .addCase(getUsers.fulfilled , (state, action) => {
            console.log(action);
            
            return {
                ...state,
                data: [...action.payload],
                pending: false,
                error: false
            }
        }),

        builder
        .addCase(removeUser.fulfilled , (state, action) => {
            return {
                ...state,
                data: state.data.filter( item => item._id !== action.payload.id)
            }
        }),

        builder
        .addCase(createUser.pending , 
            (state, action)=>{
                return {
                    ...state,
                    creatingUser: true,
                }
            })
        .addCase( createUser.fulfilled , (state, action) => {
             Swal.fire({
                    title: `ساخت کاربر موفقیت آمیز بود.`,
                    text: "کاربر با موفقیت ساخته شد.",
                    icon: "success"
                });

                return {
                    ...state,
                    creatingUser: false,
                }
        })
    }
})


export default slice.reducer