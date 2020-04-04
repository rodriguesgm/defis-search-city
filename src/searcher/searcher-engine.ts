import { Repository } from "../repository/repository";
import { Location } from "../types/locations";
import { SearcherParam, SearchableItem } from "../types/searcher"
import { LocationScore } from "./location-score"

export class SearcherEngine<M> {

    private readonly filters: SearcherParam[] = []
    private readonly scores: SearcherParam[] = []

    private constructor(private repo: Repository<M>) {
    }

    static instance<M>(repo: Repository<M>) {
        const engine = new SearcherEngine(repo)
        return engine
    }

    filterBy(filter: SearcherParam): SearcherEngine<M> {
        this.filters.push(filter)
        return this
    }

    scoredBy(score: SearcherParam): SearcherEngine<M> {
        this.scores.push(score)
        return this
    }

    execute() {
        const filteredResults = this.repo.findSearchableBy(this.filters)
        const scoredResults = this.applyScores(filteredResults)
        return scoredResults.sort((a, b) => b.score - a.score);
    }

    private applyScores(items: SearchableItem[]) {
        if (!this.scores.length) {
            return items
        }
        let scoredItems = items
        // TODO - fix overriding scores
        this.scores.forEach((score: SearcherParam) => {
            scoredItems = scoredItems.map(item => {
                let scorePoint = 0
                if (score.key === 'location') {
                    const scoreValue = score.value as Location
                    scorePoint = new LocationScore().calculateLocationScore(
                        item,
                        scoreValue.latitude,
                        scoreValue.longitude
                    )
                }
                return {
                    score: scorePoint,
                    ...item
                }
            })
        })
        return scoredItems
    }
}