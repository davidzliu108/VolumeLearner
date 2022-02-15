import React, {useState, useEffect, useRef} from 'react';
import { Card, Button, Form, Row, Container, CardGroup, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {db} from "./firebase-config"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useSSRSafeId } from '@react-aria/ssr';
import { array } from 'prop-types';


function useKey(key, cb) {
  const callbackRef = useRef(cb);

  useEffect(()=> {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event);
      }
    }
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
}

export default function App() {
  const [songs, setSongs] = useState([]);
  const [songName, setSongName] = useState("");
  const [playing, setPlaying] = useState(false);
  const songRef = collection(db, "songs");
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  function handleUp() {
    console.log("Volume Up was pressed");
    setUpCount(upCount + 1);
  }
  useKey("Equal", handleUp);
  function handleDown() {
    console.log("Volume Down was pressed");
    setDownCount(downCount + 1);
  }
  useKey("Minus", handleDown);

  // handle play song form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlaying(true);
    await addDoc(songRef, {title: songName, ups: upCount, downs: downCount});

  }

  // get song list from db
  useEffect(() => {
    const getSongs = async() => {
      const data = await getDocs(songRef);
      setSongs(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getSongs();
  }, [])

  function sortData() {
  
  }

  const deleteSong = async (id) => {
    const songDoc = doc(db, "songs", id);
    await deleteDoc(songDoc);
  }



  return (
    <div>
      <Container fluid="sm">
        <br></br>
        <h1>Welcome to Volume Learner</h1>
        <h3>Play a song to get started!</h3>
        <br></br>
        <div className="mx-0">
          <Form>
            <Form.Group className="mb-3" controlId="songname">
              <Form.Control 
              name="songName"
              placeholder="Enter Song Name"
              value={songName}
              onChange = {(e) => setSongName(e.target.value)}
              className="w-50"
              />
            </Form.Group>
            <Button onClick={handleSubmit} variant="dark" className="float-right">
              Play
            </Button>
          </Form>
        </div>
        <br></br>
        <div className="btn-group" role="group" aria-label="volume buttons">
          <button onClick={handleDown} type="button" className="btn btn-outline-secondary">-</button>
          <button onClick={handleUp} type="button" className="btn btn-outline-secondary">+</button>
        </div>
        <br></br>
        <br></br>
        <Button onClick={sortData} variant="outline-dark" size="sm">
          Sort Data
        </Button>
      </Container>
      <br></br>

      <Container>
        {/* <CardGroup>
          {songs.map((song) => {
            return (
              <Card border="dark" style={{width: '20rem'}}>
                {" "}
                <Card.Title>{song.title}</Card.Title>
                <p>Volume Ups: {song.ups}</p>
                <p>Volume Downs: {song.downs}</p>
                <Button onClick={() => {deleteSong(song.id)}}>Delete</Button>
              </Card>
            )
          })}
        </CardGroup> */}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Score</th>
              <th>Song Name</th>
              <th>Volume Ups</th>
              <th>Volume Downs</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => {
              return (
                <tr>
                  <td>{song.ups - song.downs}</td>
                  <td>{song.title}</td>
                  <td>{song.ups}</td>
                  <td>{song.downs}</td>
                  <td> <Button onClick={() => {deleteSong(song.id)}}>Delete</Button> </td>
                </tr>
              )
            })}
          </tbody>

        </Table>
      </Container>



    </div>
  )
} 
