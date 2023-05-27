import React, { useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import classNames from 'classnames'
import { COLORS } from '../utils/colors'
import Button from './Button'
import DownloadIcon from '../assets/download-blue-icon.png'
import useDownloader from 'react-use-downloader'
import ChoseIcon from '../assets/chose.png'
import FileButton from './FileButton'
import { domain } from '../utils/request'
import axios from 'axios'

interface MyActivityProps {
  answerFile: string
  deadline: string
  filePath: string
  id: number
  mark?: number
  maxMark: number
  teacher: string
  title: string
}
const MyActivityListDetail = ({
  teacher,
  deadline,
  maxMark,
  mark,
  filePath,
  answerFile,
  id,
  title
}: MyActivityProps): JSX.Element => {
  const { download } = useDownloader()
  const [file, setFile] = useState<any>()
  const [fileName, setFileName] = useState<any>()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (file?.name) {
      setFileName(file.name)
      setTimeout(() => {
        void answerTask()
      }, 500)
    }
  }, [file])
  const answerTask = async (): Promise<void> => {
    const formData = new FormData()
    formData.append('file', file, fileName)
    formData.append('task_id', id.toString())
    const url = `${domain}main/answer-task/`
    axios.post(url, formData, {
      headers: {
        Authorization: `Token ${token ?? ''}`,
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => { console.log(err) })
  }

  return (
    <div className={classNames(css(styles.container),
      'd-flex flex-row justify-content-between align-items-center px-3 py-4')}>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        { teacher }
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular')}>
        <div>{title}</div>
      </div>

      <div className={'d-flex flex-column justify-content-between'}>
        { answerFile
          ? (
            <Button
              title={`${answerFile.slice(
                answerFile.lastIndexOf('/') + 1, (answerFile.lastIndexOf('/') + 15))
              }${answerFile.slice(answerFile.lastIndexOf('.'))}`}
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
              onClick={async (): Promise<any> => await download(answerFile, answerFile)}
            />)
          : (<FileButton
            title={'Загрузить файл'}
            fontSize={14}
            titleColor={COLORS.black}
            background={COLORS.white}
            iconLeft={ChoseIcon}
            iconHeight={20}
            iconWidth={20}
            iconWrapper={'me-2'}
            roboto={true}
            borderWidth={1}
            borderStyle={'solid'}
            borderColor={COLORS.choseButton}
            chose={false}
            value={file}
            handleChange={e => {
              if (e.target?.files?.length) {
                setFile(e.target.files[0])
              }
            }}
          />)}
      </div>

      <div className={classNames(css(styles.name), 'roboto-regular d-flex flex-column')}>
        <div>{deadline.slice(0, 11)}</div>
        <div>{deadline.slice(11)}</div>
      </div>

      <div className={classNames('d-flex flex-row align-items-center')}>
        <Button
          title={mark ?? '0'}
          fontSize={14}
          titleColor={COLORS.blue}
          background={COLORS.white}
          roboto={true}
          borderWidth={1}
          borderStyle={'solid'}
          borderColor={COLORS.blue}
          onClick={() => {}}
          borderBottomRightRadius={0}
          borderTopRightRadius={0}
          paddingX={3}
        />

        <Button
          title={maxMark ?? '0'}
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
        />
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <div onClick={ async (): Promise<any> => await download(filePath, filePath) }
        className={classNames(css(styles.link), 'roboto-regular pointer')}>
        Скачать файл
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

export default MyActivityListDetail
