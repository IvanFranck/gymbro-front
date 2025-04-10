<template>
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <LayoutHeader />
      
      <!-- Main Content -->
      <main class="flex-grow container mx-auto px-4 py-6">
        <LayoutBreadcrumb />
        <div class="mt-12">
          <slot />
        </div>
      </main>
      
      <!-- Footer -->
      <LayoutFooter />
      
      <!-- Toast Notifications (fixed position) -->
      <UiToast />
      
      <!-- Modal Container (portaled) -->
      <UiModal />
    </div>
  </template>
  
  <script setup>
  // Rien à faire ici, les composants sont auto-importés grâce à Nuxt 3
  </script>