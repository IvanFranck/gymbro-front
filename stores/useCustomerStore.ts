import type { CustomerDto, CustomerList } from "~/types/customers"
import { useCustomer } from "~/composables/useCustomer"

const {
    handleFetchCustomers,
    handleCreateCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer
} = useCustomer();  

export const useCustomerStore = defineStore('customerStore', () => {
    const customers = ref<CustomerList>()
    const loading = ref(false)
    const error = ref<string | null>(null)
    const page = ref(1)
    const limit = ref(10)

    async function fetchCustomers(search?: string) {
        loading.value = true
        try {
            const result = await handleFetchCustomers(page.value, limit.value, search);
            if (result) {
                customers.value = result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la récupération des clients. Veillez actualiser la page" 
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        } finally {
            loading.value = false
        }
    }

    async function createCustomer(customer: CustomerDto) {
        loading.value = true
        try {
            const result = await handleCreateCustomer(customer);
            if (result) {
                customers.value = result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la création du client. Veillez réessayer"
            }
        } finally {
            loading.value = false
        }   
    }

    async function updateCustomer(customer: CustomerDto, id: number) {
        loading.value = true
        try {
            const result = await handleUpdateCustomer(customer, id);
            if (result) {
                customers.value = result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la mise à jour du client. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        } finally {
            loading.value = false
        }
    }

    async function deleteCustomer(id: number) {
        loading.value = true    
        try {
            await handleDeleteCustomer(id);
            useToast().add({
                title: "Client supprimé",
                color: "success"
            });
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la suppression du client. Veillez réessayer"
            }
        } finally {
            loading.value = false
        }   
    }

    return {
        customers,
        loading,
        error,  
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer
    }
})