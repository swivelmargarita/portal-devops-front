import { createSlice } from '@reduxjs/toolkit'

export interface ID {
  id: number
}

interface IdSubject {
  id: ID
}

const initialState: IdSubject = {
  id: {
    id: 0
  }
}

export const MainSubjectSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    changeMainSubjectId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { changeMainSubjectId } = MainSubjectSlice.actions
