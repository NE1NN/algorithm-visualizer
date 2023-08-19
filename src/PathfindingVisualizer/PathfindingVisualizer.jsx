import Node from './Node/Node';

import './PathfindingVisualizer.css'
 
export default function PathfindingVisualizer() {
  const rows = 30;
  const cols = 20;


  return (
    <div className='grid'>
      {[...Array(rows)].map((_, rowIndex) => (
        <div className='row' key={rowIndex}>
        {[...Array(cols)].map((_, colIndex) => (
          <Node key={`${rowIndex}-${colIndex}`} />
        ))}
      </div>
      ))}
    </div>
  );
}