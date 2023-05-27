import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { COLORS } from '../utils/colors'
import classNames from 'classnames'
import LoginInput from '../components/LoginInput'
import Button from '../components/Button'
import HeroImage from '../assets/register-hero.png'
import { useNavigate } from 'react-router-dom'
import IconLeft from '../assets/subject-tilte-arrow.png'
import { usePostRequest } from '../hooks/request'
import { REGISTER } from '../utils/urls'
import { useAppDispatch } from '../components/store/store'
import { changeUserData } from '../components/store/features/userSlice'
const Register = (): JSX.Element => {
  const navigate = useNavigate()
  const registerRequest = usePostRequest({ url: REGISTER })
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const dispatch = useAppDispatch()

  const register = async (): Promise<void> => {
    const { success, error } = await registerRequest.request({ data: { phone } })

    if (success) {
      dispatch(changeUserData({ name, surname, phone }))
      navigate('/confirm-phone')
    } else {
      console.log(error)
    }
  }

  return (
    <div className={classNames('d-flex flex-row justify-content-between', css(styles.container))}>
      <div className={classNames('p-5', css(styles.leftContainer))}>
        <div style={{ position: 'absolute', top: 20 }}>
          <Button
            onClick={() => { navigate('/') }}
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
              Регистрация
            </div>

            <div className={classNames('d-flex flex-row align-items-center justify-content-between')}>
              <LoginInput
                placeholder={'Имя'}
                wrapper={'mt-4'}
                wrapperWidth={'90%'}
                name={name}
                handleChange={(e) => { setName(e.target?.value) }}
                value={name}
              />

              <div style={{ width: '5%' }}></div>

              <LoginInput
                placeholder={'Фамилия'}
                wrapper={'mt-4'}
                wrapperWidth={'90%'}
                name={surname}
                handleChange={(e) => { setSurname(e.target?.value) }}
                value={surname}
              />
            </div>

            <LoginInput
              placeholder={'Телефон номер'}
              wrapper={'mt-4'}
              name={phone}
              handleChange={(e) => { setPhone(e.target?.value) }}
              value={phone}
            />

            <Button
              title={'Зарегистрироваться'.toUpperCase()}
              width={'100%'}
              wrapper={'mt-4'}
              background={COLORS.welcomeCardButton}
              fontSize={15}
              titleColor={COLORS.loginButtonTextColor}
              onClick={() => {
                if (name !== '' && surname !== '' && phone !== '') {
                  void register().then(r => { console.log(r) })
                } else {
                  alert('Запольните все поля')
                }
              }}
            />

            <Button
              title={'войти'.toUpperCase()}
              width={'100%'}
              wrapper={'mt-4'}
              background={COLORS.blue}
              fontSize={15}
              titleColor={COLORS.loginButtonTextColor}
              onClick={() => { navigate('/login') }}
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

export default Register
