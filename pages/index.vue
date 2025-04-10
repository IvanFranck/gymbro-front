<template>
    <div>
      <h1 class="text-2xl font-bold mb-6">Tableau de Bord</h1>
      
      <!-- Contenu de la page -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Cartes statistiques -->
        <div v-for="(stat, index) in stats" :key="index" class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">{{ stat.label }}</h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-2xl font-semibold">{{ stat.value }}</span>
            <span 
              :class="stat.change > 0 ? 'text-green-600' : 'text-red-600'"
              class="ml-2 text-sm font-medium"
            >
              {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Données factices pour les statistiques
  const stats = [
    { label: 'Abonnements actifs', value: '1,482', change: 12 },
    { label: 'Nouvelles inscriptions', value: '128', change: 8.2 },
    { label: 'Total clients', value: '3,624', change: 3.2 },
    { label: 'Revenus du mois', value: '52,489€', change: 7.4 }
  ];
  </script>