import React from 'react'
import { Card } from 'react-bootstrap'
import './NextTrainCard.scss'

interface NextTrainCardProps {
  title: string
  text: string
  img?: string
}

const NextTrainCard: React.FC<NextTrainCardProps> = ({
  title,
  text,
  img
}: NextTrainCardProps) => {
  return (
    <Card className="card-style">
      <Card.Img src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NextTrainCard
