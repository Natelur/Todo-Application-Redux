import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToList } from "../features/task/taskSlice";
import { Button, Form, Modal } from "react-bootstrap";

export default function AddTask({ show, handleClose }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    function addTask(event) {
        event.preventDefault();
        const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        const newTask = {
            id: Date.now(),
            title,
            description,
            completed,
            timer: totalSeconds,
        };
        dispatch(addToList(newTask));
    }

    function resetForm() {
        setTitle("");
        setDescription("");
        setCompleted(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }

    function SubmitTodo(event) {
        addTask(event);
        resetForm();
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Cooking Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={SubmitTodo}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Key in the dish"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Key in the steps"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Countdown timer (Hours, Minutes, Seconds)</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type="number"
                                placeholder="HH"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                min="0"
                                className="me-2"
                                required
                            />
                            <Form.Control
                                type="number"
                                placeholder="MM"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                min="0"
                                max="59"
                                className="me-2"
                                required
                            />
                            <Form.Control
                                type="number"
                                placeholder="SS"
                                value={seconds}
                                onChange={(e) => setSeconds(e.target.value)}
                                min="0"
                                max="59"
                                required
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            id="complete"
                            label="Mark as completed"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={SubmitTodo}>
                    Create Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}