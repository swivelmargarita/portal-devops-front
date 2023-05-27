import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'

interface MenuItemProps {
  icon: string
  title: string
  titleColor: string
  onClick: () => void
}

const MenuItem = ({ icon, title, onClick, titleColor }: MenuItemProps): JSX.Element => {
  return (
    <div
      onClick={ onClick }
      className={classNames(css(styles.container), 'd-flex flex-row align-items-center mt-4')}>
      <img src={icon} alt={title} className={classNames(css(styles.icon))}/>

      <div className={classNames(css(styles.title), 'roboto-regular ps-2')} style={{ color: titleColor }}>
        { title }
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 25,
    height: 25
  },
  title: {
    fontSize: 15,
    fontWeight: 400
  }
})

export default MenuItem
