import * as z from 'zod';

export interface PaymentMethod {
    id: number,
    nom: string,
    description: string,
    actif: boolean,
    createdAt: string
    updatedAt: string
}

export const PaymentMethodSchema = z.object({
    nom: z.string().min(1, { message: "Le nom est requis" }),
    description: z.string().optional(),
    actif: z.boolean().optional(),
})

export type PaymentMethodDto = z.infer<typeof PaymentMethodSchema>