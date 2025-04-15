import type { GenericListResponce } from "~/types";
import type { CreateServiceDto, Service, UpdateServiceDto } from "~/types/services"

const {
    fetchServices: getAllServices,
    createService: addService,
    toggleServiceStatus: changeServiceStatus,
    updateService: editService
} = useServices();

export const useServiceStore = defineStore('serviceStore', () => {
    const services = ref<GenericListResponce<Service[]>>();
    const loading = ref(false);
    const error = ref<string | null>(null)
    const page = ref(1);
    const limit = ref(10);
    const serviceToEdit = ref<Service | null>(null);

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

    async function createService(service: CreateServiceDto): Promise<Service | undefined> {
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

    async function updateService(service: UpdateServiceDto, id: number): Promise<Service | undefined> {
        loading.value = true;
        try {
            const result = await editService(service, id);
            if (result) {
                console.log("result", result);
                useToast().add({
                    title: "Service modifié avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la modification du service"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function toggleServiceStatus(serviceId: number, status: boolean) {
        loading.value = true
        try {
            const result = await changeServiceStatus(serviceId, status);
            if (result) {
                useToast().add({
                    title: "Statut du service mis à jour avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la mise à jour du statut du service"
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
        setServiceToEdit,
        toggleServiceStatus,
        serviceToEdit,
        services,
        loading
    }
})