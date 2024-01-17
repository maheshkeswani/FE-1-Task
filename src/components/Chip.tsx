import React from "react";
// import styles from "./Chip.module.scss";
import { ChipProps } from "../types";

const Chip: React.FC<ChipProps> = ({
  label,
  logo,
  onRemove,
  isHighlighted,
}): JSX.Element => {
  return (
    <div
      className={`flex items-center px-2 py-2 m-2 bg-gray-200 rounded-full text-sm leading-6 `}
      style={{ border: isHighlighted ? "2px solid #3876d2" : "none" }}
    >
      <img src={logo} alt={label} className="w-8 h-8 rounded-full mr-2" />
      <span className="mr-3">{label}</span>
      <button
        className="cursor-pointer bg-transparent border-none text-gray-700 text-base font-[900]"
        style={{ color:  isHighlighted ? "#3876d2" : "black" }}
        onClick={onRemove}
        aria-label="Remove"
      >
        ✕
      </button>
    </div>
  );
};

export default Chip;
