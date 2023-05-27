import React, { type JSX } from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import HeroImage from '../assets/Wreframe placeholder.png'
import { COLORS } from '../utils/colors'

const HeroWelcome = (): JSX.Element => {
  return (
    <div className={classNames(css(styles.container), 'd-flex flex-column justify-content-between align-items-center pt-5')}>
      <div>
        <div className={classNames('text-center inter-semi-bold mt-5', css(styles.title))}>
          1% OF THE INDUSTRY
        </div>

        <div className={classNames('text-center inter-semi-bold', css(styles.subtitle))}>
          Come for the features of it.<br/>
          Stay for<span className={css(styles.subtitleDetail)}> best ever </span>help.
        </div>

        <div className={classNames('text-center inter-regular mt-4', css(styles.description))}>
          We’ve been told it is possible to revolutionize the payment industry.
          We <br/> have not reinvented the wheel, we decided to build upon it - successfully.
        </div>
      </div>

      <div className={classNames('d-flex justify-content-center pb-5', css(styles.imageContainer))}>
        <img src={HeroImage} alt={'hero-description'} className={css(styles.image)}/>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: COLORS.mainLinearGradient,
    width: '100vw',
    height: '100vh'
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    color: COLORS.heroTitle
  },
  subtitle: {
    fontWeight: 700,
    fontSize: 52,
    color: COLORS.white,
    lineHeight: 1.2

  },
  description: {
    fontWeight: 400,
    fontSize: 18,
    color: COLORS.heroTitle
  },
  subtitleDetail: {
    opacity: 0.6
  },
  imageContainer: {
    width: '100%'
  },
  image: {
    width: '60%'
  }
})

export default HeroWelcome
