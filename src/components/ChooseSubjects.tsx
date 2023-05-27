import React, { useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import SubjectListDetail from './SubjectListDetail'
import { SUBJECT_LIST } from '../utils/urls'
import { useAxiosFetch } from '../utils/useFetch'

interface SubjectList {
  id: number
  name: string
  selected: boolean
  teacher_full_name: string
}
const ChooseSubjects = (): JSX.Element => {
  const [subjectList, setSubjectList] = useState<SubjectList[]>([])
  const token = localStorage.getItem('token')

  const [data] = useAxiosFetch({
    method: 'GET',
    url: SUBJECT_LIST,
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  useEffect(() => {
    if (data) {
      setSubjectList(data)
      console.log(data)
    } else {
      setSubjectList([])
    }
  }, [data])

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
            Предметы
          </div>
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular me-4')}>
          Преподователь
        </div>

        <div className={classNames(css(styles.numberCategory), 'roboto-regular pe-5')}>
          Добавить
        </div>
      </div>

      <div>
        { subjectList.length
          ? subjectList.map((item: SubjectList, index: number) => (
            <SubjectListDetail
              number={index + 1}
              subject={item?.name}
              name={item?.teacher_full_name}
              key={item?.id} id={item?.id}
              selected={item?.selected}
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
  }
})

export default ChooseSubjects
