import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";

import { Heading } from "@chakra-ui/react";

import { auth, db } from "../firebase/clientApp"
import FoodList from "../components/foodList"

const YourPosts = () => {

    const [user, loading, error] = useAuthState(auth)
    const [yourFoodPosts, setYourFoodPosts] = useState([])

    useEffect(async() => {
        if (!loading) {
            const posts = await getDocs(query(collection(db, "foodPosts"), where("email", "==", user.email)));
            setYourFoodPosts(posts)
        }
    }, [loading])

    return (
        <div>
            <Heading color="teal.700" size="4xl" m={4}>Your Posts</Heading>
            <FoodList foodPosts={yourFoodPosts.docs}/>
        </div>
    )
}

export default YourPosts