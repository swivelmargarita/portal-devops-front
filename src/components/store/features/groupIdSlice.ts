import { createSlice } from '@reduxjs/toolkit'

export interface ID {
  id: number
}

interface IdGroup {
  id: ID
}

const initialState: IdGroup = {
  id: {
    id: 0
  }
}

export const GroupIdSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    changeGroupId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { changeGroupId } = GroupIdSlice.actions
