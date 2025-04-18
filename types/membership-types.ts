import * as z from 'zod';
import type { Service } from './services';

export type MembershipTypeService = {
    id: number,
    typeAbonnementId: number,
    serviceId: number,
    service: Service
}

export interface MembershipType {
    id: number,
    nom: string,
    description: string,
    actif: boolean,
    services: number[]
    createdAt: string,
    updatedAt: string,
}

export interface MembershipTypeList extends Omit<MembershipType, 'services'> {
    services: MembershipTypeService[];
}

export const MembershipTypeSchema = z.object({
    nom: z.string().min(1, { message: "Le nom est requis" }),
    description: z.string().optional(),
    actif: z.boolean().optional(),
    services: z.number().array().optional()
})

export type MembershipTypeDto = z.infer<typeof MembershipTypeSchema>