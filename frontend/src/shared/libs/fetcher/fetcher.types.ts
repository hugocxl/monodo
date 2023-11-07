export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type RequestArgs<B = unknown> = Omit<RequestInit, 'body'> & {
  onSuccess?: <R>(response: R) => unknown
  onError?: <E>(error: E) => unknown
  body?: B
}
