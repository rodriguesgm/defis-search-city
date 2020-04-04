import { Repository } from "../repository/repository"
import suggestionsDatabase from '../repository/database'
import { SearcherParam, SearchableItem } from "../types/searcher"

export class SuggestionsRepository extends Repository<any> {
    findSearchableBy(filters: SearcherParam[]): SearchableItem[] {
        let results = suggestionsDatabase
        filters.forEach(filter => {
            results = results.filter(r => 
                r[filter.key] && 
                r[filter.key].indexOf(filter.value) !== -1
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