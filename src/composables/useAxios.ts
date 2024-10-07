import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import { ref } from 'vue'

import { toast } from 'vue3-toastify'

/*
 *    Note:
 *    - Error handling can be done here
 *    - Creating a singleton instance of axios
 *    - Adding request and response interceptors
 *    - Although interceptors are not used/needed in this example
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
  })

  // Adding a request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      try {
        return config
      } catch (error) {
        return Promise.reject(error)
      }
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  // Adding a response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  return instance
}

let axiosInstance: AxiosInstance | null = null

const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance()
  }
  return axiosInstance
}

const useAxios = () => {
  const loading = ref(false)
  const error = ref<AxiosError | null>(null)

  const request = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T> | undefined> => {
    loading.value = true
    error.value = null
    try {
      const response = await getAxiosInstance().request<T>(config)
      return response
    } catch (err) {
      error.value = err as AxiosError
      handleError(config)
    } finally {
      loading.value = false
    }
  }

  const get = async <T>(
    url: string,
    params?: Record<string, any>
  ): Promise<AxiosResponse<T> | undefined> => {
    return request<T>({ url, method: 'GET', params })
  }

  const post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> => {
    return request<T>({ ...config, url, method: 'POST', data })
  }

  const put = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> => {
    return request<T>({ ...config, url, method: 'PUT', data })
  }

  const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T> | undefined> => {
    return request<T>({ ...config, url, method: 'DELETE' })
  }

  /* Note:
   * This is a simple error handling function
   * In a real world app, we should log the error to some other service ex. Sentry
   * Error message can be customized based on the error status code
   * Error messages must be internationalized using i18n
   */
  const handleError = (config: AxiosRequestConfig) => {
    const errorByMethod = {
      GET: 'Data fetching failed',
      POST: 'Data creation failed',
      PUT: 'Data update failed',
      DELETE: 'Data deletion failed'
    }
    const method = config.method?.toUpperCase() as keyof typeof errorByMethod
    toast.error(`${errorByMethod[method]}`, {
      autoClose: 3000
    })
  }

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    del
  }
}

export default useAxios
