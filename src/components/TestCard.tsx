import React, { type SetStateAction, useState } from 'react'
import classNames from 'classnames'
import Button from './Button'
import { COLORS } from '../utils/colors'
import { changeTestState } from './store/features/setTestSlice'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeTest } from './store/features/testSlice'
import { usePostRequest } from '../hooks/request'
import { ANSWER_TEST } from '../utils/urls'

interface TestCardProps {
  number: number | string
  question: string
  testNumber: number
  setTestNumber: React.Dispatch<SetStateAction<number>>
  testLength: number
  answerA: string
  answerB: string
  answerC: string
  answerD: string
  answerTrue: string
  progressValue: number
  setProgressValue: React.Dispatch<SetStateAction<number>>
}

const TestCard = ({
  number,
  question,
  testNumber,
  setTestNumber,
  testLength,
  answerA,
  answerB,
  answerC,
  answerD,
  answerTrue,
  progressValue,
  setProgressValue
}: TestCardProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [variant, setVariant] = useState<string>('')
  const testData = useAppSelector(state => state.test)
  const { id } = useAppSelector(state => state.testId)
  const token = localStorage.getItem('token')
  const answerTestRequest = usePostRequest({
    url: ANSWER_TEST,
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  console.log(answerTrue, 'answerTrue', variant, testData)

  const answerTest = async (): Promise<any> => {
    const { response } = await answerTestRequest.request({
      data: {
        test_id: id.id,
        score: testData.test.completed
      }
    })

    console.log(response)
  }

  return (
    <div>
      <div className={classNames('mt-3 roboto-regular')}>{ number }. { question }</div>

      <div className={'d-flex flex-row'}>
        <input
          type={'radio'}
          name={testNumber.toString()}
          onChange={(e) => { setVariant(e.target.value) }}
          value={answerA}
          checked={variant === answerA}
        />
        <div
          className={'ms-2 roboto-regular pointer'}
          onClick={() => { setVariant(answerA) }}
        >{ answerA }</div>
      </div>

      <div className={'d-flex flex-row'}>
        <input
          type={'radio'}
          name={testNumber.toString()}
          onChange={(e) => { setVariant(e.target.value) }}
          value={answerB}
          checked={variant === answerB}
        />
        <div
          className={'ms-2 roboto-regular pointer'}
          onClick={() => { setVariant(answerB) }}
        >{ answerB }</div>
      </div>

      <div className={'d-flex flex-row'}>
        <input
          type={'radio'}
          name={testNumber.toString()}
          onChange={(e) => { setVariant(e.target.value) }}
          value={answerC}
          checked={variant === answerC}
        />
        <div
          className={'ms-2 roboto-regular pointer'}
          onClick={() => { setVariant(answerC) }}
        >{ answerC }</div>
      </div>

      <div className={'d-flex flex-row'}>
        <input
          type={'radio'}
          name={testNumber.toString()}
          onChange={(e) => { setVariant(e.target.value) }}
          value={answerD}
          checked={variant === answerD}
        />
        <div
          onClick={() => { setVariant(answerD) }}
          className={'ms-2 roboto-regular pointer'}>
          { answerD }
        </div>
      </div>

      <div className={classNames('d-flex flex-row justify-content-end')}>
        {testNumber + 1 < testLength
          ? (
            <Button
              title={'Далее'}
              background={COLORS.choseButton}
              width={'10%'}
              wrapper={'me-2'}
              titleColor={COLORS.white}
              onClick={() => {
                setTestNumber(testNumber + 1)
                setProgressValue(progressValue + (100 / testLength))
                if (answerTrue === variant) {
                  console.log('answer is TRUE', testData)
                  dispatch(changeTest({ ...testData.test, completed: testData.test.completed + 1, current: testData.test.current + 1 }))
                } else {
                  dispatch(changeTest({ ...testData.test, current: testData.test.current + 1 }))
                  console.log('answer is FALSE')
                }
              }}
            />)
          : ''}

        <Button
          title={'Завершить'}
          background={COLORS.welcomeCardButton}
          width={'10%'}
          titleColor={COLORS.white}
          onClick={() => {
            if (answerTrue === variant) {
              console.log('answer is TRUE', testData)
              dispatch(changeTest({ ...testData.test, completed: testData.test.completed + 1, current: testData.test.current + 1 }))
            } else {
              dispatch(changeTest({ ...testData.test, current: testData.test.current + 1 }))
              console.log('answer is FALSE')
            }
            dispatch(changeTestState('test-completed'))
            setVariant('')
            void answerTest()
          }}
        />
      </div>
    </div>
  )
}

export default TestCard
