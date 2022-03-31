const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371
    var dLat = (lat2 - lat1) * (Math.PI/180)
    var dLon = (lon2 - lon1) * (Math.PI/180)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2) 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c
    return (Math.round(d) - 8784)
}

export default getDistance