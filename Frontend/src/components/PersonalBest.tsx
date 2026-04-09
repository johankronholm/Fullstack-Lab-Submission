import type { User } from "../types/user";
import { useEffect } from "react";
import { useState } from "react";
import type { PersonalBestData } from "../types/personalBestData";

type PersonalBestProps = {
  user: User;
};

function PersonalBest({ user }: PersonalBestProps) {
  const [fetchedPB, setFetchedPB] = useState<PersonalBestData | null>(null);

  useEffect(() => {
    const getPB = async () => {
      const response = await fetch(
        `http://localhost:3000/api/runs/pb?userId=${user._id}`,
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
            <td>
              {" "}
              {fetchedPB?.pb500?.seconds &&
              Math.floor(fetchedPB?.pb500?.seconds / 60) > 0
                ? Math.floor(fetchedPB?.pb500?.seconds / 60) + "m"
                : ""}
              {fetchedPB?.pb500?.seconds
                ? (fetchedPB.pb500.seconds % 60) + "s"
                : ""}
            </td>
            <td>
              {fetchedPB?.pb500?.date
                ? new Date(fetchedPB?.pb500?.date).getDate() + "/"
                : ""}
              {fetchedPB?.pb500?.date
                ? new Date(fetchedPB?.pb500?.date).getMonth() + 1 + "/"
                : ""}
              {fetchedPB?.pb500?.date
                ? new Date(fetchedPB?.pb500?.date).getFullYear()
                : ""}
            </td>
          </tr>
          <tr>
            <td>1 km</td>

            <td>
              {fetchedPB?.pb1km?.seconds &&
              Math.floor(fetchedPB?.pb1km?.seconds / 60) > 0
                ? Math.floor(fetchedPB?.pb1km?.seconds / 60) + "m"
                : ""}
              {fetchedPB?.pb1km?.seconds
                ? (fetchedPB.pb1km.seconds % 60) + "s"
                : ""}
            </td>
            <td>
              {fetchedPB?.pb1km?.date
                ? new Date(fetchedPB?.pb1km?.date).getDate() + "/"
                : ""}
              {fetchedPB?.pb1km?.date
                ? new Date(fetchedPB?.pb1km?.date).getMonth() + 1 + "/"
                : ""}
              {fetchedPB?.pb1km?.date
                ? new Date(fetchedPB?.pb1km?.date).getFullYear()
                : ""}
            </td>
          </tr>
          <tr>
            <td>5 km</td>
            <td>
              {" "}
              {fetchedPB?.pb5km?.seconds &&
              Math.floor(fetchedPB?.pb5km?.seconds / 60) > 0
                ? Math.floor(fetchedPB?.pb5km?.seconds / 60) + "m"
                : ""}
              {fetchedPB?.pb5km?.seconds
                ? (fetchedPB.pb5km.seconds % 60) + "s"
                : ""}
            </td>
            <td>
              {fetchedPB?.pb5km?.date
                ? new Date(fetchedPB?.pb5km?.date).getDate() + "/"
                : ""}
              {fetchedPB?.pb5km?.date
                ? new Date(fetchedPB?.pb5km?.date).getMonth() + 1 + "/"
                : ""}
              {fetchedPB?.pb5km?.date
                ? new Date(fetchedPB?.pb5km?.date).getFullYear()
                : ""}
            </td>
          </tr>
          <tr>
            <td>10 km</td>
            <td>
              {" "}
              {fetchedPB?.pb10km?.seconds &&
              Math.floor(fetchedPB?.pb10km?.seconds / 60) > 0
                ? Math.floor(fetchedPB?.pb10km?.seconds / 60) + "m"
                : ""}
              {fetchedPB?.pb10km?.seconds
                ? (fetchedPB.pb10km.seconds % 60) + "s"
                : ""}
            </td>
            <td>
              {fetchedPB?.pb10km?.date
                ? new Date(fetchedPB?.pb10km?.date).getDate() + "/"
                : ""}
              {fetchedPB?.pb10km?.date
                ? new Date(fetchedPB?.pb10km?.date).getMonth() + 1 + "/"
                : ""}
              {fetchedPB?.pb10km?.date
                ? new Date(fetchedPB?.pb10km?.date).getFullYear()
                : ""}
            </td>
          </tr>
          <tr>
            <td>21 km</td>
            <td>
              {" "}
              {fetchedPB?.pb21km?.seconds &&
              Math.floor(fetchedPB?.pb21km?.seconds / 60) > 0
                ? Math.floor(fetchedPB?.pb21km?.seconds / 60) + "m"
                : ""}
              {fetchedPB?.pb21km?.seconds
                ? (fetchedPB.pb21km.seconds % 60) + "s"
                : ""}
            </td>
            <td>
              {fetchedPB?.pb21km?.date
                ? new Date(fetchedPB?.pb21km?.date).getDate() + "/"
                : ""}
              {fetchedPB?.pb21km?.date
                ? new Date(fetchedPB?.pb21km?.date).getMonth() + 1 + "/"
                : ""}
              {fetchedPB?.pb21km?.date
                ? new Date(fetchedPB?.pb21km?.date).getFullYear()
                : ""}
            </td>
          </tr>
          <tr>
            <td>42 km</td>
            <td>
              {" "}
              {fetchedPB?.pb42km?.seconds &&
              Math.floor(fetchedPB?.pb42km?.seconds / 60) > 0
                ? Math.floor(fetchedPB?.pb42km?.seconds / 60) + "m"
                : ""}
              {fetchedPB?.pb42km?.seconds
                ? (fetchedPB.pb42km.seconds % 60) + "s"
                : ""}
            </td>
            <td>
              {fetchedPB?.pb42km?.date
                ? new Date(fetchedPB?.pb42km?.date).getDate() + "/"
                : ""}
              {fetchedPB?.pb42km?.date
                ? new Date(fetchedPB?.pb42km?.date).getMonth() + 1 + "/"
                : ""}
              {fetchedPB?.pb42km?.date
                ? new Date(fetchedPB?.pb42km?.date).getFullYear()
                : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default PersonalBest;
