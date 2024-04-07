import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <h1>Home page</h1>
        <Link to="/test">
          <button>To test site</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
