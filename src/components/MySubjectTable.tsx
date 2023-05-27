import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import MySubjectTableListDetail from './MySubjectTableListDetail'
import { useAppSelector } from './store/store'
import { useAxiosFetch } from '../utils/useFetch'
import { GET_LECTURES, GET_PRACTICES } from '../utils/urls'

interface Files {
  file_path: string
}
interface LectureProps {
  theme: string
  date: string
  files: Files[]
}

interface PracticeProps {
  theme: string
  date: string
}
const MySubjectTable = (): JSX.Element => {
  const [lecture, setLecture] = useState<boolean>(true)
  const id = useAppSelector(state => state.mainSubjectId.id.id)
  const [data] = useAxiosFetch({
    method: 'GET',
    url: GET_LECTURES.replace('id', id.toString()),
    params: {}
  })

  const [secondData] = useAxiosFetch({
    method: 'GET',
    url: GET_PRACTICES.replace('id', id.toString()),
    params: {}
  })

  return (
    <div className={classNames(css(styles.container), 'px-4 py-4')}>
      <div className={classNames(css(styles.header), 'd-flex row align-items-center')}>
        <div className={classNames(css(styles.headerPart), 'd-flex justify-content-between align-items-center')}>
          <div
            onClick={() => { setLecture(true) }}
            className={classNames(lecture ? css(styles.headerTitleActive) : css(styles.headerTitle),
              'py-3 text-center pointer roboto-regular')}>
            Лекция
          </div>

          <div
            onClick={() => { setLecture(false) }}
            className={classNames(!lecture ? css(styles.headerTitleActive) : css(styles.headerTitle),
              'py-3 text-center pointer roboto-regular')}>
            Практика
          </div>
        </div>
      </div>

      <div
        className={classNames(css(styles.dashboardHeader),
          'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>

        <div className={'d-flex flex-row'}>
          <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
            #
          </div>

          <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5')}>
            Тема занятия
          </div>
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
          Дата занятия
        </div>
      </div>

      { lecture
        ? (
          <div>
            {data?.length
              ? data?.map((item: LectureProps, index: number) => (
                <MySubjectTableListDetail
                  key={index}
                  number={index + 1}
                  theme={item?.theme}
                  date={item?.date}
                  files={item?.files}
                />
              ))
              : ''}
          </div>)
        : (
          <div>
            {secondData?.length
              ? secondData?.map((item: PracticeProps, index: number) => (
                <MySubjectTableListDetail
                  number={index + 1}
                  key={index}
                  theme={item?.theme}
                  date={item?.date}
                />
              ))
              : ''}
          </div>)
      }

    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.subjectTitleContainerBorder
  },
  name: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.black
  },
  header: {
    width: '30%'
  },
  headerPart: {},
  headerTitle: {
    width: '50%',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: COLORS.subjectTableHeaderBorder
  },
  headerTitleActive: {
    width: '50%',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: COLORS.blue
  },
  dashboardHeader: {
    backgroundColor: COLORS.subjectBackground,
    width: '100%'
  },
  numberCategory: {
    color: COLORS.numberCategory,
    fontWeight: 600,
    fontSize: 14
  }
})
export default MySubjectTable
