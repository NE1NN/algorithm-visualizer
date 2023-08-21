import {rows, cols} from '../PathfindingVisualizer/PathfindingVisualizer';

export function dfs(grid, startNode, endNode, setGrid, delay) {
  const stack = [grid[startNode[0]][startNode[1]]];
  const intervalId = setInterval(() => {
    if (!stack.length) { 
      clearInterval(intervalId); 
      setGrid([...grid]);
      return;
    }
    const node = stack.pop();
    if (!node.isVisited) {
      node.isVisited = true;
      for (const neighbor of getNeighbors(grid, node)) {
        neighbor.previousNode = node;
        stack.push(neighbor);
      }
    }
    setGrid([...grid]);
    if (node === grid[endNode[0]][endNode[1]]) { /* End node found, trace back path */
      clearInterval(intervalId);
      const path = getPath(grid[endNode[0]][endNode[1]], delay);
      setGrid([...grid]);
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
      setGrid([...grid]);
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