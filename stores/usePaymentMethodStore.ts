import type { PaymentMethod, PaymentMethodDto } from "~/types/payment-methods"

const {
    fetchPaymentMethods: handleFetchPaymentMethods,
    updatePaymentMethod: handleUpdatePaymentMethod,
    createPaymentMethod: handleCreatePaymentMethod,
    deletePaymentMethod: handleDeletePaymentMethod
} = usePaymentMethod();

export const usePaymentMethodStore = defineStore('paymentMethodStore', () => {
    const paymentMethods = ref <PaymentMethod[]>();
    const loading = ref(false);
    const error = ref<string | null>();
    const paymentMethodToEdit = ref<PaymentMethod | null>(null);

    async function fetchPaymentMethods(search?: string) {
        loading.value = true
        try {
            const result = await handleFetchPaymentMethods(search);
            if (result) {
                paymentMethods.value = result;
            }

        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la récupération des moyens de paiement. Veillez recharger la page"
                useToast().add({
                    title: error.value,
                    color: "error",
                    
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function createPaymentMethod(paymentMethod: PaymentMethodDto): Promise<PaymentMethod | undefined> {
    loading.value = true
        try {
            const result = await handleCreatePaymentMethod(paymentMethod);
            if (result) {
                useToast().add({
                    title: "Moyen de paiement créé avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la création de la méthode de paiement. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function updatePaymentMethod(paymentMethod: PaymentMethodDto, id: number): Promise<PaymentMethod | undefined> {
        loading.value = true;
        try {
            const result = await handleUpdatePaymentMethod(paymentMethod, id);
            if (result) {
                useToast().add({
                    title: "Moyen de paiement modifié avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la modification du moyen de paiement. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function deletePaymentMethod(id: number) {
        loading.value = true;
        try {
            await handleDeletePaymentMethod(id);
            useToast().add({
                title: "Moyen de paiement supprimé",
                color: "success"
            });
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la suppression du moyen de paiement. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    function setPaymentMethodToEdit(service: PaymentMethod | null) {
        paymentMethodToEdit.value = service;
    }

    return {
        fetchPaymentMethods,
        createPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        setPaymentMethodToEdit,
        paymentMethodToEdit,
        paymentMethods,
        loading 
    }
})