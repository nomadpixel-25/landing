// import React from "react";
import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";

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
    const [assignments, setAssignments] = useState({});
    const [completedChores, setCompletedChores] = useState({}); // ✅ Track completed chores
      // Load assignments from local storage when the component mounts
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments"));
    if (savedAssignments) {
      setAssignments(savedAssignments);
    }
  }, []); 

    // Function to toggle a chore's completion status
    // Save assignments to local storage whenever they change
    useEffect(() => {
      localStorage.setItem("assignments", JSON.stringify(assignments));
    }, [assignments]);

      // Function to manually assign a chore to a member
  const assignChore = (memberName, choreName) => {
    setAssignments((prev) => ({
      ...prev,
      [memberName]: chores.find((chore) => chore.name === choreName),
    }));
  };
  
  return (
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Assign Chores</h2>

      {members.map((member) => (
        <div key={member.name} className="mb-4">
          <label className="block font-semibold mb-1">
            {member.icon} {member.name}
          </label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => assignChore(member.name, e.target.value)}
            value={assignments[member.name]?.name || ""}
          >
            <option value="">Select a chore</option>
            {chores.map((chore) => (
              <option key={chore.name} value={chore.name}>
                {chore.icon} {chore.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="mt-6">
        {members.map((member) => (
          <MemberCard
            key={member.name}
            member={member}
            chores={assignments[member.name] ? [assignments[member.name]] : []}
          />
        ))}
      </div>
    </div>
  );
}

export default ChoreTable;
