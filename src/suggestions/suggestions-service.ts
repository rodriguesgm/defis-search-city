import { SuggestionsRepository } from "./suggestions-repository";
import { SearcherEngine } from "../searcher/searcher-engine";
import { Location } from "../types/locations";

export class SuggestionsService {

    constructor(private repository: SuggestionsRepository = new SuggestionsRepository()) {
        // empty constructor
    }

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