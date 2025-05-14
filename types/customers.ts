import * as z from 'zod';
import type { GenericListResponce } from "./index";

export type Customer = {
    id: number,
    nom: string,
    prenom: string,
    telephone: string,
    adresse: string,
    dateInscription: string,
    createdAt: string,
    updatedAt: string,
}

export type CustomerList = GenericListResponce<Customer>

export const CustomerSchema = z.object({
    nom: z.string().min(1, { message: "Le nom est requis" }),
    prenom: z.string().min(1, { message: "Le prénom est requis" }),
    telephone: z.string()
        .min(1, { message: "Le téléphone est requis" })
        .regex(/^(6)?[0-9]{8}$/, { 
            message: "Le numéro de téléphone doit être un numéro camerounais valide (ex: 677889922)" 
        }),
    adresse: z.string().min(1, { message: "L'adresse est requise" }),
})

export type CustomerDto = z.infer<typeof CustomerSchema>