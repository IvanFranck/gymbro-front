import * as z from "zod"
import type { MembershipType } from "./membership-types"

export interface PricingItem {
    id: number,
    prix: number,
    genre: string,
    dureeJours: number,
    actif: boolean,
    typeAbonnementId: number,
    createdAt: string
    updatedAt: string
}
export interface PriceList extends PricingItem {
    typeAbonnement: MembershipType
}

export const PriceListSchema = z.object({
    prix: z.number().min(0, { message: "Le prix est requis" }),
    genre: z.string({message: 'le genre est requis'}),
    dureeJours: z.number().min(1, { message: "La durée est requise" }),
    typeAbonnementId: z.number(),
    actif: z.boolean().optional(),
})

export type PriceListDto = z.infer<typeof PriceListSchema>
