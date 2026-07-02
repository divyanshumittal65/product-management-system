import { useEffect, useState } from "react";
import api from "../services/api";

interface Type {
  id: number;
  name: string;
}

function Types() {
  const [name, setName] = useState("");
  const [types, setTypes] = useState<Type[]>([]);

  const fetchTypes = async () => {
    try {
      const response = await api.get("/types");
      setTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addType = async () => {
    if (!name.trim()) return;

    try {
      await api.post("/types", { name });

      setName("");
      fetchTypes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteType = async (id: number) => {
    try {
      await api.delete(`/types/${id}`);
      fetchTypes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Types</h1>

      <input
        type="text"
        placeholder="Enter type name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addType}>
        Add Type
      </button>

      <hr />

      {types.map((type) => (
        <div key={type.id}>
          {type.name}

          <button
            onClick={() => deleteType(type.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Types;