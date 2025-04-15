import * as z from 'zod';

export interface MembershipType {
    id: number,
    nom: string,
    niveau: string,
    dureeJours: number,
    prix: number,
    description: string,
    actif: boolean,
    createdAt: string
    updatedAt: string
}

export const MembershipTypeSchema = z.object({
    nom: z.string().min(1, { message: "Le nom est requis" }),
    dureeJours: z.number().min(1, {message: 'La durée doit être au supérieure à 1 jour'}),
    prix: z.number().min(1, {message: 'La prix doit être au supérieure à 1 Fcfa'}),
    niveau: z.string().optional(),
    description: z.string().optional(),
    actif: z.boolean().optional(),
})

export type MembershipTypeDto = z.infer<typeof MembershipTypeSchema>