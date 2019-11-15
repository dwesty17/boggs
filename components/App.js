import React from "react"
import Head from "next/head"

const App = ({ children }) => (
    <div>
        <Head>
            <title>Moolah</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" />
        </Head>
        {children}
    </div>
);

export default App;