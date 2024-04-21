import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, editUserById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import { CategoryType, editUserFormData } from '../types';
import InputGroup from 'react-bootstrap/InputGroup';


type profileProps = {
    logUserOut: () => void,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function Profile({ logUserOut, flashMessage }: profileProps) {
    const navigate = useNavigate();

    const [editUserFormData, setEditUserFormData] = useState<editUserFormData>(
        {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUserFormData({...editUserFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(editUserFormData);

        let response = await editUserById(localStorage.getItem("token")!, editUserFormData);
        if (response.error){
            console.log(response.error);
            flashMessage(response.error, 'danger');
        } else {
            // let newUser = response.data!
            flashMessage("User has been updated", 'success')
            console.log("User has been updated", 'success')
        }
    }

    const handleDeleteUser = async () => {
        let response = await deleteUserById(localStorage.getItem("token")!);
        if (response.error){
            console.log(response.error);
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`User has been deleted`, 'success')
            logUserOut();
            navigate('/')
        }
    }




    return (
        <>
            <h1 className="text-center">Edit Info</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='first_name'>First Name</Form.Label>
                        <Form.Control id='first_name' name='first_name' placeholder='Enter First Name' value={editUserFormData.first_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='last_name'>Last Name</Form.Label>
                        <Form.Control id='last_name' name='last_name' placeholder='Enter Last Name' value={editUserFormData.last_name} onChange={handleInputChange}/>

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' type='email' placeholder='Enter Email' value={editUserFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={editUserFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-50 mt-3' >Update Profile</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this User Profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This action cannot be undone</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                    <Button variant='danger' onClick={handleDeleteUser}>Delete User</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}