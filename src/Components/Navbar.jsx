import './Navbar.css';
import { dfs } from '../Algorithms/dfs';

export default function Navbar(props) {
  const { grid, startNode, endNode, setGrid } = props;

  function handleButtonClick() {
    dfs(grid, startNode, endNode, setGrid, 10);
  }

  return (
    <nav className="navbar">
      <button onClick={handleButtonClick}>Start</button>
    </nav>
  );
}
