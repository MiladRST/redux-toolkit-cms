import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/modules/apiService'

export const getArticles = createAsyncThunk(
    'articles/getArticles',
    async(url) => {
        try{
            const response = await api.get(url)
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

const slice = createSlice({
    name: 'articles',
    initialState: [],
    reducers: {},
    extraReducers : builder => {
        builder.addCase(getArticles.fulfilled , 
            (state, action) => {
                console.log(action)
                return [...action.payload]
            }
        )
    }
})


export default slice.reducer;