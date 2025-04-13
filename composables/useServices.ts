import type { GenericListResponce } from "~/types";
import type { CreateServiceDto, Service } from "~/types/services"

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

    async function createService(
        service: CreateServiceDto
    ) {
        const { data, error: fetchError } = await useApi<GenericListResponce<Service[]>>('/services', {
            method: "POST",
            body: service
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    return {
        fetchServices,
        createService
    }
}