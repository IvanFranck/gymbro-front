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

export interface CreateServiceDto {
    nom: string,
    description?: string,
    dureeStandard?: number,
    capaciteMax?: number,
    actif?: boolean,
}

export interface UpdateServiceDto {
    nom?: string,
    description?: string,
    dureeStandard?: number,
    capaciteMax?: number,
    actif?: boolean,
}
    