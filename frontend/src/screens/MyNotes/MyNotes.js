import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card, useAccordionButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import axios from 'axios';

const MyNotes = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
    const [data, setData] = useState([]);
    const deleteHandle = async(id) => {
      if (window.confirm("Are you sure?")) {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            await axios.delete(`/api/notes/${id}`, config);
            alert('Note successfully deleted');
          } catch (error) {
            alert('Invalid  Action');
            console.log(error);
          }
        }
    }
  const getNotes = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}`}
    };
      const {data} = await axios.get(`/api/notes`, config);
      // console.log(_id);
      // console.log(data);
      setData(data);
    };

    function CustomToggle({ children, eventKey }) {
      const decoratedOnClick = useAccordionButton(eventKey);

      return (
        <button
          type="button"
          style={{ backgroundColor: "white" }}
          onClick={decoratedOnClick}
        >
          {children}
        </button>
      );
  }
    useEffect(() => {
      getNotes();
    });
    return (
        <MainScreen title={`Welcome back ${user.name}...`}>
            <Link to="/createnote">
                <Button style={{ marginBottom: 6, marginLeft: 10 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            {
                data.map((note) => {
                    return (
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Card>
                            <CustomToggle eventKey="0">
                              <Card.Header style={{ display: "flex" }}>
                                <span
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    flex: 1,
                                    width: "100%",
                                    alignSelf: "center",
                                    fontSize: 18,
                                  }}
                                >
                                  {note.title}
                                </span>
                                <div>
                                  <Link to={`/api/notes/${note._id}`}>
                                    <Button onClick={()=>{localStorage.setItem(
                                      "noteId",
                                      JSON.stringify(note._id)
                                    );}}>Edit</Button>
                                  </Link>
                                  <Button
                                    variant="danger"
                                    className="mx-2"
                                    onClick={() => deleteHandle(note._id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </Card.Header>
                            </CustomToggle>
                            <Accordion.Collapse eventKey='0'>
                              <Card.Body>
                                <h4>
                                  <Badge
                                    bg="success"
                                    color="white"
                                    text="light"
                                  >
                                    Category - {note.category}
                                  </Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                  <p>{note.content}</p>
                                  <footer className="blockquote-footer">
                                    Created on --Date
                                  </footer>
                                </blockquote>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion.Item>
                      </Accordion>
                    );
                })   
            }
        </MainScreen>
    );
}

export default MyNotes