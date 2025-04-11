import type { UseFetchOptions } from "#app";

export function useApi<T>(
    url: string,
    options: UseFetchOptions<T> = {}
) {
    const config = useRuntimeConfig();

    // default configs
    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.apiBaseUrl,

        onRequestError(error){
            console.log('request error:', error)
        }
    }

    // merge default and given conf
    const mergedConfig = {
        ...defaults,
        ...options
    }

    return useFetch(url, mergedConfig);
}