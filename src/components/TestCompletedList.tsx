import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'

interface TestCompletedListProps {
  category: string
  description: string
}
const TestCompletedList = ({ category, description }: TestCompletedListProps): JSX.Element => {
  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        { category }
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        {description}
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
    color: COLORS.black,
    width: '100%'
  }
})

export default TestCompletedList
