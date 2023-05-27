import React, { useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import ChoseIcon from '../assets/chose.png'
import ChoseActiveIcon from '../assets/chose-active.png'
import { useDeleteRequest, usePostRequest } from '../hooks/request'
import { CHOSE_SUBJECT } from '../utils/urls'

interface SubjectListDetailProps {
  number: string | number
  subject: string
  name: string
  id: string | number
  selected?: boolean
}
const SubjectListDetail = ({ number, subject, name, id, selected }: SubjectListDetailProps): JSX.Element => {
  const [chose, setChose] = useState(false)
  const token = localStorage.getItem('token')
  const takeSubject = usePostRequest({
    url: CHOSE_SUBJECT,
    headers: { Authorization: `Token ${token ?? ''}` }
  })

  const deleteSubject = useDeleteRequest({
    url: CHOSE_SUBJECT,
    headers: { Authorization: `Token ${token ?? ''}` }
  })
  // const { response } = useLoad({ url: USER_SUBJECT_LIST })
  const takeSubjectDetail = async (): Promise<void> => {
    void takeSubject.request({
      data: { subject_id: id }
    })
    setChose(!chose)
  }

  const deleteSubjectDetail = async (): Promise<void> => {
    void deleteSubject.request({
      data: { subject_id: id }
    })
    setChose(!chose)
  }

  useEffect(() => { selected ? setChose(true) : setChose(false) }, [selected])

  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>
      <div className={'d-flex flex-row'}>
        <div className={classNames(css(styles.name), 'roboto-regular')}>
          { number }
        </div>

        <div className={classNames(css(styles.name), 'roboto-regular ms-5')}>
          { subject }
        </div>
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular pe-5 me-4')}>
        { name }
      </div>

      <div className={classNames('pe-4 me-3')}>
        <Button
          title={chose ? 'Выбрано' : 'Выбрать'}
          fontSize={14}
          titleColor={chose ? COLORS.white : COLORS.black}
          background={chose ? COLORS.choseButton : COLORS.white}
          iconLeft={chose ? ChoseActiveIcon : ChoseIcon}
          iconHeight={20}
          iconWidth={20}
          iconWrapper={'me-2'}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.choseButton}
          onClick={ () => {
            if (!chose) {
              void takeSubjectDetail()
            } else {
              void deleteSubjectDetail()
            }
          } }
        />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.welcomeCardBorderColor
  },
  name: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.black
  }
})

export default SubjectListDetail
