import { createSlice } from '@reduxjs/toolkit'

const initialState: string = 'test-inactive'

export const SetTestSlice = createSlice({
  name: 'setTest',
  initialState,
  reducers: {
    changeTestState: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export const { changeTestState } = SetTestSlice.actions
