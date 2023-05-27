import { useCallback, useEffect, useRef, useState } from 'react'
import uniqBy from 'lodash/uniqBy'
import { auth } from '../utils/auth'
import baseAxios from '../utils/request'

export function useRequest (options = {}) {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  async function request (overrideOptions = {}, sync = false) {
    setLoading(true)

    try {
      const { data } = await baseAxios({ ...auth(), ...options, ...overrideOptions })
      if (!sync) setResponse(data)
      return { response: data, success: true }
    } catch (e) {
      setError(e.response)

      return { error: e.response, success: false }
    } finally {
      if (!sync) setLoading(false)
    }
  }

  return { loading, request, error, response, setResponse, setError, setLoading }
}

export function usePostRequest (options = {}) {
  return useRequest({ method: 'POST', ...options })
}

export function usePatchRequest (options = {}) {
  return useRequest({ method: 'PATCH', ...options })
}

export function usePutRequest (options = {}) {
  return useRequest({ method: 'PUT', ...options })
}

export function useGetRequest (options = {}) {
  return useRequest({ method: 'GET', ...options })
}

export function useDeleteRequest (options = {}) {
  return useRequest({ method: 'DELETE', ...options })
}

export function useLoad (options, dependencies = []) {
  const request = useRequest({ method: 'GET', ...options })

  useEffect(() => {
    request.request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return request
}

export function useInfiniteScroll (options, dependencies = []) {
  const [page, setPage] = useState(1)
  const items = useGetRequest({ ...options, params: { ...options.params, page } })
  const [hasMore, setHasMore] = useState(false)
  const observer = useRef()

  async function loadItems () {
    const { response } = await items.request()
    const oldItems = items.response ? items.response.results : []
    const newItems = response ? response.results : []

    if (!response) return

    items.setResponse({ count: response ? response.count : 0, results: uniqBy([...oldItems, ...newItems], 'id') })
    setHasMore(oldItems.length + newItems.length !== response.count)
  }

  useEffect(() => {
    loadItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...dependencies])

  function reset () {
    items.setResponse({ count: 0, results: [] })
    setPage(1)
  }

  async function reload () {
    reset()
    await items.request({ params: { ...options.params, page: 1 } })
  }

  const ref = useCallback((node) => {
    if (items.loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(page + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore, items.loading, page])

  return {
    ref, ...items, hasMore, reload, reset
  }
}
