import {rows, cols} from '../PathfindingVisualizer/PathfindingVisualizer';

export function dfs(grid, startNode, endNode, setGrid, delay) {
  const stack = [grid[startNode[0]][startNode[1]]];
  let i = 0;
  const intervalId = setInterval(() => {
    if (i >= stack.length) {
      clearInterval(intervalId);
      setGrid([...grid]);
      return;
    }
    const node = stack[i];
    if (!node.isVisited) {
      node.isVisited = true;
      for (const neighbor of getNeighbors(grid, node)) {
        neighbor.previousNode = node;
        stack.push(neighbor);
      }
    }
    i++;
    setGrid([...grid]);
    if (node === grid[endNode[0]][endNode[1]]) {
      clearInterval(intervalId);
      const path = getPath(grid[endNode[0]][endNode[1]]);
      setGrid([...grid]);
      return path;
    }
  }, delay);

  function getPath(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode.previousNode) {
      currentNode.isPath = true;
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    path.unshift(currentNode);
    return path;
  }
}

function getNeighbors(grid, node) {
  const {row, col} = node;
  const neighbors = [];
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < rows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < cols - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}