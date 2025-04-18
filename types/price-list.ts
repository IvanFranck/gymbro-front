import * as z from "zod"
import type { MembershipType } from "./membership-types"

export interface PriceList {
    id: number,
    prix: number,
    genre: string,
    dureeJours: number,
    actif: boolean,
    createdAt: string
    updatedAt: string
    typeAbonnement: MembershipType
}

export const PriceListSchema = z.object({
    prix: z.number().min(0, { message: "Le prix est requis" }),
    genre: z.enum(["Homme", "Femme"], { errorMap: () => ({ message: "Le genre est requis" }) }),
    dureeJours: z.number().min(1, { message: "La durée est requise" }),
    typeAbonnementId: z.number(),
    actif: z.boolean().optional(),
})

export type PriceListDto = z.infer<typeof PriceListSchema>
