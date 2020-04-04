import { Repository } from "../repository/repository";
import { Location } from "../types/locations";
import { SearcherParam, SearchableItem } from "../types/searcher"
import { LocationScore } from "./location-score"

/**
 * Class to execute any search applying filter and calculating scores based on the params
 */
export class SearcherEngine<M> {

    private readonly filters: SearcherParam[] = []
    private readonly scores: SearcherParam[] = []

    private constructor(private repo: Repository<M>) {
        // empty constructor
    }

    /**
     * Returns an instance of the search engine
     * @param repo 
     */
    static instance<M>(repo: Repository<M>) {
        return new SearcherEngine(repo)
    }

    /**
     * Add a filter to be applied in the repository to ignore filter some data
     * @param filter Filter field
     */
    filterBy(filter: SearcherParam): SearcherEngine<M> {
        this.filters.push(filter)
        return this
    }

    /**
     * Add a param to be considered in the score sytem.
     * The higher the score, the result will be showed first
     * @param score 
     */
    scoredBy(score: SearcherParam): SearcherEngine<M> {
        this.scores.push(score)
        return this
    }

    /**
     * Run the query applying the filters and the scores to collect
     * the result data
     */
    execute(): SearchableItem[] {
        const filteredResults = this.repo.findSearchableBy(this.filters)
        const scoredResults = this.applyScores(filteredResults)
        return scoredResults.sort((a, b) => b.score - a.score);
    }

    /**
     * Apply all the scores and add the final score in each seachable item
     * @param items 
     */
    private applyScores(items: SearchableItem[]) {
        if (!this.scores.length) {
            return items
        }
        let scoredItems = items
        // TODO - fix overriding scores
        this.scores.forEach((s: SearcherParam) => {
            scoredItems = scoredItems.map(item => {
                let scorePoint = 0
                if (s.key === 'location') {
                    scorePoint = new LocationScore().calculateLocationScore(
                        item,
                        s.value
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