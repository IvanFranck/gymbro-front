<template>
    <div class="p-6">
        <h3 class="heading-title-2">
            {{ Boolean(serviceStore.serviceToEdit) ? "Modifier ce service" : "Créer un service" }}
        </h3>
        <UForm :schema="CreateServiceSchema" :state="state" class="space-y-4 mt-6" @submit="onSubmit">
            <UFormField label="Nom" name="nom" class="w-full" required>
                <UInput v-model="state.nom" class="w-full" />
            </UFormField>

            <UFormField label="Description" name="description" class="w-full">
                <UTextarea v-model="state.description" class="w-full" />
            </UFormField>

            <UFormField label="Durée standard" name="dureeStandard" class="w-full">
                <UInputNumber v-model="state.dureeStandard" :min="0" class="w-full" />
            </UFormField>

            <UFormField label="Capacité Max" name="capaciteMax" class="w-full">
                <UInputNumber v-model="state.capaciteMax" :min="0" class="w-full" />
            </UFormField>

            <UFormField v-if="serviceStore.serviceToEdit" name="actif" class="w-full">
                <p class="flex gap-2 items-center">
                    <USwitch v-model="state.actif" />
                    <span>Activer</span>
                </p>
            </UFormField>

            <div class="w-full flex justify-between">
                <UButton class="mt-4 cursor-pointer" color="neutral" size="lg" @click="emits('close')">
                    Annuler
                </UButton>
                <UButton type="submit" class="mt-4 cursor-pointer" color="primary" size="lg">
                    {{ Boolean(serviceStore.serviceToEdit) ? "Modifier" : "Enregistrer" }}
                </UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { USwitch } from '#components';
import type { FormSubmitEvent } from '@nuxt/ui';
import { CreateServiceSchema, type CreateServiceDto } from '~/types/services';

const emits = defineEmits<{
    (e: 'close'): void;
}>();

const serviceStore = useServiceStore();

const state = reactive<Partial<CreateServiceDto>>(serviceStore.serviceToEdit || {
    nom: '',
    description: '',
    dureeStandard: 0,
    capaciteMax: 0,
    actif: true,
})

async function onSubmit(event: FormSubmitEvent<CreateServiceDto>) {
    const { serviceToEdit } = serviceStore;
    const result = serviceToEdit
        ? await serviceStore.updateService(event.data, serviceToEdit.id)
        : await serviceStore.createService(event.data);

    if (result) {
        await serviceStore.fetchServices();
        emits('close');
    }
}

</script>