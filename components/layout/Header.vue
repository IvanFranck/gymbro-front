<template>
    <header class="bg-white shadow h-16">
      <div class="container mx-auto h-full px-4 flex items-center justify-between">
  
        <!-- Breadcrumb ou titre de page -->
        <div class="flex-1 mx-4">
          <h1 class="text-lg font-medium text-gray-800">
            {{ pageTitle }}
          </h1>
        </div>
  
      </div>
    </header>
  </template>
  
  <script setup>
  const route = useRoute();
  
  // Déterminer le titre de la page basé sur la route
  const pageTitle = computed(() => {
    const pathMap = {
      '/': 'Tableau de bord',
      '/memberships': 'Abonnements',
      '/customers': 'Clients',
      '/incomes': 'Revenus',
      '/settings': 'Paramètres'
    };
  
    return pathMap[route.path] || 'Page';
  });

  </script>