import './style.scss';
import { ShowBar } from './ShowBar';
import { ShowList } from './ShowList';

export default function ToDoList() {
  return (
    <main className="container-fluid ToDoList-section">
      <ShowBar />
      <ShowList />
    </main>
  );
}