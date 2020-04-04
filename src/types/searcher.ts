
export interface SearcherParam {
    key: string
    value: any
}

export interface SearchableItem {
    name: string
    score?: number
    latitude?: number
    longitude?: number
}