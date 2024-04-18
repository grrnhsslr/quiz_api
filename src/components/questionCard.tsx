import { QuestionType } from "../types"
import { Card } from "react-bootstrap";

type QuestionCardProps = {
    question: QuestionType
}

export default function QuestionCard({ question }: QuestionCardProps) {
    console.log(question);
    return (
        <Card className="my-3 bg-custom" text="white">
            <Card.Header>{question.id}</Card.Header>
            <Card.Body>
                <Card.Title>{question.author}</Card.Title>
                <Card.Text>{ question.question }</Card.Text>
            </Card.Body>
        </Card>
  )
}
