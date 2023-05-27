import React, { useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import StudentTestListDetail from './StudentTestListDetail'
import { useAppSelector } from './store/store'
import TestStarted from './TestStarted'
import TestCompleted from './TestCompleted'
import { useAxiosFetch } from '../utils/useFetch'
import { MY_TEST } from '../utils/urls'

interface ITEST {
  id: number
  date: string
  time: string
  max_mark: number
  subject: string
  teacher: string
  is_completed: boolean
  score?: number
  type?: string
}

const StudentTest = (): JSX.Element => {
  const [subjectName, setSubjectName] = useState<string>(' ')
  const testState = useAppSelector(state => state.setTest)
  const token = localStorage.getItem('token')
  const [data] = useAxiosFetch({
    method: 'GET',
    url: MY_TEST,
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data, testState])
  return (
    <>
      { testState === 'test-inactive'
        ? (
          <div className={classNames(css(styles.container), 'px-4 py-4')}>
            <div
              className={classNames(css(styles.dashboardHeader),
                'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>
              <div className={'d-flex flex-row'}>
                <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
                  #
                </div>

                <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5 ps-3')}>
                  Предметы
                </div>
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5')}>
                Поток
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular ps-5')}>
                Дата
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
                Время начало
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
                Балл
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
                Тест
              </div>
            </div>

            <div>
              {data?.length
                ? data.map((item: ITEST, index: number) => (
                  <StudentTestListDetail
                    key={index}
                    number={index + 1}
                    subject={item.subject}
                    name={item.teacher}
                    id={item.id}
                    date={item.date}
                    time={item.time}
                    maxMark={item.max_mark}
                    isCompleted={item.is_completed}
                    score={item?.score}
                    type={item?.type}
                    setSubjectName={setSubjectName}
                  />
                ))
                : ''}
            </div>
          </div>)
        : testState === 'test-started'
          ? <TestStarted subject={subjectName}/>
          : testState === 'test-completed'
            ? <TestCompleted />
            : ''
      }
    </>
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

export default StudentTest
