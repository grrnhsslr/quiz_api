// import React from 'react';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCard from '../components/questionCard';
import QuestionForm from '../components/questionForm';
import { QuestionType, QuestionFormDataType} from "../types";
import { getAllQuestions } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: QuestionType, b:QuestionType) => number,
    idDesc: (a: QuestionType, b:QuestionType) => number,
    titleAsc: (a: QuestionType, b:QuestionType) => number,
    titleDesc: (a: QuestionType, b:QuestionType) => number,
}


type HomeProps = {
    isLoggedIn: Boolean,
    handleClick: () => void
}

export default function Home({isLoggedIn, handleClick}: HomeProps) {

const [showForm, setShowForm] = useState(false);
const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        async function fetchData(){
            const result = await getAllQuestions();
            console.log(result)
            if (result.data){
                setQuestions(result.data.questions)
            }
        }
        fetchData();
    }, [])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:QuestionType, b:QuestionType) => a.id - b.id,
            idDesc: (a:QuestionType, b:QuestionType) => b.id - a.id,
            titleAsc: (a:QuestionType, b:QuestionType) => a.question > b.question ? 1 : -1,
            titleDesc: (a:QuestionType, b:QuestionType) => b.question > a.question ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...questions].sort(func);
        setQuestions(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const addNewPost = (newQuestionData: QuestionFormDataType) => {
        const newPost: QuestionType = {...newQuestionData, id:questions.length+1}
        setQuestions([...questions, newPost])
        setShowForm(false);
    }

    // how to display the navbar without the Navigation.tsx

    // return React.createElement(React.Fragment, {}, React.createElement(Navigation, { isLoggedIn }, undefined), React.createElement(Container, {}, React.createElement('h1', {}, 'Hello World')))
    console.log(questions)
    return (
        <>
            <h1>Hello World</h1>
                <Button variant='primary' onClick={handleClick}>Click Me!</Button>
                <h2>{isLoggedIn ? `Welcome Back` : 'Please Log In or Sign Up'}</h2>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control value={searchTerm} placeholder='Search Questions' onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By id ASC</option>
                            <option value="idDesc">Sort By id DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Post+'}</Button>
                    </Col>
                </Row>
                { showForm && <QuestionForm addNewPost={addNewPost} /> }
                {questions.map((p) => (<QuestionCard key={p.id} question={p} />))}
        </>
    )
}
