<!-- components/ui/Modal.vue -->
<template>
    <div>
      <template v-for="modal in modals" :key="modal.id">
        <Teleport to="body">
          <div class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Overlay -->
            <div 
              class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" 
              @click="modal.options.closeOnClickOutside ? closeModal(modal.id) : null"
            />
            
            <!-- Contenu de la modale -->
            <div 
              class="relative bg-white rounded-lg shadow-xl overflow-hidden transform transition-all"
              :class="{
                'max-w-sm': modal.options.width === 'sm',
                'max-w-md': modal.options.width === 'md',
                'max-w-lg': modal.options.width === 'lg',
                'max-w-2xl': modal.options.width === 'xl',
                'max-w-4xl': modal.options.width === '2xl',
              }"
            >
              <!-- En-tête de la modale -->
              <div v-if="modal.options.title" class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ modal.options.title }}
                </h3>
                <button 
                  class="absolute top-4 right-4 text-gray-400 hover:text-gray-500" 
                  aria-label="Fermer"
                  @click="closeModal(modal.id)"
                >
                  <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
                </button>
              </div>
              
              <!-- Corps de la modale -->
              <div class="p-6">
                <component 
                  :is="modal.component" 
                  v-bind="modal.props" 
                  @close="closeModal(modal.id)" 
                />
              </div>
              
              <!-- Pied de modale (optionnel) -->
              <div v-if="modal.options.showFooter" class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <UButton 
                  v-if="modal.options.showCancel" 
                  variant="outline" 
                  @click="closeModal(modal.id)"
                >
                  {{ modal.options.cancelText || 'Annuler' }}
                </UButton>
                <slot name="footer" :modal="modal" :close="() => closeModal(modal.id)"/>
              </div>
            </div>
          </div>
        </Teleport>
      </template>
    </div>
  </template>
  
  <script setup>
  const { modals, closeModal } = useModal();
  </script>