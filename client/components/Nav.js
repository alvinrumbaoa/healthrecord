import React from 'react'
import {Button , Flex, Heading, Text} from '@chakra-ui/react'
import {useRouter} from 'next/router'


const Nav = () => {

	const router = useRouter()

  return (
	<Flex p={10} direction="row" w='100%' justify="space-between" >
		<Heading>eHealthRecord</Heading>

		<Flex justify="space-around">
			<Button m={2} colorScheme="facebook" onClick={()=> {router.push('/login')}}>Log in</Button>
			<Button m={2}  colorScheme="messenger" onClick={()=> {router.push('/signup')}}>Signup</Button>
		</Flex>
	   
	</Flex>
  )
}

export default Nav
