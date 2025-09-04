import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/modules/apiService'
import Swal from "sweetalert2"

export const getCourses = createAsyncThunk(
    'courses/getCourses',
    async() => {
        try{
            const response = await api.get('/courses')
            if(response.success) {
                return response.data
            } else {
                return []
            }
        }catch(err) {
            return []
        }
    }
)

export const removeCourse = createAsyncThunk(
    'courses/removeCourse',
    async(id) => {
        try {
            const response = await api.delete(`/courses/${id}`)
            if(response.success) {
                return response.data
            }
        }catch(err) {
            return null
        }
    }
)

export const createCourse = createAsyncThunk(
    'courses/createCourse',
    async(formData) => {
        try{
            const response = await api.post('/courses', JSON.stringify(formData))
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

const slice = createSlice({
    name: 'courses',
    initialState: {
        data: [],
        pending: false,
        error: false,
        creatingCourse: false,
    },
    reducers: {},
    extraReducers : builder => {
        builder
        .addCase( getCourses.pending ,
            (state, action) => {
                return {
                    ...state,
                    pending: true,
                    error: false
                }
            }
        )
        .addCase(getCourses.rejected,
            (state, action) => {
                return {
                    ...state,
                    pending: false,
                    error: true
                }
            }
        )
        .addCase(getCourses.fulfilled , 
            (state, action) => {
                return { 
                    ...state,
                    data: [...action.payload],
                    pending: false,
                    error: false
                }
            }
        ),
        builder.addCase(removeCourse.fulfilled , 
            (state, action) => {
                return {
                    ...state,
                    data: state.data.filter( course => course._id !== action.payload.id )
                }
            }
        ),

        builder
        .addCase(createCourse.pending, (state, action) => {
            return {
                ...state,
                creatingCourse: true
            }
        })
        .addCase(createCourse.fulfilled , (state, action) => {
            Swal.fire({
                title: `ساخت دوره موفقیت آمیز بود.`,
                text: "دوره با موفقیت ساخته شد.",
                icon: "success"
            });

            return {
                ...state,
                creatingCourse: false
            }
            
        })
    }
})


export default slice.reducer;