import './Node.css';

export default function Node(props) {
  const {position} = props;
  return <div className={`node ${position}`}></div>
}