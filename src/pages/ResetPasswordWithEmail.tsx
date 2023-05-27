import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import Button from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import IconLeft from '../assets/subject-tilte-arrow.png'
import LoginInput from '../components/LoginInput'
import { usePostRequest } from '../hooks/request'
import { VERIFY_RESET_PASSWORD } from '../utils/urls'

const ForgetPasswordWithEmail = (): JSX.Element => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>('')

  const confirmResetPasswordRequest = usePostRequest({
    url: VERIFY_RESET_PASSWORD
  })

  const confirmResetPassword = async (): Promise<void> => {
    const { response } = await confirmResetPasswordRequest.request({
      data: {
        phone: state.phone,
        code: password
      }
    })
    console.log(response)

    if (response) {
      navigate('/reset-password', { state: { state } })
    }
  }

  return (
    <div className={classNames('d-flex flex-row', css(styles.container))}>
      <div className={classNames('p-5', css(styles.leftContainer))}>
        <div style={{ position: 'absolute', top: 20 }}>
          <Button
            onClick={() => { navigate('/forget-password') }}
            title={'Назад'}
            width={'8%'}
            titleColor={COLORS.blue}
            iconLeft={IconLeft}
          />
        </div>

        <div className={classNames(css(styles.logo), 'pointer d-flex align-items-center roboto-regular')}>
          SD
        </div>

        <div className={'d-flex flex-row justify-content-center'}>
          <div className={'p-5'} style={{ width: '50%' }}>
            <div className={'p-5'}>
              <div className={classNames(css(styles.title), 'roboto-regular')}>
                СМС для восстановления отправлено!
              </div>

              <div className={classNames(css(styles.subtitle), 'roboto-regular')}>
                Проверьте свою телефон номер, чтобы узнать о следующих <br/> шагах по сбросу пароля.
              </div>

              <LoginInput
                placeholder={'Введите код *'}
                wrapper={'mt-4'}
                handleChange={(e) => { setPassword(e.target.value) }}
                value={password}
              />

              <Button
                title={'войти'.toUpperCase()}
                width={'100%'}
                wrapper={'mt-4'}
                background={COLORS.blue}
                fontSize={13}
                titleColor={COLORS.loginButtonTextColor}
                onClick={() => { void confirmResetPassword() } }
              />
            </div>
          </div>
        </div>
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
  logo: {
    width: '15%',
    color: COLORS.blue,
    fontWeight: 900,
    fontSize: 36
  },
  title: {
    fontSize: 18,
    color: COLORS.loginTitleText
  },
  leftContainer: {
    width: '100%'
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.loginTitleText
  }
})

export default ForgetPasswordWithEmail
