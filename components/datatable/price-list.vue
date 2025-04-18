<template>
    <UTable ref="table" :loading="priceListStore.loading" loading-color="primary"
      loading-animation="carousel" :data="priceListStore.priceList" :columns="columns">
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropDownActions(row.original)">
          <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
        </UDropdownMenu>
      </template>
      <template #empty>
        <p class="mb-4">Votre grille de prix est vide. Veillez recharger la page ou commencer à enregistrer votre premièrre offre tarifaire.</p>
        <UButton color="primary" class="cursor-pointer" @click="emits('update:isModalOpen', true);">Nouveau tarif</UButton>
      </template>

      <template #loading>
        <p>chargement...</p>
      </template>
    </UTable>
</template>

<script lang="ts" setup>
import { UBadge, UButton, UDropdownMenu } from '#components';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import { type Column } from '@tanstack/vue-table';
import type { MembershipType } from '~/types/membership-types';
import type { PriceList } from '~/types/price-list';

defineProps<{
    isModalOpen: boolean
}>();

const emits = defineEmits(['update:isModalOpen'])

const priceListStore = usePriceListStore();

function getDropDownActions(paymentMethod: PriceList): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Modifier',
        icon: 'i-lucide-edit',
        class: 'cursor-pointer',
        onSelect: () => {
            priceListStore.setPricingItemEdit(paymentMethod);
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
                // await paymentMethodStore.deletePaymentMethod(paymentMethod.id);
                await priceListStore.fetchPriceList();
            }
        }
    ]
  ]
}

function getHeader(column: Column<PriceList>, label: string) {
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


const columns: TableColumn<PriceList>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => getHeader(column, 'id'),
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: "typeAbonnement",
    header: ({ column }) => getHeader(column, 'Type d\'abonnement'),
    cell: ({ row }) => {
        const typeAbonnement: MembershipType = row.getValue('typeAbonnement');
        return h(UBadge, { class: 'capitalize', color: 'neutral', variant: 'subtle' }, () => typeAbonnement.nom)
    }
  },
  {
    accessorKey: "genre",
    header: ({ column }) => getHeader(column, 'Genre'),
    cell: ({ row }) => row.getValue('genre')
  },
  {
    accessorKey: "prix",
    header: ({ column }) => getHeader(column, 'Prix'),
    cell: ({ row }) => row.getValue('prix')
  },
  {
    accessorKey: "dureeJours",
    header: ({ column }) => getHeader(column, 'Durée (en jours)'),
    cell: ({ row }) => row.getValue('dureeJours')
  },
  {
    id: 'action'
  }
]

</script>