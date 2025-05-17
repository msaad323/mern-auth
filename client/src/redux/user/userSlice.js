import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: "",
  currentUser: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true,
      state.error = ""
    },
    signInSuccess: (state, action) => {
      state.isLoading = false,
      state.error = "",
      state.currentUser = action.payload
    },
    signInfail: (state, action) => {
      state.isLoading = false,
      state.error = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInfail } = userSlice.actions

export default userSlice.reducer