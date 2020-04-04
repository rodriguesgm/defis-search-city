import { Repository } from "../repository/repository";

class SuggestionModel {

}

export class SuggestionsRepository extends Repository<SuggestionModel> {
    findBy(filters: any[]): SuggestionModel[] {
        return []
    }
}