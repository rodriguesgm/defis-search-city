import { SuggestionsService } from "./suggestions-service";
import { Location } from "../types/locations";
import { BadRequest } from "../types/errors";

/**
 * Controller to receive the request
 */
export class SuggestionsController {

    constructor(private service: SuggestionsService = new SuggestionsService()) {
        // empty constructor
    }

    getSuggestions(req) {
        const params = req.query || {}
        const query = params.q
        if (!query) {
            throw new BadRequest('MISSING_PARAM', ['query'])
        }

        let location: Location = null
        if (params.latitude && params.longitude) {
            location = {
                latitude: params.latitude,
                longitude: params.longitude
            }
        }

        return this.service.searchSuggestions(
            query, location
        )
    }
}