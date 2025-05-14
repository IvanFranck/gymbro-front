<template>
    <div class="p-6">
        <h3 class="heading-title-2">
            Créer un nouveau client
        </h3>
        <UForm :schema="CustomerSchema" :state="state" class="space-y-8 mt-6" @submit="handleSubmit">
            <UFormField label="Nom" name="nom" class="w-full" required>
                <UInput v-model="state.nom" class="w-full" />
            </UFormField>
            <UFormField label="Prénom" name="prenom" class="w-full" required>
                <UInput v-model="state.prenom" class="w-full" />
            </UFormField>
            <UFormField label="Téléphone" name="telephone" class="w-full" required>
                <UInput v-model="state.telephone" class="w-full" />
            </UFormField>
            <UFormField label="Adresse" name="adresse" class="w-full" required>
                <UInput v-model="state.adresse" class="w-full" />
            </UFormField>
            <div class="w-full flex justify-between">
                <UButton class="mt-4 cursor-pointer" color="neutral" size="lg" @click="emits('close')">
                    Annuler
                </UButton>
                <UButton type="submit" class="mt-4 cursor-pointer" color="primary" size="lg">
                    Enregistrer
                </UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { CustomerDto } from '~/types/customers';
import { CustomerSchema } from '~/types/customers';
const emits = defineEmits<{
    (e: 'close'): void;
}>();

const customerStore = useCustomerStore();

const state = reactive<CustomerDto>({
    nom: '',
    prenom: '',
    telephone: '',
    adresse: '',
});

async function handleSubmit(event: FormSubmitEvent<CustomerDto>) {
    event.preventDefault();
    const result = await customerStore.createCustomer(event.data);
    if (result) {
        await customerStore.fetchCustomers();
        emits('close');
    }
}
</script>
