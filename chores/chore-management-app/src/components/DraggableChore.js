// src/components/DraggableChore.js
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableChore({ chore }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: chore.name,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center bg-gray-200 p-2 rounded cursor-grab"
    >
      <span className="mr-2">{chore.icon}</span>
      <span>{chore.name}</span>
    </div>
  );
}

export default DraggableChore;
