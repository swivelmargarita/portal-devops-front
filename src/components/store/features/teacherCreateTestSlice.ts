import { createSlice } from '@reduxjs/toolkit'

const initialState: boolean = false

export const TeacherCreateTestSlice = createSlice({
  name: 'teacherMenuList',
  initialState,
  reducers: {
    changeTeacherTestCreate: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export const { changeTeacherTestCreate } = TeacherCreateTestSlice.actions
