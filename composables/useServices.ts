import type { GenericListResponce } from "~/types";
import type { CreateServiceDto, Service, UpdateServiceDto } from "~/types/services"

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
        const payload = {
            ...service,
            capaciteMax: service.capaciteMax === 0 ? null : service.capaciteMax,
            dureeStandard: service.dureeStandard === 0 ? null : service.dureeStandard,
        }
        const { data, error: fetchError } = await useApi<Service>('/services', {
            method: "POST",
            body: payload
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    async function updateService(
        service: UpdateServiceDto,
        serviceId: number
    ) {
        const payload = {
            ...service,
            capaciteMax: service.capaciteMax === 0 ? null : service.capaciteMax,
            dureeStandard: service.dureeStandard === 0 ? null : service.dureeStandard,
        }

        const { data, error: fetchError } = await useApi<Service>(`/services/${serviceId}`, {
            method: "PATCH",
            body: payload
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    async function toggleServiceStatus(
        serviceId: number,
        status: boolean
    ) {
        let url = `/services/${serviceId}/activate`
        if (!status) {
            url = `/services/${serviceId}/deactivate`
        }
        const { data, error: fetchError } = await useApi<GenericListResponce<Service[]>>(url, {
            method: "PATCH",
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    async function deleteService(id: number) {
        const { error: fetchError } = await useApi<Service>(`/services/${id}`, {
            method: "DELETE",
        });

        if (fetchError.value)
            throw fetchError.value

    }

    return {
        fetchServices,
        createService,
        updateService,
        deleteService,
        toggleServiceStatus
    }
}