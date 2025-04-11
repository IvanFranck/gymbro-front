import type { GenericListResponce } from "~/types";
import type { Service } from "~/types/services"

export const useServices = () => {
    async function fetchServices(
        page: number,
        limit: number
    ) {
        const { data, error: fetchError } = await useApi<GenericListResponce<Service[]>>('/services', {
            params: {
                page,
                limit
            }
        });

        if (fetchError.value)
            throw fetchError.value

        if(data.value)
            return data.value
    }

    return {
        fetchServices
    }
}