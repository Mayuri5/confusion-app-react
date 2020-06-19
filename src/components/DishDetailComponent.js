import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        const Comments = this.props.selectedDish.comments.map((Comment)=>{
            return (
                <div key={Comment.id} className="col-12">
                        <p>{Comment.comment}</p>
                        <p>-- {Comment.author}, {Comment.date}</p>
                </div>
            )
        });

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={this.props.selectedDish.image} alt={this.props.selectedDish.name}/>
                            <CardBody>
                                <CardTitle>{this.props.selectedDish.name}</CardTitle>
                                <CardText>{this.props.selectedDish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        {Comments}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;