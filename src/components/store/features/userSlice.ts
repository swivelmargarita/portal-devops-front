import { createSlice } from '@reduxjs/toolkit'

export interface User {
  name: string
  surname: string
  phone: string
}

interface UserState {
  user: User
}

const initialState: UserState = {
  user: {
    name: '',
    surname: '',
    phone: ''
  }
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserData: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { changeUserData } = UserSlice.actions
