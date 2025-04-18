import { PRICING } from "~/constants/api-routes"
import type { PriceList, PriceListDto, PricingItem } from "~/types/price-list"

export const usePriceList = () => {
    async function handleFetchPriceList(params?: {
        typeAbonnementId: number,
        prixMin: number,
        prixMax: number,
        genre: string
    }) {
        const { data, error: fetchError } = await useApi<PriceList[]>(PRICING, {
            params: {
                ...params,
                actif: true
            }
        });

        if (fetchError.value) {
            console.error('error fetching price-list', fetchError.value)
            throw fetchError.value
        }

        if (data.value)
            return data.value
    }

    async function handleCreatePrincingItem(
        dto: PriceListDto
    ) {
        const { data, error: fetchError } = await useApi<PricingItem>(PRICING, {
            method: "POST",
            body: dto
        });

        if (fetchError.value) {
            console.error('error create princing item', fetchError.value)
            throw fetchError.value
        }

        if (data.value)
            return data.value
    }

    return {
        handleFetchPriceList,
        handleCreatePrincingItem
    }
}