import { MEMBERSHIP_TYPES, MEMBERSHIP_TYPES_SERVICES } from "~/constants/api-routes";
import type { GenericListResponce } from "~/types";
import type { MembershipTypeDto, MembershipTypeList } from "~/types/membership-types";

export const useMembershipType = () => {
    async function handleFetchMembershipTypes(
        page: number,
        limit: number,
        search?: string,
    ) {
        const { data, error: fetchError } = await useApi<GenericListResponce<MembershipTypeList[]>>(MEMBERSHIP_TYPES, {
            params: {
                search,
                page,
                limit,
                actif: true
            }
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value) {
            return data.value
        }
    }

    async function handleCreateMembershipType(
        payload: MembershipTypeDto
    ) {
        const { data, error: fetchError } = await useApi<MembershipTypeList>(MEMBERSHIP_TYPES, {
            method: "POST",
            body: payload
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    async function handleUpdateMembershipType(
        payload: MembershipTypeDto,
        id: number
    ) {
        const { data, error: fetchError } = await useApi<MembershipTypeList>(`${MEMBERSHIP_TYPES}/${id}`, {
            method: "PATCH",
            body: payload
        });

        if (fetchError.value)
            throw fetchError.value

        if (data.value)
            return data.value
    }

    async function handleDeleteMembershipType(id: number) {
        const { error: fetchError } = await useApi<MembershipTypeList>(`${MEMBERSHIP_TYPES}/${id}/deactivate`, {
            method: "PATCH",
        });

        if (fetchError.value)
            throw fetchError.value
    }

    async function handleGetServicesByMembershipTypeId(id: number) {
        const { error: fetchError } = await useApi<MembershipTypeList>(`${MEMBERSHIP_TYPES_SERVICES}/${id}`, {
            method: "GET",
        });

        if (fetchError.value)
            throw fetchError.value
    }

    return {
        handleCreateMembershipType,
        handleDeleteMembershipType,
        handleFetchMembershipTypes,
        handleUpdateMembershipType,
        handleGetServicesByMembershipTypeId
    }
}