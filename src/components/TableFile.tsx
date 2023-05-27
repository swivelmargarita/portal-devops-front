import React, { useRef, useEffect, useState } from 'react'
import WebViewer from '@pdftron/webviewer'
import { useAxiosFetch } from '../utils/useFetch'
import { MAIN_TIME_TABLE } from '../utils/urls'

interface Table {
  file: string
}
const TableFile = (): JSX.Element => {
  const viewerDiv = useRef<HTMLDivElement>(null)
  const [table, setTable] = useState<Table>({ file: 'file doesnt exits' })
  const token = localStorage.getItem('token')

  const [data] = useAxiosFetch({
    method: 'GET',
    url: MAIN_TIME_TABLE,
    headers: {
      Authorization: `Token ${token ?? ''}`
    }
  })

  useEffect(() => {
    if (data) {
      setTable(data)
    } else {
      setTable({ file: 'file doesnt exits' })
    }
  }, [data])
  useEffect(() => {
    if (table.file !== 'file doesnt exits') {
      void WebViewer({ path: 'lib' },
        viewerDiv.current as HTMLDivElement).then(instance => {
        instance.UI.loadDocument(table.file, {})
      })
    }
  }, [table])
  return (
    <div>
      <div ref={viewerDiv} style={{ height: '100vh', width: '100%' }}></div>
    </div>
  )
}

export default TableFile
