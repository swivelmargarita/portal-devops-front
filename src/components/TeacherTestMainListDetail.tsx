import React, { useState, useEffect } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeTeacherTestCreate } from './store/features/teacherCreateTestSlice'
import InputButton from './InputButton'
import { changeTime } from './store/features/timeSlice'
import { usePostRequest } from '../hooks/request'
import { TEST_CREATE } from '../utils/urls'
import { changeId } from './store/features/testIdSlice'
import LoginInput from './LoginInput'
interface ActivityListDetailProps {
  name: string
  number: number
  count: number
  id: number
}
const TeacherTestMainListDetail = ({ name, number, count, id }: ActivityListDetailProps): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [maxScore, setMaxScore] = useState<string | number>()
  const testParentCreateRequest = usePostRequest({ url: TEST_CREATE })
  const dispatch = useAppDispatch()
  const testDate = useAppSelector(state => state.time)
  const token = localStorage.getItem('token')
  const testParentCreate = async (): Promise<void> => {
    const { response } = await testParentCreateRequest.request({
      data: {
        group: id,
        start_time: testDate.time.time,
        max_mark: testDate.time.maxScore,
        type: title
      },
      headers: {
        Authorization: `Token ${token ?? ''}`
      }
    })

    if (response) {
      console.log(response)
      dispatch(changeTeacherTestCreate(true))
      dispatch(changeId(response?.id))
    }
  }

  useEffect(() => {
    dispatch(changeTime({ time: date, maxScore }))
  }, [date, maxScore])

  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>

      <div className={'d-flex flex-row'}>
        <div className={classNames(css(styles.name), 'roboto-regular')}>
          {number}
        </div>

        <div className={classNames(css(styles.name), 'roboto-regular ms-5')}>
          { name }
        </div>
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        {count}
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        <InputButton
          title={'11-12-2023'}
          fontSize={14}
          titleColor={COLORS.black}
          background={COLORS.white}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {}}
          borderBottomRightRadius={4}
          borderTopRightRadius={4}
          paddingX={0}
          type={'datetime-local'}
          width={'100%'}
          handleChange={(e) => { setDate(e.target.value) }}
        />
      </div>

      <div className={classNames('d-flex flex-row align-items-center')} style={{ width: '10%' }}>
        <InputButton
          title={'0'}
          fontSize={14}
          titleColor={COLORS.black}
          background={COLORS.white}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {}}
          borderBottomRightRadius={0}
          borderTopRightRadius={0}
          paddingX={0}
          type={'text'}
          width={'100%'}
          handleChange={(e) => { setMaxScore(e.target.value) }}
        />
      </div>

      <LoginInput
        placeholder={'Тип теста'}
        value={title}
        name={title} handleChange={(e) => { setTitle(e.target.value) }} />

      <Button
        title={'Создать'}
        titleColor={COLORS.white}
        background={COLORS.choseButton}
        width={'10%'}
        onClick={ () => {
          if (date && maxScore && title) {
            void testParentCreate()
          } else {
            alert('Введите данные( Дата и макс-балл )')
          }
        }}
      />

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
  },
  downloadText: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.black
  },
  link: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.blue,
    textDecorationLine: 'underline'
  },
  input: {
    width: '20%'
  }
})

export default TeacherTestMainListDetail
