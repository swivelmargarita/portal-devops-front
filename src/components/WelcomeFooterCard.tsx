import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import RightRegular from '../assets/right-regular.png'

interface WelcomeFooterCardProps {
  image: string
  date: string
  title: string
  description: string
  labelColor: string
}

const WelcomeFooterCard = ({ image, date, title, labelColor, description }: WelcomeFooterCardProps): JSX.Element => {
  return (
    <div className={classNames(css(styles.container), 'd-flex flex-column justify-content-between')}>
      <img src={image} alt={'card-detail'} className={css(styles.image)}/>

      <div className='d-flex flex-column justify-content-around py-2 px-4'>
        <div className={'d-flex flex-row align-items-center'}>
          <Button
            title={'Label'}
            width={'13%'}
            background={labelColor}
            titleColor={COLORS.white}
            paddingX={0}
            paddingY={1}
            height={'90%'}
          />

          <div className={classNames(css(styles.date), 'inter-regular ps-3')}>
            { date }
          </div>
        </div>

        <div className={classNames(css(styles.title), 'my-3 inter-semi-bold')}>
          { title }
        </div>

        <div className={classNames(css(styles.description), 'inter-regular')}>
          { description }
        </div>

        <div className={'d-flex flex-row align-items-center my-3 pointer'}>
          <div className={classNames(css(styles.linkText), 'inter-semi-bold')}>Link</div>
          <img src={RightRegular} alt={'right-regular'} className={classNames(css(styles.icon), 'ms-1')}/>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    borderRadius: 11,
    borderStyle: 'solid',
    borderColor: COLORS.welcomeCardBorderColor
  },
  image: {
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  date: {
    fontSize: 11,
    fontWeight: 500,
    color: COLORS.welcomeMainSubtitle
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.black,
    lineHeight: 1.3
  },
  description: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.welcomeMainSubtitle
  },
  icon: {
    width: 18,
    height: 17
  },
  linkText: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.blue
  }
})

export default WelcomeFooterCard
