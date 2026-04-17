import type { User } from "../types/user";
import EditRun from "./EditRun";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import type { Run } from "../types/run";
import "../styles/runtable.css";

type RunTableProps = {
  user: User;
};

function RunTable({ user }: RunTableProps) {
  const [createToggled, setToggleCreate] = useState(false);
  const [editToggled, setToggleEdit] = useState(false);
  const [runToEdit, setRunToEdit] = useState<Run | null>(null);
  const [fetchedRuns, setFetchedRuns] = useState<Run[]>([]);
  const [maxElements, setMaxElements] = useState<number>(7);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const getRuns = async () => {
    const response = await fetch(
      `http://localhost:3000/api/runs?userId=${user._id}`,
    );
    const data = await response.json();
    if (response.ok) {
      setError(null);
      setFetchedRuns(data.data);
    } else {
      setError(data.message);
    }
    setLoaded(true);
  };

  const createRun = async () => {
    const dateValue = dateRef.current?.value;

    if (!titleRef.current?.value) {
      setError("A title must be set!");
      return;
    }
    if (!dateValue) {
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

    const newDate = new Date(dateValue);
    const body = {
      id: user._id,
      title: titleRef.current?.value,
      distance: distance,
      minutes: minutes,
      seconds: seconds,
      date: newDate,
    };

    const response = await fetch("http://localhost:3000/api/runs", {
      method: "post",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.message);
    } else {
      setError(null);
      setToggleCreate(false);
      await getRuns();
    }
  };

  useEffect(() => {
    getRuns();
  }, []);

  const configureRun = (_id: string) => {
    setToggleEdit(true);
    const selectedRun = fetchedRuns.find((e) => e._id === _id);
    if (!selectedRun) return;
    setRunToEdit(selectedRun);
  };

  const deleteRun = async (_id: string) => {
    const confirm = window.confirm("Are you sure you want to delete your run?");
    if (!confirm) return;
    const response = await fetch(`http://localhost:3000/api/runs?id=${_id}`, {
      method: "delete",
    });
    const data = await response.json();
    if (response.ok) {
      setError(null);
      getRuns();
    } else {
      setError(data.message);
    }
  };

  const incrementPageNumber = () => {
    setMaxElements((prev) => (prev += 7));
    console.log(maxElements);
  };
  const decrementPageNumber = () => {
    if (maxElements > 7) {
      setMaxElements((prev) => (prev -= 7));
    }
  };

  return (
    <>
      {editToggled && runToEdit && (
        <EditRun
          key={runToEdit._id}
          getRuns={getRuns}
          selectedRun={runToEdit}
          setToggleEdit={setToggleEdit}
          setError={setError}
          error={error}
        />
      )}
      <h2 className="home-header">Latest runs</h2>
      <div className="latest-container">
        <button className="prim-button" onClick={() => setToggleCreate(true)}>
          Add new run
        </button>
        {!loaded && <span>Loading...</span>}
        {fetchedRuns.length > 0 && (
          <div className="latest-table">
            {fetchedRuns.slice(maxElements - 7, maxElements).map((r) => {
              const minutes = Math.floor(r.seconds / 60);
              const seconds = r.seconds % 60;
              const paceInSeconds = Math.round(r.seconds / r.distance);
              const paceMinutes = Math.floor(paceInSeconds / 60);
              const paceSeconds = paceInSeconds % 60;
              return (
                <div className="run">
                  <span className="run-title">{r.title}</span>
                  <span>{r.distance} km</span>
                  <span>
                    {minutes}m{seconds}s
                  </span>
                  <span>
                    {paceMinutes}m{paceSeconds.toString().padStart(2, "0")}s/km
                  </span>
                  <span>
                    {new Date(r.date).getDate()}/
                    {new Date(r.date).getMonth() + 1}/
                    {new Date(r.date).getFullYear()}
                  </span>
                  <div className="run-options">
                    <span
                      className="edit-button"
                      onClick={() => configureRun(r._id)}
                    >
                      Edit
                    </span>
                    <span
                      className="remove-button"
                      onClick={() => deleteRun(r._id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {loaded && fetchedRuns.length === 0 && <p>No runs added yet.</p>}

        <div className="pagination">
          {fetchedRuns.length > 0 && (
            <p>
              Page {maxElements / 7} of {Math.ceil(fetchedRuns.length / 7)}
            </p>
          )}
          <div>
            {maxElements > 7 && (
              <button className="link" onClick={decrementPageNumber}>
                Previous{" "}
              </button>
            )}

            {fetchedRuns.length > maxElements && (
              <button className="link" onClick={incrementPageNumber}>
                Next{" "}
              </button>
            )}
          </div>
        </div>
      </div>

      {createToggled && (
        <div className="modal-container">
          <h2 className="modal-header">New run</h2>
          {error && (
            <div>
              Error: {error}{" "}
              <button className="link" onClick={() => setError(null)}>
                (Close)
              </button>
            </div>
          )}
          <input
            className="prim-field"
            type="text"
            defaultValue={"My Run"}
            placeholder="Title"
            ref={titleRef}
          />

          <input
            className="prim-field"
            type="number"
            min={0}
            max={1000}
            placeholder="Distance (km)"
            ref={distanceRef}
          />

          <input
            className="prim-field"
            type="number"
            min={0}
            max={1000}
            placeholder="Minutes"
            ref={minutesRef}
          />

          <input
            className="prim-field"
            type="number"
            placeholder="Seconds"
            min={0}
            max={59}
            ref={secondsRef}
          />

          <input
            className="prim-field"
            type="text"
            placeholder="Date (YYYY-MM-DD)"
            defaultValue={
              new Date().getFullYear() +
              "-" +
              (new Date().getMonth() + 1) +
              "-" +
              new Date().getDate()
            }
            ref={dateRef}
            maxLength={10}
          />
          <div className="options">
            <button className="prim-button" onClick={createRun}>
              Add
            </button>

            <button
              className="prim-button"
              onClick={() => setToggleCreate(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default RunTable;
