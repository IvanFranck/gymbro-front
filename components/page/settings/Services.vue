<template>
    <h2>Services</h2>

    <div class="mt-4">
        <UTable 
            :loading="servicesStore.loading"
            loading-color="primary" 
            loading-animation="carousel"
            :data="servicesStore.services?.data" 
            :columns="columns"
        >
            <template #empty>
                <p class="mb-4">Aucun service trouvé. Veillez recharger la page ou en créer un.</p>
                <UButton color="primary" class="cursor-pointer">Nouveau service</UButton>
            </template>

            <template #loading>
                <p>chargement...</p>
            </template>
        </UTable>
    </div>
</template>

<script lang="ts" setup>
import { UBadge, UButton, UDropdownMenu } from '#components';
import type { TableColumn } from '@nuxt/ui';
import type { Column } from '@tanstack/vue-table';
import type { Service } from '~/types/services';

const servicesStore = useServiceStore();
const sorting = ref([
  {
    id: 'id',
    desc: false
  }
])

const columns: TableColumn<Service>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => getHeader(column, 'id'),
        cell: ({ row }) => `#${row.getValue('id')}`
    },
    {
        accessorKey: "nom",
        header: "Nom",
        cell: ({row}) => row.getValue('nom')
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => row.getValue('description')
    },
    {
        accessorKey: "actif",
        header: "Statut",
        cell: ({row}) => {
            const status = row.getValue('actif') ? 'Actif': 'désactivé';
            const color = row.getValue('actif') ? 'success' : 'error';

            return h(UBadge, {class: 'capitalize', color, variant: 'subtle'}, ()=>status)
        }
    }
]

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

await servicesStore.fetchServices();
</script>