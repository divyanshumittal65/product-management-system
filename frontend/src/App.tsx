import { useState } from "react";
import Types from "./pages/Types";
import Attributes from "./pages/Attributes";

function App() {
  const [page, setPage] = useState("types");

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <button onClick={() => setPage("types")}>
          Types
        </button>

        <button
          onClick={() => setPage("attributes")}
          style={{ marginLeft: "10px" }}
        >
          Attributes
        </button>
      </div>

      {page === "types" && <Types />}
      {page === "attributes" && <Attributes />}
    </div>
  );
}

export default App;