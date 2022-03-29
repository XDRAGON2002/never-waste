import { Heading, Spacer, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import Link from "next/link"

import { Button, ButtonGroup, Input, Link as UILink, Box, Flex } from '@chakra-ui/react'
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'

const NavBar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <Flex bg="teal.600" paddingLeft={4} paddingRight={4}>
            <Button ref={btnRef} colorScheme='teal.600' onClick={onOpen} h={70} w={70} size="lg">
                <HamburgerIcon h={30} w={30}/>
            </Button>
            <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent bg="teal.600">
                    <DrawerCloseButton />
                    <DrawerHeader color="white">Never Waste</DrawerHeader>
                    <DrawerBody>
                        <div>
                            <Link href="/foodposts">
                                <UILink onClick={onClose} color="white">
                                    <ChevronRightIcon /> All Posts
                                </UILink>
                            </Link>
                        </div>
                        <div>
                            <Link href="/yourposts">
                                <UILink onClick={onClose} color="white">
                                    <ChevronRightIcon /> Your Posts
                                </UILink>
                            </Link>
                        </div>
                        <div>
                            <Link href="/claimedposts">
                                <UILink onClick={onClose} color="white">
                                    <ChevronRightIcon /> Claimed Posts
                                </UILink>
                            </Link>
                        </div>     
                    </DrawerBody>
                    <DrawerFooter>  
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Spacer />
            <Heading paddingTop={3} color="white">Never Waste</Heading>
        </Flex>
    )
}

export default NavBar