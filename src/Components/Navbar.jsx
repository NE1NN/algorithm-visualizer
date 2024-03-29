import './Navbar.css';
import { dfs } from '../Algorithms/dfs';
import { bfs } from '../Algorithms/bfs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState } from 'react';
import { generateStructuredMaze } from '../Algorithms/generateMaze';

export default function Navbar(props) {
  const { grid, startNode, endNode, setGrid, algorithm, setAlgorithm } = props;
  const [speed, setSpeed] = useState(10);

  function handleButtonClick() {
    clearPath();
    if (algorithm === 'BFS') {
      bfs(grid, startNode, endNode, setGrid, speed);
    } else {
      dfs(grid, startNode, endNode, setGrid, speed);
    }
  }

  const algorithmOptions = ['BFS', 'DFS'];
  const defaultAlgoOption = algorithmOptions[0];

  const speedOptions = ['Fast', 'Medium', 'Slow'];
  const defaultSpeedOption = speedOptions[0];

  function changeSpeed(selectedOption) {
    const speed = selectedOption.value;
    if (speed === 'Fast') setSpeed(10);
    else if (speed === 'Medium') setSpeed(20);
    else if (speed === 'Slow') setSpeed(30);
  }

  function changeAlgorithm(selectedOption) {
    const algorithm = selectedOption.value;
    if (algorithm === 'BFS') setAlgorithm('BFS');
    else setAlgorithm('DFS');
  }

  function clearPath() {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) =>
        row.map((node) => {
          node.isVisited = false;
          node.isPath = false;
          node.previousNode = undefined;
          return node;
        })
      );
      return newGrid;
    });
  }

  function clearGrid() {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) =>
        row.map((node) => {
          node.isVisited = false;
          node.isPath = false;
          node.isWall = false;
          node.previousNode = undefined;
          return node;
        })
      );
      return newGrid;
    });
  }

  return (
    <nav className="navbar">
      <div id="title">Path Finding Algorithm</div>
      <Dropdown
        options={algorithmOptions}
        value={defaultAlgoOption}
        placeholder="Select an option"
        onChange={changeAlgorithm}
        className="dropdown"
      />
      <Dropdown
        options={speedOptions}
        value={defaultSpeedOption}
        placeholder="Select an option"
        onChange={changeSpeed}
        className="dropdown"
      />
      <button className="startButton" onClick={handleButtonClick}>
        Start
      </button>
      <button
        className="otherButton"
        onClick={() => {
          generateStructuredMaze(startNode, endNode, setGrid);
          clearPath();
        }}
      >
        Generate Maze
      </button>
      <button className="otherButton" onClick={clearPath}>
        Clear Path
      </button>
      <button className="otherButton" onClick={clearGrid}>
        Clear Grid
      </button>
    </nav>
  );
}
