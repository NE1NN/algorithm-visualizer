import Node from './Node/Node';

import './PathfindingVisualizer.css'
 
export default function PathfindingVisualizer() {
  // const nodes = [1, 2, 3, 4];
  const rows = 10;
  const cols = 10;


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