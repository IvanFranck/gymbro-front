<template>
    <div class="w-full flex justify-between">
      <UInput v-model="search" icon="i-lucide-search" :loading="membershipTypeStore.loading"
        placeholder="Rechercher une offre par son nom" class="w-1/3" color="neutral" size="xl"
        @update:model-value="handleSearch">
        <template v-if="search?.length" #trailing>
          <UButton class="cursor-pointer" color="neutral" variant="link" size="md" icon="i-lucide-x"
            aria-label="Clear input" @click="search = ''" />
        </template>
      </UInput>
      <UButton color="primary" class="cursor-pointer" @click="toggleModal">Nouvelle offre</UButton>
    </div>
    <div class="mt-4">
      <DatatableMembershipType v-model:is-modal-open="open" />
    </div>
    <UModal @close="handleCloseModal" v-model:open="open">
      <template #content>
        <FormMembershipType @close="closeModal" />
      </template>
    </UModal>
  </template>
  
  <script lang="ts" setup>
  import { DatatableMembershipType, FormMembershipType, UButton } from '#components';
  import { watchDebounced } from '@vueuse/core';
  
  const search = ref('');
  const open = ref(false);
  const membershipTypeStore = useMembershipTypeStore();
  
  async function handleSearch(search: string | number) {
    if (typeof(search) === 'string')
      await membershipTypeStore.fetchMembershipTypes(search)
  }
  
  function toggleModal() {
    open.value = !open.value
    membershipTypeStore.setMembershipTypeToEdit(null);
  }
  
  function closeModal(){
    open.value = false;
  }
  
  function handleCloseModal() {
    membershipTypeStore.setMembershipTypeToEdit(null);
  }
  
  watchDebounced(
    search,
    async () => await membershipTypeStore.fetchMembershipTypes(search.value),
    { debounce: 3000, maxWait: 5000 },
  )
  
  await membershipTypeStore.fetchMembershipTypes();
  </script>