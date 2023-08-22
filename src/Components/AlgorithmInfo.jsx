export default function AlgorithmInfo(props) {
  const { algorithm } = props;
  let algorithmDesc = '';

  if (algorithm === 'BFS') {
    algorithmDesc =
      'Breadth-First Search is used to find the shortest path in an unweighted graph.\n It uses a Queue data structure that follows First In First Out (FIFO)';
  } else {
    algorithmDesc =
      'Depth-First Search is used to check for cycles in a graph.\n It uses a Stack data structure that follows Last In First Out (LIFO)';
  }

  return <div>{algorithmDesc}</div>;
}
