import { Card, Form, Button } from "react-bootstrap";
import { UserFormDataType } from "../types";
import { useState } from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { register } from "../lib/apiWrapper";


type SignUpProps = {}

export default function SignUp({}: SignUpProps) {

  const [UserFormData, setUserFormData] = useState<UserFormDataType>(
    {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: ''
  }
)

const [seePassword, setSeePassword] = useState(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...UserFormData, [e.target.name]: e.target.value})
}

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(UserFormData);

        let response = await register(UserFormData);
        if (response.error){
          console.error(response.error);
        }
        else {
          let newUser = response.data!;
          console.log(`Congrats ${newUser.first_name} ${newUser.last_name} has been created`)
        }

    }

    // how to make a password require capital letter lowercase letters and special chars
    // const disableSubmit = !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\!\?])(?=.*[a-zA-Z]).{8,16}$/.test(UserFormData.password) || UserFormData.password !== UserFormData.confirm_password;
    const disableSubmit = UserFormData.password.length < 5 || UserFormData.password !== UserFormData.confirm_password

  return (
    <>
            <h1 className="text-center">Sign Up Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' type='email' placeholder='Enter Email' value={UserFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='first_name'>First Name</Form.Label>
                        <Form.Control id='first_name' name='first_name' placeholder='Enter First Name' value={UserFormData.first_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                        <Form.Control id='last_name' name='last_name' placeholder='Enter Last Name' value={UserFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={UserFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Form.Label htmlFor='confirm_password'>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='confirm_password' name='confirm_password'  type={seePassword ? 'text' : 'password'} placeholder='Confirm Password' value={UserFormData.confirm_password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit}>Create New User</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
  )
}