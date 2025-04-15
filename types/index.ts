export interface GenericListResponceMetadata {
    total: number,
    page: number,
    limit: number,
    totalPages: number
}

export interface GenericListResponce<T> {
    data: T,
    meta: GenericListResponceMetadata
}