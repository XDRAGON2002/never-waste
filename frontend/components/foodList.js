import { SimpleGrid, GridItem } from '@chakra-ui/react'

import Food from "./food"

const FoodList = ({foodPosts}) => {

    return (
        <SimpleGrid gap={20} minChildWidth='250px'>
            {foodPosts?.map((foodPost) => {
                return (
                    <GridItem key={foodPost.id}>
                        <Food key={foodPost.id} foodPost={foodPost} />
                    </GridItem>
                )
            })}
        </SimpleGrid>
    )
}

export default FoodList