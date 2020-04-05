import { expect } from 'chai'
import { stub } from 'sinon'
import { SuggestionsService } from '../../../src/suggestions/suggestions-service';
import { SuggestionsRepository } from '../../../src/suggestions/suggestions-repository';
import { SearcherEngine } from '../../../src/searcher/searcher-engine';

describe('suggestions-service', () => {
    let service, repository, engine, instance
    beforeEach(() => {
        repository = new SuggestionsRepository()
        engine = {
            filterBy: stub(),
            scoredBy: stub(),
            execute: stub()
        }
        instance = stub(SearcherEngine, 'instance')
        instance.returns(engine)
        engine.filterBy.returns(engine)
        engine.scoredBy.returns(engine)

        service = new SuggestionsService(repository)
    })

    afterEach(() => {
        instance.restore()
    })

    it('set the query filter', () => {
        service.searchSuggestions({
            query: 'London'
        })
        
        expect(engine.filterBy.firstCall.args).to.be.deep.eq([{
            key: 'ascii',
            value: 'London'
        }])
        expect(engine.scoredBy.notCalled).to.be.true
    })

    it('set the location score when defined', () => {
        service.searchSuggestions({
            query: 'London'
        }, {
            location: {
                latitude: -14,
                longitude: -15
            }
        })
        
        expect(engine.scoredBy.firstCall.args).to.be.deep.eq([{
            key: 'location',
            value: {
                latitude: -14,
                longitude: -15
            }
        }])
    })

    it('returns the results from the engine', () => {
        const expectedResult = [{ name: 'Test City' }]
        engine.execute.returns(expectedResult)

        const result = service.searchSuggestions('London', {
            latitude: -14,
            longitude: -15
        })

        expect(result).to.be.deep.eq(expectedResult)
    })
})