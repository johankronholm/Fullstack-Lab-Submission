import type { User } from "../types/user";
import EditRun from "./EditRun";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import type { Run } from "../types/run";

type RunTableProps = {
  user: User;
};

function RunTable({ user }: RunTableProps) {
  const [createToggled, setToggleCreate] = useState(false);
  const [editToggled, setToggleEdit] = useState(false);
  const [runToEdit, setRunToEdit] = useState<Run | null>(null);
  const [fetchedRuns, setFetchedRuns] = useState<Run[]>([]);
  const [maxElements, setMaxElements] = useState<number>(10);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

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

    if (!dateValue) {
      return;
    }

    const newDate = new Date(dateValue);
    const body = {
      id: user._id,
      title: titleRef.current?.value,
      distance: distanceRef.current?.value,
      minutes: minutesRef.current?.value,
      seconds: secondsRef.current?.value,
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
    setMaxElements((prev) => (prev += 10));
    console.log(maxElements);
  };
  const decrementPageNumber = () => {
    if (maxElements > 10) {
      setMaxElements((prev) => (prev -= 10));
    }
  };

  return (
    <>
      <div>
        {error && (
          <div>
            Error: {error} <button onClick={() => setError(null)}>Close</button>
          </div>
        )}
        {!loaded && <span>Loading</span>}
        {editToggled && runToEdit && (
          <EditRun
            key={runToEdit._id}
            getRuns={getRuns}
            selectedRun={runToEdit}
            setToggleEdit={setToggleEdit}
            setError={setError}
          />
        )}
        <h2>Latest runs</h2>
        {fetchedRuns.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Distance</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {fetchedRuns.slice(maxElements - 10, maxElements).map((r) => {
                const minutes = Math.floor(r.seconds / 60);
                const seconds = r.seconds % 60;
                return (
                  <tr key={r._id}>
                    <td>{r.title}</td>
                    <td>{r.distance} km</td>
                    <td>
                      {minutes}m{seconds}s
                    </td>
                    <td>
                      {new Date(r.date).getDate()}/
                      {new Date(r.date).getMonth() + 1}/
                      {new Date(r.date).getFullYear()}
                    </td>
                    <td>
                      <span onClick={() => configureRun(r._id)}>Edit</span>
                    </td>
                    <td>
                      <span onClick={() => deleteRun(r._id)}>Remove</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {fetchedRuns.length === 0 && <span>No runs added yet.</span>}

        {fetchedRuns.length > 0 && (
          <div>
            Page {maxElements / 10} of {Math.ceil(fetchedRuns.length / 10)}
          </div>
        )}

        {maxElements > 10 && (
          <span onClick={decrementPageNumber}>Previous </span>
        )}

        {fetchedRuns.length > maxElements && (
          <span onClick={incrementPageNumber}>Next </span>
        )}
      </div>
      <span onClick={() => setToggleCreate(true)}>Add new run</span>

      {createToggled && (
        <div>
          <h2>New run</h2>

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
                  <input type="text" defaultValue={"My Run"} ref={titleRef} />
                </td>
                <td>
                  <input
                    type="number"
                    min={0}
                    placeholder="Distance (km)"
                    ref={distanceRef}
                  />
                </td>
                <td>
                  <input type="number" min={0} ref={minutesRef} />
                </td>
                <td>
                  <input type="number" min={0} max={59} ref={secondsRef} />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="YYYY-MM-DD"
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
                </td>
                <td>
                  <button onClick={createRun}>Add</button>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setToggleCreate(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}
export default RunTable;
