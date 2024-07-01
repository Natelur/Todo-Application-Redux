import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { setEditTaskId, showEditModal } from '../features/task/taskSlice';
import { useDispatch } from 'react-redux';
import { removeTask } from '../features/task/taskSlice';

const TaskCard = ({ task }) => {
  const completed = task.completed;
  const border = completed ? 'success' : 'danger';
  const [timer, setTimer] = useState(task.timer);
  const [timerInterval, setTimerInterval] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimer(task.timer);
  }, [task.timer]);

  const startTimer = () => {
    if (timerInterval === null && timer > 0) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalID);
            return 0;
          }
        });
      }, 1000);
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(task.timer);
  };

  const deleteTask = () => {
    dispatch(removeTask(task.id));
  };

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const handleEditClick = () => {
    dispatch(setEditTaskId(task.id));
    dispatch(showEditModal());
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')} Hour(s) ${String(minutes).padStart(2, '0')} Minute(s) ${String(seconds).padStart(2, '0')} Second(s)`;
  };
  
  return (
    <Card border={border} className="my-3">
      <Card.Header>{!completed && 'Not'} completed</Card.Header>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <p>{formatTime(timer)}</p>
        <Button size="sm" onClick={startTimer}>
          <i className="bi bi-play"></i>
        </Button>
        <Button size="sm" onClick={pauseTimer} className="ms-2">
          <i className="bi bi-pause-fill"></i>
        </Button>
        <Button size="sm" onClick={resetTimer} className="ms-2">
          <i className="bi bi-arrow-clockwise"></i>
        </Button>
        <Button size="sm" variant="secondary" onClick={handleEditClick} className="ms-2">
          <i className="bi bi-pencil"></i>
        </Button>
        <Button size="sm" variant="danger" onClick={deleteTask} className="ms-2">
          <i className="bi bi-trash"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
