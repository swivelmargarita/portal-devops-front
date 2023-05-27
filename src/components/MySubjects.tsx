import React from 'react'
import MySubjectMain from './MySubjectMain'
import MySubjectActivityMain from './MySubjectActivityMain'
import MySubjectTable from './MySubjectTable'
import SubjectFile from './SubjectFile'
import { useAppSelector } from './store/store'
const MySubjects = (): JSX.Element => {
  const subjectList = useAppSelector(state => state.subjectList)
  return (
    <>
      { subjectList.subjectList.main
        ? <MySubjectMain />
        : subjectList.subjectList.activity
          ? <MySubjectActivityMain />
          : subjectList.subjectList.table
            ? <MySubjectTable />
            : subjectList.subjectList.detail
              ? <SubjectFile />
              : ''
      }
    </>
  )
}
export default MySubjects
