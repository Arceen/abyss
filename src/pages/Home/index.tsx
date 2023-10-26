import CategoryTreeComponent from "../../components/categoryTree";
import "../../styles/pages/Home/index.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <CategoryTreeComponent baseTitle="Category" />
      </div>
      <footer>
        <p>
          Made with ❤️ by{" "}
          <em>
            {" "}
            <a
              href="https://www.github.com/Arceen"
              target="_blank"
              rel="noreferrer"
            >
              A.H.M ANNUR.
            </a>
          </em>
        </p>

        <p>
          Icon Credits:{" "}
          <em>
            <a
              target="_blank"
              href="https://www.flaticon.com/"
              rel="noreferrer"
            >
              Flaticon
            </a>
          </em>
        </p>
      </footer>
    </>
  );
};

export default Home;
