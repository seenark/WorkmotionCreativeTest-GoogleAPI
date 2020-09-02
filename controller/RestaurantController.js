const express = require('express')
const axios = require('axios')

exports.index = async (req,res) => {
    const {keyword, place}  =  req.query

    if (keyword == null) res.status(400).send("keyword is null")
    if (place == null) res.status(400).send("place is null")
    
    const apiKey = 'AIzaSyANjmFgFg8RWsY4Ndxl49HXQbEfAwpoyQk'
    const uriForPlace = `https://maps.googleapis.com/maps/api/geocode/json?`
    
    const encodedUriForPlace = encodeURI(uriForPlace)
    try {
        const locationResponse = await axios.get(encodedUriForPlace,{
            params:{
                address:place,
                key:apiKey
            }
        })
        const result = locationResponse.data.results
        if (!result.length == 0) {
            const {location} = result[0].geometry
                const uriForRestaurant = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
                const encodedURIForRestaurant = encodeURI(uriForRestaurant);
                const restaurantResponse = await axios.get(encodedURIForRestaurant,{
                    params:{
                        location:`${location.lat}, ${location.lng}`,
                        radius:'5000',
                        type:'restaurant',
                        language:'th',
                        fields:'formatted_address,name',
                        keyword:keyword,
                        key:apiKey
                    }
                })
                const restaurantResult = restaurantResponse.data
                res.status(200).send(restaurantResult)
        }else{
            res.status(400).send("No any result")
        }
    }catch (error) {
        res.send(error)
    }

}