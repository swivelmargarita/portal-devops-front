import { createSlice } from '@reduxjs/toolkit'

const initialState: string = 'Выбор предметов'

export const SetTitleSlice = createSlice({
  name: 'setTitle',
  initialState,
  reducers: {
    changeTitle: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export const { changeTitle } = SetTitleSlice.actions
