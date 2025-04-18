<template>
  <div class="min-h-screen flex">
    <!-- Sidebar / Navigation Latérale -->
    <aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:block">
      <div class="h-16 flex items-center px-4 border-b border-gray-200">
        <span class="text-xl font-bold text-gray-800">MonApp</span>
      </div>
      <div class="py-4 px-3">
        <LayoutSidebar />
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <LayoutHeader />

      <!-- Main Content with padding -->
      <main class="flex-grow p-6">
        <LayoutBreadcrumb />
        <div class="mt-6">
          <slot />
        </div>
      </main>

      <!-- Footer -->
      <LayoutFooter />
    </div>
  </div>
</template>

<script setup>
const colormode = useColorMode();

onMounted(() => {
  colormode.preference = 'light';
})
</script>