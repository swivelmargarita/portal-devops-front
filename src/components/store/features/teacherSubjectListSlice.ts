import { createSlice } from '@reduxjs/toolkit'

export interface TeacherSubjectList {
  main: boolean
  detail: boolean
}

interface TeacherSubjectListState {
  teacherSubjectList: TeacherSubjectList
}

const initialState: TeacherSubjectListState = {
  teacherSubjectList: {
    main: true,
    detail: false
  }
}

export const TeacherSubjectListSlice = createSlice({
  name: 'teacherSubjectList',
  initialState,
  reducers: {
    changeSubjectList: (state, action) => {
      state.teacherSubjectList = action.payload
    }
  }
})

export const { changeSubjectList } = TeacherSubjectListSlice.actions
