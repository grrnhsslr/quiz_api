import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCard from '../components/questionCard';
import QuestionForm from '../components/questionForm';
import {QuestionType, QuestionFormDataType, UserType, CategoryType} from "../types";
import { getAllQuestions, createQuestion } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: QuestionType, b:QuestionType) => number,
    idDesc: (a: QuestionType, b:QuestionType) => number,
    titleAsc: (a: QuestionType, b:QuestionType) => number,
    titleDesc: (a: QuestionType, b:QuestionType) => number,
}


type HomeProps = {
    isLoggedIn: Boolean,
    currentUser:UserType | null,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function Home({isLoggedIn, flashMessage, currentUser}: HomeProps) {

const [showForm, setShowForm] = useState(false);
const [questions, setQuestions] = useState<QuestionType[]>([]);
const [fetchQuestionData, setFetchQuestionData] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const result = await getAllQuestions();
            console.log(result)
            if (result.data){
                let questions = result.data.questions
                questions.sort((a,b) => (new Date(a.created_on) > new Date(b.created_on) ? -1 : 1))
                setQuestions(result.data.questions)
            }
        }
        fetchData();
    }, [fetchQuestionData])

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

    const addNewQuestion = async (newQuestionData: QuestionFormDataType) => {
        const token = localStorage.getItem('token') || '';
        const response = await createQuestion(token, newQuestionData);
        if (response.error){
            flashMessage(response.error, 'danger')
        }
        else if (response.data){
            flashMessage('New Question Added', 'success');
            setShowForm(false);
            setFetchQuestionData(!fetchQuestionData);

        }
    }

    return (
        <>
            <h1 className="text-center">{isLoggedIn && currentUser ? `Hello ${currentUser?.first_name} ${currentUser?.last_name}` : 'Welcome to the Blog' }</h1>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                </Col>
                <Col>
                    <Form.Select onChange={handleSelectChange}>
                        <option>Choose Sorting Option</option>
                        <option value="idAsc">Sort By ID ASC</option>
                        <option value="idDesc">Sort By ID DESC</option>
                        <option value="titleAsc">Sort By Title ASC</option>
                        <option value="titleDesc">Sort By Title DESC</option>
                    </Form.Select>
                </Col>
                {isLoggedIn &&(
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Quiz+'}</Button>
                    </Col>
                )}
                </Row>
                { showForm && <QuestionForm addNewPost={addNewQuestion} /> }
                {questions.map((p) => (<QuestionCard key={p.id} question={p} currentUser={currentUser} />))}
        </>
    )
}
