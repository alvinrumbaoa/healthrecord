import React ,{useState} from 'react';
import axios from 'axios';
import {Containrt, Flex, Box, Heading, Text, Input,Button, Center,FormControl, FormLabel, Select, Textarea, useToast} from '@chakra-ui/react'


const signup = () => {
const [confirmReg, setConfirmReg] = useState("");
const [errs, setErrs] = useState({});
const [ user, setUser ] = useState({
    companyName: "",
    position:"",
    firstName:"",
    lastName:"",
    email: "",
    mobilePhone:"", 
    password: "", 
    confirmPassword: "",
})

const positionArr = ["Administrator","CEO","Manager","Staff"];

const handleChange = (e) => {
    setUser({
    ...user,
    [e.target.name]: e.target.value,
    })
}
	const register = (e)=> {
		e.preventDefault();

		axios.post("http://localhost:8000/api/users/register", 
		user,             
		{
			withCredentials: true,
		})
		.then(res => {
		console.log(res.data);
	
			setUser({
			companyName: "",
			position:"",
			firstName:"",
			lastName:"",
			email: "",
			mobilePhone:"", 
			password: "", 
			confirmPassword: "",
			})
	
			setConfirmReg("Registration complete, please log in to continue!");
			setErrs({});
			navigate("/login");
		})
		.catch((err) => {
			console.log(err);
			setErrs(err.response.data.errors);
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
                            {
                                errs.companyName ? 
                                <span className="error-text">{ errs.companyName.message }</span>
                                : null
                            }
                            <Input type="text" name="companyName" value={user.companyName} onChange={(e) => handleChange(e)}/>
                            </div>
                            <div>
                            <label className="text">Position</label>
                            {
                                errs.goodsType ? 
                                <span className="error-text">{ errs.position.message }</span>
                                : null
                            }
                            <Select  name="position" value={ user.position } onChange={(e) => handleChange(e)}>
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
                            {
                                errs.firstName ? 
                                <span className="error-text">{ errs.firstName.message }</span>
                                : null
                            }
                            <Input type="text"name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} />
                            </div>
                            <div>
                            <label className="text">Last Name</label>
                            {
                                errs.lastName ? 
                                <span className="error-text">{ errs.lastName.message }</span>
                                : null
                            }
                            <Input
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Email</label>
                            {
                                errs.email? 
                                <span className="error-text">{ errs.email.message }</span>
                                : null
                            }
                            <Input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={ (e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Mobile Number</label>
                            {
                                errs.mobilePhone? 
                                <span className="error-text">{ errs.mobilePhone.message }</span>
                                : null
                            }
                           <Input
                                type="text"
                                name="mobilePhone"
                                value={user.mobilePhone}
                                onChange={(e) => handleChange(e)}
                            />
                            </div>
                            <div>
                            <label className="text">Password</label>
                            {
                                errs.password ? 
                                <span className="error-text">{ errs.password.message }</span>
                                : null
                            }
                            <Input  type="password" name="password" value={user.password} onChange={ (e) => handleChange(e)} />
                            </div>
                            <div>
                            <label className="text">Confirm Password</label>
                            {
                                errs.confirmPassword? 
                                <span className="error-text">{ errs.confirmPassword.message }</span>
                                : null
                            }
                            <Input type="password" name="confirmPassword"  value={user.confirmPassword}  onChange={ (e) => handleChange(e) }
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
