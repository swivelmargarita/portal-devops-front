import React, { useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import InputButton from './InputButton'
import useDownloader from 'react-use-downloader'
import DownloadIcon from '../assets/download-blue-icon.png'
import { usePatchRequest } from '../hooks/request'
import { PATCH_MARK } from '../utils/urls'
interface MyGroupDetailListProps {
  answers: AnswersProps[]
  deadline: string
  filePath: string
  maxMark: string | number
  title: string
  number: number
}

interface AnswersProps {
  created_ad: string
  file_path: string
  id: number
  user: string
  mark?: number | null
}
const MyGroupListDetail = ({ answers, maxMark, filePath, title, deadline, number }: MyGroupDetailListProps): JSX.Element => {
  const { download } = useDownloader()
  const [studentDetail, setStudentDetail] = useState<boolean>(false)
  const [maxScore, setMaxScore] = useState<string>('')
  const [answerId, setAnswerId] = useState<number>(0)
  const setMarkRequest = usePatchRequest(
    { url: PATCH_MARK.replace('id', answerId.toString()) }
  )

  const setMark = async (): Promise<void> => {
    const { response } = await setMarkRequest.request({
      data: {
        mark: maxScore
      }
    })

    console.log(response)
  }
  return (
    <>
      <div
        onClick={() => { setStudentDetail(!studentDetail) }}
        className={classNames(css(styles.container),
          'd-flex flex-row justify-content-between align-items-center px-3 py-4 pointer')}>

        <div className={'d-flex flex-row'}>
          <div className={classNames(css(styles.name), 'roboto-regular')}>
            { number }
          </div>

          <div className={classNames(css(styles.name), 'roboto-regular ms-5')}>
            { title }
          </div>
        </div>

        <div className={classNames(css(styles.name), 'roboto-regular')}>
          { deadline }
        </div>

        <div className={classNames('d-flex flex-row align-items-center')}>
          <Button
            title={maxMark ? maxMark.toString() : ''}
            fontSize={14}
            titleColor={COLORS.white}
            background={COLORS.blue}
            roboto={true}
            borderWidth={1}
            borderStyle={'solid'}
            borderColor={COLORS.blue}
            onClick={() => {}}
            borderTopLeftRadius={3}
            borderBottomLeftRadius={3}
            paddingX={3}
          />
        </div>

        <div className={classNames('d-flex flex-row align-items-center')}>
          <Button
            title={`Загрузить файл${filePath.slice(filePath.lastIndexOf('.'))}`}
            fontSize={14}
            titleColor={COLORS.blue}
            background={COLORS.white}
            iconLeft={DownloadIcon}
            iconHeight={20}
            iconWidth={20}
            iconWrapper={'me-2'}
            roboto={true}
            borderWidth={1}
            borderStyle={'solid'}
            borderColor={COLORS.blue}
            onClick={async (): Promise<any> => await download(filePath, filePath)}
          />
        </div>
      </div>
      { studentDetail && answers?.length
        ? answers.map((item: AnswersProps, index: number) => (
          <div
            key={index}
            className={classNames(css(styles.container),
              'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>

            <div className={'d-flex flex-row'}>
              <div className={classNames(css(styles.name), 'roboto-regular')}>
                { index + 1}
              </div>

              <div className={classNames(css(styles.name), 'roboto-regular ms-5')}>
                { item.user }
              </div>
            </div>

            <div className={classNames(css(styles.name), 'roboto-regular')}>
              {item.created_ad}
            </div>

            <div className={classNames('d-flex flex-row align-items-center ms-2')} style={{ width: '7%' }}>
              <InputButton
                title={item.mark ? item.mark.toString() : '0'}
                fontSize={14}
                titleColor={COLORS.black}
                background={COLORS.white}
                roboto={true}
                borderWidth={1}
                borderStyle={'solid'}
                borderColor={COLORS.blue}
                onClick={() => {}}
                borderBottomRightRadius={0}
                borderTopRightRadius={0}
                paddingX={0}
                type={'number'}
                width={'50%'}
                handleChange={(e) => {
                  if (!item.mark) {
                    setAnswerId(item.id)
                    setMaxScore(e.target.value)
                  } else {
                    alert('Задача была оценана ранее')
                  }
                }}
              />

              <Button
                title={'10'}
                fontSize={14}
                titleColor={COLORS.white}
                background={COLORS.blue}
                roboto={true}
                borderWidth={1}
                borderStyle={'solid'}
                borderColor={COLORS.blue}
                onClick={() => {}}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                paddingX={3}
                width={'50%'}
              />
            </div>

            <div className={classNames(css(styles.name), 'roboto-regular')}>
              <Button
                title={`Загрузить файл${item.file_path.slice(item.file_path.lastIndexOf('.'))}`}
                fontSize={14}
                titleColor={COLORS.blue}
                background={COLORS.white}
                iconLeft={DownloadIcon}
                iconHeight={20}
                iconWidth={20}
                iconWrapper={'me-2'}
                roboto={true}
                borderWidth={1}
                borderStyle={'solid'}
                borderColor={COLORS.blue}
                onClick={async (): Promise<any> => await download(item.file_path, item.file_path)}
              />
            </div>

            <Button
              title={'Cохранить'}
              width={'10%'}
              wrapper={'mt-4'}
              background={COLORS.welcomeCardButton}
              fontSize={15}
              titleColor={COLORS.loginButtonTextColor}
              onClick={() => { void setMark() }} />
          </div>))
        : ''}
    </>
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
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.black
  },
  link: {
    fontSize: 14,
    fontWeight: 400,
    color: COLORS.blue,
    textDecorationLine: 'underline'
  }
})

export default MyGroupListDetail
