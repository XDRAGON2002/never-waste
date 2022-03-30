import Head from "next/head"
import NavBar from "./navbar"

const Header = () => {

    return (
        <div>
            <Head>
                <title>Never Waste</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <NavBar />
        </div>
    )
}

export default Header