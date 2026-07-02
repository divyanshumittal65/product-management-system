import { useEffect, useState } from "react";
import api from "../services/api";

interface Type {
  id: number;
  name: string;
}

interface Attribute {
  id: number;
  name: string;
}

interface Mapping {
  id: number;
  attribute_id: number;
  attribute_name: string;
}

function TypeAttributes() {
  const [types, setTypes] = useState<Type[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);

  const [typeId, setTypeId] = useState("");
  const [attributeId, setAttributeId] = useState("");

  const fetchTypes = async () => {
    const res = await api.get("/types");
    setTypes(res.data);
  };

  const fetchAttributes = async () => {
    const res = await api.get("/attributes");
    setAttributes(res.data);
  };

  const fetchMappings = async (selectedTypeId: string) => {
    if (!selectedTypeId) {
      setMappings([]);
      return;
    }

    const res = await api.get(
      `/type-attributes/${selectedTypeId}`
    );

    setMappings(res.data);
  };

  const createMapping = async () => {
    if (!typeId || !attributeId) return;

    try {
      await api.post("/type-attributes", {
        type_id: Number(typeId),
        attribute_id: Number(attributeId),
      });

      fetchMappings(typeId);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMapping = async (id: number) => {
    try {
      await api.delete(`/type-attributes/${id}`);

      fetchMappings(typeId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchAttributes();
  }, []);

  useEffect(() => {
    fetchMappings(typeId);
  }, [typeId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Type Attribute Mapping</h1>

      <div>
        <select
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="">
            Select Type
          </option>

          {types.map((type) => (
            <option
              key={type.id}
              value={type.id}
            >
              {type.name}
            </option>
          ))}
        </select>

        <select
          value={attributeId}
          onChange={(e) =>
            setAttributeId(e.target.value)
          }
        >
          <option value="">
            Select Attribute
          </option>

          {attributes.map((attribute) => (
            <option
              key={attribute.id}
              value={attribute.id}
            >
              {attribute.name}
            </option>
          ))}
        </select>

        <button onClick={createMapping}>
          Assign
        </button>
      </div>

      <hr />

      <h3>Mapped Attributes</h3>

      {mappings.map((mapping) => (
        <div key={mapping.id}>
          {mapping.attribute_name}

          <button
            onClick={() =>
              deleteMapping(mapping.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TypeAttributes;