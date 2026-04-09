import type { User } from "../types/user";
import RunTable from "./RunTable";
import PersonalBest from "./PersonalBest";

  type HomeProps = {
    user: User;
    clearLocalUser: Function;
  };
function Home( {user, clearLocalUser } : HomeProps ) {

  return (
    <>
      <h1>Welcome {user.username}!</h1>
      <span onClick={() => clearLocalUser()}>Logout</span>
      <hr></hr>
      <RunTable user={user}/>  
      <hr></hr>
      <PersonalBest user={user}/>
    </>
  );
}

export default Home;
