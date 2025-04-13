import type { GenericListResponce } from "~/types";
import type { Service } from "~/types/services"

export const useServices = () => {
    async function fetchServices(
        page: number,
        limit: number,
        search?: string,
    ) {
        const { data, error: fetchError } = await useApi<GenericListResponce<Service[]>>('/services', {
            params: {
                search,
                page,
                limit
            }
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    return {
        fetchServices
    }
}