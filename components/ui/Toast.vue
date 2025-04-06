<!-- components/ui/Toast.vue -->
<template>
    <div class="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      <TransitionGroup name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          class="px-4 py-3 rounded shadow-lg max-w-md flex items-center"
          :class="toastClasses[toast.type]"
        >
          <!-- Icône adaptée au type -->
          <UIcon 
            :name="toastIcons[toast.type]" 
            class="mr-2 shrink-0"
          />
          
          <!-- Message -->
          <span>{{ toast.message }}</span>
          
          <!-- Bouton fermer -->
          <button 
            class="ml-3 shrink-0 text-current opacity-70 hover:opacity-100" 
            aria-label="Fermer"
            @click="removeToast(toast.id)"
          >
            <UIcon name="i-heroicons-x-mark" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </template>
  
  <script setup>
  const { toasts, removeToast } = useToast();
  
  // Classes CSS selon le type de toast
  const toastClasses = {
    success: 'bg-green-100 text-green-800 border-l-4 border-green-500',
    error: 'bg-red-100 text-red-800 border-l-4 border-red-500',
    warning: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500',
    info: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
  };
  
  // Icônes selon le type de toast
  const toastIcons = {
    success: 'i-heroicons-check-circle',
    error: 'i-heroicons-exclamation-circle',
    warning: 'i-heroicons-exclamation-triangle',
    info: 'i-heroicons-information-circle'
  };
  </script>
  
  <style scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  .toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  </style>