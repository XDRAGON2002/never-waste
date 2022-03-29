import Link from "next/dist/client/link";
import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"

import { Button, Heading } from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons"

import { db } from "../../firebase/clientApp"
import FoodList from "../../components/foodList"

const FoodPosts = () => {

    const [foodPosts, setFoodPosts] = useState([])
    
    useEffect(async() => {
        const posts = await getDocs(query(collection(db, "foodPosts"), where("isClaimed", "==", false)))
        setFoodPosts(posts)
    }, [])

    return (
        <div>
            <Heading color="teal.700" size="4xl" m={4}>All Posts</Heading>
            {<FoodList foodPosts={foodPosts.docs}/>}
            <Link href="/addpost">
                <Button bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg"><PlusSquareIcon w={30} h={30} color="white"/></Button>
            </Link>
        </div>
    )
}

export default FoodPosts