import { SearcherParam, SearchableItem } from "../types/searcher"

export abstract class Repository<M> {
    abstract findSearchableBy(filters: SearcherParam[]): SearchableItem[];
}