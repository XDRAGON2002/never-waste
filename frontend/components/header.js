import Head from "next/head"
import NavBar from "./navbar"

const Header = () => {

    return (
        <div>
            <Head>
                <title>Never Waste</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavBar />
        </div>
    )
}

export default Header