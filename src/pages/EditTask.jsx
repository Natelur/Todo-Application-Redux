import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateTask, hideEditModal } from '../features/task/taskSlice';

const EditTaskModal = () => {
  const dispatch = useDispatch();
  const { taskList, editTaskId, showEditModal } = useSelector((state) => state.task);
  const [taskData, setTaskData] = useState({ title: '', description: '', timer: 0, completed: false });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (editTaskId !== null) {
      const task = taskList.find((task) => task.id === editTaskId);
      if (task) {
        setTaskData(task);
        const hrs = Math.floor(task.timer / 3600);
        const mins = Math.floor((task.timer % 3600) / 60);
        const secs = task.timer % 60;
        setHours(hrs);
        setMinutes(mins);
        setSeconds(secs);
      }
    }
  }, [editTaskId, taskList]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({ ...taskData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    const updatedTask = { ...taskData, timer: totalSeconds };
    dispatch(updateTask({ ...updatedTask, id: editTaskId }));
    dispatch(hideEditModal());
  };

  return (
    <Modal show={showEditModal} onHide={() => dispatch(hideEditModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={taskData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="taskTimer" className="mt-3">
            <Form.Label>Countdown timer (Hours, Minutes, Seconds)</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="HH"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
                className="me-2"
              />
              <Form.Control
                type="number"
                placeholder="MM"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
                className="me-2"
              />
              <Form.Control
                type="number"
                placeholder="SS"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                min="0"
                max="59"
              />
            </div>
          </Form.Group>
          <Form.Group controlId="taskCompleted" className="mt-3">
            <Form.Check
              type="checkbox"
              name="completed"
              label="Completed"
              checked={taskData.completed}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(hideEditModal())}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
