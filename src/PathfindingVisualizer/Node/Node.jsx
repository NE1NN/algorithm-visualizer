import './Node.css';

export default function Node(props) {
  const {isStart, isEnd, isVisited, isPath} = props;
  let className = "node";
  if (isStart) {
    className = "node start";
  } else if (isEnd) {
    className = "node end";
  } else if (isVisited) {
    className = "node visited";
  } else if (isPath) {
    className = "node path"
  }

  return <div className={className}></div>;
}