import { SuggestionsRepository } from "./suggestions-repository";
import { SearcherEngine } from "../searcher/searcher-engine";
import { Location } from "../types/locations";

export class SuggestionsService {

    constructor(private repository: SuggestionsRepository = new SuggestionsRepository()) {

    }

    searchSuggestions(query: string, location?: Location) {
        const engine = SearcherEngine.instance(this.repository).filterBy(query)
        if (location) {
            engine.scoredBy(location)
        }
        return engine.execute()
    }
}