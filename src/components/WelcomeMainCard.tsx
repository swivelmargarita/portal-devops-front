import React from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import Avatar from '../assets/card-avatar.png'
import Button from './Button'
import { COLORS } from '../utils/colors'

const WelcomeMainCard = (): JSX.Element => {
  return (
    <div className={
      classNames('d-flex flex-column justify-content-between m-2 px-3 py-3', css(styles.container))}>
      <div className={'d-flex flex-row justify-content-between align-items-center'}>
        <div>
          <img src={Avatar} alt={'avatar'} className={css(styles.avatar)}/>
        </div>

        <div>
          <Button
            title={'Second'}
            background={COLORS.welcomeCardButton}
            height={'75%'}
            paddingX={3}
            titleColor={COLORS.white}
          />
        </div>
      </div>

      <div className={classNames(css(styles.title), 'inter-semi-bold mt-4')}>Wireless</div>

      <div className={classNames(css(styles.subtitle), 'inter-regular mt-2')}>
        Enim nec rhoncus volutpat nullam eros sapien pharetra.
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48
  },
  container: {
    width: '31%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.welcomeCardBorderColor,
    borderRadius: 5
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    color: COLORS.blue
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 400,
    color: COLORS.blue
  }
})

export default WelcomeMainCard
