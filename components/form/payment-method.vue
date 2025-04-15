<template>
    <div class="p-6">
        <h3 class="heading-title-2">
            {{ Boolean(paymentMethodStore.paymentMethodToEdit) ? "Modifier cette méthode de paiement" : "Créer une méthode de paiement" }}
        </h3>
        <UForm :schema="PaymentMethodSchema" :state="state" class="space-y-4 mt-6" @submit="onSubmit">
            <UFormField label="Nom" name="nom" class="w-full" required>
                <UInput v-model="state.nom" class="w-full" />
            </UFormField>

            <UFormField label="Description" name="description" class="w-full">
                <UTextarea v-model="state.description" class="w-full" />
            </UFormField>

            <div class="w-full flex justify-between">
                <UButton @click="emits('close')" class="mt-4 cursor-pointer" color="neutral" size="lg">
                    Annuler
                </UButton>
                <UButton type="submit" class="mt-4 cursor-pointer" color="primary" size="lg">
                    {{ Boolean(paymentMethodStore.paymentMethodToEdit) ? "Modifier" : "Enregistrer" }}
                </UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { type PaymentMethodDto, type PaymentMethod, PaymentMethodSchema } from '~/types/payment-methods';

const emits = defineEmits<{
    (e: 'close'): void;
}>();

const paymentMethodStore = usePaymentMethodStore();

const state = reactive<Partial<PaymentMethod>>(paymentMethodStore.paymentMethodToEdit || {
    nom: '',
    description: '',
})

async function onSubmit(event: FormSubmitEvent<PaymentMethodDto>) {
    const { paymentMethodToEdit } = paymentMethodStore;
    const result = paymentMethodToEdit 
        ? await paymentMethodStore.updatePaymentMethod(event.data, paymentMethodToEdit.id) 
        : await paymentMethodStore.createPaymentMethod(event.data);

    if (result) {
        await paymentMethodStore.fetchPaymentMethods();
        emits('close');
    }
}
</script>