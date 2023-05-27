import { createSlice } from '@reduxjs/toolkit'

const initialState: string = 'Мои группы'

export const SetTeacherTitleSlice = createSlice({
  name: 'setTeacherTitle',
  initialState,
  reducers: {
    changeTeacherTitle: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export const { changeTeacherTitle } = SetTeacherTitleSlice.actions
