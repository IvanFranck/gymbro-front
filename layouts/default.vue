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
  </div>
</template>

<script setup>
const colormode = useColorMode();

onMounted(() => {
  colormode.preference = 'light';
})
</script>