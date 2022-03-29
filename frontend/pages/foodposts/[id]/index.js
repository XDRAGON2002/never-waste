import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { Heading, Text, Input, Button } from "@chakra-ui/react";
import { StarIcon, AtSignIcon, PhoneIcon, ChevronRightIcon, BellIcon, ArrowUpIcon, ArrowRightIcon, QuestionOutlineIcon, DeleteIcon } from "@chakra-ui/icons"

import { auth, db } from "../../../firebase/clientApp"

const PostDetails = () => {

    const router = useRouter()
    const id = router.query.id
    const [item, setItem] = useState({})
    const [claimerContact, setClaimerContact] = useState("")
    const [user, loading, error] = useAuthState(auth)

    const handleClaim = async() => {
        const data = {
            isClaimed: true,
            cid: user.uid,
            claimerName: user.displayName,
            claimerEmail: user.email,
            claimerContact: claimerContact,
        }
        const foodDoc = doc(db, "foodPosts", id)
        await updateDoc(foodDoc, data)
        setClaimerContact("")
    }

    const handleClaimerContact = (e) => {
        setClaimerContact(e.target.value)
    }

    const handlePostDelete = async() => {
        await deleteDoc(doc(db, "foodPosts", id))
        router.push("/foodposts")
    }

    useEffect(async() => {
        const foodDoc = doc(db, "foodPosts", id)
        const foodPost = await getDoc(foodDoc)
        setItem(foodPost.data())
    }, [])

    return (
        <div>
            <Heading color="teal.700" size="4xl" m={4}>Post Details</Heading>
            <Heading color="teal.700" size="2xl" m={4}>Poster Details</Heading>
            <Heading color="teal.500" m={4}><StarIcon w={5} h={5} color="teal.700"/> {item.name}</Heading>
            <Heading color="teal.500" m={4}><AtSignIcon w={5} h={5} color="teal.700"/> {item.email}</Heading>
            <Heading color="teal.500" m={4}><PhoneIcon w={5} h={5} color="teal.700"/> {item.contact}</Heading>
            <Heading color="teal.500" m={4}>{item.feedCount}</Heading>
            <Heading color="teal.500" m={4}><ArrowRightIcon w={5} h={5} color="teal.700"/> {item.address}</Heading>
            {item.isClaimed && <Heading color="teal.700" size="2xl" m={4}>Claimer Details</Heading>}
            {item.isClaimed && <Heading color="teal.500" m={4}><StarIcon w={5} h={5} color="teal.700"/> {item.claimerName}</Heading>}
            {item.isClaimed && <Heading color="teal.500" m={4}><AtSignIcon w={5} h={5} color="teal.700"/> {item.claimerEmail}</Heading>}
            {item.isClaimed && <Heading color="teal.500" m={4}><PhoneIcon w={5} h={5} color="teal.700"/> {item.claimerContact}</Heading>}
            <Heading m={4} color="teal.700"><QuestionOutlineIcon w={5} h={5}/> Item List</Heading>
            {item.items?.map((item, idx) => {
                return <Text key={idx} fontSize="2xl" m={4} color="teal.700"><ChevronRightIcon size="xs"/> {item}</Text>
            })}
            {!item.isClaimed && item.email !== user.email && <Heading m={4} color="teal.700"><PhoneIcon w={5} h={5} color="teal.700"/> Claimer Contact Number</Heading>}
            {!item.isClaimed && item.email !== user.email && <Input type="text" onChange={handleClaimerContact} value={claimerContact} placeholder="Claimer Contact" m={4} fontSize="xl" color="teal.700"></Input>}
            {!item.isClaimed && item.email !== user.email && <Button onClick={handleClaim} bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg" m={4}><BellIcon w={30} h={30} color="white"/></Button>}
            {item.email !== user.email && <a href={`https://maps.google.com/?ll=${item.latitude},${item.longitude}`}><Button bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg" m={4}><ArrowUpIcon w={30} h={30} color="white"/></Button></a>}
            {!item.isClaimed && item.email === user.email && <Button onClick={handlePostDelete} bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg" m={4}><DeleteIcon w={30} h={30} color="white"/></Button>}
        </div>
    )
}

export default PostDetails