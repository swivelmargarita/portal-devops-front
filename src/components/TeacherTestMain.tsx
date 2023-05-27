import React, { type JSX, useEffect } from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import TeacherTestMainListDetail from './TeacherTestMainListDetail'
import { useAppSelector } from './store/store'
import TeacherTestCard from './TeacherTestCard'
import { useAxiosFetch } from '../utils/useFetch'
import { MY_GET_GROUPS } from '../utils/urls'

interface Group {
  id: number
  name: string
  get_count: number
}

const TeacherTestMain = (): JSX.Element => {
  const teacherTestCreate = useAppSelector(state => state.teacherTestCreate)
  const token = localStorage.getItem('token')
  const [data] = useAxiosFetch({
    method: 'GET',
    url: MY_GET_GROUPS,
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
      { !teacherTestCreate
        ? (
          <>
            <div
              className={classNames(css(styles.dashboardHeader),
                'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>
              <div className={'d-flex flex-row'} style={{ width: '8%' }}>
                <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
                #
                </div>

                <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5')}>
                Группы
                </div>
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular me-5')} >
              Коли-во учеников
              </div>

              <div
                style={{ width: '10%' }}
                className={classNames(css(styles.numberCategory), 'roboto-regular me-5')}>
              Время начало
              </div>

              <div
                style={{ width: '10%' }}
                className={classNames(css(styles.numberCategory), 'roboto-regular me-5')}>
              Балл
              </div>

              <div
                style={{ width: '8%' }}
                className={classNames(css(styles.numberCategory), 'roboto-regular me-5')}>
                Тип теста
              </div>

              <div
                style={{ width: '8%' }}
                className={classNames(css(styles.numberCategory), 'roboto-regular')}>
              Тест
              </div>
            </div>

            <div>
              {data?.length
                ? data.map((item: Group, index: number) => (
                  <TeacherTestMainListDetail
                    name={item.name}
                    key={index}
                    number={index + 1}
                    count={item.get_count}
                    id={item.id}
                  />
                ))
                : ''}
            </div>
          </>)
        : <TeacherTestCard />}
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

export default TeacherTestMain
