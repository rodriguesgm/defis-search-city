import { Repository } from "../repository/repository";
import { Location } from "../types/locations";

export class SearcherEngine<M> {

    private readonly filters: any[] = []
    private readonly scores: any[] = []

    private constructor(private repo: Repository<M>) {
    }

    static instance<M>(repo: Repository<M>) {
        const engine = new SearcherEngine(repo)
        return engine
    }

    filterBy(query: string): SearcherEngine<M> {
        this.filters.push(query)
        return this
    }

    scoredBy(location: Location): SearcherEngine<M> {
        this.scores.push(location)
        return this
    }

    execute() {
        const filteredResults = this.repo.findBy(this.filters)
        const scoredResults = this.applyScores(filteredResults)
        return scoredResults
    }

    private applyScores(items: M[]) {
        // TODO - apply scores
        // TODO - paralelize?
        return items
    }
}