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

    if (!distanceRef.current?.value || distanceRef.current?.value === "0") {
      setError("A distance must be set!");
      return;
    }

    if (
      (!minutesRef.current?.value || minutesRef.current?.value === "0") &&
      (!secondsRef.current?.value || secondsRef.current?.value === "0")
    ) {
      setError("Minutes or seconds must be set!");
      return;
    }

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
      ></input>

      <input
        type="number"
        ref={distanceRef}
        min={0}
        defaultValue={selectedRun?.distance}
        className="prim-field"
      ></input>

      <input
        type="number"
        ref={minutesRef}
        min={0}
        defaultValue={
          selectedRun?.seconds ? Math.floor(selectedRun?.seconds / 60) : 0
        }
        className="prim-field"
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
