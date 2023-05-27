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
  chose: boolean
  value: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileButton = ({
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
  roboto = false,
  icon,
  iconHeight = 22,
  iconWidth = 18,
  iconWrapper,
  wrapper = '',
  iconLeft,
  borderColor,
  borderStyle,
  borderWidth,
  chose,
  value,
  handleChange
}: ButtonProps): JSX.Element => {
  return (
    <div
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
        borderWidth
      }}
      className={classNames(css(styles.container),
        `pointer d-flex flex-row justify-content-center align-items-center px-${paddingX} py-${paddingY} ${wrapper}`)}>

      { (iconLeft != null)
        ? (<img
          src={iconLeft}
          alt={'icon'}
          className={classNames(css(styles.icon), iconWrapper)}
          style={{ width: iconWidth, height: iconHeight }}
        />)
        : ''}

      { chose
        ? (
          <div style={{ color: titleColor, fontSize }} className={roboto ? 'roboto-regular' : 'inter-semi-bold'}>
            {title}
          </div>)
        : (
          <input
            style={{ color: titleColor, fontSize }}
            type={'file'}
            className={roboto ? 'roboto-regular' : 'inter-semi-bold'}
            placeholder={title}
            onChange={handleChange}
          />)}

      { (icon != null)
        ? (<img
          src={icon}
          alt={'icon'}
          className={classNames(css(styles.icon), iconWrapper)}
          style={{ width: iconWidth, height: iconHeight }}
        />)
        : ''}
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    // display: 'block'
  },
  icon: {

  }
})

export default FileButton
