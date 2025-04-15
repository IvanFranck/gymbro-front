<template>
    <div class="p-6">
        <h3 class="heading-title-2">
            {{ Boolean(membershipTypeStore.membershipTypeToEdit) ? "Modifier l'offre" : "Créer une nouvelle offre d'abonnement" }}
        </h3>
        <UForm :schema="CreateServiceSchema" :state="state" class="space-y-4 mt-6" @submit="onSubmit">
            <UFormField label="Nom" name="nom" class="w-full" required>
                <UInput v-model="state.nom" class="w-full" />
            </UFormField>
            
            <UFormField label="Prix" name="prix" class="w-full">
                <UInputNumber 
                    v-model="state.prix" 
                    :step="1000" :min="1000"
                    size="xl" 
                    :format-options="{
                        style: 'currency',
                        currency: 'XAF',
                        currencyDisplay: 'symbol',
                    }" 
                class="w-full" 
                />
            </UFormField>
            
            <UFormField label="Durée de l'abonnment" description="Compté en jours. Exemple: 30 jours pour 1 mois" name="prix" class="w-full">
                <UInputNumber v-model="state.dureeJours" :min="1" size="xl" class="w-full" />
            </UFormField>

            <UFormField label="Niveau" name="niveau" class="w-full" required>
                <USelect v-model="state.niveau" :items="membershipLevels" size="xl" class="w-full" />
            </UFormField>

            <UFormField label="Description" name="description" class="w-full">
                <UTextarea v-model="state.description" class="w-full" />
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
import type { MembershipTypeDto } from '~/types/membership-types';
import { CreateServiceSchema, type CreateServiceDto, type Service } from '~/types/services';

const emits = defineEmits<{
    (e: 'close'): void;
}>();

const membershipTypeStore = useMembershipTypeStore();

const state = reactive<Partial<MembershipTypeDto>>(membershipTypeStore.membershipTypeToEdit || {
    nom: '',
    prix: 1000,
    dureeJours: 1,
    niveau: '',
    description: '',
    actif: true,
})
const membershipLevels = ref(['Classic', 'Medium', 'Premium']);

async function onSubmit(event: FormSubmitEvent<MembershipTypeDto>) {
    const { membershipTypeToEdit } = membershipTypeStore;
    const result = membershipTypeToEdit 
        ? await membershipTypeStore.updateMembershipType(event.data, membershipTypeToEdit.id) 
        : await membershipTypeStore.createMembershipType(event.data);

    if (result) {
        await membershipTypeStore.fetchMembershipTypes();
        emits('close');
    }
}

</script>