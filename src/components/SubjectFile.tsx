import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'
import { useAppDispatch, useAppSelector } from './store/store'
import { changeTitle } from './store/features/setTitleSlice'

const SubjectFile = (): JSX.Element => {
  const viewerDiv = useRef<HTMLDivElement>(null)
  const url = useAppSelector(state => state.changeSubjectUrl)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void WebViewer({ path: 'lib', initialDoc: url },
      viewerDiv.current as HTMLDivElement).then(instance => {})

    return () => {
      dispatch(changeTitle('Мои предметы'))
    }
  }, [])
  return (
    <div className={'d-flex flex-row justify-content-between'}>
      <div ref={viewerDiv} style={{ height: '100vh', width: '85vw' }}></div>
    </div>
  )
}

export default SubjectFile
