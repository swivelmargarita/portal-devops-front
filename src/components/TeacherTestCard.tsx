import React, { useState } from 'react'
import classNames from 'classnames'
import Button from './Button'
import { COLORS } from '../utils/colors'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeTeacherTestCreate } from './store/features/teacherCreateTestSlice'
import { css, StyleSheet } from 'aphrodite'
import LoginInput from './LoginInput'
import { usePostRequest } from '../hooks/request'
import { MAIN_TEST_CREATE } from '../utils/urls'
import { changeTime } from './store/features/timeSlice'

const TeacherTestCard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState<string>('')
  const [answerA, setAnswerA] = useState<string>('')
  const [answerB, setAnswerB] = useState<string>('')
  const [answerC, setAnswerC] = useState<string>('')
  const [answerD, setAnswerD] = useState<string>('')
  const [answerToQuestion, setAnswerToQuestion] = useState<string>(' ')
  const testCreateRequest = usePostRequest({ url: MAIN_TEST_CREATE })
  const testId = useAppSelector(state => state.testId)

  const testCreate = async (): Promise<void> => {
    const { response } = await testCreateRequest.request({
      data: {
        answer_true: answerToQuestion,
        question_name: question,
        answer_a: answerA,
        answer_b: answerB,
        answer_c: answerC,
        answer_d: answerD,
        test: testId.id
      }
    })

    if (response?.answerTrue) {
      setQuestion('')
      setAnswerA('')
      setAnswerB('')
      setAnswerC('')
      setAnswerD('')
      setAnswerToQuestion(' ')
    }
  }

  return (
    <div>
      <div className={'d-flex flex-row justify-content-center align-items-center pt-2'}>
        <div className={classNames(css(styles.headerDescription), 'pe-1')}>Предмет:</div>
        <div className={classNames(css(styles.headerTitle), 'ps-1')}>Сетевая безопасность</div>
      </div>

      <div className={classNames('mt-3 roboto-regular')}>{ 'Вопрос:' }</div>

      <div className={classNames(css(styles.inputContainer), 'd-flex flex-row mt-3')}>
        <LoginInput
          wrapperWidth={'100%'}
          paddingLeft={10}
          handleChange={(e) => { setQuestion(e.target.value) }}
          name={question}
          value={question}
        />
      </div>

      <div className={classNames('mt-3 roboto-regular')}>{ 'Ответ:' }</div>

      <div className={classNames(css(styles.inputContainer), 'd-flex flex-row mt-3')}>
        <input
          type={'radio'}
          className={classNames(css(styles.radio), 'bg-secondary')}
          name={question}
          value={answerA}
          onChange={(e) => { setAnswerToQuestion(e.target.value) }}
          checked={answerToQuestion === answerA}
        />
        <LoginInput
          wrapperWidth={'100%'}
          paddingLeft={40}
          handleChange={(e) => { setAnswerA(e.target.value) }}
          name={answerA}
          value={answerA}
        />
      </div>

      <div className={classNames(css(styles.inputContainer), 'd-flex flex-row mt-3')}>
        <input
          type={'radio'}
          className={classNames(css(styles.radio), 'bg-secondary')}
          name={question}
          value={answerB}
          onChange={(e) => { setAnswerToQuestion(e.target.value) }}
          checked={answerToQuestion === answerB}
        />
        <LoginInput
          wrapperWidth={'100%'}
          paddingLeft={40}
          handleChange={(e) => { setAnswerB(e.target.value) }}
          name={answerB}
          value={answerB}
        />
      </div>

      <div className={classNames(css(styles.inputContainer), 'd-flex flex-row mt-3')}>
        <input
          type={'radio'}
          className={classNames(css(styles.radio), 'bg-secondary')}
          name={question}
          value={answerC}
          onChange={(e) => { setAnswerToQuestion(e.target.value) }}
          checked={answerToQuestion === answerC}
        />
        <LoginInput
          wrapperWidth={'100%'}
          paddingLeft={40}
          handleChange={(e) => { setAnswerC(e.target.value) }}
          name={answerC}
          value={answerC}
        />
      </div>

      <div className={classNames(css(styles.inputContainer), 'd-flex flex-row mt-3')}>
        <input
          type={'radio'}
          className={classNames(css(styles.radio), 'bg-secondary')}
          name={question}
          value={answerD}
          onChange={(e) => { setAnswerToQuestion(e.target.value) }}
          checked={answerToQuestion === answerD}
        />
        <LoginInput
          wrapperWidth={'100%'}
          paddingLeft={40}
          handleChange={(e) => { setAnswerD(e.target.value) }}
          name={answerD}
          value={answerD}
        />
      </div>

      <div className={classNames('d-flex flex-row justify-content-end mt-3')}>

        <Button
          title={'Далее'}
          background={COLORS.choseButton}
          width={'10%'}
          wrapper={'me-2'}
          titleColor={COLORS.white}
          onClick={() => {
            if (question && answerToQuestion && answerA && answerB && answerC && answerD) {
              void testCreate()
            } else {
              alert('Заполните все поля')
            }
          }}
        />

        <Button
          title={'Завершить'}
          background={COLORS.welcomeCardButton}
          width={'10%'}
          titleColor={COLORS.white}
          onClick={() => {
            if (question && answerToQuestion && answerA && answerB && answerC && answerD) {
              dispatch(changeTeacherTestCreate(false))
              dispatch(changeTime({}))
              void testCreate()
            } else {
              alert('Заполните все поля')
            }
          }}
        />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  headerDescription: {
    color: COLORS.numberCategory,
    fontWeight: 600,
    fontSize: 14
  },
  headerTitle: {
    color: COLORS.black,
    fontWeight: 600,
    fontSize: 14
  },
  inputContainer: {
    width: '100wv',
    position: 'relative'
  },
  radio: {
    position: 'absolute',
    top: '38%',
    left: 10,
    zIndex: 2
  }
})

export default TeacherTestCard
