import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import LoginInput from '../components/LoginInput'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import ForgetPasswordIcon from '../assets/forget-password-icon.png'
import IconLeft from '../assets/subject-tilte-arrow.png'
import { usePostRequest } from '../hooks/request'
import { RESET_PASSWORD } from '../utils/urls'

const ForgetPassword = (): JSX.Element => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState<string>('')
  const resetPasswordRequest = usePostRequest({
    url: RESET_PASSWORD
  })

  const resetPassword = async (): Promise<void> => {
    const { response } = await resetPasswordRequest.request({
      data: {
        phone
      }
    })

    console.log(response)

    if (response) navigate('/forget-password-with-email', { state: { phone } })
  }

  return (
    <div className={classNames('d-flex flex-row', css(styles.container))}>
      <div className={classNames('p-5', css(styles.leftContainer))}>
        <div style={{ position: 'absolute', top: 20 }}>
          <Button
            onClick={() => { navigate('/login') }}
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
                Сбросить пароль
              </div>

              <div className={classNames(css(styles.subtitle), 'roboto-regular')}>
                Введите свой зарегистрированный телефон номер, <br/> чтобы сбросить пароль
              </div>

              <LoginInput
                placeholder={'Телефон номер'}
                wrapper={'mt-4'}
                handleChange={(e) => { setPhone(e.target.value) }}
                value={phone}
              />

              <Button
                title={'Следующий'.toUpperCase()}
                width={'50%'}
                wrapper={'mt-4'}
                background={COLORS.welcomeCardButton}
                fontSize={13}
                titleColor={COLORS.loginButtonTextColor}
                onClick={() => { void resetPassword() }}
                icon={ForgetPasswordIcon}
                iconWidth={24}
                iconHeight={24}
              />

              <Button
                title={'войти'.toUpperCase()}
                width={'100%'}
                wrapper={'mt-4'}
                background={COLORS.blue}
                fontSize={13}
                titleColor={COLORS.loginButtonTextColor}
                onClick={ () => { navigate('/login') } }
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

export default ForgetPassword
