import { PAYMENT_METHODS } from "~/constants/api-routes";
import type { GenericListResponce } from "~/types";
import type { PaymentMethod, PaymentMethodDto } from "~/types/payment-methods";

export const usePaymentMethod = () => {
    async function fetchPaymentMethods(
        search?: string
    ) {
        const { data, error: fetchError } = await useApi<PaymentMethod[]>(PAYMENT_METHODS, {
            params: {
                search,
                actif: true
            }
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value) {
            return data.value
        }
    }

    async function createPaymentMethod(
        paymentMethod: PaymentMethodDto
    ) {
        const { data, error: fetchError } = await useApi<PaymentMethod>(PAYMENT_METHODS, {
            method: "POST",
            body: paymentMethod
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    async function updatePaymentMethod(
        paymentMethod: PaymentMethodDto,
        id: number
    ) {

        const { data, error: fetchError } = await useApi<PaymentMethod>(`${PAYMENT_METHODS}/${id}`, {
            method: "PATCH",
            body: paymentMethod
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }


    async function deletePaymentMethod(id: number) {
        const { error: fetchError } = await useApi<PaymentMethod>(`${PAYMENT_METHODS}/${id}/deactivate`, {
            method: "PATCH",
        });

        if (fetchError.value)
            throw fetchError.value

    }

    return {
        createPaymentMethod,
        fetchPaymentMethods,
        updatePaymentMethod,
        deletePaymentMethod
    }
}