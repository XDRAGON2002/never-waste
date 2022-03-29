import { useRouter } from "next/router"
import { useAuthState } from "react-firebase-hooks/auth"

import { auth } from "../firebase/clientApp"
import Auth from "../components/auth"

const Home = () => {

    const [user, loading, error] = useAuthState(auth)
    const router = useRouter()
    
    if (user) {
        router.push("/foodposts")
    }
    
    return (
        <div>
            {!user && <Auth />}
        </div>
    )
}

export default Home