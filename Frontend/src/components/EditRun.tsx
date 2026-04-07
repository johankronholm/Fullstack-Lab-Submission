import type { Run } from "./RunTable";
import { useRef } from "react";

type EditRunProps = {
  selectedRun: Run | null;
  getRuns: Function;
  setToggleEdit: Function;
};

function EditRun({ selectedRun, getRuns, setToggleEdit }: EditRunProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const saveEdit = async () => {
    const body = {
      id: selectedRun?._id,
      title: titleRef.current?.value,
      distance: distanceRef.current?.value,
      minutes: minutesRef.current?.value,
      seconds: secondsRef.current?.value,
      date: dateRef.current?.value,
    };

    const response = await fetch("http://localhost:3000/api/runs", {
      method: "put",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(body),
    });

    console.log(await response.json());
    if (response.ok) {
      getRuns();
    }
  };

  return (
    <>
      <span onClick={() => setToggleEdit(false)}>Close</span>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Distance</th>
            <th>Minutes</th>
            <th>Seconds</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                ref={titleRef}
                defaultValue={selectedRun?.title}
              ></input>
            </td>
            <td>
              <input
                type="number"
                ref={distanceRef}
                min={0}
                defaultValue={selectedRun?.distance}
              ></input>
            </td>
            <td>
              <input
                type="number"
                ref={minutesRef}
                min={0}
                defaultValue={selectedRun?.minutes}
              ></input>
            </td>
            <td>
              <input
                type="number"
                ref={secondsRef}
                min={0}
                max={59}
                defaultValue={selectedRun?.seconds}
              ></input>
            </td>
            <td>
              <input
                type="text"
                ref={dateRef}
                defaultValue={selectedRun?.date}
              ></input>
            </td>
            <td>
              <button onClick={saveEdit}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default EditRun;
