// Home.jsx
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import EditTaskModal from "./EditTask";

export default function Home() {
  const { taskList } = useSelector((state) => state.task);

  return (
    <Container>
      <h1 className="my-3" style={{ color: 'white' }}>Cooking Task</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {taskList.map((task) => (
          <Col key={task.id}>
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
      <EditTaskModal /> {/* Include the EditTaskModal component */}
    </Container>
  );
}
