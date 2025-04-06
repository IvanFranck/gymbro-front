<template>
    <footer class="bg-gray-100 border-t border-gray-200 py-4 mt-auto">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <!-- Copyright -->
          <div class="text-sm text-gray-600">
            &copy; {{ new Date().getFullYear() }} MonApp. Tous droits réservés.
          </div>
          
          <!-- Liens et version -->
          <div class="flex space-x-4 mt-2 md:mt-0">
            <NuxtLink to="/cgu" class="text-sm text-gray-600 hover:text-primary-500">Conditions d'utilisation</NuxtLink>
            <NuxtLink to="/confidentialite" class="text-sm text-gray-600 hover:text-primary-500">Politique de confidentialité</NuxtLink>
            <span class="text-sm text-gray-500">v{{ appVersion }}</span>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  // Version de l'application
  const appVersion = '1.0.0';
  </script>