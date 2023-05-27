import React, { useState } from 'react'
import classNames from 'classnames'
import { css, StyleSheet } from 'aphrodite'
import LoginInput from './LoginInput'
import SearchIcon from '../assets/search-input-icon.png'
import { COLORS } from '../utils/colors'

const StudentMainDetailHeader = (): JSX.Element => {
  const [search, setSearch] = useState<string>('')
  return (
    <div className={'d-flex flex-row justify-content-between align-items-center '}>
      <div className={'d-flex flex-row justify-content-between align-items-center '}>
        <div className={classNames(css(styles.headerTitle), 'roboto-regular')}>
          Показать
        </div>

        <select name="numbers" id="numbers" className={classNames(css(styles.select), 'roboto-regular ms-2')}>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
        </select>

        <div className={classNames(css(styles.headerTitle), 'roboto-regular ms-2')}>
          записей
        </div>
      </div>

      <div className={classNames(css(styles.input))}>
        <LoginInput
          placeholder={'Поиск...'}
          paddingLeft={'15%'}
          paddingTop={4}
          paddingBottom={6}
          fontSize={14}
          style={'search-input'}
          icon={SearchIcon}
          value={search}
          handleChange={(e) => { setSearch(e.target.value) } }
        />
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 12,
    fontWeight: 400,
    color: COLORS.welcomeMainSubtitle
  },
  select: {
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.welcomePreFooterText,
    fontSize: 12,
    padding: 5,
    color: COLORS.welcomeMainSubtitle,
    fontWeight: 400
  },
  input: {
    width: '20%'
  }
})

export default StudentMainDetailHeader
