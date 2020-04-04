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
     * @param query Name of the city to filter
     * @param location Lat/lng to order the cities near this locatoin
     */
    searchSuggestions(query: string, location?: Location) {
        const engine = SearcherEngine
            .instance(this.repository)
            .filterBy({ key: 'name', value: query})

        if (location) {
            engine.scoredBy({ key: 'location', value: location})
        }

        return engine.execute()
    }
}