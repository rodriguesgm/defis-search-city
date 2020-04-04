import { expect } from 'chai'
import { stub } from 'sinon'
import { SuggestionsController } from '../../../src/suggestions/suggestions-controller'
import { SuggestionsService } from '../../../src/suggestions/suggestions-service'

describe('suggestions-controller', function() {
  let controller, service
  beforeEach(() => {
    service = new SuggestionsService()
    controller = new SuggestionsController(service)

    stub(service, 'searchSuggestions')
  })

  afterEach(() => {
    service.searchSuggestions.restore()
  })

  describe('getSuggestions', () => {
    it('throws BadRequest when has no query', function() {
      expect(() => controller.getSuggestions({
        query: {}
      })).to.throw('BadRequest: MISSING_PARAM: query');
    })

    it('calls service with query and no location', () => {
      controller.getSuggestions({
        query: { q: 'London' }
      })

      expect(service.searchSuggestions.callCount).to.be.eq(1)
      expect(service.searchSuggestions.firstCall.args).to.be.deep.eq(['London', null])
    })

    it('calls service with query and location', () => {
      controller.getSuggestions({
        query: { q: 'London', latitude: -14, longitude: -15 }
      })

      expect(service.searchSuggestions.callCount).to.be.eq(1)
      expect(service.searchSuggestions.firstCall.args).to.be.deep.eq(['London', {
        latitude: -14,
        longitude: -15
      }])
    })

    it('returns service result', () => {
      const expectResult = [{ name: 'City Test' }]
      service.searchSuggestions.returns(expectResult)

      const result = controller.getSuggestions({
        query: { q: 'London' }
      })

      expect(result).to.be.deep.eq(expectResult)
    })
  })
})