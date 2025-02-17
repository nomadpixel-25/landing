// import React from "react";
import React, { useState } from "react";
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

// function ChoreTable() {
//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
//       {members.map((member) => (
//         <MemberCard key={member.name} member={member} chores={chores} />
//       ))}
//     </div>
//   );
// }

function ChoreTable() {
    const [assignments, setAssignments] = useState({});
    const [completedChores, setCompletedChores] = useState({}); // ✅ Track completed chores

    // Function to assign chores randomly
    const assignChores = () => {
      const newAssignments = {};
      members.forEach((member) => {
        newAssignments[member.name] = [
          chores[Math.floor(Math.random() * chores.length)],
        ];
      });
      setAssignments(newAssignments);
    };
    // ✅ Function to toggle chore completion
    // const toggleChoreCompletion = (memberName, choreName) => {
    //   setCompletedChores((prev) => ({
    //     ...prev,
    //     [memberName]: prev[memberName]?.includes(choreName)
    //       ? prev[memberName].filter((chore) => chore !== choreName)
    //       : [...(prev[memberName] || []), choreName],
    //   }));
    // };
    // const toggleChoreCompletion = (memberName, choreName) => {
    //   setCompletedChores((prev) => {
    //     const updatedChores = {
    //       ...prev,
    //       [memberName]: prev[memberName]?.includes(choreName)
    //         ? prev[memberName].filter((chore) => chore !== choreName)
    //         : [...(prev[memberName] || []), choreName],
    //     };
    
    //     console.log("Updated completedChores:", updatedChores); // 🔍 Debugging
    //     return updatedChores;
    //   });
    // };

    
  const toggleChoreCompletion = (memberName, choreName) => {
    setCompletedChores((prev) => {
      const updatedChores = {
        ...prev,
        [memberName]: prev[memberName]?.includes(choreName)
          ? prev[memberName].filter((chore) => chore !== choreName)
          : [...(prev[memberName] || []), choreName],
      };
  
      console.log("Updated completedChores:", updatedChores); // 🔍 Debugging
      return updatedChores;
    });
  };
  
    return (
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <button
          onClick={assignChores}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Assign Chores
        </button>
        {members.map((member) => (
          <MemberCard
            key={member.name}
            member={member}
            chores={assignments[member.name] || []}
            completedChores={completedChores[member.name] || []} // ✅ Pass completed chores
            onToggleChore={toggleChoreCompletion} // ✅ Pass toggle function
          />
        ))}
      </div>
    );
  }
;

export default ChoreTable;
