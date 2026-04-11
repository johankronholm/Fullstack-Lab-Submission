import type { User } from "../types/user";
import RunTable from "./RunTable";
import PersonalBest from "./PersonalBest";
import "../styles/home.css";

type HomeProps = {
  user: User;
  clearLocalUser: Function;
};
function Home({ user, clearLocalUser }: HomeProps) {
  return (
    <div className="main-container">
      <nav className="menu">
        <span>{user.username} </span>{" "}
        <button className="link" onClick={() => clearLocalUser()}>
          Logout
        </button>
      </nav>
      <RunTable user={user} />
      <PersonalBest user={user} />
    </div>
  );
}

export default Home;
