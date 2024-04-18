import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { QuestionFormDataType } from '../types'

type QuestionFormProps = {
  addNewPost: (data: QuestionFormDataType) => void
}

export default function PostForm({ addNewPost }: QuestionFormProps) {
  const [newPost, setNewPost] = useState<QuestionFormDataType>({title:'', body: ''})

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
                <Form.Label>Post Title</Form.Label>
                <Form.Control name='title' placeholder='Enter New Question Title' value={newPost.title} onChange={handleInputChange} />
                <Form.Label>Post Body</Form.Label>
                <Form.Control name='body' placeholder='Enter New Question Body' value={newPost.body} onChange={handleInputChange} />
                <Button className='mt-3 w-100' variant='success' type='submit'>Create Post</Button>
            </Form>
        </Card.Body>
      </Card>
  )
}