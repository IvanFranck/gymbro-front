import * as z from 'zod';
export interface Service {
    id: number,
    nom: string,
    description?: string,
    dureeStandard?: number,
    capaciteMax?: number,
    actif: boolean,
    createdAt: string,
    updatedAt: string
}

export interface UpdateServiceDto {
    nom?: string,
    description?: string,
    dureeStandard?: number,
    capaciteMax?: number,
    actif?: boolean,
}

export const CreateServiceSchema = z.object({
    nom: z.string().min(1, { message: "Le nom est requis" }),
    description: z.string().optional(),
    dureeStandard: z.number().optional(),
    capaciteMax: z.number().optional(),
    actif: z.boolean().optional(),
})

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>