import Link from "next/link"
import { useState, useEffect } from "react"

import { Box, Heading, Text } from '@chakra-ui/react'
import { InfoIcon, PhoneIcon, ArrowRightIcon, AtSignIcon, ViewIcon } from "@chakra-ui/icons"

import getDistance from "../utils/distance"

const Food = ({foodPost}) => {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [distance, setDistance] = useState(0)
    const foodPostData = foodPost.data()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setDistance(getDistance(foodPostData.latitude, foodPostData.longitude, latitude, longitude))
        })
    }, [])

    return (
        <Box w="100%" p={4} m={2} borderRadius={10} borderWidth={1} boxShadow="lg">
            <Link href="/foodposts/[id]" as={`/foodposts/${foodPost.id}`}>
                <a href="#">
                    <Heading color="teal.700"><InfoIcon color="teal.500" h={8} w={8}/> {foodPostData.name}</Heading>
                    <Text fontSize="2xl" color="teal.700" isTruncated><PhoneIcon color="teal.500"/> {foodPostData.contact}</Text>
                    <Text fontSize="2xl" color="teal.700" isTruncated><AtSignIcon color="teal.500"/> {foodPostData.email}</Text>
                    <Text fontSize="2xl" color="teal.700" isTruncated><ViewIcon color="teal.500"/> {distance} Km</Text>
                </a>
            </Link>    
        </Box>
    )
}

export default Food