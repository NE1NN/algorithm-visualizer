import './Navbar.css';
import { bfs } from '../Algorithms/bfs';

export default function Navbar(props) {
  const { grid, startNode, endNode, setGrid } = props;

  function handleButtonClick() {
    bfs(grid, startNode, endNode, setGrid, 10);
  }

  return (
    <nav className="navbar">
      <div id="title">Path Finding Algorithm</div>
      <div>BFS</div>
      <div>Speed: Fast</div>
      <button className="startButton" onClick={handleButtonClick}>
        Start
      </button>
    </nav>
  );
}
