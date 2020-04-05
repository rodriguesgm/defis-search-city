import { Repository } from "../repository/repository"
import suggestionsDatabase from '../repository/database'
import { SearcherParam, SearchableItem } from "../types/searcher"

/**
 * Repository to access a databe os suggestions/cities
 */
export class SuggestionsRepository extends Repository<any> {

    /**
     * Find all suggestions items converting to a searchable item, which means,
     * they can be used in the Search engine and be classified based on a score
     * @param filters Filters to apply in the query
     */
    findSearchableBy(filters: SearcherParam[]): SearchableItem[] {
        let results = suggestionsDatabase
        filters.forEach(filter => {
            results = results.filter(r => 
                r[filter.key] && 
                r[filter.key].toLowerCase().indexOf(filter.value.toLowerCase()) !== -1
            )
        });
        return results.map(r => ({
                name: r.name,
                latitude: Number(r.lat),
                longitude: Number(r.long)
            }
        ))
    }
}