<template>
    <div class="p-6">
        <h3 class="heading-title-2">
            {{ Boolean(membershipTypeStore.membershipTypeToEdit) ? "Modifier l'offre" : "Créer une nouvelle offre d'abonnement" }}
        </h3>
        <UForm :schema="CreateServiceSchema" :state="state" class="space-y-8 mt-6" @submit="onSubmit">

            <UFormField label="Type d'offre" name="typeAbonnementId" class="w-full" required>
                <USelect v-model="state.typeAbonnementId" :items="membershipTypesOptions" size="lg" class="w-full"/>
            </UFormField>
            
            <UFormField label="Prix" name="prix" class="w-full" required>
                <UInputNumber 
                    v-model="state.prix" 
                    :step="1000" :min="1000"
                    size="lg" 
                    :format-options="{
                        style: 'currency',
                        currency: 'XAF',
                        currencyDisplay: 'symbol',
                    }" 
                    class="w-full" 
                />
            </UFormField>

            <UFormField label="Genre" name="genre" class="w-full" required>
                <USelect v-model="state.genre" :items="genderOptions" size="lg" class="w-full"/>
            </UFormField>
            
            <UFormField label="Durée de l'abonnment" description="Compté en jours. Exemple: 30 jours pour 1 mois" name="prix" class="w-full" required>
                <UInputNumber v-model="state.dureeJours" :min="1" size="lg" class="w-full"/>
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
import { USelect } from '#components';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { PriceListDto } from '~/types/price-list';
import { CreateServiceSchema } from '~/types/services';

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
const membershipTypesOptions = computed(()=> {
    const items = membershipTypeStore.membershipTypes?.data
    return items?.map((item) => {
        let services: string | null = null;
        if(item.services && item.services.length > 0){
            services = item.services.map(s => s.service.nom).join(', ');
        }
        const label = services ? `${item.nom} (${services})` : item.nom;

        return {
            label,
            value: item.id
        }
    })
})

async function onSubmit(event: FormSubmitEvent<PriceListDto>) {
    const { pricingItemEdit } = priceListStore;
    // const result = pricingItemEdit 
    //     ? await priceListStore.createPricingItem(event.data, membershipTypeToEdit.id) 
    //     : await membershipTypeStore.createMembershipType(event.data);

    // if (result) {
        await priceListStore.fetchPriceList();
        emits('close');
    // }
}

await membershipTypeStore.fetchMembershipTypes();

</script>