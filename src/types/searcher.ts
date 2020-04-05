
export interface SearcherParam {
    key: string
    value: any
}

export interface SearchableItem {
    name: string
    country: string
    score?: number
    latitude?: number
    longitude?: number
}