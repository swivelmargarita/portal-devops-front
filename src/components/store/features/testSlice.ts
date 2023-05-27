import { createSlice } from '@reduxjs/toolkit'

export interface Test {
  count: number
  current: number
  completed: number
}

interface TestState {
  test: Test
}

const initialState: TestState = {
  test: {
    count: 0,
    current: 1,
    completed: 0
  }
}

export const TestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeTest: (state, action) => {
      state.test = action.payload
    }
  }
})

export const { changeTest } = TestSlice.actions
