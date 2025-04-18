<template>
  <UTable ref="table" v-model:pagination="pagination" :loading="membershipTypeStore.loading" loading-color="primary"
    loading-animation="carousel" :data="membershipTypeStore.membershipTypes?.data" :pagination-options="{
      getPaginationRowModel: getPaginationRowModel()
    }" :columns="columns">
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropDownActions(row.original)">
        <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
      </UDropdownMenu>
    </template>
    <template #empty>
      <p class="mb-4">Aucune offre trouvée. Veillez recharger la page ou en créer une.</p>
      <UButton color="primary" class="cursor-pointer" @click="emits('update:isModalOpen', true)">Nouvelle offre
      </UButton>
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
</template>

<script lang="ts" setup>
import { UBadge, UButton, UDropdownMenu } from '#components';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import { getPaginationRowModel, type Column } from '@tanstack/vue-table';
import type { MembershipTypeList, MembershipTypeService } from '~/types/membership-types';

defineProps<{
  isModalOpen: boolean
}>();

const emits = defineEmits(['update:isModalOpen'])

const membershipTypeStore = useMembershipTypeStore();
const table = useTemplateRef('table');
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
});

function getHeader(column: Column<MembershipTypeList>, label: string) {
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

function getDropDownActions(membershipType: MembershipTypeList): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Modifier',
        icon: 'i-lucide-edit',
        class: 'cursor-pointer',
        onSelect: () => {
          membershipTypeStore.setMembershipTypeToEdit(membershipType);
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
          await membershipTypeStore.deleteMembershipType(membershipType.id);
          await membershipTypeStore.fetchMembershipTypes();
        }
      }
    ]
  ]
}

const columns: TableColumn<MembershipTypeList>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => getHeader(column, 'id'),
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: "nom",
    header: ({ column }) => getHeader(column, 'Nom'),
    cell: ({ row }) => {
      const value = row.getValue('nom');
      return h('p', { class: "max-w-32 text-wrap", }, `${value}`);
    }
  },
  {
    accessorKey: 'services',
    header: ({ column }) => getHeader(column, 'Services associés'),
    cell: ({ row }) => {
      const services: MembershipTypeService[] = row.getValue('services');
      return h('div', { class: 'flex gap-2 flex-wrap' }, services.map(item => {
        const isActive = item.service.actif;
        if (!isActive) return;
        return h(UBadge, { class: 'capitalize', color: 'neutral', variant: 'subtle' }, () => item.service.nom)
      }
      ))
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => getHeader(column, 'Description'),
    cell: ({ row }) => {
      const value = row.getValue('description');
      return h('p', { class: "max-w-40 text-wrap", }, `${value}`);
    }
  },
  {
    id: 'action'
  }
]
</script>