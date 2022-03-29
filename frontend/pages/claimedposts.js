import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth";

import { Heading } from "@chakra-ui/react";

import { auth, db } from "../firebase/clientApp"
import FoodList from "../components/foodList"

const ClaimedPosts = () => {

    const [user, loading, error] = useAuthState(auth)
    const [yourClaimedPosts, setYourClaimedPosts] = useState([])

    useEffect(async() => {
        if (!loading) {
            const posts = await getDocs(query(collection(db, "foodPosts"), where("claimerEmail", "==", user.email)))
            setYourClaimedPosts(posts)
        }
    }, [loading])

    return (
        <div>
            <Heading color="teal.700" size="4xl" m={4}>Claimed Posts</Heading>
            <FoodList foodPosts={yourClaimedPosts.docs}/>
        </div>
    )
}

export default ClaimedPosts