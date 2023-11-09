// Constants
import { FETCH_CONSTANTS } from './fetcher.constants'

// Types
import type { RequestArgs } from './fetcher.types'

export abstract class Fetcher {
  private static checkStatus = (response: Response): Response => {
    if (response.ok) return response

    const error = new Error(`${response.status} ${response.statusText}`)
    throw error
  }

  private static parseJson = <R>(response: Response) => {
    return response.json() as R
  }

  private static stringify = <C>(data: C): string => {
    if (typeof data === 'string') return data

    return JSON.stringify(data)
  }

  private static fetch = async <R>(
    url: string,
    { onError, onSuccess, ...options }: RequestArgs
  ): Promise<R> => {
    const requestOptions: RequestArgs = {
      ...FETCH_CONSTANTS.corsFetchOptions,
      ...options,
      headers: {
        ...FETCH_CONSTANTS.cacheHeaders,
        ...options?.headers
      }
    }

    try {
      const response = window
        .fetch(url, requestOptions as RequestInit)
        .then(this.checkStatus)
        .then(res => this.parseJson<R>(res))

      if (onSuccess) {
        onSuccess(response)
      }
      return response
    } catch (err) {
      if (onError) {
        onError(err)
      }

      console.error(url, err)
      throw err
    }
  }

  private static fetchWithBody = <R, B>(
    url: string,
    options: RequestArgs
  ): Promise<R> => {
    const requestOptions: RequestInit = {
      ...options,
      body: this.stringify(options.body as B),
      headers: {
        ...FETCH_CONSTANTS.acceptJsonHeaders,
        ...FETCH_CONSTANTS.contentTypeJsonHeaders,
        ...options?.headers
      }
    }

    return this.fetch<R>(url, requestOptions)
  }

  public static get = <R>(url: string, options?: RequestArgs): Promise<R> => {
    return this.fetch<R>(url, { ...options, method: 'GET' })
  }

  public static post = <R, B>(
    url: string,
    options?: RequestArgs<B>
  ): Promise<R> => {
    return this.fetchWithBody<R, B>(url, { ...options, method: 'POST' })
  }

  public static patch = <R, B>(
    url: string,
    options?: RequestArgs<B>
  ): Promise<R> => {
    return this.fetchWithBody<R, B>(url, { ...options, method: 'PATCH' })
  }

  public static put = <R, B>(
    url: string,
    options?: RequestArgs<B>
  ): Promise<R> => {
    return this.fetchWithBody<R, B>(url, { ...options, method: 'PUT' })
  }

  public static delete = <R, B>(
    url: string,
    options?: RequestArgs<B>
  ): Promise<R> => {
    return this.fetchWithBody<R, B>(url, { ...options, method: 'DELETE' })
  }
}
