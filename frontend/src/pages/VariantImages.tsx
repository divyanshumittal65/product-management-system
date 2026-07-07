import { useEffect, useState } from "react";
import api from "../services/api";

interface Image {
  id: number;
  variant_id: number;
  image_url: string;
}

interface Props {
  variantId: number;
  sku: string;
}

function VariantImages({ variantId, sku }: Props) {
  const [images, setImages] = useState<Image[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  useEffect(() => {
    fetchImages();
  }, [variantId]);

  const fetchImages = async () => {
    try {
      const res = await api.get(
        `/variant-images/variant/${variantId}`
      );

      setImages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!imageUrl) return;

    try {
      if (editingId) {
        await api.put(
          `/variant-images/${editingId}`,
          {
            image_url: imageUrl,
          }
        );
      } else {
        await api.post("/variant-images", {
          variant_id: variantId,
          image_url: imageUrl,
        });
      }

      setImageUrl("");
      setEditingId(null);

      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (image: Image) => {
    setEditingId(image.id);
    setImageUrl(image.image_url);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(
        `/variant-images/${id}`
      );

      fetchImages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        marginTop: "15px",
        border: "1px solid blue",
        padding: "10px",
      }}
    >
      <h4>Images: {sku}</h4>

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) =>
          setImageUrl(e.target.value)
        }
        style={{ width: "400px" }}
      />

      <button
        onClick={handleSubmit}
        style={{ marginLeft: "10px" }}
      >
        {editingId
          ? "Update Image"
          : "Add Image"}
      </button>

      <hr />

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {images.map((image) => (
          <div
            key={image.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
           <img
  src={image.image_url}
  alt="Variant"
  width="150"
  height="150"
  style={{
    objectFit: "cover",
  }}
  onError={(e) => {
    e.currentTarget.src =
      "https://via.placeholder.com/150?text=No+Image";
  }}
/>

            <br />
            <br />

            <button
              onClick={() =>
                handleEdit(image)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(image.id)
              }
              style={{
                marginLeft: "10px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VariantImages;