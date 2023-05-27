import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import { useAppDispatch } from './store/store'
import { changeSubjectList } from './store/features/teacherSubjectListSlice'
import { changeTeacherTitle } from './store/features/setTeacherTitleSlice'
import Modal from './Modal'
import { changeGroupId } from './store/features/groupIdSlice'

interface SubjectListDetailProps {
  number: string | number
  subject: string
  name: string | number
  id: number
}
const GroupsListDetail = ({ number, subject, name, id }: SubjectListDetailProps): JSX.Element => {
  const [chose, setChose] = useState(false)
  const [date, setDate] = useState<string>('')
  const [mark, setMark] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [file, setFile] = useState<string>('')

  const dispatch = useAppDispatch()

  return (
    <>
      <div className={classNames(css(styles.container),
        'd-flex flex-row justify-content-between align-items-center px-3 py-4 pointer')}>
        <div className={'d-flex flex-row'}>
          <div className={classNames(css(styles.name), 'roboto-regular')}>
            { number }
          </div>

          <div
            onClick={ () => {
              dispatch(changeSubjectList({ main: false, detail: true }))
              dispatch(changeTeacherTitle('11 A'))
              dispatch(changeGroupId({ id }))
            }}
            className={classNames(css(styles.name), 'roboto-regular ms-5 pointer')}>
            { subject }
          </div>
        </div>

        <div className={classNames(css(styles.name), 'roboto-regular pe-5 me-4')}>
          { name }
        </div>

        <div className={classNames('pe-4 me-3')}>
          <div className={'d-flex flex-column justify-content-between'}>
            <div className={classNames('roboto-regular', css(styles.downloadText))}>
                  1-задача
            </div>

            <Modal
              chose={chose}
              setChose={setChose}
              mark={mark}
              setMark={setMark}
              date={date}
              setDate={setDate}
              title={title}
              setTitle={setTitle}
              file={file}
              setFile={setFile}
              id={id}
            />
          </div>
        </div>
      </div>
    </>
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
  },
  downloadText: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.black
  }
})

export default GroupsListDetail
