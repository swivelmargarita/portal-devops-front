import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import HeaderAvatar from '../assets/card-avatar.png'
import SubjectsIcon from '../assets/my-group.png'
import SubjectsIconActive from '../assets/my-group-active.png'
import TableIcon from '../assets/table.png'
import TableIconActive from '../assets/table-active.png'
import TestIcon from '../assets/test.png'
import TestIconActive from '../assets/test-active.png'
import MenuItem from '../components/MenuItem'
import Arrow from '../assets/subject-tilte-arrow.png'
import { useAppDispatch, useAppSelector } from '../components/store/store'
import { changeSubjectList } from '../components/store/features/teacherSubjectListSlice'
import { changeTeacherActiveMenu } from '../components/store/features/teacherActiveMenuSlice'
import { changeTeacherTitle } from '../components/store/features/setTeacherTitleSlice'
import MyGroups from '../components/MyGroups'
import TeacherTableFile from '../components/TeacherTableFile'
import TeacherTestMain from '../components/TeacherTestMain'
import Button from '../components/Button'
import { useAxiosFetch } from '../utils/useFetch'
import { GET_USER_DETAIL } from '../utils/urls'
import { useNavigate } from 'react-router-dom'

const TeacherMain = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const subjectListState = useAppSelector(state => state.teacherSubjectList)
  const activeMenu = useAppSelector(state => state.teacherMenuList)
  const title = useAppSelector(state => state.teacherTitle)
  const token = localStorage.getItem('token')
  const [logoutToggle, setLogoutToggle] = useState<boolean>(false)
  const navigate = useNavigate()
  const [data] = useAxiosFetch({
    method: 'GET',
    url: GET_USER_DETAIL,
    params: {},
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  return (
    <div className={classNames(css(styles.container))}>
      <div className={classNames(css(styles.header), 'd-flex flex-row justify-content-between align-items-center px-4 py-3')}>
        <div className={classNames(css(styles.logo), 'pointer d-flex align-items-center roboto-regular')}>
          SD
        </div>
        <div className={classNames('d-flex flex-row justify-content-between align-items-center')}>
          <img
            onClick={ () => { setLogoutToggle(!logoutToggle) } }
            src={HeaderAvatar} alt={'header-avatar'} className={classNames(css(styles.headerAvatar), 'pointer')}/>

          { !logoutToggle
            ? (
              <div className={'ms-3'}>
                <div className={classNames(css(styles.userName), 'inter-regular')}>
                  { data ? data.name : '' } { data ? data.last_name : '' }
                </div>

                <div className={classNames(css(styles.userEmail), 'inter-regular')}>
                  { data ? data.phone : '' }
                </div>
              </div>)
            : (
              <Button
                title={'Выход'}
                titleColor={COLORS.white}
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  navigate('/login')
                }}
              />)
          }
        </div>
      </div>

      <div className={'d-flex flex-row roboto-regular'}>
        <div className={classNames(css(styles.menu), 'p-3')}>
          <div className={classNames(css(styles.menuTitle), 'roboto-regular')}>
            {'меню'.toUpperCase()}
          </div>

          <div className={'mt-3 pointer'}>
            <MenuItem
              icon={ activeMenu.teacherMenuList.groups ? SubjectsIconActive : SubjectsIcon }
              title={'Мои группы'}
              titleColor={ activeMenu.teacherMenuList.groups ? COLORS.blue : COLORS.welcomeMainSubtitle }
              onClick={() => {
                dispatch(changeTeacherActiveMenu({
                  groups: true,
                  table: false,
                  test: false
                }))
                dispatch(changeTeacherTitle('Мои группы'))
              }}
            />

            <MenuItem
              icon={ activeMenu.teacherMenuList.table ? TableIconActive : TableIcon }
              title={'Расписание'}
              titleColor={ activeMenu.teacherMenuList.table ? COLORS.blue : COLORS.welcomeMainSubtitle }
              onClick={() => {
                dispatch(changeTeacherActiveMenu({
                  groups: false,
                  table: true,
                  test: false
                }))
                dispatch(changeTeacherTitle('Расписание'))
              }}
            />

            <MenuItem
              icon={ activeMenu.teacherMenuList.test ? TestIconActive : TestIcon }
              title={'Создать тест'}
              titleColor={ activeMenu.teacherMenuList.test ? COLORS.blue : COLORS.welcomeMainSubtitle }
              onClick={() => {
                dispatch(changeTeacherActiveMenu({
                  groups: false,
                  table: false,
                  test: true
                }))
                dispatch(changeTeacherTitle('Создать тест'))
              }}
            />
          </div>
          <br className="clear"/>
        </div>

        <div className={classNames(css(styles.rightContainer))}>
          <div className={classNames(css(styles.title), 'p-3 d-flex d-row align-items-center')}>
            { !subjectListState.teacherSubjectList.main
              ? (
                <div onClick={() => {
                  dispatch(changeSubjectList({ main: true, detail: false }))
                  dispatch(changeTeacherTitle('Мои группы'))
                }}>
                  <img src={Arrow} alt={'arrow'} className={classNames(css(styles.arrow), 'pointer')}/>
                </div>)
              : '' }
            <div>{ title }</div>
          </div>

          <div className={classNames(css(styles.main), 'px-2 py-3')}>
            { activeMenu.teacherMenuList.groups
              ? <MyGroups />
              : activeMenu.teacherMenuList.table
                ? <TeacherTableFile />
                : activeMenu.teacherMenuList.test
                  ? <TeacherTestMain />
                  : ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100vw',
    backgroundColor: COLORS.subjectBackground
  },
  header: {
    width: '100vw',
    backgroundImage: COLORS.mainLinearGradient
  },
  image: {
    width: '10%'
  },
  headerAvatar: {
    width: 40,
    height: 40
  },
  userName: {
    fontSize: 13,
    color: COLORS.white
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.white
  },
  menu: {
    width: '15.5%',
    backgroundColor: COLORS.white
  },
  menuTitle: {
    color: COLORS.welcomeMainSubtitle,
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1
  },
  title: {
    fontSize: 26,
    color: COLORS.black,
    width: '100%',
    fontWeight: 700,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.subjectTitleContainerBorder,
    backgroundColor: COLORS.loginHeroBackground
  },
  main: {

  },
  rightContainer: {
    width: '100%'
  },
  arrow: {
    width: 32,
    height: 32
  },
  logo: {
    width: '10%',
    color: COLORS.white,
    fontWeight: 900,
    fontSize: 36
  }
})
export default TeacherMain
