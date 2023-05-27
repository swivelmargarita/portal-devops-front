import React, { type SetStateAction } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import ChoseIcon from '../assets/play-icon.png'
import { useAppDispatch } from './store/store'
import { changeTestState } from './store/features/setTestSlice'
import { changeId } from './store/features/testIdSlice'

interface SubjectListDetailProps {
  number: string | number
  subject: string
  name: string
  id: number
  date: string
  time: string
  maxMark: number
  isCompleted: boolean
  score?: number
  setSubjectName: React.Dispatch<SetStateAction<string>>
  type?: string
}
const StudentTestListDetail = ({
  number,
  subject,
  name,
  isCompleted,
  date,
  time,
  maxMark,
  id,
  score,
  setSubjectName,
  type
}: SubjectListDetailProps): JSX.Element => {
  const dispatch = useAppDispatch()

  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>
      <div className={'d-flex flex-row'}>
        <div className={classNames(css(styles.name), 'roboto-regular')}>
          { number }
        </div>

        <div className={classNames(css(styles.name), 'roboto-regular ms-3 d-flex flex-column')}>
          <div>{subject}</div>
          <div className={'text-center'} style={{ color: COLORS.welcomeCardButton }}> { type }</div>
        </div>
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        { name }
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        {date}
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        {time}
      </div>

      <div className={classNames('d-flex flex-row align-items-center')}>
        <Button
          title={score ?? '0'}
          fontSize={14}
          titleColor={COLORS.blue}
          background={COLORS.white}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {}}
          borderBottomRightRadius={0}
          borderTopRightRadius={0}
          paddingX={3}
        />

        <Button
          title={maxMark.toString()}
          fontSize={14}
          titleColor={COLORS.white}
          background={COLORS.blue}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {}}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          paddingX={3}
        />
      </div>

      <div>
        <Button
          title={'Начать'}
          fontSize={14}
          titleColor={COLORS.white}
          background={COLORS.choseButton}
          iconLeft={ChoseIcon}
          iconHeight={20}
          iconWidth={20}
          iconWrapper={'me-2'}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.choseButton}
          opacity={isCompleted ? 0.5 : 1}
          onClick={ () => {
            if (!isCompleted) {
              dispatch(changeTestState('test-started'))
              dispatch(changeId({ id }))
              setSubjectName(subject)
            } else {
              alert('Тест ранее был выпольнен')
            }
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

export default StudentTestListDetail
