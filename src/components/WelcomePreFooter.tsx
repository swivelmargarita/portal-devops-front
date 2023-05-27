import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import Button from './Button'

const WelcomePreFooter = (): JSX.Element => {
  return (
    <div className={classNames(css(styles.container), 'row py-5 px-5 my-5')}>
      <div className={'col-8'}>
        <div className={classNames(css(styles.preTitle), 'inter-semi-bold')}>1% OF THE INDUSTRY</div>

        <div className={classNames(css(styles.title), 'inter-semi-bold my-3')}>
          Welcome to your new digital reality that which will rock your world.
        </div>

        <div className={classNames(css(styles.subTitle), 'inter-regular')}>
          Let us help you take you from zero to serious business and beyond.
          Our no-strings attached free trial lets you test our product today.
        </div>
      </div>

      <div className={'col-4 d-flex flex-row justify-content-center align-items-center'}>
        <div className={'row d-flex flex-row justify-content-center align-items-center'}>
          <div className={'col-8 input-group-sm'}>
            <input
              className={classNames(css(styles.input), 'inter-semi-bold ps-2 form-control')}
              placeholder={'Input'}
            />
          </div>

          <div className={'col-4'} style={{ marginLeft: '-8%' }}>
            <Button
              title={'Primary'}
              background={COLORS.blue}
              titleColor={COLORS.white}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundImage: COLORS.mainLinearGradient,
    borderRadius: 10
  },
  preTitle: {
    color: COLORS.welcomePreFooterText,
    fontSize: 12
  },
  title: {
    color: COLORS.white,
    fontSize: 30,
    lineHeight: 1.3
  },
  subTitle: {
    color: COLORS.welcomePreFooterText,
    fontSize: 14
  },
  input: {
    color: COLORS.welcomePreInputText,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(95, 109, 126, 1)'
  }
})

export default WelcomePreFooter
