import { createSlice } from '@reduxjs/toolkit'

export interface MenuList {
  choose: boolean
  subjects: boolean
  table: boolean
  test: boolean
}

interface MenuListState {
  menuList: MenuList
}

const initialState: MenuListState = {
  menuList: {
    choose: true,
    subjects: false,
    table: false,
    test: false
  }
}

export const ActiveMenuSlice = createSlice({
  name: 'menuList',
  initialState,
  reducers: {
    changeActiveMenu: (state, action) => {
      state.menuList = action.payload
    }
  }
})

export const { changeActiveMenu } = ActiveMenuSlice.actions
