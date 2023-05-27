import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import Button from './Button'
import CheckIcon from '../assets/check-icon.png'

interface HeadlineHeroProps {
  preTitle?: string
  title?: string
  subtitle?: string
  img: string
  left?: boolean
  buttonBackground?: string
  buttonTitleColor?: string
  backgroundImage?: string
  width?: string | number
  info?: Array<{ title: string }>
}
const HeadlineHero = ({
  img,
  left = false,
  buttonBackground,
  buttonTitleColor,
  backgroundImage,
  width = '90%',
  preTitle,
  subtitle,
  title,
  info
}: HeadlineHeroProps): JSX.Element => {
  return (
    <div
      style={{ backgroundImage, width: !left ? width : '100%' }}
      className={classNames('container-fluid d-flex justify-content-center')}>
      <div className={'row d-flex flex-row justify-content-between align-items-center'}
        style={{ width: left ? width : '100%' }}>
        { left
          ? (
            <div className={'col '}>
              <img src={img} alt={'headline'} className={css(styles.image)}/>
            </div>)
          : '' }

        <div className={'col'}>
          <div
            style={{ color: left ? COLORS.heroTitle : COLORS.welcomeMainSubtitle }}
            className={classNames(css(styles.preTitle), 'inter-semi-bold')}>
            { preTitle }
          </div>

          <div
            style={{ color: left ? COLORS.white : COLORS.blue }}
            className={classNames(css(styles.title), 'inter-semi-bold')}>
            { title }
          </div>

          <div
            style={{ color: left ? COLORS.heroTitle : COLORS.welcomeMainSubtitle }}
            className={classNames(css(styles.subtitle), 'inter-regular mt-3')}>
            { subtitle }
          </div>

          {(info != null)
            ? info.map((item, index) => (
              <div key={index} className={'d-flex flex-row'}>
                <div className={'d-flex align-items-center me-3'}>
                  <img src={CheckIcon} alt={'check-icon'} className={css(styles.icon)}/>
                </div>

                <div className={classNames(css(styles.infoText), 'inter-regular')}>
                  { item.title }
                </div>
              </div>
            ))
            : ''}

          <div className={classNames(css(styles.buttonContainer), 'mt-3')}>
            <Button
              title={'Primary'}
              background={buttonBackground}
              titleColor={buttonTitleColor}
              paddingY={3}
            />
          </div>
        </div>

        { !left
          ? (<div className={'col d-flex justify-content-end'}>
            <img src={img} alt={'headline'} className={classNames(css(styles.image))}/>
          </div>)
          : '' }
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  preTitle: {
    fontSize: 13,
    fontWeight: 600
  },
  title: {
    fontSize: 32,
    fontWeight: 700
  },
  subtitle: {
    fontSize: 13
  },
  image: {
    transform: 'scale(0.8)',
    borderRadius: 15
  },
  buttonContainer: {
    width: '20%'
  },
  icon: {
    width: 20,
    height: 20
  },
  infoText: {
    fontSize: 13,
    color: COLORS.welcomeMainSubtitle
  }
})

export default HeadlineHero
