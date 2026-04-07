import type { User } from "../types/user";
import type { Run } from "./RunTable";
import { useEffect } from "react";
import { useState } from "react";

type PersonalBestProps = {
  user: User;
};

type PersonalBestData = {
  pb500: Run | null;
  pb1km: Run | null;
  pb5km: Run | null;
  pb10km: Run | null;
  pb21km: Run | null;
  pb42km: Run | null;
};

function PersonalBest({ user }: PersonalBestProps) {
  const [fetchedPB, setFetchedPB] = useState<PersonalBestData | null>(null);

  useEffect(() => {
    const getPB = async () => {
      const response = await fetch(
        `http://localhost:3000/api/runs/pb?userId=${"69d5380a46781fc0ce9593d8"}`,
      );
      const data = await response.json();
      if (response.ok) {
        setFetchedPB(data);
      }
    };
    getPB();
    const intervalId = window.setInterval(getPB, 3000);
    return () => window.clearInterval(intervalId);
  }, [user._id]);

  return (
    <>
      <h2>Personal Best</h2>
      <table>
        <thead>
          <tr>
            <th>Distance</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>500 m</td>
            <td>{fetchedPB?.pb500?.seconds ?? "-"}</td>
            <td>
              {fetchedPB?.pb500?.date
                ? new Date(fetchedPB?.pb500?.date).getDate() + "/"
                : "--"}
              {fetchedPB?.pb500?.date
                ? new Date(fetchedPB?.pb500?.date).getMonth() + 1 + "/"
                : "--"}
              {fetchedPB?.pb500?.date
                ? new Date(fetchedPB?.pb500?.date).getFullYear()
                : "--"}
            </td>
          </tr>
          <tr>
            <td>1 km</td>
            <td>{fetchedPB?.pb1km?.seconds ?? "-"}</td>
            <td>
              {fetchedPB?.pb1km?.date
                ? new Date(fetchedPB?.pb1km?.date).getDate() + "/"
                : "--"}
              {fetchedPB?.pb1km?.date
                ? new Date(fetchedPB?.pb1km?.date).getMonth() + 1 + "/"
                : "--"}
              {fetchedPB?.pb1km?.date
                ? new Date(fetchedPB?.pb1km?.date).getFullYear()
                : "--"}
            </td>
          </tr>
          <tr>
            <td>5 km</td>
            <td>{fetchedPB?.pb5km?.seconds ?? "-"}</td>
            <td>
              {fetchedPB?.pb5km?.date
                ? new Date(fetchedPB?.pb5km?.date).getDate() + "/"
                : "--"}
              {fetchedPB?.pb5km?.date
                ? new Date(fetchedPB?.pb5km?.date).getMonth() + 1 + "/"
                : "--"}
              {fetchedPB?.pb5km?.date
                ? new Date(fetchedPB?.pb5km?.date).getFullYear()
                : "--"}
            </td>
          </tr>
          <tr>
            <td>10 km</td>
            <td>{fetchedPB?.pb10km?.seconds ?? "-"}</td>
            <td>
              {fetchedPB?.pb10km?.date
                ? new Date(fetchedPB?.pb10km?.date).getDate() + "/"
                : "--"}
              {fetchedPB?.pb10km?.date
                ? new Date(fetchedPB?.pb10km?.date).getMonth() + 1 + "/"
                : "--"}
              {fetchedPB?.pb10km?.date
                ? new Date(fetchedPB?.pb10km?.date).getFullYear()
                : "--"}
            </td>
          </tr>
          <tr>
            <td>21 km</td>
            <td>{fetchedPB?.pb21km?.seconds ?? "-"}</td>
            <td>
              {fetchedPB?.pb21km?.date
                ? new Date(fetchedPB?.pb21km?.date).getDate() + "/"
                : "--"}
              {fetchedPB?.pb21km?.date
                ? new Date(fetchedPB?.pb21km?.date).getMonth() + 1 + "/"
                : "--"}
              {fetchedPB?.pb21km?.date
                ? new Date(fetchedPB?.pb21km?.date).getFullYear()
                : "--"}
            </td>
          </tr>
          <tr>
            <td>42 km</td>
            <td>{fetchedPB?.pb42km?.seconds ?? "-"}</td>
            <td>
              {fetchedPB?.pb42km?.date
                ? new Date(fetchedPB?.pb42km?.date).getDate() + "/"
                : "--"}
              {fetchedPB?.pb42km?.date
                ? new Date(fetchedPB?.pb42km?.date).getMonth() + 1 + "/"
                : "--"}
              {fetchedPB?.pb42km?.date
                ? new Date(fetchedPB?.pb42km?.date).getFullYear()
                : "--"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default PersonalBest;
