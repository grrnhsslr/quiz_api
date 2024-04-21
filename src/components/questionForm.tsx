import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { QuestionFormDataType } from '../types'

type QuestionFormProps = {
  addNewPost: (data: QuestionFormDataType) => void
}

export default function PostForm({ addNewPost }: QuestionFormProps) {
const [newPost, setNewPost] = useState<QuestionFormDataType>({question:'', answer: ''})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({...newPost, [event.target.name]:event.target.value })
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNewPost(newPost);
}

  return (
      <Card className='my-3'>
        <Card.Body>
          <h3 className='text-center'>Create New Post</h3>
          <Form onSubmit={handleFormSubmit}>
                <Form.Label>Question</Form.Label>
                <Form.Control name='question' placeholder='Enter Question' value={newPost.question} onChange={handleInputChange} />
                <Form.Label>Answer</Form.Label>
                <Form.Control name='answer' placeholder='Enter Question Answer' value={newPost.answer} onChange={handleInputChange} />
                <Button className='mt-3 w-100' variant='success' type='submit'>Create Post</Button>
            </Form>
        </Card.Body>
      </Card>
  )
}