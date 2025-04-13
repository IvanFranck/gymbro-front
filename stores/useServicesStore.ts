import type { GenericListResponce } from "~/types";
import type { CreateServiceDto, Service } from "~/types/services"

const {
    fetchServices: getAllServices,
    createService: addService,
} = useServices();

export const useServiceStore = defineStore('serviceStore', () => {
    const services = ref<GenericListResponce<Service[]>>();
    const loading = ref(false);
    const error = ref<string | null>(null)
    const page = ref(1);
    const limit = ref(10);

    async function fetchServices(search?: string) {
        loading.value = true
        try {
            const result = await getAllServices(page.value, limit.value, search);
            if (result) {
                services.value = result;
            }

        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la récupération des services"
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function createService(service: CreateServiceDto) {
        loading.value = true
        try {
            const result = await addService(service);
            if (result) {
                console.log("result", result)
                useToast().add({
                    title: "Service créé avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la création du service"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    return {
        fetchServices,
        createService,
        services,
        loading
    }
})