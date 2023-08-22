import Node from './Node/Node';
import { useState } from 'react';
import Navbar from '../Components/Navbar';

import './PathfindingVisualizer.css';

export const rows = 50;
export const cols = 20;

export default function PathfindingVisualizer() {
  const [startNode, setStartNode] = useState([3, 2]);
  const [endNode, setEndNode] = useState([34, 2]);
  const [isChangingStart, setIsChangingStart] = useState(false);
  const [isChangingEnd, setIsChangingEnd] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  // Creates initial grid
  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        const isStart = row === startNode[0] && col === startNode[1];
        const isEnd = row === endNode[0] && col === endNode[1];
        currentRow.push({
          row,
          col,
          isStart,
          isEnd,
          isVisited: false,
          isPath: false,
          isWall: false,
        });
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  });

  function toggleWall(row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    node.isWall = !node.isWall;
    setGrid([...newGrid]);
  }

  function newStartNode(row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    node.isStart = true;
    setStartNode([row, col]);
    setGrid([...newGrid]);
  }

  function newEndNode(row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    node.isEnd = true;
    setEndNode([row, col]);
    setGrid([...newGrid]);
  }

  function removeStartNode(row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    node.isStart = false;
    setIsChangingStart(true);
    setGrid([...newGrid]);
  }

  function removeEndNode(row, col) {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    node.isEnd = false;
    setIsChangingEnd(true);
    setGrid([...newGrid]);
  }

  function handleNodeMouseDown(row, col) {
    setIsHolding(true);
    const node = grid[row][col];
    if (node.isStart) {
      removeStartNode(row, col);
    } else if (node.isEnd) {
      removeEndNode(row, col);
    } else {
      toggleWall(row, col);
    }
  }

  function handleNodeMouseEnter(row, col) {
    if (!isHolding) return;
    if (isChangingStart) {
      newStartNode(row, col);
    } else if (isChangingEnd) {
      newEndNode(row, col);
    } else {
      toggleWall(row, col);
    }
  }

  function handleNodeMouseLeave(row, col) {
    const node = grid[row][col];
    if (isChangingStart) {
      node.isStart = false;
    } else if (isChangingEnd) {
      node.isEnd = false;
    }
  }

  function handleNodeMouseUp(row, col) {
    setIsHolding(false);
    if (isChangingStart) {
      newStartNode(row, col);
      setIsChangingStart(false);
    } else if (isChangingEnd) {
      newEndNode(row, col);
      setIsChangingEnd(false);
    }
  }

  return (
    // Creates a grid
    <div className="grid-container">
      <Navbar
        grid={grid}
        startNode={startNode}
        endNode={endNode}
        setGrid={setGrid}
      ></Navbar>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((node) => (
              <Node
                key={`${node.row}-${node.col}`}
                isStart={node.isStart}
                isEnd={node.isEnd}
                isVisited={node.isVisited}
                isPath={node.isPath}
                isWall={node.isWall}
                onMouseDown={() => handleNodeMouseDown(node.row, node.col)}
                onMouseEnter={() => handleNodeMouseEnter(node.row, node.col)}
                onMouseLeave={() => handleNodeMouseLeave(node.row, node.col)}
                onMouseUp={() => handleNodeMouseUp(node.row, node.col)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
