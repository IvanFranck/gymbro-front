<template>
    <div class="w-full flex justify-between">
      <UInput v-model="search" icon="i-lucide-search" :loading="serviceStore.loading"
        placeholder="Rechercher un service par son nom" class="w-1/3" color="neutral" size="xl"
        @update:model-value="handleSearch">
        <template v-if="search?.length" #trailing>
          <UButton class="cursor-pointer" color="neutral" variant="link" size="md" icon="i-lucide-x"
            aria-label="Clear input" @click="search = ''" />
        </template>
      </UInput>
      <UButton color="primary" class="cursor-pointer" @click="toggleModal">Nouveau service</UButton>
    </div>
    <div class="mt-4">
      <DatatableService v-model:is-modal-open="open" />
    </div>
    <UModal @close="handleCloseModal" v-model:open="open">
      <template #content>
        <FormService @close="closeModal" />
      </template>
    </UModal>
  </template>
  
  <script lang="ts" setup>
  import { DatatableService, FormService, UButton } from '#components';
  import { watchDebounced } from '@vueuse/core';
  
  const search = ref('');
  const open = ref(false);
  const serviceStore = useServiceStore();
  
  async function handleSearch(search: string | number) {
    if (typeof (search) === 'string')
      await serviceStore.fetchServices({ search })
  }
  
  function toggleModal() {
    open.value = !open.value
    serviceStore.setServiceToEdit(null);
  }
  
  function closeModal() {
    open.value = false;
  }
  
  function handleCloseModal() {
    serviceStore.setServiceToEdit(null);
  }
  
  watchDebounced(
    search,
    async () => await serviceStore.fetchServices({ search: search.value }),
    { debounce: 3000, maxWait: 5000 },
  )
  
  await serviceStore.fetchServices({});
  </script>