import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import {Button , Flex, Heading, Text} from '@chakra-ui/react'
import {useSession, signIn ,signOut} from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'





export default function Home() {

  const push = useRouter()
  const { data:session , loading} = useSession();

  if (loading) {
    return <Flex><Text>Loading</Text></Flex>
  }

  

  
  const handleSignout  = async () => 
  { 
   const data =  await signOut({redirect : false, callbackUrl: "/"})
   push.push(data.url)
  }

  return (
    <>
      <Head>
        <title>Welcome to myHealthRecord</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
    
      {
      session ? (
        <>
         <Heading>Signed In as {session.user.email}</Heading>
          <Button onClick={handleSignout}>Sign Out</Button>
        </>
      ): (
        <>
         <Heading>You are not Signed In</Heading>
          <Button onClick={signIn}>Sign In</Button>
        </>
     
      )}
    </>
  )
}

