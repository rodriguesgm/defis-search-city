import { SearcherParam, SearchableItem } from "../types/searcher"

/**
 * Common class to be used by repositories
 */
export abstract class Repository<M> {
    abstract findSearchableBy(filters: SearcherParam[]): SearchableItem[];
}