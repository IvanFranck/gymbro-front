<template>
    <div>
        <h1 class="heading-title-1">Paramètres</h1>
        <p class="text-gray-500 font-light text-sm">Gérez vos services, types d'abonnements, moyens de paiement, et
            autres.</p>

        <div class="w-full mt-4 border-b border-gray-100">
            <div class="w-full flex gap-2">
                <UButton v-for="tab in settingsNavigation" :key="tab.id" color="neutral" variant="ghost" size="lg"
                    :active="activeTabs === tab.id" active-class="border-b border-primary"
                    class="rounded-none cursor-pointer" @click="handleChangeTab(tab.id)">
                    {{ tab.title }}
                </UButton>
            </div>

        </div>
        <section class="mt-8">
            <component :is="settingsNavigation.find(a => a.id === activeTabs)?.component" />
        </section>
    </div>
</template>

<script lang="ts" setup>
const activeTabs = ref(1);
const settingsNavigation = [
    {
        id: 1,
        title: "Services",
        component: resolveComponent('PageSettingsServices'),
    },
    {
        id: 2,
        title: "Offres d'Abonnement",
        component: resolveComponent('PageSettingsMembershipsType'),
    },
    {
        id: 5,
        title: "Grille des Prix",
        component: resolveComponent('PageSettingsPriceList'),
    },
    {
        id: 3,
        title: "Méthodes de Paiement",
        component: resolveComponent('PageSettingsPaymentMethods'),
    },
    {
        id: 4,
        title: "Status",
        component: resolveComponent('PageSettingsStatus'),
    },
]

const handleChangeTab = (id: number) => {
    activeTabs.value = id;
}
</script>