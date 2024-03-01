import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

export const authFetch = <T extends NitroFetchRequest>(
  request: NitroFetchRequest,
  opts?: NitroFetchOptions<T> | undefined
) => {
  const headers = useRequestHeaders(['cookie']);
  return $fetch(request, {
    ...opts,
    headers,
    onRequestError: (error: any) => {
      if (error.response?.status === 401) {
        navigateTo('/');
      }
    },
    onResponseError: (error: any) => {
      if (error.response?.status === 401) {
        navigateTo('/');
      }
    }
  });
}
