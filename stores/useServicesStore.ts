import type { GenericListResponce, GenericListResponceMetadata } from "~/types";
import type {Service} from "~/types/services"

const { fetchServices: getAllServices } = useServices();

export const useServiceStore = defineStore('serviceStore', () => {
    const services = ref<GenericListResponce<Service[]>>();
    const loading = ref(false);
    const error = ref<string | null>(null)
    const page = ref(1);
    const limit =  ref(10);
    
    async function fetchServices() {
        loading.value = true
        try {
            const result = await getAllServices(page.value, limit.value);
            if (result) {
                services.value = result;
            }

        } catch (err) {
            if (err instanceof Error) {
                error.value =  "Une erreur est survenue lors de la récupération des services"
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        }finally {
            loading.value = false;
        }
    }


    return {
        fetchServices,
        services,
        loading
    }
})