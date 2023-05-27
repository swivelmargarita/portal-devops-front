import { SubjectListSlice } from './features/subjectListSlice'
import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ActiveMenuSlice } from './features/activeMenuSlice'
import { SetTitleSlice } from './features/setTitleSlice'
import { SetTestSlice } from './features/setTestSlice'
import { TeacherActiveMenuSlice } from './features/teacherActiveMenuSlice'
import { SetTeacherTitleSlice } from './features/setTeacherTitleSlice'
import { TeacherSubjectListSlice } from './features/teacherSubjectListSlice'
import { TeacherCreateTestSlice } from './features/teacherCreateTestSlice'
import { UserSlice } from './features/userSlice'
import { TestSlice } from './features/testSlice'
import { TimeSlice } from './features/timeSlice'
import { IdSlice } from './features/testIdSlice'
import { SubjectIdSlice } from './features/subjectIdSlice'
import { MainSubjectSlice } from './features/mainSubject'
import { SetSubjectUrlSlice } from './features/setSubjectUrlSlice'
import { GroupIdSlice } from './features/groupIdSlice'

export const store = configureStore({
  reducer: {
    subjectList: SubjectListSlice.reducer,
    menuList: ActiveMenuSlice.reducer,
    title: SetTitleSlice.reducer,
    setTest: SetTestSlice.reducer,
    teacherMenuList: TeacherActiveMenuSlice.reducer,
    teacherTitle: SetTeacherTitleSlice.reducer,
    teacherSubjectList: TeacherSubjectListSlice.reducer,
    teacherTestCreate: TeacherCreateTestSlice.reducer,
    userData: UserSlice.reducer,
    test: TestSlice.reducer,
    time: TimeSlice.reducer,
    testId: IdSlice.reducer,
    subjectId: SubjectIdSlice.reducer,
    mainSubjectId: MainSubjectSlice.reducer,
    changeSubjectUrl: SetSubjectUrlSlice.reducer,
    changeGroupId: GroupIdSlice.reducer
  }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
