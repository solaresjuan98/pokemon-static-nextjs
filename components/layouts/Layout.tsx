import { FC } from "react"

import Head from "next/head"
import { NextPage } from "next"
import { Navbar } from '../ui/Navbar';

interface Props {
    children: any;
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }: Props) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Juan Antonio Solares"></meta>
                <meta name="description" content="information about pokemon xxxx"></meta>
                <meta name="keywords" content={`${title} pokemon, pokedex`}></meta>

            </Head>

            {/* Navbar */}

            <Navbar />
            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
