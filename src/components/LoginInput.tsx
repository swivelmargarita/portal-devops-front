import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import EyeIcon from '../assets/icons8-eye-50.png'
import EyeIconDisabled from '../assets/icons8-blind-50.png'

interface LoginInputProps {
  width?: string | number
  placeholder?: string
  wrapper?: string
  wrapperWidth?: string | number
  paddingRight?: string | number
  paddingLeft?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  fontSize?: number
  style?: string
  icon?: string | null
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  iconRight?: boolean | string
  eye?: boolean
  value: any
}

const LoginInput = ({
  width = '100%',
  placeholder,
  wrapper,
  wrapperWidth,
  paddingRight = 7,
  paddingLeft = 7,
  paddingBottom = 10,
  paddingTop = 10,
  fontSize = 14,
  style = 'login-input',
  icon = null,
  handleChange,
  name,
  iconRight = false,
  eye = false,
  value

}: LoginInputProps): JSX.Element => {
  const [active, setActive] = useState(false)
  const [disabled, setDisabled] = useState<boolean>(eye)
  return (
    <div className={classNames(css(styles.container), wrapper)} style={{ position: 'relative', width: wrapperWidth }}>
      <input
        style={{ width, paddingLeft, paddingRight, paddingTop, paddingBottom, fontSize }}
        className={classNames(css(styles.input), style)}
        placeholder={ active ? '' : placeholder }
        onFocus={() => { setActive(true) }}
        onBlur={() => { setActive(false) }}
        onChange={handleChange}
        name={name}
        type={disabled ? 'password' : 'text'}
        value={value}
      />

      <label>{placeholder}</label>

      {icon !== null
        ? <img src={icon} alt={'icon'} className={classNames(css(styles.icon))}/>
        : ''}

      {iconRight
        ? <img
          onClick={() => { setDisabled(!disabled) }}
          src={ disabled ? EyeIcon : EyeIconDisabled}
          alt={'icon'}
          className={classNames(css(styles.iconRight), 'pointer')}/>
        : ''}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.loginInputBorderColor,
    borderRadius: 4,
    placeholderTextColor: COLORS.loginInputPlaceholderColor
  },
  icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: '3%',
    top: '20%'
  },
  iconRight: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: '3%',
    top: '21%'
  }
})

export default LoginInput
