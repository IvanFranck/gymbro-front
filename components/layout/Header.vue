<template>
    <header class="bg-white shadow">
        <div class="container mx-auto px-4 py-4 flex items-center">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center">
                <!-- <NuxtImg src="/images/logo.png" alt="Logo de l'application" width="40" height="40" class="mr-2" /> -->
                <span class="text-xl font-bold text-gray-800">MonApp</span>
            </NuxtLink>

            <!-- Navigation horizontale -->
            <nav class="ml-10">
                <ul class="flex space-x-6">
                    <li v-for="item in navigationItems" :key="item.path">
                        <NuxtLink
                            :to="item.path"
                            class="text-gray-600 hover:text-primary-500 px-2 py-1 rounded transition"
                            :class="{ 'text-primary-500 font-medium': isActive(item.path) }">
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
const route = useRoute();

// Items de navigation
const navigationItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Abonnements', path: '/memberships' },
    { label: 'Clients', path: '/customers' },
    { label: 'Revenus', path: '/incomes' },
    { label: 'Paramètres', path: '/settings' }
];

// Vérifier si un lien est actif
const isActive = (path) => {
    if (path === '/' && route.path === '/') return true;
    if (path !== '/' && route.path.startsWith(path)) return true;
    return false;
};
</script>