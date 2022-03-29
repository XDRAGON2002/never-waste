import { useRouter } from 'next/router'

import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import Header from '../components/header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    
    const router = useRouter()
    const isLoginPage = router.pathname === "/" ? true : false

    return (
        <ChakraProvider>
            {!isLoginPage && <Header />}
            <Box p={10} bg="teal.100">
                <Component {...pageProps} />
            </Box>
        </ChakraProvider>
    )
}

export default MyApp
