import { createSlice } from '@reduxjs/toolkit'

export interface SubjectList {
  main: boolean
  activity: boolean
  table: boolean
  detail: boolean
}

interface SubjectListState {
  subjectList: SubjectList
}

const initialState: SubjectListState = {
  subjectList: {
    main: true,
    activity: false,
    table: false,
    detail: false
  }
}

export const SubjectListSlice = createSlice({
  name: 'subjectList',
  initialState,
  reducers: {
    changeSubjectList: (state, action) => {
      state.subjectList = action.payload
    }
  }
})

export const { changeSubjectList } = SubjectListSlice.actions
