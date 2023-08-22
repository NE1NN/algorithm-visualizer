import './InfoBar.css';

export default function InfoBar() {
  return (
    <div className="info-bar">
      <container>
        <div className="info-node" id="info-start"></div>
        <div>Start</div>
      </container>
      <container>
        <div className="info-node" id="info-end"></div>
        <div>End</div>
      </container>
      <container>
        <div className="info-node" id="info-visited"></div>
        <div>Visited</div>
      </container>
      <container>
        <div className="info-node" id="info-path"></div>
        <div>Path</div>
      </container>
    </div>
  );
}
