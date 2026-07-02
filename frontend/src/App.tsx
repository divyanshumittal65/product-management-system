import { useState } from "react";
import Types from "./pages/Types";
import Attributes from "./pages/Attributes";
import TypeAttributes from "./pages/typeAttributes";
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
<button
  onClick={() => setPage("mapping")}
  style={{ marginLeft: "10px" }}
>
  Mapping
</button>
      {page === "types" && <Types />}
      {page === "attributes" && <Attributes />}
      {page === "mapping" && <TypeAttributes />}
    </div>
  );
}

export default App;