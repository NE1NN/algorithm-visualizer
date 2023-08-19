import './Node.css';

export default function Node(props) {
  const {isStart, isEnd, isVisited} = props;
  const className = `node ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${isVisited ? 'visited' : ''}`;

  return <div className={className}></div>;
}