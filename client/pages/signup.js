import React ,{useState} from 'react';
import axios from 'axios';
import {Container, Flex, Box, Heading, Text, Input,Button, Center,FormControl, FormLabel, Select, Textarea, useToast} from '@chakra-ui/react'
import { useRouter } from 'next/router'



const signup = () => {
const [confirmReg, setConfirmReg] = useState("");
const router = useRouter()
const [errs, setErrs] = useState({});
const [ user, setUser ] = useState({
    companyName:"",
    position:"",
    firstName:"",
    lastName:"",
    email:"",
    mobilePhone:"", 
    password:"", 
    confirmPassword:"",
})

const positionArr = ["Administrator","CEO","Manager","Staff"];

const handleChange = (e) => {
  
    setUser({
    ...user,
    [e.target.name]: e.target.value,
    })
}

console.log(user)
	const register = async (e)=> {
		e.preventDefault();
      
         axios.post('http://localhost:8000/api/users/register',{ 
		    ...user})
		.then((res) => {
            if(res.data.errors) {
                console.log(res.data.errors)
            }
            else {
            console.log(res.data);
			setConfirmReg("Registration complete, please log in to continue!");
			router.push("/login");
            }
		})
		.catch((err) => {
			console.log(err);
		});
	}

  return (
	<Flex h="100vh" direction="column" align="center" justify="center">
		<Center>
			<Box p={20} justifyContent="center" align="center" border="2px solid gray" rounded="xl" >
				<Heading>Create Account</Heading>
						
							{
								confirmReg ? 
								<h4 style={{color: "green"}}>{confirmReg}</h4>
								: null
							}
							<form onSubmit={register}>
							<div>		
                            <label className="text">Company Name</label>
                            
                            <Input type="text" name="companyName" onChange={(e) => handleChange(e)}/>
                            </div>
                            <div>
                            <label className="text">Position</label>
                           
                            <Select  name="position"  onChange={(e) => handleChange(e)}>
                                                <option value=""></option>
                                                {
                                                    positionArr.map((pos) =>(
                                                        <option value={pos} key={pos}>{pos}</option>
                                                    ))
                                                }                               
                        </Select>  
                            </div>
                            <div>
                            <label className="text">First Name</label>
                            
                            <Input type="text"name="firstName" onChange={(e) => handleChange(e)} />
                            </div>
                            <div>
                            <label className="text">Last Name</label>
                            
                            <Input
                                type="text"
                                name="lastName"
                            
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Email</label>
                          
                            <Input
                                type="email"
                                name="email"
                            
                                onChange={ (e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Mobile Number</label>
                          
                           <Input
                                type="text"
                                name="mobilePhone"
                        
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Password</label>
                           
                            <Input  type="password" name="password"  onChange={ (e) => handleChange(e)} />
                            </div>
                            <div>
                            <label className="text">Confirm Password</label>
                          
                            <Input type="password" name="confirmPassword"  onChange={ (e) => handleChange(e) }
                            />
                    </div>
                    
                    <Button  mt={5} colorScheme="twitter"  type="submit" >Register</Button>
                 
                </form>
          
			</Box>
		</Center>
	</Flex>
  )
}

export default signup;
