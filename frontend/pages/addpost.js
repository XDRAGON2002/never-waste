import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router";
import axios from "axios"
import { auth, db } from "../firebase/clientApp"
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { Input, Button, Box, Text, Heading, Flex } from "@chakra-ui/react"
import { AddIcon, StarIcon, SpinnerIcon, RepeatIcon, PhoneIcon, ChevronRightIcon, CheckIcon, ArrowRightIcon, QuestionOutlineIcon, DeleteIcon } from "@chakra-ui/icons"

const AddPost = () => {

    const [itemInput, setItemInput] = useState("")
    const [items, setItems] = useState([])
    const [feedCount, setFeedCount] = useState("")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const [image, setImage] = useState(null)
    const [isText, setIsText] = useState(true)
    const router = useRouter()
    const ref = useRef()

    const handleItemInput = (e) => {
        setItemInput(e.target.value)
    }

    const handleFeedCount = (e) => {
        setFeedCount(e.target.value)
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleContact = (e) => {
        setContact(e.target.value)
    }

    const handleImageInput = (e) => {
        setImage(e.target.files[0])
    }

    const handleInputMethod = () => {
        setIsText(!isText)
    }

    const addItem = async() => {
        if (isText && itemInput.length > 0) {
            setItems([...items, itemInput])
            setItemInput("")
        }else if (!isText && image) {
            const form_data = new FormData()
            form_data.append("file", image, image.name)
            await axios.post("http://localhost:8000/api/", form_data)
            .then(res => res.data)
            .then(res => {
                if (!res.err) {
                    setItems([...items, res.prediction])
                }else {
                    window.alert(`ERROR: ${res.err}`)
                }
            })
            setImage(null)
            ref.current.value = ""
        }
    }

    const handleDelete = (idx) => {
        const newItems = items.filter((item, index) => index != idx)
        setItems(newItems)
    }

    const handleSubmit = async() => {
        if (items.length < 1) {
            window.alert("ERROR: Please Recheck Items List")
        }else if (isNaN(feedCount) || feedCount.length < 1 || feedCount === "0" || feedCount.includes("-")) {
            window.alert("ERROR: Please Recheck Feed People Count")
        }else if (isNaN(contact) || contact.length !== 10) {
            window.alert("ERROR: Please Recheck Contact Number")
        }else if (address.length < 1) {
            window.alert("ERROR: Please Recheck Address")
        }else {
            const data = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                contact: contact,
                address: address,
                items: items,
                isClaimed: false,
                cid: "",
                claimerName: "",
                claimerEmail: "",
                claimerContact: "",
                latitude: latitude,
                longitude: longitude
            }
            for (let count = 0;count < feedCount;count++) {
                await addDoc(collection(db, "foodPosts"), data)
            }
            setItemInput("")
            setItems([])
            setContact("")
            setAddress("")
            setFeedCount(0)
            setLatitude(0)
            setLongitude(0)
            router.push("/foodposts")
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

    return (
        <Box>
            <Heading color="teal.700" size="4xl" m={4}>Create Posting</Heading>
            <Heading m={4} color="teal.700"><StarIcon w={5} h={5}/> Item</Heading>
            <Button onClick={handleInputMethod} bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg" m={4}><SpinnerIcon w={30} h={30} color="white"/></Button>
            {isText && <Input type="text" onChange={handleItemInput} value={itemInput} placeholder="Item" m={4} fontSize="xl" color="teal.700"></Input>}
            {!isText && <Input type="file" accept="image/jpg, image/jpeg, image/png" onChange={handleImageInput} ref={ref} m={4} fontSize="xl" color="teal.700"></Input>}
            <Button onClick={addItem} bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg" m={4}><AddIcon w={30} h={30} color="white"/></Button>
            {items.length > 0 && <Heading m={4} color="teal.700"><QuestionOutlineIcon w={5} h={5}/> Item List</Heading>}
            {items.map((item, idx) => {
                return (
                    <Flex key={idx}>
                        <Text fontSize="2xl" m={4} color="teal.700"><ChevronRightIcon size="xs"/> {item}</Text>
                        <Button bg="teal.500" size="sm" m={4} marginTop={5} onClick={() => handleDelete(idx)}><DeleteIcon w={5} h={5} color="white"/></Button>
                    </Flex>
                )
            })}
            <Heading m={4} color="teal.700"><RepeatIcon w={5} h={5}/> How Many People Can Be Fed</Heading>
            <Input type="text" onChange={handleFeedCount} value={feedCount} placeholder="Feed Count" m={4} fontSize="xl" color="teal.700"></Input>
            <Heading m={4} color="teal.700"><PhoneIcon w={5} h={5}/> Contact Number</Heading>
            <Input type="text" onChange={handleContact} value={contact} placeholder="Contact" m={4} fontSize="xl" color="teal.700"></Input>
            <Heading m={4} color="teal.700"><ArrowRightIcon w={5} h={5}/> Address</Heading>
            <Input type="text" onChange={handleAddress} value={address} placeholder="Address" m={4} fontSize="xl" color="teal.700"></Input>
            <Button onClick={handleSubmit} bg="teal.500" size="lg" borderRadius="50%" w={70} h={70} boxShadow="lg" m={4}><CheckIcon w={30} h={30} color="white"/></Button>
        </Box>
    )
}

export default AddPost