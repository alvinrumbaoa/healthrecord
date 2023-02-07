
import React ,{useState} from 'react';
import Script from 'next/script';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import Link from 'next/link';
import { useFormik } from 'formik';
import {useSession, signIn ,signOut} from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'



import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import axios from 'axios';
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const login = () => {
  const { data:session , loading} = useSession();

  if (loading) {
    return <Flex><Text>Loading</Text></Flex>
  }

  

  
  const handleSignout  = async () => 
  { 
   const data =  await signOut({redirect : false, callbackUrl: "/"})
   push.router(data.url)
  }

	const router = useRouter()
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };


 	const handleLogin = async (event) => {
       
        event.preventDefault();
        axios.post(
            `https://shielded-caverns-06460.herokuapp.com/api/users/login`,
            {
            email: email,
            password: password,
            },
            {
            withCredentials: true,
            }
            
              
        )
        .then((res) => {
          if(res.data.errors) {
           
            console.log(res.data.errors)
            
        }
        else {
            const accessToken = res.data.accessToken;
            console.log(res.data)
            router.push('/dashboard')
            if (rememberMe) {
              localStorage.setItem('email', email);
              localStorage.setItem('password', password);
            } else {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
            }
        }
        })
        .catch((err) => {
            console.log(err);
            setErrorMessage(err);
        });
    }


  return (
	<>
	
	
	<Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
          
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <form onSubmit={handleLogin}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                            type="text"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />      
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
            </FormControl>
            
            <Stack spacing={10}>
              <Stack mt={2}
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox onChange={handleRememberMe}>Remember me</Checkbox>
                <Link href="/forgot">Forgot Password?</Link>
              </Stack>
              <Button type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Stack>
              {
                  session ? (
                    <>
                      <Button onClick={handleSignout}>Sign Out</Button>
                    </>
                  ): (
                    <>
                    <GithubLoginButton onClick={signIn} />
                    </>
                
                  )}
                  
                
              </Stack>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
	   
					
	</Flex>
	</>
  )
}

export default login
