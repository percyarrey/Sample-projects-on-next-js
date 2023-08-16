import { createSlice } from '@reduxjs/toolkit'

const initialState ={
  detail:[{
    city:'Buea',
    time:'10:23',
    temp:18
  }]
}

export const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
      changeDetails: (state,action) => {
        console.log(state)
        state.detail[0] = action.payload
      }
    },
})

export const { changeDetails } = detailSlice.actions

export default detailSlice.reducer