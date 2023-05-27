import React, { type SetStateAction, useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import FileButton from './FileButton'
import { COLORS } from '../utils/colors'
import ChoseIcon from '../assets/chose.png'
import DownloadIcon from '../assets/download-blue-icon.png'
import InputButton from './InputButton'
import LoginInput from './LoginInput'
import axios from 'axios'
import { domain } from '../utils/request'
import Button from './Button'

interface ModalProps {
  chose: boolean
  setChose: (chose: boolean) => void
  mark: string
  setMark: React.Dispatch<SetStateAction<string>>
  date: string
  setDate: React.Dispatch<SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<SetStateAction<string>>
  id: number
  file: string
  setFile: React.Dispatch<SetStateAction<string>>
}
const ModalDialog = ({
  chose,
  setChose,
  mark,
  setMark,
  date,
  setDate,
  title,
  setTitle,
  file,
  setFile,
  id
}: ModalProps): JSX.Element => {
  const [isShow, invokeModal] = React.useState(false)
  const [fileName, setFileName] = useState<any>()
  const token = localStorage.getItem('token')

  const createTask = async (): Promise<void> => {
    const formData = new FormData()
    formData.append('group', id.toString())
    formData.append('file', fileName, file)
    formData.append('deadline', date)
    formData.append('title', title)
    formData.append('max_mark', mark)
    const url = `${domain}main/task/`
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
    // console.log(response)
  }

  const initModal = (): void => {
    invokeModal(!isShow)
  }

  useEffect(() => {
    setFile(fileName?.name)
  }, [fileName])
  return (
    <>
      <Button
        title={'Загрузить файл'}
        onClick={initModal}
        background={COLORS.blue}
        titleColor={COLORS.white}
      />
      <Modal show={isShow} size="lg">
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Добавтьте данные</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginInput
            placeholder={'Название задания'}
            value={title}
            name={title} handleChange={(e) => { setTitle(e.target.value) }} />

          <FileButton
            title={chose ? '1-задача.docx' : 'Загрузить файл'}
            fontSize={14}
            titleColor={chose ? COLORS.blue : COLORS.black}
            background={COLORS.white}
            iconLeft={chose ? DownloadIcon : ChoseIcon}
            iconHeight={20}
            iconWidth={20}
            iconWrapper={'me-2'}
            roboto={true}
            borderWidth={1}
            borderStyle={'solid'}
            borderColor={chose ? COLORS.blue : COLORS.choseButton}
            onClick={ () => { void setChose } }
            chose={chose}
            wrapper={'mt-5'}
            value={fileName}
            handleChange={e => {
              if (e.target?.files?.length) {
                setFileName(e.target.files[0])
              }
            }}
          />

          <InputButton
            wrapper={'mt-5'}
            title={'11-12-2023'}
            fontSize={14}
            titleColor={COLORS.black}
            background={COLORS.white}
            roboto={true}
            borderWidth={1}
            borderStyle={'solid'}
            borderColor={COLORS.blue}
            onClick={() => {}}
            borderBottomRightRadius={4}
            borderTopRightRadius={4}
            paddingX={0}
            type={'datetime-local'}
            width={'100%'}
            handleChange={(e) => { setDate(e.target.value) }}
          />

          <LoginInput
            wrapper={'mt-5'}
            placeholder={'Макс балл'}
            value={mark}
            name={mark} handleChange={(e) => { setMark(e.target.value) }} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            title={'Закрыть'}
            onClick={initModal}
            background={COLORS.blue}
            titleColor={COLORS.white}
          />

          <Button
            title={'Сохранить'}
            onClick={() => {
              initModal()
              void createTask()
            }}
            background={COLORS.welcomeCardButton}
            titleColor={COLORS.white}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalDialog
