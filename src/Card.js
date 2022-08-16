import { Card, Pagination } from 'react-bootstrap';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.urlPhoto} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>Tipo: {this.props.type}</Card.Text>
                    <Card.Text>Altura: {this.props.height}</Card.Text>
                    <Card.Text>Peso: {this.props.weight}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default CardComponent;