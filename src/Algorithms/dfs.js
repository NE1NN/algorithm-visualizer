import {rows, cols} from '../PathfindingVisualizer/PathfindingVisualizer';

export function dfs(grid, startNode, setGrid) {
  const stack = [grid[startNode[0]][startNode[1]]];
  while (stack.length > 0) {
    const node = stack.pop();
    if (!node.isVisited) {
      node.isVisited = true;
      for (const neighbor of getNeighbors(grid, node)) {
        stack.push(neighbor);
      }
    }
  }
  setGrid([...grid])
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