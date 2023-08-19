import './Node.css';

export default function Node(props) {
  const {isStart, isEnd, isVisited} = props;
  // const className = `node ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isVisited ? 'visited' : ''}`;
  let className = "node";
  if (isStart) {
    className = "node start";
  } else if (isEnd) {
    className = "node end";
  } else if (isVisited) {
    className = "node visited";
  }

  return <div className={className}></div>;
}