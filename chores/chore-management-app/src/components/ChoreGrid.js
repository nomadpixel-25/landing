// // src/components/ChoreGrid.js
// import React from 'react';
// import MemberChoreRow from './MemberChoreRow';

// function ChoreGrid() {
//   // Sample static data for demonstration
//   const dates = ['2025-02-17', '2025-02-18'];
//   const members = [
//     { id: 1, name: 'Ale', icon: '👩' },
//     { id: 2, name: 'Anto', icon: '👨' },
//     { id: 3, name: 'Leo', icon: '🧒' }
//   ];
  
//   // Sample chore assignment data
//   const assignments = {
//     '2025-02-17': [
//       { memberId: 1, chore: { name: 'Dishes', icon: '🧽' } },
//       { memberId: 2, chore: { name: 'Trash', icon: '🗑️' } },
//       { memberId: 3, chore: { name: 'Vacuum', icon: '🏡' } }
//     ],
//     '2025-02-18': [
//       { memberId: 1, chore: { name: 'Cook', icon: '🍽️' } },
//       { memberId: 2, chore: { name: 'Bathroom', icon: '🚰' } },
//       { memberId: 3, chore: { name: 'Laundry', icon: '📦' } }
//     ]
//   };

//   return (
//     <div className="mt-8">
//       {dates.map(date => (
//         <div key={date} className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">{date}</h2>
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Member</th>
//                 <th className="border p-2">Chore</th>
//                 <th className="border p-2">Complete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignments[date].map(assignment => (
//                 <MemberChoreRow 
//                   key={assignment.memberId}
//                   assignment={assignment}
//                   member={members.find(m => m.id === assignment.memberId)}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ChoreGrid;
