<template>
    <UTable ref="table" :loading="paymentMethodStore.loading" loading-color="primary"
      loading-animation="carousel" :data="paymentMethodStore.paymentMethods" :columns="columns">
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropDownActions(row.original)">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
        </UDropdownMenu>
      </template>
      <template #empty>
        <p class="mb-4">Aucun moyen de paiement trouvé. Veillez recharger la page ou en créer un.</p>
        <UButton color="primary" class="cursor-pointer" @click="emits('update:isModalOpen', true);">Nouveau moyen de paiement</UButton>
      </template>

      <template #loading>
        <p>chargement...</p>
      </template>
    </UTable>
</template>

<script lang="ts" setup>
import { UButton, UDropdownMenu } from '#components';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import { type Column } from '@tanstack/vue-table';
import type { PaymentMethod } from '~/types/payment-methods';

defineProps<{
    isModalOpen: boolean
}>();

const emits = defineEmits(['update:isModalOpen'])

const paymentMethodStore = usePaymentMethodStore();

function getDropDownActions(paymentMethod: PaymentMethod): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Modifier',
        icon: 'i-lucide-edit',
        class: 'cursor-pointer',
        onSelect: () => {
          paymentMethodStore.setPaymentMethodToEdit(paymentMethod);
          emits('update:isModalOpen', true);
        }
      }
    ],
    [
        {
            label: 'Supprimer',
            icon: 'i-lucide-trash',
            color: 'error',
            class: 'cursor-pointer',
            onSelect: async () => {
                await paymentMethodStore.deletePaymentMethod(paymentMethod.id);
                await paymentMethodStore.fetchPaymentMethods();
            }
        }
    ]
  ]
}

function getHeader(column: Column<PaymentMethod>, label: string) {
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


const columns: TableColumn<PaymentMethod>[] = [
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
    id: 'action'
  }
]

</script>