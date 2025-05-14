<template>
    <UTable ref="table" v-model:pagination="pagination" :loading="customerStore.loading" loading-color="primary"
        loading-animation="carousel" :data="customerStore.customers?.data" :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
        }" :columns="columns">
        <template #action-cell="{ row }">
            <UDropdownMenu :items="getDropDownActions(row.original)">
                <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
            </UDropdownMenu>
        </template>
        <template #empty>
            <p class="mb-4">Aucun client trouvé. Veillez en créer un.</p>
            <UButton color="primary" class="cursor-pointer" @click="emits('update:isModalOpen', true)">Nouveau client
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

<script setup lang="ts">
import { UDropdownMenu, UButton } from '#components';
import type { CustomerList } from '~/types/customers';
import { getPaginationRowModel, type Column } from '@tanstack/vue-table';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import { formatRelativeDate, formatDate } from '~/utils';
const emits = defineEmits(['update:isModalOpen'])

const customerStore = useCustomerStore();
const table = useTemplateRef('table');
const pagination = ref({
    pageIndex: 0,
    pageSize: 5
}); 

function getHeader(column: Column<CustomerList>, label: string) {
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

function getDropDownActions(customer: CustomerList): DropdownMenuItem[][] {
    return [
        [
            { label: 'Modifier', icon: 'i-lucide-edit', action: () => {} }
        ]
    ]
}   

const columns: TableColumn<CustomerList>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => getHeader(column, 'ID'),
        cell: ({ row }) => `#${row.getValue('id')}`
    },
    {
        accessorKey: 'nom',
        header: ({ column }) => getHeader(column, 'Nom'),
        cell: ({ row }) => row.getValue('nom')
    },
    {
        accessorKey: 'prenom',
        header: ({ column }) => getHeader(column, 'Prénom'),
        cell: ({ row }) => row.getValue('prenom')
    },
    {
        accessorKey: 'telephone',
        header: ({ column }) => getHeader(column, 'Téléphone'),
        cell: ({ row }) => row.getValue('telephone')
    },
    {
        accessorKey: 'adresse', 
        header: ({ column }) => getHeader(column, 'Adresse'),
        cell: ({ row }) => row.getValue('adresse')
    },
    {
        accessorKey: 'dateInscription',
        header: ({ column }) => getHeader(column, 'Date d\'inscription'),   
        cell: ({ row }) => {
            const date: string = row.getValue('dateInscription');
            if (date) {
                return h('div', {
                    class: 'text-sm text-gray-500'
                }, [
                    h('p', {}, formatDate(date)),
                    h('p', {}, formatRelativeDate(date))
                ]);
            }
            return 'N/A';
        }
    },
    {
        id: 'action'
    }
]
    
await customerStore.fetchCustomers();

</script>
