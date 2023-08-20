import './Navbar.css';
import { dfs } from '../Algorithms/dfs';

export default function Navbar(props) {
  const { grid, startNode, endNode, setGrid } = props;

  function handleButtonClick() {
    dfs(grid, startNode, endNode, setGrid, 10);
  }

  return (
    <nav className="navbar">
      <div id="title">Path Finding Algorithm</div>
      <div>DFS</div>
      <button className="startButton" onClick={handleButtonClick}>
        Start
      </button>
    </nav>
  );
}
