import React, { useEffect } from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import StudentMainDetailHeader from './StudentMainDetailHeader'
import MySubjectsListDetail from './MySubjectsListDetail'
import { COLORS } from '../utils/colors'
import { useAxiosFetch } from '../utils/useFetch'
import { CHOSE_SUBJECT } from '../utils/urls'

interface SubjectList {
  id: number
  name: string
  teacher_full_name: string
  nb: number
  subject_id: number
}

const MySubjectMain = (): JSX.Element => {
  const token = localStorage.getItem('token')

  const [data] = useAxiosFetch({
    method: 'GET',
    url: CHOSE_SUBJECT,
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])
  return (
    <div className={classNames(css(styles.container), 'px-4 py-4')}>
      <StudentMainDetailHeader />

      <div
        className={classNames(css(styles.dashboardHeader),
          'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>
        <div className={'d-flex flex-row'}>
          <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
            #
          </div>

          <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5')}>
            Предметы
          </div>
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
          Преподователь
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
          Кол-во НБ
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          Действие
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          План
        </div>
      </div>

      <div>
        { data?.length
          ? data?.map((item: SubjectList, index: number) => (
            <MySubjectsListDetail
              key={index}
              number={index + 1}
              subject={item?.name}
              name={item?.teacher_full_name}
              count={item?.nb}
              id={item?.id}
              subjectId={item?.subject_id}
            />
          ))
          : ''}
      </div>
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

export default MySubjectMain
