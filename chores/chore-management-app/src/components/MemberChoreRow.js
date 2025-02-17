// src/components/MemberChoreRow.js
import React, { useState } from 'react';

function MemberChoreRow({ assignment, member }) {
  const [completed, setCompleted] = useState(false);

  return (
    <tr>
      <td className="border p-2 flex items-center">
        <span className="mr-2 text-xl">{member.icon}</span> {member.name}
      </td>
      <td className="border p-2 flex items-center">
        <span className="mr-2 text-xl">{assignment.chore.icon}</span> {assignment.chore.name}
      </td>
      <td className="border p-2 text-center">
        <input 
          type="checkbox" 
          checked={completed} 
          onChange={() => setCompleted(!completed)}
          className="h-4 w-4"
        />
      </td>
    </tr>
  );
}

export default MemberChoreRow;
