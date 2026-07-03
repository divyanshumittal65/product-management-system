import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

interface AllowedAttribute {
  attribute_id: number;
  attribute_name: string;
}

interface SavedAttribute {
  id: number;
  attribute_id: number;
  attribute_name: string;
  value: string;
}

interface Props {
  variantId: number;
  sku: string;
}

function VariantAttributes({
  variantId,
  sku,
}: Props) {
  const [allowedAttributes, setAllowedAttributes] =
    useState<AllowedAttribute[]>([]);

  const [savedAttributes, setSavedAttributes] =
    useState<SavedAttribute[]>([]);

  const [values, setValues] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    fetchAllowedAttributes();
    fetchSavedAttributes();
  }, [variantId]);

  const fetchAllowedAttributes = async () => {
    try {
      const res = await api.get(
        `/variant-attributes/allowed/${variantId}`
      );

      setAllowedAttributes(res.data);
    }catch (error: any) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
    "Something went wrong"
  );
}
  };

  const fetchSavedAttributes = async () => {
    try {
      const res = await api.get(
        `/variant-attributes/${variantId}`
      );

      setSavedAttributes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveAttribute = async (
    attributeId: number
  ) => {
    const value = values[attributeId];

    if (!value) return;

    try {
      await api.post("/variant-attributes", {
        variant_id: variantId,
        attribute_id: attributeId,
        value,
      });

      fetchSavedAttributes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAttribute = async (
    id: number
  ) => {
    try {
      await api.delete(
        `/variant-attributes/${id}`
      );

      fetchSavedAttributes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "15px",
        padding: "10px",
        border: "1px solid green",
      }}
    >
      <h4>Attributes: {sku}</h4>

      {allowedAttributes.map((attr) => (
        <div
          key={attr.attribute_id}
          style={{ marginBottom: "10px" }}
        >
          <label>
            {attr.attribute_name}
          </label>

          <input
            type="text"
            value={
              values[attr.attribute_id] || ""
            }
            onChange={(e) =>
              setValues({
                ...values,
                [attr.attribute_id]:
                  e.target.value,
              })
            }
            style={{ marginLeft: "10px" }}
          />

          <button
            onClick={() =>
              saveAttribute(attr.attribute_id)
            }
            style={{ marginLeft: "10px" }}
          >
            Save
          </button>
        </div>
      ))}

      <hr />

      <h4>Saved Values</h4>

      {savedAttributes.map((attr) => (
        <div key={attr.id}>
          {attr.attribute_name}: {attr.value}

          <button
            onClick={() =>
              deleteAttribute(attr.id)
            }
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default VariantAttributes;