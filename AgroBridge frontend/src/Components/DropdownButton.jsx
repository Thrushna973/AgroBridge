import React, {useState} from 'react'
import './DropdownButton.css' 
import { ChevronDown } from 'lucide-react';
const DropdownButton = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("This Month");

  const options = ["Today", "This Week", "This Month", "This Year"];

  return (
    <div className="dropdown">
      <button
        className="dropdown-btn"
        onClick={() => setOpen(!open)}
      >
        {selected}
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton