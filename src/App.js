import React, { Component } from 'react';
import './App.css';
import firebase from './Firebase';
import { Navbar, Table, Form, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('guestbook');
    this.unsubscribe = null;
    this.state = {
      comments: [],
      fullnames: '',
      comment: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const comments = [];
    querySnapshot.forEach((doc) => {
      const { fullnames, comment, date } = doc.data();
      comments.push({
        key: doc.id,
        doc, // DocumentSnapshot
        fullnames,
        comment,
        date
      });
    });
    this.setState({
      comments
   });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fullnames, comment } = this.state;

    // Get date
    var currentdate = new Date(); 
    var datetime = currentdate.getHours() + ":"  + currentdate.getMinutes() + " " + currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();

    this.ref.add({
      fullnames: fullnames,
      comment: comment,
      date: datetime
    }).then((docRef) => {
      this.setState({
        fullnames: '',
        comment: '',
      });
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div>

        <Navbar bg="dark">
          <Navbar.Brand href="#home">Digital Vision EA | Guestbook</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Karibu tena!
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <div style={{margin:'30px'}}>
          <h4>Leave your comment below</h4>

          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Col>
                <Form.Control placeholder="Fullnames" name="fullnames" value={this.state.fullnames} onChange={this.onChange} />
              </Col>
              <Col>
                <Form.Control placeholder="Comment" name="comment" value={this.state.comment} onChange={this.onChange} />
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>

        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Names</th>
                <th>Comment</th>
                <th>Date and time</th>
              </tr>
            </thead>
            <tbody>
                {this.state.comments.map((comment, index) =>
                  <tr>
                    <td>{ index + 1 }</td>
                    <td>{comment.fullnames}</td>
                    <td>{comment.comment}</td>
                    <td>{comment.date}</td>
                  </tr>
                )}
            </tbody>
          </Table>
        </div>

      </div>
    )
  }
}

export default App;
