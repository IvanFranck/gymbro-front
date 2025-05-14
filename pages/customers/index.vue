<template>
    <div class="w-full flex justify-between">
        <UInput v-model="search" icon="i-lucide-search" :loading="customerStore.loading"
            placeholder="Rechercher un client par son nom" class="w-1/3" color="neutral" size="xl"
            @update:model-value="handleSearch">
        </UInput>
        <UButton color="primary" class="cursor-pointer" @click="isModalOpen = true">Nouveau client</UButton>
    </div>
    <div class="mt-4">
        <DatatableCustomer v-model:is-modal-open="isModalOpen" />
    </div>
    <UModal v-model:open="isModalOpen" @close="isModalOpen = false">
      <template #content>
        <FormCustomer @close="isModalOpen = false" />
      </template>
    </UModal>
</template>

<script setup lang="ts">

const search = ref('');
const customerStore = useCustomerStore();
const isModalOpen = ref(false);


async function handleSearch(search: string | number) {
    if (typeof(search) === 'string')
        await customerStore.fetchCustomers(search)
}

watchDebounced(
    search,
    async () => await customerStore.fetchCustomers(search.value),
    { debounce: 3000, maxWait: 5000 },
)


</script>
