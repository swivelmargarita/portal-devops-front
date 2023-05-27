import { createSlice } from '@reduxjs/toolkit'

export interface TeacherMenuList {
  groups: boolean
  table: boolean
  test: boolean
}

interface TeacherMenuListState {
  teacherMenuList: TeacherMenuList
}

const initialState: TeacherMenuListState = {
  teacherMenuList: {
    groups: true,
    table: false,
    test: false
  }
}

export const TeacherActiveMenuSlice = createSlice({
  name: 'teacherMenuList',
  initialState,
  reducers: {
    changeTeacherActiveMenu: (state, action) => {
      state.teacherMenuList = action.payload
    }
  }
})

export const { changeTeacherActiveMenu } = TeacherActiveMenuSlice.actions
