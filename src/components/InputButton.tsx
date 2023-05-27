import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'

interface ButtonProps {
  title?: string
  background?: string
  width?: number | string
  height?: number | string
  wrapper?: string
  titleColor?: string
  paddingX?: number
  paddingY?: number
  fontSize?: number
  borderTopLeftRadius?: number
  borderBottomLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomRightRadius?: number
  onClick?: () => any
  roboto?: boolean
  icon?: string
  iconWidth?: string | number
  iconHeight?: string | number
  iconWrapper?: string
  iconLeft?: string
  borderColor?: string
  borderWidth?: number
  borderStyle?: string
  type?: string
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputButton = ({
  title,
  background,
  width = '100%',
  height = '100%',
  titleColor,
  paddingX = 2,
  paddingY = 2,
  fontSize = 12,
  borderTopLeftRadius = 4,
  borderBottomLeftRadius = 4,
  borderTopRightRadius = 4,
  borderBottomRightRadius = 4,
  onClick = () => {},
  wrapper = '',
  borderColor,
  borderStyle,
  borderWidth,
  type,
  handleChange
}: ButtonProps): JSX.Element => {
  return (
    <input
      onClick={ onClick }
      style={{
        background,
        width,
        height,
        borderTopLeftRadius,
        borderBottomLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderColor,
        borderStyle,
        borderWidth,
        color: titleColor,
        fontSize
      }}
      className={classNames(css(styles.container),
        `pointer d-flex flex-row justify-content-center align-items-center 
        px-${paddingX} py-${paddingY} ${wrapper} text-center`)}
      type={type}
      placeholder={title}
      onChange={handleChange}
      max={'10'}
    >
    </input>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 11
  },
  icon: {

  }
})

export default InputButton
