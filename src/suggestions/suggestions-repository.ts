import { Repository } from "../repository/repository"
import suggestionsDatabase from '../repository/database'
import { FilterSearcher } from "../types/searcher"

export class SuggestionsRepository extends Repository<any> {
    findBy(filters: FilterSearcher[]): any[] {
        let results = suggestionsDatabase
        filters.forEach(filter => {
            results = results.filter(r => 
                r[filter.key] && 
                r[filter.key].indexOf(filter.value) !== -1
            )
        });
        return results
    }
}