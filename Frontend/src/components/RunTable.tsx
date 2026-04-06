import type { User } from "../types/user";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

type RunTableProps = {
  user: User;
};

type Run = {
  _id: string;
  title: string;
  distance: number;
  minutes: number;
  seconds: number;
  date: string;
};

function RunTable({ user: _user }: RunTableProps) {
  const [createToggled, setToggleCreate] = useState(false);
  const [fetchedRuns, setFetchedRuns] = useState<Run[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const getRuns = async () => {
    const response = await fetch("http://localhost:3000/api/runs");
    const data = await response.json();
    setFetchedRuns(data.data);
  };

  const createRun = async () => {
    const dateValue = dateRef.current?.value;

    if (!dateValue) {
      return;
    }

    const newDate = new Date(dateValue);
    const body = {
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
    await getRuns();
  };

  useEffect(() => {
    getRuns();
    createRun();
  }, []);

  return (
    <>
      <div>
        <h2>Latest runs</h2>
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
            {fetchedRuns.map((r) => (
              <tr key={r._id}>
                <td>{r.title}</td>
                <td>{r.distance} km</td>
                <td>
                  {r.minutes}.{r.seconds}
                </td>
                <td>
                  {new Date(r.date).getDay()}/{new Date(r.date).getMonth()}/
                  {new Date(r.date).getFullYear()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span onClick={() => setToggleCreate((prev) => !prev)}>Add new run</span>

      {createToggled && (
        <div>
          <h2>New run</h2>
          <input type="text" placeholder="Title" ref={titleRef} />
          <input type="text" placeholder="Distance (km)" ref={distanceRef} />
          <input type="number" placeholder="Minutes" ref={minutesRef} />
          <input type="number" placeholder="Seconds" ref={secondsRef} />
          <input type="text" placeholder="Date" ref={dateRef} />
          <button onClick={createRun}>Submit</button>
        </div>
      )}
    </>
  );
}
export default RunTable;
