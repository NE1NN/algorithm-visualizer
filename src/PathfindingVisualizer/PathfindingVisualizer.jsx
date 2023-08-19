import Node from './Node/Node';
import { useState, useEffect } from 'react';

import './PathfindingVisualizer.css'
 
export default function PathfindingVisualizer() {
  const rows = 50;
  const cols = 20;

  // 2D array to keep track of visited nodes
  const [visitedNodes, setVisitedNodes] = useState(Array(rows).fill().map(() => Array(cols).fill(false)));

  // State to track the current node being visited
  const [currentNode, setCurrentNode] = useState(null);


  return (
    // Creates a grid
    <div className='grid'>
      {[...Array(rows)].map((_, rowIndex) => (
        <div className='row' key={rowIndex}>
        {[...Array(cols)].map((_, colIndex) => {
          let position = '';
          if (rowIndex === 3 && colIndex === 6) {
            position = 'start';
          } else if (rowIndex === 28 && colIndex === 6) {
            position = 'end';
          }
          return <Node key={`${rowIndex}-${colIndex}`} position={position}/>
        })}
      </div>
      ))}
    </div>
  );
}