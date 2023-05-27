import { createSlice } from '@reduxjs/toolkit'

export interface Time {
  time: string
  maxScore: string | number
}

interface TimeTest {
  time: Time
}

const initialState: TimeTest = {
  time: {
    time: '',
    maxScore: ''
  }
}

export const TimeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    changeTime: (state, action) => {
      state.time = action.payload
    }
  }
})

export const { changeTime } = TimeSlice.actions
