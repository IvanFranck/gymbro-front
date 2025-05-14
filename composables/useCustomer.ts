import { CUSTOMERS } from "~/constants/api-routes"
import type { GenericListResponce } from "~/types";
import type { CustomerDto, CustomerList } from "~/types/customers"

export const useCustomer = () => {
    async function handleFetchCustomers(
        page: number,
        limit: number,
        search?: string,
    ) {
        const { data, error: fetchError } = await useApi<GenericListResponce<CustomerList[]>>(CUSTOMERS, {
            params: {
                search,
                page,
                limit
            }
        });

        if (fetchError.value)
            throw fetchError.value

        return data.value
    }

    async function handleCreateCustomer(
        payload: CustomerDto
    ) {
        const { data, error: fetchError } = await useApi<CustomerList>(CUSTOMERS, {
            method: "POST",
            body: payload
        }); 

        if (fetchError.value)
            throw fetchError.value

        return data.value
    }

    async function handleUpdateCustomer(
        payload: CustomerDto,
        id: number
    ) {
        const { data, error: fetchError } = await useApi<CustomerList>(`${CUSTOMERS}/${id}`, {
            method: "PATCH",
            body: payload
        });

        if (fetchError.value)
            throw fetchError.value

        return data.value
    }

    async function handleDeleteCustomer(id: number) {
        const { data, error: fetchError } = await useApi<CustomerList>(`${CUSTOMERS}/${id}`, {
            method: "DELETE",
        });
    }
    
    return {
        handleFetchCustomers,
        handleCreateCustomer,
        handleUpdateCustomer,
        handleDeleteCustomer
    }
}   