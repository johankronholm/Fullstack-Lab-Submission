import type { Run } from "../types/run";
import { useRef } from "react";

type EditRunProps = {
  selectedRun: Run | null;
  getRuns: Function;
  setToggleEdit: Function;
  setError: Function;
  error: string | null;
};

function EditRun({
  selectedRun,
  getRuns,
  setToggleEdit,
  setError,
  error,
}: EditRunProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const saveEdit = async () => {
    if (!titleRef.current?.value) {
      setError("A title must be set!");
      return;
    }
    if (!dateRef.current?.value) {
      setError("Date must be in (YYYY-MM-DD) format!");
      return;
    }

    const distance = Number(distanceRef.current?.value);
    const minutes = Number(minutesRef.current?.value || 0);
    const seconds = Number(secondsRef.current?.value || 0);

    if (Number.isNaN(distance) || distance <= 0) {
      setError("Distance must be a valid number!");
      return;
    }

    if (Number.isNaN(minutes) || minutes < 0) {
      setError("Minutes must be a valid number!");
      return;
    }

    if (Number.isNaN(seconds) || seconds < 0 || seconds > 59) {
      setError("Seconds must be a valid number between 0 and 59!");
      return;
    }

    if (minutes === 0 && seconds === 0) {
      setError("Minutes or seconds must be set!");
      return;
    }

    const body = {
      id: selectedRun?._id,
      title: titleRef.current?.value,
      distance: distance,
      minutes: minutes,
      seconds: seconds,
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
    <div className="modal-container">
      <h2 className="modal-header">Edit run</h2>
      {error && (
        <div>
          Error: {error}{" "}
          <button className="link" onClick={() => setError(null)}>
            (Close)
          </button>
        </div>
      )}
      <input
        type="text"
        ref={titleRef}
        defaultValue={selectedRun?.title}
        className="prim-field"
        placeholder="Title"
      ></input>

      <input
        type="number"
        ref={distanceRef}
        min={0}
        defaultValue={selectedRun?.distance}
        className="prim-field"
        placeholder="Distance (km)"
      ></input>

      <input
        type="number"
        ref={minutesRef}
        min={0}
        defaultValue={
          selectedRun?.seconds ? Math.floor(selectedRun?.seconds / 60) : 0
        }
        className="prim-field"
        placeholder="Minutes"
      ></input>

      <input
        type="number"
        ref={secondsRef}
        min={0}
        max={59}
        defaultValue={
          selectedRun?.seconds ? Math.floor(selectedRun?.seconds % 60) : 0
        }
        className="prim-field"
        placeholder="Seconds"
      ></input>

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
        className="prim-field"
        aria-placeholder="Date (YYYY-MM-DD)"
      ></input>
      <div className="options">
        <button className="prim-button" onClick={saveEdit}>
          Save
        </button>

        <button className="prim-button" onClick={() => setToggleEdit(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditRun;
