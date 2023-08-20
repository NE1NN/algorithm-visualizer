import Node from './Node/Node';
import { useState } from 'react';
import { dfs } from '../Algorithms/dfs';

import './PathfindingVisualizer.css'

export const rows = 50;
export const cols = 20;
 
export default function PathfindingVisualizer() {
  const startNode = [3, 16];
  const endNode = [34, 2];
  const wallNode = [[33, 2], [33, 1], [33, 3], [34, 3]];

  // Creates initial grid
  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = []
      for (let col = 0; col < cols; col++) {
        const isStart = row === startNode[0] && col === startNode[1];
        const isEnd = row === endNode[0] && col === endNode[1];
        const isWall = wallNode.some(([wallRow, wallCol]) => wallRow === row && wallCol === col);
        currentRow.push({row, col, isStart, isEnd, isVisited: false, isPath: false, isWall});
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  })

  function handleClick() {
    dfs(grid, startNode, endNode, setGrid, 10)
  }

  return (
    // Creates a grid
    <div className='grid'>
      {grid.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
        {row.map(node => (
          <Node key={`${node.row}-${node.col}`} isStart={node.isStart} isEnd={node.isEnd} isVisited={node.isVisited} isPath={node.isPath} isWall={node.isWall}/>
        ))}
      </div>
      ))}
      <button onClick={handleClick}>Start</button>
    </div>
  );
}