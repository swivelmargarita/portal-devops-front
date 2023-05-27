import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import classNames from 'classnames'
import Button from './Button'
import { COLORS } from '../utils/colors'
const Navbar = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className={classNames('d-flex flex-row align-items-center py-3', css(styles.navContainer))}>
      <div className={'col-7'}>
        <div className={'row d-flex align-items-center'}>
          <div className={'col d-flex justify-content-center'}>
            <div className={classNames(css(styles.logo), 'pointer d-flex align-items-center roboto-regular')}>
              SD
            </div>
          </div>

          <div className={'col'}></div>
        </div>
      </div>

      <div className={'col-5 d-flex flex-row justify-content-center'}>
        <div className={'row d-flex justify-content-center align-items-center'}>
          <div className={'col-5'}>
            <Button
              title={'Вход'}
              titleColor={COLORS.white}
              onClick={() => { navigate('/login') }}
            />
          </div>

          <div className={'col-7'}>
            <Button
              title={'Регистрация'}
              titleColor={COLORS.black}
              background={COLORS.white}
              paddingX={4}
              onClick={() => { navigate('/register') }}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundImage: COLORS.mainLinearGradient,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.16)',
    borderBottomStyle: 'solid'
  },
  logo: {
    width: 160,
    height: 40,
    color: COLORS.white,
    fontWeight: 900,
    fontSize: 36
  },
  navLink: {
    fontSize: 15,
    color: COLORS.white
  }
})

export default Navbar
