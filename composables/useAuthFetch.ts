import type { FetchError, FetchOptions } from 'ofetch'
import type { AsyncData, UseFetchOptions } from "#app"
import type { AvailableRouterMethod, NitroFetchRequest, TypedInternalResponse } from "nitropack"

export type PickFrom<T, K extends Array<string>> = T extends Array<any> ? T : T extends Record<string, any> ? keyof T extends K[number] ? T : K[number] extends never ? T : Pick<T, K[number]> : T;
export type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>;
export type FetchResult<ReqT extends NitroFetchRequest, M extends AvailableRouterMethod<ReqT>> = TypedInternalResponse<ReqT, unknown, Lowercase<M>>

export const useAuthFetch = <
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void ? 'get' extends AvailableRouterMethod<ReqT> ? 'get' : AvailableRouterMethod<ReqT> : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = null,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | null> => {
  const headers = useRequestHeaders(['cookie'])

  return useFetch(request, {
    onRequestError: (error) => {
      if (error.response?.status === 401) {
        navigateTo('/')
      }
    },
    onResponseError: (error) => {
      if (error.response?.status === 401) {
        navigateTo('/')
      }
    },
    ...opts,
    headers,
  })
}
