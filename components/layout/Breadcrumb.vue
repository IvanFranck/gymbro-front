<template>
    <nav v-if="items.length > 1" aria-label="Breadcrumb">
        <ol class="flex text-sm text-gray-500 space-x-1">
            <li v-for="(item, index) in items" :key="index" class="flex items-center">
                <!-- Séparateur (sauf pour le premier élément) -->
                <span v-if="index > 0" class="mx-2 text-gray-400">/</span>

                <!-- Lien ou texte simple (dernier élément) -->
                <NuxtLink v-if="index < items.length - 1" :to="item.path"
                    class="hover:text-primary-500 transition-colors">
                    {{ item.label }}
                </NuxtLink>
                <span v-else class="font-medium text-gray-700">{{ item.label }}</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
const route = useRoute();

// Générer les éléments du breadcrumb basés sur la route actuelle
const items = computed(() => {
    const result = [{ label: 'Accueil', path: '/' }];

    if (route.path === '/') return result;

    const segments = route.path.split('/').filter(Boolean);
    let currentPath = '';

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        // Obtenir un label plus convivial pour le segment
        let label = segment.charAt(0).toUpperCase() + segment.slice(1);

        // Si c'est un ID, on pourrait aller chercher le nom réel dans les données
        // Par exemple: si c'est /clients/123, on pourrait afficher "Client: John Doe"
        // Pour l'instant, on garde simple
        if (/^\d+$/.test(segment) && index > 0) {
            const entityType = segments[index - 1].slice(0, -1); // Enlever le 's' final
            label = `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} #${segment}`;
        }

        result.push({
            label,
            path: currentPath
        });
    });

    return result;
});
</script>