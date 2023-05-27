import { createSlice } from '@reduxjs/toolkit'

const initialState: string = ''

export const SetSubjectUrlSlice = createSlice({
  name: 'setSubjectUrl',
  initialState,
  reducers: {
    changeUrl: (state, action) => {
      state = action.payload
      return state
    }
  }
})

export const { changeUrl } = SetSubjectUrlSlice.actions
