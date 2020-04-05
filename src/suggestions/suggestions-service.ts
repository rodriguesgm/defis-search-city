import { SuggestionsRepository } from "./suggestions-repository";
import { SearcherEngine } from "../searcher/searcher-engine";
import { Location } from "../types/locations";

/**
 * Service to implement businuess logic of Suggestions
 */
export class SuggestionsService {

    constructor(private repository: SuggestionsRepository = new SuggestionsRepository()) {
        // empty constructor
    }

    /**
     * Seach all suggestions using the params passed.
     * The locations is used to score the suggestions by proximity
     * @param filters Filters to apply in the query. 
     *  query: name ignoring accents
     *  country: Country in two letters abbreviation
     * @param scores Scores to classify and sort the results
     *  Lat/lng to order the cities near this locatoin
     */
    searchSuggestions(filters: { query: string, country?: string }, scores?: { location?: Location }) {
        const engine = SearcherEngine
            .instance(this.repository)
            .filterBy({ key: 'ascii', value: filters.query})
        
        if (filters.country) {
            engine.filterBy({ key: 'country', value: filters.country})
        }

        if (scores) {
            if (scores.location) {
                engine.scoredBy({ key: 'location', value: scores.location})
            }
        }

        return engine.execute()
    }
}