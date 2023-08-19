import Node from './Node/Node';
import { useState, useEffect } from 'react';

import './PathfindingVisualizer.css'
 
export default function PathfindingVisualizer() {
  const rows = 50;
  const cols = 20;

  const startNode = [3, 6];
  const endNode = [28, 6];

  // 2D array to keep track of visited nodes
  const [visitedNodes, setVisitedNodes] = useState(Array(rows).fill().map(() => Array(cols).fill(false)));

  // State to track the current node being visited
  const [currentNode, setCurrentNode] = useState(null);

  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = []
      for (let col = 0; col < cols; col++) {
        const isStart = row === startNode[0] && col === startNode[1];
        const isEnd = row === endNode[0] && col === endNode[1];
        currentRow.push({row, col, isStart, isEnd, isVisited: false});
      }
      initialGrid.push(currentRow);
    }
    return initialGrid
  })


  return (
    // Creates a grid
    <div className='grid'>
      {[...Array(rows)].map((_, rowIndex) => (
        <div className='row' key={rowIndex}>
        {[...Array(cols)].map((_, colIndex) => {
          const isStart = rowIndex === startNode[0] && colIndex === startNode[1];
          const isEnd = rowIndex === endNode[0]  && colIndex === endNode[1];
          return <Node key={`${rowIndex}-${colIndex}`} isStart={isStart} isEnd={isEnd}/>
        })}
      </div>
      ))}
    </div>
  );
}