import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>

            </Head>
            <body className={`scrollbar-hide overflow-hidden`}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}