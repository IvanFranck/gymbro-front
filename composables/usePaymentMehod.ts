import { PAYMENT_METHODS } from "~/constants/api-routes";
import type { GenericListResponce } from "~/types";
import type { PaymentMethod, PaymentMethodDto } from "~/types/payment-methods";

export const usePaymentMethod = () => {
    async function fetchPaymentMethods(
        page: number,
        limit: number,
        search?: string
    ) {
        const { data, error: fetchError } = await useApi<GenericListResponce<PaymentMethod[]>>(PAYMENT_METHODS, {
            params: {
                search,
                page,
                limit,
                actif: true
            }
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
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
        const { error: fetchError } = await useApi<PaymentMethod>(`${PAYMENT_METHODS}/${id}`, {
            method: "PATCH",
            body: {
                actif: false
            }
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