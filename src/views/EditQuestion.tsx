import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteQuestionById, editQuestionById, getQuestionById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import { CategoryType, QuestionFormDataType, UserType } from '../types';


type EditQuestionProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: UserType|null
}

export default function EditQuestion({ flashMessage, currentUser }: EditQuestionProps) {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionToEditData, setQuestionToEditData] = useState<QuestionFormDataType>({question: '', answer: ''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect( () => {
        async function getQuestion(){
            let response = await getQuestionById(questionId!)
            if (response.data){
                setQuestionToEditData({question: response.data.question, answer: response.data.answer})
                const question = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
                if (!currentUser){
                    console.log(currentUser)
                }
                else if (currentUser?.id !== parseInt(question.author.split('_')[1])){
                    flashMessage('You do not have permission to edit this post', 'danger')
                    navigate('/')
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            }
            else {
                flashMessage('something went wrong', 'warning')
                navigate('/')
            }
        }

        getQuestion()
    }, [questionId, currentUser] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToEditData({...questionToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editQuestionById(questionId!, token, questionToEditData)
        if (response.error){
            flashMessage(response.error, 'danger')
        }
        else{
            flashMessage(`${response.data?.id} has been updated`, 'success')
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteQuestionById(questionId!, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        }
        else {
            flashMessage(response.data!, 'primary');
            navigate('/')
        }
    }

    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className='text-center'>Editing Post {questionId}</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name='question' placeholder='Enter New question' value={questionToEditData.question} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit Question</Button>
                        <Button onClick={openModal} className='mt-3 w-50' variant='danger'>Delete Post</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {questionToEditData.question}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {questionToEditData.question}?
                    This cannot be undone
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} variant='secondary'>Close</Button>
                    <Button onClick={handleDeleteClick} variant='danger'>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}