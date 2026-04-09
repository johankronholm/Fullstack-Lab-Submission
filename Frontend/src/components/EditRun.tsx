import type { Run } from "../types/run";
import { useRef } from "react";

type EditRunProps = {
  selectedRun: Run | null;
  getRuns: Function;
  setToggleEdit: Function;
  setError: Function;
};

function EditRun({
  selectedRun,
  getRuns,
  setToggleEdit,
  setError,
}: EditRunProps) {
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
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setError(null);
      setToggleEdit(false);
      getRuns();
    } else {
      setError(data.message);
    }
  };

  return (
    <>
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
                defaultValue={
                  selectedRun?.seconds
                    ? Math.floor(selectedRun?.seconds / 60)
                    : 0
                }
              ></input>
            </td>
            <td>
              <input
                type="number"
                ref={secondsRef}
                min={0}
                max={59}
                defaultValue={
                  selectedRun?.seconds
                    ? Math.floor(selectedRun?.seconds % 60)
                    : 0
                }
              ></input>
            </td>
            <td>
              <input
                type="text"
                ref={dateRef}
                placeholder="YYYY-MM-DD"
                defaultValue={
                  new Date(selectedRun?.date ?? 0).getFullYear() +
                  "-" +
                  (new Date(selectedRun?.date ?? 0).getMonth() + 1) +
                  "-" +
                  new Date(selectedRun?.date ?? 0).getDate()
                }
                maxLength={10}
              ></input>
            </td>
            <td>
              <button onClick={saveEdit}>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => setToggleEdit(false)}>Cancel</button>
    </>
  );
}

export default EditRun;
