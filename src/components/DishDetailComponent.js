import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Modal, ModalBody, ModalHeader, Label,Button,FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const minLength = (len) => (val) => val && val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;
const required = (val) => val && val.length;

class CommentForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(
          this.props.dishId,
          values.author,
          values.rating,
          values.comment
        );
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submmit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                    type="select"
                                    name="rating"
                                    model=".rating"
                                    className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" className="form-control" name="author"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: "Required ",
                                        minLength: "Must be greater than 2 characters",
                                        maxLength : "Must be less than 15 characters"
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment" >Comment</Label>
                                    <Control.textarea
                                        id="comment"
                                        model=".comment"
                                        rows="6"
                                        name="comment"
                                        className="form-control"
                                    />
                            </FormGroup>
                            <Button type="submit" color="primary">submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

function RenderDish({ dish }) {
    return (
      <div className="col-12 col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.5) translateY(-50%)",
          }}
        >
          <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h3>Comments</h3>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment) => {
                return (
                  <Fade in>
                    <li key={comment.id}>
                      <p>{comment.comment}</p>
                      <p>
                        -- {comment.author},{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(new Date(Date.parse(comment.date)))}
                      </p>
                    </li>
                  </Fade>
                );
            })}
          </Stagger>
        </ul>
        <CommentForm postComment={postComment} dishId={dishId} />
      </div>
    );
  }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
          <div className="container">
            <div className="row">
              <Loading />
            </div>
          </div>
        );
    }
    else if (props.errMsg) {
         return (<div className="container">
          <div className="row">
                <h4>{props.errMsg}</h4>
          </div>
         </div>
         );
    }
    else if (props.dish) {
        return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <RenderDish dish={props.dish} />
              <RenderComments
                comments={props.comments}
                postComment={props.postComment}
                dishId={props.dish.id}
              />
            </div>
          </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;