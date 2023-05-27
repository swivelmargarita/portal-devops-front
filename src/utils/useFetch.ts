import { useEffect, useState } from 'react'
import axios, { type AxiosRequestConfig } from 'axios'
import { domain } from './request'
axios.defaults.baseURL = domain
export const useAxiosFetch = (params: AxiosRequestConfig<any>): any => {
  const [data, setData] = useState<any>(null)
  const [secondData, setSecondData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.request(params)
      setData(response.data)
      setSecondData(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Axios Error with Message: ' + error.message)
      } else {
        setError(error)
      }

      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchData()
  }, [])

  return [data, secondData, error, loading, fetchData] as const
}
