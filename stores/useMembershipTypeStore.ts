import type { GenericListResponce } from "~/types";
import type { MembershipType, MembershipTypeDto } from "~/types/membership-types";

const {
    handleCreateMembershipType,
    handleDeleteMembershipType,
    handleFetchMembershipTypes,
    handleUpdateMembershipType
} = useMembershipType();

export const useMembershipTypeStore = defineStore('membershipTypeStore', () => {
    const membershipTypes = ref<GenericListResponce<MembershipType[]>>();
    const loading = ref(false);
    const error = ref<string | null>(null)
    const page = ref(1);
    const limit = ref(10);
    const membershipTypeToEdit = ref<MembershipType | null>(null);

    async function fetchMembershipTypes(search?: string) {
        loading.value = true
        try {
            const result = await handleFetchMembershipTypes(page.value, limit.value, search);
            if (result) {
                membershipTypes.value = result;
            }

        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la récupération des offres d'abonnement. Veillez actualiser la page"
                useToast().add({
                    title: error.value,
                    color: "error"
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function createMembershipType(membershipType: MembershipTypeDto): Promise<MembershipType | undefined> {
        loading.value = true
        try {
            const result = await handleCreateMembershipType(membershipType);
            if (result) {
                useToast().add({
                    title: "Offre créée avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la création de l'offre. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function updateMembershipType(membershipType: MembershipTypeDto, id: number): Promise<MembershipType | undefined> {
        loading.value = true;
        try {
            const result = await handleUpdateMembershipType(membershipType, id);
            if (result) {
                useToast().add({
                    title: "Offre modifiée avec succès",
                    color: "success"
                });
                return result;
            }
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la modification de l'offre d'abonnement. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }

    async function deleteMembershipType(id: number) {
        loading.value = true;
        try {
            await handleDeleteMembershipType(id);
            useToast().add({
                title: "Offre supprimée",
                color: "success"
            });
        } catch (err) {
            if (err instanceof Error) {
                error.value = "Une erreur est survenue lors de la suppression de l'offre. Veillez réessayer"
                useToast().add({
                    title: error.value,
                    color: "error",
                })
            }
        } finally {
            loading.value = false;
        }
    }


    function setMembershipTypeToEdit(value: MembershipType | null) {
        membershipTypeToEdit.value = value;
    }

    return {
        fetchMembershipTypes,
        createMembershipType,
        updateMembershipType,
        deleteMembershipType,
        setMembershipTypeToEdit,
        membershipTypeToEdit,
        membershipTypes,
        loading
    }
})