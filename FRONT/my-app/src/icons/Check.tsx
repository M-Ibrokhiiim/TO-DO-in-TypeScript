interface CheckProps {
  isEdited: boolean;
  setEdited: (value: boolean) => void;
  taskId: number;
  taskName: string;
  uiUpdater: () => Promise<void>;
  taskDone: boolean;
}

export default function CHECK({
  isEdited,
  setEdited,
  taskId,
  taskName,
  uiUpdater,
  taskDone
}: CheckProps) {

  const taskEditor = async (id: number, task: string, isDone: boolean): Promise<void> => {
    setEdited(!isEdited);

    try {
      const res = await fetch(`http://localhost:3000/api/notes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, content: task, isDone })
      });

      if (!res.ok) {
        throw new Error('Error occured while editing task!');
      }

      await uiUpdater();
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <svg
        onClick={() => { taskEditor(taskId, taskName, taskDone) }}
        style={{ cursor: 'pointer' }}
        width="45px"
        height="50px"
        viewBox="-6 -6 36.00 36.00"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
        strokeWidth="0.168"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.048"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.2426 14.4142L17.3137 7.34315L18.7279 8.75736L10.2426 17.2426L6 13L7.41421 11.5858L10.2426 14.4142Z"
            fill="#5a51d6"
          ></path>
        </g>
      </svg>
    </>
  );
}