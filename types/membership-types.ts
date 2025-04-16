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
    niveau: string,
    dureeJours: number,
    prix: number,
    description: string,
    actif: boolean,
    createdAt: string,
    updatedAt: string,
    services: number[]
}

export interface MembershipTypeList extends Omit<MembershipType, 'services'>{
    services: MembershipTypeService[];
}

export const MembershipTypeSchema = z.object({
    nom: z.string().min(1, { message: "Le nom est requis" }),
    dureeJours: z.number().min(1, {message: 'La durée doit être au supérieure à 1 jour'}),
    prix: z.number().min(1, {message: 'La prix doit être au supérieure à 1 Fcfa'}),
    niveau: z.string().optional(),
    description: z.string().optional(),
    actif: z.boolean().optional(),
    services: z.number().array().optional()
})

export type MembershipTypeDto = z.infer<typeof MembershipTypeSchema>