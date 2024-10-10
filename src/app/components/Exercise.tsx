import React from 'react'

interface ExerciseProps {
  id: number
  name: string
  selected: boolean
  bodyPartId: number
  toggleSelected: (id: number, bodyPartId: number) => void;
}

const ExerciseComponent: React.FC<ExerciseProps> = ({ id, name, selected, bodyPartId, toggleSelected }) => {
  return (
    <div
      className={`w-full h-20 bg-opacity-90 text-white flex justify-center items-center rounded shadow text-xl font-bold capitalize cursor-pointer hover:bg-opacity-80 hover:scale-105 duration-100 active:scale-100 ${selected ? 'bg-red-500' : 'bg-slate-800'}`}
      onClick={() => toggleSelected(id, bodyPartId)}
    >
      <h2>{name}</h2>
    </div>
  );
};

export default ExerciseComponent
