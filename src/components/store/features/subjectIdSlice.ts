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

export const SubjectIdSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    changeSubjectId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { changeSubjectId } = SubjectIdSlice.actions
