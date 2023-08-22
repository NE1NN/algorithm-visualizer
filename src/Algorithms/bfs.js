import {rows, cols} from '../PathfindingVisualizer/PathfindingVisualizer';

export function bfs(grid, startNode, endNode, setGrid, delay) {
  const newGrid = [...grid];
  const queue = [newGrid[startNode[0]][startNode[1]]];
  let i = 0;
  const intervalId = setInterval(() => {
    if (i >= queue.length) { 
      clearInterval(intervalId); 
      setGrid([...newGrid]);
      return;
    }
    const node = queue[i];
    if (!node.isVisited) {
      node.isVisited = true;
      // newGrid[node.row][node.col].isVisited = true;
      for (const neighbor of getNeighbors(newGrid, node)) {
        neighbor.previousNode = node;
        queue.push(neighbor);
      }
    }
    i++;
    setGrid([...newGrid]);
    if (node === newGrid[endNode[0]][endNode[1]]) { /* End node found, trace back path */
      clearInterval(intervalId);
      const path = getPath(newGrid[endNode[0]][endNode[1]], delay);
      setGrid([...newGrid]);
      return path;
    }
  }, delay);

  function getPath(endNode, delay) {
    const path = [];
    let currentNode = endNode;
    const intervalId = setInterval(() => {
      if (currentNode.previousNode) {
        currentNode.isPath = true;
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
      } else {
        path.unshift(currentNode);
        clearInterval(intervalId);
      }
      setGrid([...newGrid]);
    }, delay);
    return path;
  } 
}

function isNeighborNotWall(grid, row, col) {
  if (row >= 0 && row < rows && col >= 0 && col < cols) {
    return !grid[row][col].isWall
  }

  return false
}

function getNeighbors(grid, node) {
  const {row, col} = node;
  const neighbors = [];
  console.log(neighbors);
  if (isNeighborNotWall(grid, row - 1, col)) neighbors.push(grid[row - 1][col]);
  if (isNeighborNotWall(grid, row + 1, col)) neighbors.push(grid[row + 1][col]);
  if (isNeighborNotWall(grid, row, col - 1)) neighbors.push(grid[row][col - 1]);
  if (isNeighborNotWall(grid, row, col + 1)) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}