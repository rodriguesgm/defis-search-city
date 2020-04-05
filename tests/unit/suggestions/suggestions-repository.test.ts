import { expect } from 'chai'

import { SuggestionsRepository } from "../../../src/suggestions/suggestions-repository";

describe('suggestions-repository', () => {
    let repository
    beforeEach(() => {
        // TODO - should mock the data for the suggetions
        repository = new SuggestionsRepository()
    })

    it('test', () => {
        const results = repository.findSearchableBy([{
            key: 'name',
            value: 'London'
        }])
        console.log(results)
        expect(results).to.be.deep.eq([ 
            { name: 'London', latitude: 42.98339, longitude: -81.23304 },
            { name: 'London', latitude: 37.12898, longitude: -84.08326 },
            { name: 'Londontowne', latitude: 38.93345, longitude: -76.54941 },
            { name: 'London', latitude: 39.88645, longitude: -83.44825 },
            { name: 'New London', latitude: 41.35565, longitude: -72.09952 },
            { name: 'Londonderry', latitude: 42.86509, longitude: -71.37395 },
            { name: 'New London', latitude: 44.39276, longitude: -88.73983 }
        ])
    })
})