import './Navbar.css';
import { dfs } from '../Algorithms/dfs';
import { bfs } from '../Algorithms/bfs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState } from 'react';
import { rows, cols } from '../PathfindingVisualizer/PathfindingVisualizer';

export default function Navbar(props) {
  const { grid, startNode, endNode, setGrid } = props;
  const [speed, setSpeed] = useState(10);
  const [algorithm, setAlgorithm] = useState('BFS');

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

  function generateStructuredMaze() {
    const newGrid = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => ({
        row: rowIndex,
        col: colIndex,
        isVisited: false,
        isWall: true, // Initially set everything as a wall
        isStart: rowIndex === startNode[0] && colIndex === startNode[1],
        isEnd: rowIndex === endNode[0] && colIndex === endNode[1],
      }))
    );

    // Start from a random even cell (to ensure we can move 2 cells over without issues)
    const randomRow = Math.floor(Math.random() * (rows / 2)) * 2;
    const randomCol = Math.floor(Math.random() * (cols / 2)) * 2;

    generateMazeRecursiveBacktracking(randomRow, randomCol, newGrid);
    setGrid(newGrid);
    // Get the list of neighbors for a given cell
    function getNeighbors(row, col, grid) {
      const neighbors = [];
      if (row > 1) neighbors.push([row - 2, col]);
      if (row < rows - 2) neighbors.push([row + 2, col]);
      if (col > 1) neighbors.push([row, col - 2]);
      if (col < cols - 2) neighbors.push([row, col + 2]);
      return neighbors.filter(
        (neighbor) => !grid[neighbor[0]][neighbor[1]].isVisited
      );
    }

    // Remove the wall between two cells
    function removeWall(cell, neighbor, grid) {
      const x = (cell[0] + neighbor[0]) / 2;
      const y = (cell[1] + neighbor[1]) / 2;
      grid[x][y].isWall = false;
    }

    function generateMazeRecursiveBacktracking(row, col, grid) {
      grid[row][col].isVisited = true;
      grid[row][col].isWall = false;

      const neighbors = getNeighbors(row, col, grid);
      while (neighbors.length) {
        const randomIndex = Math.floor(Math.random() * neighbors.length);
        const [nextRow, nextCol] = neighbors[randomIndex];
        if (!grid[nextRow][nextCol].isVisited) {
          removeWall([row, col], [nextRow, nextCol], grid);
          generateMazeRecursiveBacktracking(nextRow, nextCol, grid);
        }
        neighbors.splice(randomIndex, 1);
      }
    }
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
      <button className="otherButton" onClick={clearPath}>
        Clear Path
      </button>
      <button className="otherButton" onClick={clearGrid}>
        Clear Grid
      </button>
      <button className="otherButton" onClick={generateStructuredMaze}>
        Generate Maze
      </button>
    </nav>
  );
}
