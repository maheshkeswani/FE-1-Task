import React, { useState, useEffect, useCallback } from "react";
// import styles from "./ChipInput.module.scss";
import { User, ChipInputProps } from "../types";
import Chip from "./Chip";

const ChipInput: React.FC<ChipInputProps> = ({ users }): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [selectedChips, setSelectedChips] = useState<User[]>([]);
  const [isLastChipHighlighted, setIsLastChipHighlighted] =
    useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    const filter = inputValue.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter) &&
        !selectedChips.find((chip) => chip.id === user.id)
    );
    setFilteredUsers(filtered);
  }, [inputValue, users, selectedChips]);

  const handleSelectUser = useCallback((user: User) => {
    setSelectedChips((chips) => [...chips, user]);
    setInputValue("");
    //assumption that last chip should not be highlighted if new one is added after backpress
    setIsLastChipHighlighted(false);
  }, []);

  const handleRemoveChip = useCallback((userId: number) => {
    setSelectedChips((chips) => chips.filter((chip) => chip.id !== userId));
  }, []);

  // Logic to handle backspace key press
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && inputValue === "") {
        if (isLastChipHighlighted) {
          const lastChip = selectedChips[selectedChips.length - 1];
          if (lastChip) {
            handleRemoveChip(lastChip.id);
          }
          setIsLastChipHighlighted(false);
        } else if (selectedChips.length > 0) {
          setIsLastChipHighlighted(true);
        }
      } else {
        setIsLastChipHighlighted(false);
      }
    },
    [handleRemoveChip, inputValue, isLastChipHighlighted, selectedChips]
  );

  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      // Use a timeout to delay hiding the suggestions to allow for selection
      const currentTarget = event.currentTarget;

      setTimeout(() => {
        // Check if the new active element is not within the suggestions box
        if (!currentTarget.contains(document.activeElement)) {
          setIsInputFocused(false);
        }
      }, 0);
    },
    []
  );

  return (
    <div className="flex flex-col border-b-2 border-blue-600 p-2 w-full bg-white w-70">
      <div className="flex flex-wrap items-center ">
        {selectedChips.map((user, index) => (
          <Chip
            key={user.id}
            label={user.name}
            logo={user.logo}
            onRemove={() => handleRemoveChip(user.id)}
            isHighlighted={
              isLastChipHighlighted && index === selectedChips.length - 1
            }
          />
        ))}
        <div className="flex flex-col relative">
          <input
            type="text"
            className="flex-grow border-none outline-none  text-base bg-transparent"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Add New User..."
          />
          {isInputFocused && (
            <div className="w-[500px] max-h-[300px] bg-gray-50 shadow-lg absolute top-full border-none mt-12 w-360 max-h-500 overflow-y-auto overflow-x-hidden">
              {filteredUsers.map((user) => (
                <div
                className="flex items-center my-2 flex-row  p-2 cursor-pointer hover:bg-gray-200 hover:rounded-[3px]"
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent the blur event when mousedown occurs
                >
                  
                  <img className="rounded-full w-[40px]" src={user.logo} alt={user.name} />
                  <div className="mx-6 w-[30%]  text-start">{user.name}</div>

                
                  <div className="pr-1 w-[40%] text-gray-500">{user.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
