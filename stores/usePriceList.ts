import type { PriceList, PriceListDto, PricingItem } from "~/types/price-list";

const {
    handleCreatePrincingItem,
    handleFetchPriceList
} = usePriceList();

export const usePriceListStore = defineStore('priceListStore', () => {
    const priceList = ref<PriceList[]>();
    const loading = ref(false);
    const error = ref<string | null>(null);
    const pricingItemEdit = ref<PricingItem | null>(null);

    async function fetchPriceList(params: {
        typeAbonnementId: number,
        prixMin: number,
        prixMax: number,
        genre: string
    }){
        loading.value = true
        try {
            const result = await handleFetchPriceList(params);
            if (result) {
                priceList.value = result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la récupération de la grille des prix. Veillez actualiser la page"
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        } finally {
            loading.value = false;
        }
    }   

    async function createPricingItem  (dto: PriceListDto) {
        loading.value = true
        try {
            const result = await handleCreatePrincingItem(dto);
            if (result) {
                useToast().add({
                    title: "Tarif créé avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la création de l'offre tarifaire. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    function setPricingItemEdit(value: PriceList | null) {
        if (value) {
            const { typeAbonnement, ...others} = value;
            pricingItemEdit.value = others;
        }else{
            pricingItemEdit.value = null;
        }
    }

    return {
        fetchPriceList,
        createPricingItem,
        setPricingItemEdit
    }
})

