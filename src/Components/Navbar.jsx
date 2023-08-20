import './Navbar.css';
import { bfs } from '../Algorithms/bfs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Navbar(props) {
  const { grid, startNode, endNode, setGrid } = props;

  function handleButtonClick() {
    bfs(grid, startNode, endNode, setGrid, 10);
  }

  const algorithmOptions = ['BFS', 'DFS'];
  const defaultAlgoOption = algorithmOptions[0];

  const speedOptions = ['Fast', 'Medium', 'Slow'];
  const defaultSpeedOption = speedOptions[0];

  return (
    <nav className="navbar">
      <div id="title">Path Finding Algorithm</div>
      <Dropdown
        options={algorithmOptions}
        value={defaultAlgoOption}
        placeholder="Select an option"
      />
      <Dropdown
        options={speedOptions}
        value={defaultSpeedOption}
        placeholder="Select an option"
      />
      <button className="startButton" onClick={handleButtonClick}>
        Start
      </button>
      ;
    </nav>
  );
}
