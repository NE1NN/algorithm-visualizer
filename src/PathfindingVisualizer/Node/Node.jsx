import './Node.css';

export default function Node(props) {
  const {isStart, isEnd, isVisited} = props;
  let className = "node ";
  if (isStart) {
    className += "start";
  } else if (isEnd) {
    className += "end";
  } else if (isVisited) {
    className += "visited";
  }

  return <div className={className}></div>;
}