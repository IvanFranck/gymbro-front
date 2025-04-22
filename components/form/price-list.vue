<template>
    <div class="p-6">
        <h3 class="heading-title-2">
            {{ Boolean(priceListStore.pricingItemEdit) ? "Modifier un tarif" : `Créer un nouvel tarif
            d'abonnement` }}
        </h3>
        <UForm :schema="PriceListSchema" :state="state" class="space-y-8 mt-6" @submit="onSubmit">

            <UFormField label="Type d'offre" name="typeAbonnementId" class="w-full" required>
                <USelect v-model="state.typeAbonnementId" :items="membershipTypesOptions" size="lg" class="w-full" />
            </UFormField>

            <UFormField label="Genre" name="genre" class="w-full" required>
                <USelect v-model="state.genre" :items="genderOptions" size="lg" class="w-full" />
            </UFormField>

            <UFormField label="Prix" name="prix" class="w-full" required>
                <UInputNumber v-model="state.prix" :step="1000" :min="1000" size="lg" :format-options="{
                    style: 'currency',
                    currency: 'XAF',
                    currencyDisplay: 'symbol',
                }" class="w-full" />
            </UFormField>

            <UFormField label="Durée de l'abonnment" description="Compté en jours. Exemple: 30 jours pour 1 mois"
                name="prix" class="w-full" required>
                <UInputNumber v-model="state.dureeJours" :min="1" size="lg" class="w-full" />
            </UFormField>

            <div class="w-full flex justify-between">
                <UButton @click="emits('close')" class="mt-4 cursor-pointer" color="neutral" size="lg">
                    Annuler
                </UButton>
                <UButton type="submit" class="mt-4 cursor-pointer" color="primary" size="lg">
                    {{ Boolean(membershipTypeStore.membershipTypeToEdit) ? "Modifier" : "Enregistrer" }}
                </UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { PriceListSchema, type PriceListDto } from '~/types/price-list';

const emits = defineEmits<{
    (e: 'close'): void;
}>();

const membershipTypeStore = useMembershipTypeStore();
const priceListStore = usePriceListStore();

const state = reactive<PriceListDto>(priceListStore.pricingItemEdit || {
    prix: 1000,
    genre: '',
    typeAbonnementId: 0,
    dureeJours: 1,
    actif: true,
})
const genderOptions = ref(['Homme', 'Femme'])
const membershipTypesOptions = computed(() => {
    const items = membershipTypeStore.membershipTypes?.data
    return items?.map((item) => {
        return {
            label: item.nom,
            value: item.id
        }
    })
})

async function onSubmit(event: FormSubmitEvent<PriceListDto>) {
    console.log('submit form')
    const { pricingItemEdit } = priceListStore;
    const result = pricingItemEdit
        ? await priceListStore.updatePricingItem(event.data, pricingItemEdit.id)
        : await priceListStore.createPricingItem(event.data);

    if (result) {
        await priceListStore.fetchPriceList();
        emits('close');
    }
}

await membershipTypeStore.fetchMembershipTypes();

</script>