const request = require('postman-request')

const geocoding = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoicm9hZGEiLCJhIjoiY2thMGdwdW1kMG5pajNlcnlzYXA1M3kydCJ9.bropqRxXIF3IL8DSSFVNmA"

    request({url:url,json:true}, (error,res)=>{
        if(error){
            callback('Unable to reach servece',undefined)
        }else if(res.body.error || res.body.features.length===0){
            callback('Unable to find location, Try another search ',undefined)
        
        }else{
            callback(undefined,{
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
            console.log('latitude in geocode is ',res.body.features[0].center[1]);

        }
    })

}
module.exports=geocoding

