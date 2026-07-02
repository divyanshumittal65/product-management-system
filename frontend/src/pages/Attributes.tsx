import { useEffect, useState } from "react";
import api from "../services/api";

interface Attribute {
  id: number;
  name: string;
}

function Attributes() {
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const fetchAttributes = async () => {
    try {
      const response = await api.get("/attributes");
      setAttributes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAttribute = async () => {
    if (!name.trim()) return;

    try {
      await api.post("/attributes", { name });
      setName("");
      fetchAttributes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAttribute = async (id: number) => {
    try {
      await api.delete(`/attributes/${id}`);
      fetchAttributes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Attributes</h1>

      <input
        type="text"
        placeholder="Enter attribute name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addAttribute}>
        Add Attribute
      </button>

      <hr />

      {attributes.map((attribute) => (
        <div key={attribute.id}>
          {attribute.name}

          <button
            onClick={() => deleteAttribute(attribute.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Attributes;