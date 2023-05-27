import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import GroupsListDetail from './GroupsListDetail'
import { useAppSelector } from './store/store'
import MyGroupDetail from './MyGroupDetail'
import { useAxiosFetch } from '../utils/useFetch'
import { MY_GET_GROUPS } from '../utils/urls'

interface Group {
  id: number
  name: string
  get_count: number
}
const MyGroups = (): JSX.Element => {
  const subjectListState = useAppSelector(state => state.teacherSubjectList)
  const token = localStorage.getItem('token')
  const [data] = useAxiosFetch({
    method: 'GET',
    url: MY_GET_GROUPS,
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  return (
    <>
      { subjectListState.teacherSubjectList.main
        ? (
          <div className={classNames(css(styles.container), 'px-4 py-4')}>
            <div
              className={classNames(css(styles.dashboardHeader),
                'p-3 mt-4 d-flex flex-row justify-content-between align-items-center')}>
              <div className={'d-flex flex-row'}>
                <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
                  #
                </div>

                <div className={classNames(css(styles.numberCategory), 'roboto-regular ms-5')}>
                  Группы
                </div>
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular')}>
                Коли-во учеников
              </div>

              <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
                Задания
              </div>
            </div>

            <div>
              {data?.length
                ? data.map((item: Group, index: number) => (
                  <GroupsListDetail
                    key={index}
                    number={index + 1}
                    subject={item?.name}
                    name={item?.get_count}
                    id={item?.id}
                  />
                ))
                : ''}
            </div>
          </div>)
        : <MyGroupDetail />
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

export default MyGroups
