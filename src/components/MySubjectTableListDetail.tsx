import React from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import DownloadIcon from '../assets/download-white-icon.png'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeSubjectList } from './store/features/subjectListSlice'
import { changeTitle } from './store/features/setTitleSlice'
import { changeUrl } from './store/features/setSubjectUrlSlice'

interface Files {
  file_path: string
}
interface ActivityListDetailProps {
  theme: string
  date: string
  files?: Files[]
  number: number
}
const MyActivityListDetail = ({ theme, date, files, number }: ActivityListDetailProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const subjectList = useAppSelector(state => state.subjectList)

  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        <div className={'d-flex flex-row'}>
          <div className={classNames(css(styles.name))}>{number}</div>

          <div className={'d-flex flex-column justify-content-between'}>
            <div className={classNames('roboto-regular ps-2', css(styles.downloadText))}>
              { theme }
            </div>

            <div className={classNames('d-flex flex-row align-items-center')}>
              {files?.length
                ? files.map((item, index: number) => (
                  <Button
                    key={index}
                    title={theme}
                    fontSize={12}
                    titleColor={COLORS.white}
                    background={COLORS.blue}
                    iconLeft={DownloadIcon}
                    iconHeight={20}
                    iconWidth={20}
                    iconWrapper={'me-2'}
                    roboto={true}
                    borderWidth={1}
                    borderStyle={'solid'}
                    borderColor={COLORS.blue}
                    width={'100%'}
                    wrapper={'ms-2 mt-2'}
                    onClick={() => {
                      dispatch(changeUrl(item?.file_path))
                      dispatch(changeSubjectList({ ...subjectList.subjectList, detail: true, table: false }))
                      dispatch(changeTitle(theme))
                    }}
                  />
                ))
                : ''}
            </div>

          </div>
        </div>
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        {date}
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.welcomeCardBorderColor
  },
  name: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.black
  },
  downloadText: {
    fontSize: 14,
    fontWeight: 500,
    color: COLORS.black
  },
  link: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.blue,
    textDecorationLine: 'underline'
  }
})

export default MyActivityListDetail
