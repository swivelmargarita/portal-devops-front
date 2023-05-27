import React, { useEffect } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import MyActivityListDetail from './MyActivityListDetail'
import { useAxiosFetch } from '../utils/useFetch'
import { SUBJECT_DETAIL } from '../utils/urls'
import { useAppSelector } from './store/store'

export interface MySubjectActivityMainProps {
  answer_file: string
  deadline: string
  file_path: string
  id: number
  mark?: number
  max_mark: number
  teacher: string
  title: string
}

const MySubjectActivityMain = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const id = useAppSelector(state => state.subjectId.id.id)

  const [data] = useAxiosFetch({
    method: 'GET',
    url: SUBJECT_DETAIL.replace('id', id.toString()),
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

      <div className={'d-flex flex-row justify-content-between'}>
        <div className={classNames(css(styles.headerContainer), 'd-flex flex-column align-items-center p-3')}>
          <div className={classNames(css(styles.headerTitle), 'roboto-regular')}>Набранные баллы</div>
          <div className={classNames(css(styles.headerScore), 'roboto-regular mt-2')}>
            {data?.score}
          </div>
        </div>

        <div className={classNames(css(styles.headerContainer), 'd-flex flex-column align-items-center p-3')}>
          <div className={classNames(css(styles.headerTitle), 'roboto-regular')}>Макс. балл</div>
          <div className={classNames(css(styles.headerScore), 'roboto-regular mt-2')}>
            {data?.max_score}
          </div>
        </div>

        <div className={classNames(css(styles.headerContainer), 'd-flex flex-column align-items-center p-3')}>
          <div className={classNames(css(styles.headerTitle), 'roboto-regular')}>Успеваемость</div>
          <div className={classNames(css(styles.headerScore), 'roboto-regular mt-2')}>
            {data?.percent}%
          </div>
        </div>

        <div className={classNames(css(styles.headerContainer), 'd-flex flex-column align-items-center p-3')}>
          <div className={classNames(css(styles.headerTitle), 'roboto-regular')}>Текущая оценка</div>
          <div className={classNames(css(styles.headerScore), 'roboto-regular mt-2')}>
            {data?.current_mark}
          </div>
        </div>
      </div>

      <div
        className={classNames(css(styles.dashboardHeader),
          'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
            Преподователь
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
          Задача
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
          Задания
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
          Срок сдачи
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          Балл | макс
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          Ссылки
        </div>
      </div>

      <div>
        {
          data?.tasks?.length
            ? data.tasks.map((item: MySubjectActivityMainProps, index: number) => (
              <MyActivityListDetail
                id={item?.id}
                key={index}
                teacher={item?.teacher}
                deadline={item?.deadline}
                maxMark={item?.max_mark}
                mark={item?.mark}
                filePath={item?.file_path}
                answerFile={item?.answer_file}
                title={item?.title}
              />
            ))
            : ''
        }
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
  },
  headerContainer: {
    borderWidth: 1,
    borderColor: COLORS.welcomePreFooterText,
    borderStyle: 'solid',
    width: '25%'
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 14,
    color: COLORS.black
  },
  headerScore: {
    fontWeight: 700,
    fontSize: 18,
    color: COLORS.blue
  }
})

export default MySubjectActivityMain
