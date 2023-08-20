import Node from './Node/Node';
import { useState } from 'react';
import { dfs } from '../Algorithms/dfs';

import './PathfindingVisualizer.css'

export const rows = 50;
export const cols = 20;
 
export default function PathfindingVisualizer() {
  const startNode = [3, 16];
  const endNode = [34, 2];

  // Creates initial grid
  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = []
      for (let col = 0; col < cols; col++) {
        const isStart = row === startNode[0] && col === startNode[1];
        const isEnd = row === endNode[0] && col === endNode[1];
        currentRow.push({row, col, isStart, isEnd, isVisited: false, isPath: false, isWall: false});
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  })

  function handleButtonClick() {
    dfs(grid, startNode, endNode, setGrid, 10)
  }

  function handleNodeToWallClick(row, col) {
    const node = grid[row][col];
    node.isWall = !node.isWall;
    setGrid([...grid]);
  }

  return (
    // Creates a grid
    <div className='grid'>
      {grid.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
        {row.map(node => (
          <Node key={`${node.row}-${node.col}`} isStart={node.isStart} isEnd={node.isEnd} isVisited={node.isVisited} isPath={node.isPath} isWall={node.isWall}
          onClick={() => handleNodeToWallClick(node.row, node.col)}/>
        ))}
      </div>
      ))}
      <button onClick={handleButtonClick}>Start</button>
    </div>
  );
}