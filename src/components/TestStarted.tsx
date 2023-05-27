import React, { useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import ProgressBar from '@ramonak/react-progress-bar'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import TestCard from './TestCard'
import { useAxiosFetch } from '../utils/useFetch'
import { GET_TEST_LIST } from '../utils/urls'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeTest } from './store/features/testSlice'

interface ITEST {
  id: number
  answer_true: string
  question_name: string
  answer_a: string
  answer_b: string
  answer_c: string
  answer_d: string
}

interface Subject {
  subject: string
}
const TestStarted = ({ subject }: Subject): JSX.Element => {
  const [testNumber, setTestNumber] = useState<number>(0)
  const [testList, setTestList] = useState<ITEST[]>([])
  const [minValue, setMinValue] = useState<number>(0)
  const testData = useAppSelector(state => state.test)
  const dispatch = useAppDispatch()
  const { id } = useAppSelector(state => state.testId)
  const token = localStorage.getItem('token')

  const [data] = useAxiosFetch({
    method: 'GET',
    url: GET_TEST_LIST.concat(`${id.id}`),
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  useEffect(() => {
    if (data) {
      setTestList(data)
      dispatch(changeTest({ ...testData.test, count: data.length }))
      setMinValue(100 / data.length)
    } else {
      setTestList([])
    }
  }, [data])
  return (
    <div className={classNames(css(styles.container), 'px-4 py-4')}>
      <div className={'d-flex flex-row justify-content-center align-items-center pt-2'}>
        <div className={classNames(css(styles.headerDescription), 'pe-1')}>Предмет:</div>
        <div className={classNames(css(styles.headerTitle), 'ps-1')}>{subject}</div>
      </div>

      <div className={classNames(css(styles.headerDescription))} >
        { testData.test.current } из { testData.test.count }
      </div>

      <div className={classNames('mt-4')}>
        <ProgressBar
          completed={minValue}
          isLabelVisible={false}
          bgColor={COLORS.welcomeCardButton}
          baseBgColor={COLORS.nonCompletedBar}
          height={'10px'}
        />
      </div>

      <div>
        { ((testList?.length) !== 0)
          ? testList
            .filter((item, index) => index === testNumber)
            .map((testItem, testIndex) => (
              <TestCard
                key={testIndex}
                number={testNumber + 1}
                question={testItem.question_name}
                answerA={testItem.answer_a}
                answerB={testItem.answer_b}
                answerC={testItem.answer_c}
                answerD={testItem.answer_d}
                answerTrue={testItem.answer_true}
                testNumber={testNumber}
                setTestNumber={setTestNumber}
                testLength={testList?.length}
                progressValue = {minValue}
                setProgressValue={setMinValue}
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
  numberCategory: {
    color: COLORS.numberCategory,
    fontWeight: 600,
    fontSize: 14
  },
  headerDescription: {
    color: COLORS.numberCategory,
    fontWeight: 600,
    fontSize: 14
  },
  headerTitle: {
    color: COLORS.black,
    fontWeight: 600,
    fontSize: 14
  }
})

export default TestStarted
