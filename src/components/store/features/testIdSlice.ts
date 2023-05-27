import { createSlice } from '@reduxjs/toolkit'

export interface ID {
  id: number
}

interface IdTest {
  id: ID
}

const initialState: IdTest = {
  id: {
    id: 0
  }
}

export const IdSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    changeId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { changeId } = IdSlice.actions
