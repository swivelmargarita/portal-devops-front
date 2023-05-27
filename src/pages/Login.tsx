import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import HeroImage from '../assets/login-hero.png'
import { COLORS } from '../utils/colors'
import LoginInput from '../components/LoginInput'
import Button from '../components/Button'
import ButtonIcon from '../assets/login-button-chevron.png'
import { useNavigate } from 'react-router-dom'
import IconLeft from '../assets/subject-tilte-arrow.png'
import { usePostRequest } from '../hooks/request'
import { SIGN_IN } from '../utils/urls'
import EyeIcon from '../assets/icons8-eye-50.png'

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const loginRequest = usePostRequest({ url: SIGN_IN })

  const signIn = async (): Promise<void> => {
    const { success, response } = await loginRequest.request({
      data: {
        phone: login,
        password
      }
    })
    if (response?.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.role)
    } else {
      alert('Введите правильные данные')
    }
    if (success) {
      navigate('/subjects')
      window.location.reload()
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
            <div className={classNames(css(styles.title), 'roboto-regular')}>
              Войти
            </div>

            <LoginInput
              placeholder={'Телефон номер *'}
              wrapper={'mt-4'}
              handleChange={(e) => { setLogin(e.target.value) }}
              name={login}
              value={login}
            />

            <LoginInput
              placeholder={'Пароль *'}
              wrapper={'mt-4'}
              handleChange={(e) => { setPassword(e.target.value) }}
              name={password}
              iconRight={EyeIcon}
              eye={true}
              value={password}
            />

            <div className={classNames('d-flex flex-row justify-content-between align-items-center mt-4')}>
              <Button
                title={'Войти'}
                icon={ButtonIcon}
                background={COLORS.blue}
                iconWrapper={'ms-3'}
                width={'33%'}
                roboto={true}
                fontSize={15}
                titleColor={COLORS.loginButtonTextColor}
                onClick={() => {
                  if (login !== '' && password !== '') {
                    void signIn()
                  } else {
                    alert('Заполните все поля')
                  }
                }}
              />

              <Button
                title={'Забыли пароль?'}
                width={'45%'}
                onClick={() => { navigate('/forget-password') }}
              />
            </div>

            <Button
              title={'Создать аккаунт'}
              width={'100%'}
              wrapper={'mt-4'}
              background={COLORS.welcomeCardButton}
              fontSize={15}
              titleColor={COLORS.loginButtonTextColor}
              onClick={() => { navigate('/register') }}
            />
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
    width: '55%'
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
    width: '45%'
  }
})

export default Login
