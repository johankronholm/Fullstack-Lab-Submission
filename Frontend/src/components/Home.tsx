import type { User } from "../types/user";
import RunTable from "./RunTable";

  type HomeProps = {
    user: User;
  };
function Home( {user } : HomeProps ) {

  return (
    <>
      <h1>Welcome {user.username}!</h1>
      <RunTable user={user}/>
    </>
  );
}

export default Home;
