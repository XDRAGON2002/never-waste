import Link from "next/link"

import { Box, Heading, Text } from '@chakra-ui/react'
import { InfoIcon, PhoneIcon, ArrowRightIcon, AtSignIcon } from "@chakra-ui/icons"

const Food = ({foodPost}) => {

    const foodPostData = foodPost.data()

    return (
        <Box w="100%" p={4} m={2} borderRadius={10} borderWidth={1} boxShadow="lg">
            <Link href="/foodposts/[id]" as={`/foodposts/${foodPost.id}`}>
                <a href="#">
                    <Heading color="teal.700"><InfoIcon color="teal.500" h={8} w={8}/> {foodPostData.name}</Heading>
                    <Text fontSize="2xl" color="teal.700" isTruncated><PhoneIcon color="teal.500"/> {foodPostData.contact}</Text>
                    <Text fontSize="2xl" color="teal.700" isTruncated><AtSignIcon color="teal.500"/> {foodPostData.email}</Text>
                    <Text fontSize="2xl" color="teal.700" isTruncated><ArrowRightIcon color="teal.500"/> {foodPostData.address}</Text>
                </a>
            </Link>    
        </Box>
    )
}

export default Food