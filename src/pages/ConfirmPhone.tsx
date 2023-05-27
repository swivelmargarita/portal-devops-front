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
import { CONFIRM_REGISTER } from '../utils/urls'
import { changeUserData } from '../components/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '../components/store/store'
import { signin } from '../utils/auth'

const ConfirmPhone = (): JSX.Element => {
  const navigate = useNavigate()
  const confirmRequest = usePostRequest({ url: CONFIRM_REGISTER })
  const [code, setCode] = useState<string>('')
  const userData = useAppSelector(state => state.userData)
  const dispatch = useAppDispatch()
  const confirmRegister = async (): Promise<void> => {
    const { success, error, response } = await confirmRequest.request({
      data: {
        code,
        phone: userData.user.phone,
        password: code,
        name: userData.user.name,
        lastName: userData.user.surname
      }
    })
    if (success) {
      signin({ user: response?.role, token: response?.token })
      navigate('/final-register')
      dispatch(changeUserData({
        name: '',
        surname: '',
        phone: ''
      }))
    } else {
      alert(error.message)
    }
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
                Подтверждение телефон номера
              </div>

              <div className={classNames(css(styles.subtitle), 'roboto-regular')}>
                Введите код который был выслан на ваш номер
              </div>

              <LoginInput
                placeholder={'Код'}
                wrapper={'mt-4'}
                handleChange={(e) => { setCode(e.target.value) }}
                name={'code'}
                value={code}
              />

              <Button
                title={'Следующий'.toUpperCase()}
                width={'50%'}
                wrapper={'mt-4'}
                background={COLORS.welcomeCardButton}
                fontSize={13}
                titleColor={COLORS.loginButtonTextColor}
                onClick={() => {
                  if (code !== '') {
                    void confirmRegister()
                  } else {
                    alert('Запольните поле')
                  }
                }}
                icon={ForgetPasswordIcon}
                iconWidth={24}
                iconHeight={24}
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

export default ConfirmPhone
