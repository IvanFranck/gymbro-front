<template>
    <div class="w-full flex justify-between">
      <UInput v-model="search" icon="i-lucide-search" :loading="paymentMethodStore.loading"
        placeholder="Rechercher une méthode de paiement par son nom ou sa description" class="w-3/5" color="neutral" size="xl"
        @update:model-value="handleSearch">
        <template v-if="search?.length" #trailing>
          <UButton class="cursor-pointer" color="neutral" variant="link" size="md" icon="i-lucide-x"
            aria-label="Clear input" @click="search = ''" />
        </template>
      </UInput>
      <UButton color="primary" class="cursor-pointer" @click="toggleModal">Nouvelle méthode de paiment</UButton>
    </div>
    <div class="mt-4">
      <DatatablePaymentMethod v-model:is-modal-open="open" />
    </div>
    <UModal @close="handleCloseModal" v-model:open="open">
      <template #content>
        <FormPaymentMethod @close="closeModal" />
      </template>
    </UModal>
  </template>
  
  <script lang="ts" setup>
  import { FormPaymentMethod, DatatablePaymentMethod, UButton } from '#components';
  import { watchDebounced } from '@vueuse/core';
  
  const search = ref('');
  const open = ref(false);
  const paymentMethodStore = usePaymentMethodStore();
  
  async function handleSearch(search: string | number) {
    if (typeof(search) === 'string')
      await paymentMethodStore.fetchPaymentMethods(search)
  }
  
  function toggleModal() {
    open.value = !open.value
  }
  
  function closeModal(){
    open.value = false;
    paymentMethodStore.setPaymentMethodToEdit(null);
  }
  
  function handleCloseModal() {
    paymentMethodStore.setPaymentMethodToEdit(null);
  }
  
  watchDebounced(
    search,
    async () => await paymentMethodStore.fetchPaymentMethods(search.value),
    { debounce: 3000, maxWait: 5000 },
  )
  
  await paymentMethodStore.fetchPaymentMethods();
  </script>