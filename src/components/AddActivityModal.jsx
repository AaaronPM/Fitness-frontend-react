import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createRoutineActivity, fetchRoutines } from "../api";
import { Container } from "react-bootstrap";


export default function AddActivityModal({ show, onHide, token,activities, routineId,setRoutines}) {
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [errMessage, setErrMessage] = useState({});
  const [isError, setIsError] = useState(false);
  const [activityId, setActivityId] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const newRoutineActivity = { count, duration, activityId };
    try {
      await createRoutineActivity(token,routineId, newRoutineActivity);
      const updatedRoutines = await fetchRoutines();
      setRoutines(updatedRoutines)
      onHide()
      setCount('')
      setDuration('')
    } catch (err) {
      setErrMessage(err);
      setIsError(true);
      console.error(err);
    }
  };
  console.log('token :>> ', token);
  const closeModal = () => {
    onHide();
    setCount(0);
    setIsError(false);
    setErrMessage("");
    setDuration(0);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {<h1>hello</h1>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex flex-column gap-3 p-3"
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group>
            <Form.Label>Add Activity Count</Form.Label>
            <Form.Control
              type="text"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Add Activity Duration</Form.Label>
            <Form.Control
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
          <Form.Select onChange={e=>setActivityId(e.target.value)}>
          <option>Activities</option>
            {activities.map((activity)=>{
              return <option key={activity.id} value={activity.id}>{activity.name}</option>
            })}
          </Form.Select>
          <Container className="d-flex justify-content-end gap-2 w-100">
            <Button variant="success" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={closeModal}>
              Close
            </Button>
          </Container>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
}
