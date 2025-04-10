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
      
      <!-- Boutons de démonstration pour les toasts et modales -->
      <div class="mt-8 flex flex-wrap gap-4">
        <UButton @click="showSuccessToast">Afficher Toast Succès</UButton>
        <UButton color="red" @click="showErrorToast">Afficher Toast Erreur</UButton>
        <UButton color="yellow" @click="showWarningToast">Afficher Toast Avertissement</UButton>
        <UButton color="blue" @click="showInfoToast">Afficher Toast Info</UButton>
        <UButton color="purple" @click="openExampleModal">Ouvrir une Modale</UButton>
      </div>
    </div>
  </template>
  
  <script setup>
  import {useToast}  from "/composables/useToast.ts";
  // Données factices pour les statistiques
  const stats = [
    { label: 'Abonnements actifs', value: '1,482', change: 12 },
    { label: 'Nouvelles inscriptions', value: '128', change: 8.2 },
    { label: 'Total clients', value: '3,624', change: 3.2 },
    { label: 'Revenus du mois', value: '52,489€', change: 7.4 }
  ];
  
  // Utilisation des toasts
  const toast = useToast();
  const showSuccessToast = () => toast.success('Opération réussie avec succès!');
  const showErrorToast = () => toast.error('Une erreur est survenue.');
  const showWarningToast = () => toast.warning('Attention: cette action est irréversible.');
  const showInfoToast = () => toast.info('Nouvelle mise à jour disponible.');
  
  // Utilisation des modales
  const modal = useModal();
  const openExampleModal = () => {
    modal.openModal(resolveComponent('ExampleModalContent'), {
      message: 'Ceci est un exemple de contenu de modale.'
    }, {
      title: 'Exemple de Modale',
      width: 'md',
      showFooter: true,
      showCancel: true
    });
  };
  </script>