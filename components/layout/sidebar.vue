<template>
    <UNavigationMenu
        orientation="vertical" 
        :items="items" 
        class="data-[orientation=vertical]:w-full" 
    />
</template>
  
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const route = useRoute();

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label: 'Menu',
            type: 'label'
        },
        {
            label: 'Tableau de bord',
            icon: 'i-lucide-book-open',
            to: '/',
            active: true,
        },
        {
            label: 'Clients',
            icon: 'i-lucide-database',
            children: [
                {
                    label: 'Liste des clients',
                    icon: 'i-lucide-file-text',
                    to: '/customers'
                },
                {
                    label: 'Statuts client',
                    icon: 'i-lucide-file-text',
                    to: '/customers/status'
                },
            ]
        },
        {
            label: 'Abonnements',
            icon: 'i-lucide-box',
            children: [
                {
                    label: 'Tous les abonnements',
                    icon: 'i-lucide-file-text',
                    to: '/memberships'
                },
                {
                    label: 'Status des abonnements',
                    icon: 'i-lucide-file-text',
                    to: '/memberships/status'
                },
            ]
        },
        {
            label: 'Catalogue d\'offres',
            icon: 'i-lucide-box',
            children: [
                {
                    label: 'Types d\'abonnements',
                    icon: 'i-lucide-file-text',
                    to: '/offers'
                },
                {
                    label: 'Grille tarifaire',
                    icon: 'i-lucide-file-text',
                    to: '/offers/pricing'
                },
                {
                    label: 'Services',
                    icon: 'i-lucide-file-text',
                    to: '/offers/services'
                },
            ]
        },
        {
            label: 'Paramètres',
            icon: 'i-lucide-box',
            children: [
                {
                    label: 'Méthodes de paiement',
                    icon: 'i-lucide-file-text',
                    to: '/settings/payment-methods'
                },
            ]
        },
    ]
])

  
  //    Vérifier si un lien est actif
const isActive = (path: string) => {
    if (path === '/' && route.path === '/') return true;
    if (path !== '/' && route.path.startsWith(path)) return true;
    return false;
};
</script>
  
<style scoped>
  /* Si nécessaire d'ajuster certains styles spécifiques */
  :deep(.n-menu-item-content-active:not(.n-menu-item-content-child-active) .n-menu-item-content-header) {
    color: var(--color-primary-500);
  }
</style>