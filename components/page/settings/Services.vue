<template>
  <div class="w-full flex justify-between">
    <UInput v-model="search" icon="i-lucide-search" :loading="servicesStore.loading"
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
    <UTable ref="table" v-model:pagination="pagination" :loading="servicesStore.loading" loading-color="primary"
      loading-animation="carousel" :data="servicesStore.services?.data" :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }" :columns="columns">
      <template #empty>
        <p class="mb-4">Aucun service trouvé. Veillez recharger la page ou en créer un.</p>
        <UButton color="primary" class="cursor-pointer">Nouveau service</UButton>
      </template>

      <template #loading>
        <p>chargement...</p>
      </template>
    </UTable>
    <div class="flex justify-center border-t border-(--ui-border) pt-4">
      <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
  </div>
  <UDrawer v-model:open="open" direction="right">
    <template #content>
      <component :is="ServiceFormComponent" />
    </template>
  </UDrawer>
</template>

<script lang="ts" setup>
import { UBadge, UButton, UDropdownMenu } from '#components';
import type { TableColumn } from '@nuxt/ui';
import { getPaginationRowModel, type Column } from '@tanstack/vue-table';
import type { Service } from '~/types/services';
import { watchDebounced } from '@vueuse/core';

const search = ref('');
const open = ref(false);
const servicesStore = useServiceStore();
const table = useTemplateRef('table');
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
});
const ServiceFormComponent = resolveComponent('FormService');

async function handleSearch(search: string) {
  await servicesStore.fetchServices(search)
}

function toggleModal() {
  open.value = !open.value
}

function getHeader(column: Column<Service>, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start'
      },
      'aria-label': 'Actions dropdown',
      items: [
        {
          label: 'Asc',
          type: 'checkbox',
          icon: 'i-lucide-arrow-up-narrow-wide',
          checked: isSorted === 'asc',
          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }
        },
        {
          label: 'Desc',
          icon: 'i-lucide-arrow-down-wide-narrow',
          type: 'checkbox',
          checked: isSorted === 'desc',
          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          }
        }
      ]
    },
    () =>
      h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label,
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 data-[state=open]:bg-(--ui-bg-elevated)',
        'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
      })
  )
}

const columns: TableColumn<Service>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => getHeader(column, 'id'),
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: "nom",
    header: ({ column }) => getHeader(column, 'Nom'),
    cell: ({ row }) => row.getValue('nom')
  },
  {
    accessorKey: "description",
    header: ({ column }) => getHeader(column, 'Description'),
    cell: ({ row }) => row.getValue('description')
  },
  {
    accessorKey: "actif",
    header: ({ column }) => getHeader(column, 'Statut'),
    cell: ({ row }) => {
      const status = row.getValue('actif') ? 'Actif' : 'désactivé';
      const color = row.getValue('actif') ? 'success' : 'error';

      return h(UBadge, { class: 'capitalize', color, variant: 'subtle' }, () => status)
    }
  }
]

watchDebounced(
  search,
  async () => await servicesStore.fetchServices(search.value),
  { debounce: 3000, maxWait: 5000 },
)

await servicesStore.fetchServices();
</script>