<template>
  <div class="w-full flex justify-end">
    <UButton color="primary" class="cursor-pointer" @click="toggleModal">Nouveau tarif</UButton>
  </div>
  <div class="mt-4">
    <DatatablePriceList v-model:is-modal-open="open" />
  </div>
  <UModal @close="handleCloseModal" v-model:open="open">
    <template #content>
      <FormPriceList @close="closeModal" />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import { DatatablePriceList, FormPriceList, UButton } from '#components';

const open = ref(false);
const priceListStore = usePriceListStore();

function toggleModal() {
  open.value = !open.value
  priceListStore.setPricingItemEdit(null);
}

function closeModal() {
  open.value = false;
}

function handleCloseModal() {
  priceListStore.setPricingItemEdit(null);
}

await priceListStore.fetchPriceList();
</script>