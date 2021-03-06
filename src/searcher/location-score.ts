import { Location } from "../types/locations"

/**
 * Class to calculate the score based on the Location
 * PS: To be honest, found those methods in stackoverflow and adapted to my case
 */
export class LocationScore {
    
    calculateLocationScore(itemLocation: Location, scoreLocation: Location) {
        const distanceKm = this.getDistanceFromLatLonInKm(
            itemLocation.latitude, itemLocation.longitude,
            scoreLocation.latitude, scoreLocation.longitude
        )
        let score = 1000 - distanceKm
        score = score > 0 ? Math.round(score/10) / 100 : 0
        return score
    }
    
    private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 6371 // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1)  // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1)
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        var d = R * c // Distance in km
        return d
    }
  
    private deg2rad(deg: number) {
        return deg * (Math.PI/180)
    }
}