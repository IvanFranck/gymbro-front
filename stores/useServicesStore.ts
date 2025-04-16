import type { GenericListResponce } from "~/types";
import type { CreateServiceDto, Service, UpdateServiceDto } from "~/types/services"

const {
    fetchServices: getAllServices,
    createService: addService,
    updateService: editService,
    deleteService: handleDeleteService,
} = useServices();

export const useServiceStore = defineStore('serviceStore', () => {
    const services = ref<GenericListResponce<Service[]>>();
    const loading = ref(false);
    const error = ref<string | null>(null)
    const page = ref(1);
    const limit = ref(10);
    const serviceToEdit = ref<Service | null>(null);

    async function fetchServices(p?: number, l?: number, search?: string) {
        loading.value = true
        try {
            const result = await getAllServices(p ?? page.value, l ?? limit.value, search);
            if (result) {
                services.value = result;
            }

        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la récupération des services. Veillez actualiser la page"
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function createService(service: CreateServiceDto): Promise<Service | undefined> {
        loading.value = true
        try {
            const result = await addService(service);
            if (result) {
                useToast().add({
                    title: "Service créé avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la création du service. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function updateService(service: UpdateServiceDto, id: number): Promise<Service | undefined> {
        loading.value = true;
        try {
            const result = await editService(service, id);
            if (result) {
                useToast().add({
                    title: "Service modifié avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la modification du service. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function deleteService(id: number) {
        loading.value = true;
        try {
            await handleDeleteService(id);
            useToast().add({
                title: "Service supprimé",
                color: "success"
            });
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la suppression du service. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    function setServiceToEdit(service: Service | null) {
        serviceToEdit.value = service;
    }

    return {
        fetchServices,
        createService,
        updateService,
        deleteService,
        setServiceToEdit,
        serviceToEdit,
        services,
        loading
    }
})