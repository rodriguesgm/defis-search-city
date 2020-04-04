import { FilterSearcher } from "../types/searcher"

export abstract class Repository<M> {
    abstract findBy(filters: FilterSearcher[]): M[];
}