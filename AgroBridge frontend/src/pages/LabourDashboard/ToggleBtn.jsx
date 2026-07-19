import React, {useState} from "react"

function ToggleBtn() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="toggle-container">
      <span>
        {available ? "Available Today" : "Not Available"}
      </span>

      <button
        className={`toggle-btn ${available ? "active" : ""}`} 
        onClick={() => setAvailable(!available)}
      > <span className="toggle-text">{available ? "ON" : "OFF"} </span>
        <div className="toggle-circle"></div>
      </button>
    </div>
  );
}

export default ToggleBtn;