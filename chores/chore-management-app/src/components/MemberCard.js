// #################################################
// src/components/MemberCard.js
import React, { useState } from "react";
import { useDroppable } from '@dnd-kit/core';

function MemberCard({ member, chores }) {
  const { setNodeRef, isOver } = useDroppable({
    id: member.name,
  });

  const [completedChores, setCompletedChores] = useState([]);

  const toggleChoreCompletion = (choreName) => {
    setCompletedChores((prev) =>
      prev.includes(choreName)
        ? prev.filter((name) => name !== choreName)
        : [...prev, choreName]
    );
  };

  return (
    <div
      ref={setNodeRef}
      className={`border p-4 rounded-lg shadow-md mb-4 ${isOver ? "bg-blue-100" : ""}`}
    >
      <h2 className="text-xl font-bold mb-2">
        {member.icon} {member.name}
      </h2>
      <div className="grid grid-cols-1 gap-2">
        {chores.map((chore) => (
          <div
            key={chore.name}
            className={`flex items-center p-2 rounded cursor-pointer ${
              completedChores.includes(chore.name)
                ? "bg-green-300"
                : "bg-gray-200"
            }`}
            onClick={() => toggleChoreCompletion(chore.name)}
          >
            <span className="mr-2">{chore.icon}</span>
            <span>{chore.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemberCard;

// #################################################
