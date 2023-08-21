import './Node.css';

export default function Node(props) {
  const {
    isStart,
    isEnd,
    isVisited,
    isPath,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseUp,
  } = props;
  let className = 'node';
  if (isStart) {
    className = 'node start';
  } else if (isEnd) {
    className = 'node end';
  } else if (isPath) {
    className = 'node path';
  } else if (isVisited) {
    className = 'node visited';
  } else if (isWall) {
    className = 'node wall';
  }

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    ></div>
  );
}
