import { Link } from "react-router-dom";
import { QuestionType, UserType } from "../types"
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useState } from "react";

type PostCardProps = {
    question: QuestionType,
    currentUser: UserType | null
}

export default function PostCard({ question, currentUser }: PostCardProps) {

    const [showAnswer, setShowAnswer] = useState(false);

    const handleClick = () => {
        setShowAnswer(!showAnswer);
    }


    return (
        <Card className="my-3 bg-custom" text="white">
            <Card.Header>{question.created_on}</Card.Header>
            <Card.Body>
                <Card.Title>author: {(question.author.split('_')[0])}</Card.Title>
                <Card.Title>question: {question.question}</Card.Title>
                {parseInt(question.author.split('_')[1]) === currentUser?.user_id  ? (
                    <Link to={`/question/${question.id}`}> <Button className='me-3' variant='primary'>Edit Question</Button></Link>
                ) : (
                    <></>
                )
                }

                <Button variant={showAnswer ? "warning" : "success"} className='my-3' onClick={handleClick}>{showAnswer ? "Hide Answer" : "See Answer"}</Button>
                {showAnswer ? (
                    <Card.Footer>{ question.answer }</Card.Footer>
                ) : (
                    <></>
                )
                }
            </Card.Body>
        </Card>
    )
}
