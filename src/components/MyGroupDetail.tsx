import React, { type JSX } from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import MyGroupListDetail from './MyGroupListDetail'
import { useAxiosFetch } from '../utils/useFetch'
import { GET_GROUP_DETAIL } from '../utils/urls'
import { useAppSelector } from './store/store'

interface AnswersProps {
  created_ad: string
  file_path: string
  id: number
  user: string
}
interface MyGroupDetailListProps {
  answers: AnswersProps[]
  deadline: string
  file_path: string
  max_mark: string | number
  title: string
}

const MyGroupDetail = (): JSX.Element => {
  const token = localStorage.getItem('token')
  const id = useAppSelector(state => state.changeGroupId.id.id)
  const [data] = useAxiosFetch({
    method: 'GET',
    url: GET_GROUP_DETAIL.replace('id', id.toString()),
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  console.log(data)

  return (
    <div className={classNames(css(styles.container), 'px-4 py-4')}>

      <div
        className={classNames(css(styles.dashboardHeader),
          'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>
        <div className={'d-flex flex-row'}>
          <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
            #
          </div>

          <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5')}>
            Задачи
          </div>
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          Срок сдачи
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5 me-4')}>
          Балл | макс
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          Статус
        </div>
      </div>

      <div>
        {data?.length
          ? data.map((item: MyGroupDetailListProps, index: number) => (
            <MyGroupListDetail
              number={index + 1}
              key={index}
              title={item?.title}
              deadline={item?.deadline}
              filePath={item?.file_path}
              maxMark={item?.max_mark}
              answers={item.answers}
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

export default MyGroupDetail
