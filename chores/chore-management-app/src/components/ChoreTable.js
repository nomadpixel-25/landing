// src/components/ChoreTable.js
import React, { useState } from "react";
import { DndContext } from '@dnd-kit/core';
import MemberCard from "./MemberCard";
import DraggableChore from "./DraggableChore";

const members = [
  { name: "Ale", icon: "👩" },
  { name: "Anto", icon: "👨" },
  { name: "Leo", icon: "🧒" },
];

const chores = [
  { name: "Bathtime", icon: "🛁" },
  { name: "Bedtime", icon: "🛌" },
  { name: "Drop-off", icon: "🏫" },
  { name: "Pick-up", icon: "🏡" },
];



function ChoreTable() {
  // assignments: an object where key = member name, and value = array of chores
  const [assignments, setAssignments] = useState({});

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // Check if the chore was dropped over a member card
    if (over && active.id && over.id) {
      const memberName = over.id;
      const chore = chores.find((chore) => chore.name === active.id);
      if (chore) {
        setAssignments((prev) => ({
          ...prev,
          [memberName]: [...(prev[memberName] || []), chore],
        }));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Drag & Drop Chores
        </h2>
        {/* Draggable Chore Items */}
        <div className="flex justify-center space-x-4 mb-6">
          {chores.map((chore) => (
            <DraggableChore key={chore.name} chore={chore} />
          ))}
        </div>
        {/* Member Cards as Droppable Zones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              chores={assignments[member.name] || []}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default ChoreTable;
