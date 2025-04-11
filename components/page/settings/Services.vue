<template>
    <h2>Services</h2>

    <div class="mt-4">
        <UTable :data="servicesStore.services?.data" :columns="columns"/>
    </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';
import type { Service } from '~/types/services';

const servicesStore = useServiceStore();

const columns: TableColumn<Service>[] = [
    {
        accessorKey: "id",
        header: "id",
        cell: ({ row }) => `#${row.getValue('id')}`
    }
]
</script>