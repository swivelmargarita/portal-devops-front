import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import LoginInput from '../components/LoginInput'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import HeroImage from '../assets/register-hero.png'
import IconLeft from '../assets/subject-tilte-arrow.png'
import { usePatchRequest } from '../hooks/request'
import { SET_PASSWORD } from '../utils/urls'

const FinalRegister = (): JSX.Element => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const passwordRequest = usePatchRequest({
    url: SET_PASSWORD,
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })
  const [passwordOne, setPasswordOne] = useState<string>('')
  const [passwordTwo, setPasswordTwo] = useState<string>('')

  const setPassword = async (): Promise<void> => {
    const { response } = await passwordRequest.request({
      data: { password: passwordTwo }
    })
    if (response?.success === true) {
      navigate('/subjects')
    }
  }

  return (
    <div className={classNames('d-flex flex-row justify-content-between', css(styles.container))}>
      <div className={classNames('p-5', css(styles.leftContainer))}>
        <div style={{ position: 'absolute', top: 20 }}>
          <Button
            onClick={() => { navigate('/register') }}
            title={'Назад'}
            width={'8%'}
            titleColor={COLORS.blue}
            iconLeft={IconLeft}
          />
        </div>

        <div className={classNames(css(styles.logo), 'pointer d-flex align-items-center roboto-regular')}>
          SD
        </div>
        <div className={'p-5'}>
          <div className={'p-5'}>
            <div className={'p-5'}>
              <div className={classNames(css(styles.title), 'roboto-regular')}>
                Введите свой пароль
              </div>
              <LoginInput
                placeholder={'Пароль'}
                wrapper={'mt-4'}
                handleChange={(e) => { setPasswordOne(e.target.value) }}
                iconRight={true}
                eye={true}
                value={passwordOne}
              />

              <LoginInput
                placeholder={'Подтвердите пароль'}
                wrapper={'mt-4'}
                handleChange={(e) => { setPasswordTwo(e.target.value) }}
                iconRight={true}
                eye={true}
                value={passwordTwo}
              />

              <Button
                title={'Зарегистрироваться'.toUpperCase()}
                width={'100%'}
                wrapper={'mt-4'}
                background={COLORS.welcomeCardButton}
                fontSize={13}
                titleColor={COLORS.loginButtonTextColor}
                onClick={() => {
                  if (passwordOne === passwordTwo) {
                    void setPassword()
                  } else {
                    alert('Пароли не совпадают')
                  }
                }}
              />

              <Button
                title={'войти'.toUpperCase()}
                width={'100%'}
                wrapper={'mt-4'}
                background={COLORS.blue}
                fontSize={13}
                titleColor={COLORS.loginButtonTextColor}
                onClick={() => { navigate('/login') }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={classNames('d-flex justify-content-center', css(styles.hero))}>
        <img src={HeroImage} alt={'hero'} className={classNames(css(styles.image))}/>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100vh'
  },
  image: {
    transform: 'scale(0.8)'
  },
  hero: {
    backgroundColor: COLORS.loginHeroBackground,
    width: '40%'
  },
  logo: {
    width: '35%',
    color: COLORS.blue,
    fontWeight: 900,
    fontSize: 36
  },
  title: {
    fontSize: 30,
    color: COLORS.loginTitleText
  },
  leftContainer: {
    width: '60%'
  }
})

export default FinalRegister
