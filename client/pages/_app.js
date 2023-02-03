// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={true} refetchInterval={5 * 60}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp