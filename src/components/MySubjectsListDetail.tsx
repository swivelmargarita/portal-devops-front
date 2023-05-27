import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import ActionsIcon from '../assets/actions-icon.png'
import TableIcon from '../assets/table-active.png'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeSubjectList } from './store/features/subjectListSlice'
import { changeSubjectId } from './store/features/subjectIdSlice'
import { changeMainSubjectId } from './store/features/mainSubject'

interface SubjectListDetailProps {
  number: string | number
  subject: string
  name: string
  count: number
  id: number
  subjectId: number
}
const MySubjectsListDetail = ({ number, subject, name, count, id, subjectId }: SubjectListDetailProps): JSX.Element => {
  const [chose, setChose] = useState(false)
  const dispatch = useAppDispatch()
  const subjectListState = useAppSelector(state => state.subjectList)

  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>
      <div className={'d-flex flex-row'}>
        <div className={classNames(css(styles.name), 'roboto-regular')}>
          { number }
        </div>

        <div className={classNames(css(styles.name), 'roboto-regular ps-5')}>
          { subject }
        </div>
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')} style={{ marginLeft: '-6%' }}>
        { name }
      </div>

      <div className={classNames('me-3')}>
        <Button
          title={ count ? count.toString() : '0' }
          fontSize={14}
          titleColor={chose ? COLORS.white : COLORS.black}
          background={chose ? COLORS.welcomeCardButton : COLORS.white}
          iconWrapper={'me-2'}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.welcomeCardButton}
          onClick={() => { setChose(!chose) }}
        />
      </div>

      <div className={classNames('me-2')}>
        <Button
          title={'Активности'}
          fontSize={14}
          titleColor={COLORS.blue}
          background={COLORS.white}
          iconLeft={ActionsIcon}
          iconHeight={20}
          iconWidth={20}
          iconWrapper={'me-2'}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {
            setChose(!chose)
            dispatch(changeSubjectList({ ...subjectListState.subjectList, activity: true, main: false }))
            dispatch(changeSubjectId({ id }))
          }}
        />
      </div>

      <div className={classNames('me-5')}>
        <Button
          fontSize={14}
          background={COLORS.white}
          iconLeft={TableIcon}
          iconHeight={20}
          iconWidth={20}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {
            setChose(!chose)
            dispatch(changeSubjectList({ ...subjectListState.subjectList, activity: false, main: false, table: true }))
            dispatch(changeSubjectId({ id }))
            dispatch(changeMainSubjectId({ id: subjectId }))
          }}
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

export default MySubjectsListDetail
