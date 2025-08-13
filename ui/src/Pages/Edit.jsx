import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Insert.css";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "model", label: "Model", type: "text", required: true },
  { name: "manufacturer", label: "Manufacturer", type: "text", required: true },
  { name: "cost_in_credits", label: "Cost in Credits", type: "text" },
  { name: "length", label: "Length", type: "text" },
  { name: "max_atmosphering_speed", label: "Max Atmosphering Speed", type: "text" },
  { name: "crew", label: "Crew", type: "text" },
  { name: "passengers", label: "Passengers", type: "text" },
  { name: "cargo_capacity", label: "Cargo Capacity", type: "text" },
  { name: "consumables", label: "Consumables", type: "text" },
  { name: "hyperdrive_rating", label: "Hyperdrive Rating", type: "text" },
  { name: "mglt", label: "MGLT", type: "text" },
  { name: "starship_class", label: "Starship Class", type: "text" },
  { name: "starshipResponseId", label: "Starship Response ID", type: "number" }
];

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({}); // <-- store fetched data
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [alertProps, setAlertProps] = useState(null);
  const domain = sessionStorage.getItem("Domain") || "";
  const token = sessionStorage.getItem("token") || "";

  useEffect(() => {
    const fetchStarship = async () => {
      if (!domain) {
        setAlertProps({
          type: "error",
          title: "Error",
          message: "API domain not set in sessionStorage.",
          onClose: () => setAlertProps(null)
        });
        return;
      }

      try {
        const response = await fetch(`${domain}/api/Starships?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Domain": domain,
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch starship");
        }

        const starship = await response.json();
        setFormData(starship);
        setOriginalData(starship); // <-- save original
      } catch (error) {
        setAlertProps({
          type: "error",
          title: "Error",
          message: error.message,
          onClose: () => setAlertProps(null)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStarship();
  }, [id, domain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFieldNames = ["name", "model", "manufacturer"];
    requiredFieldNames.forEach(fieldName => {
      if (!formData[fieldName]?.trim()) {
        const fieldLabel = fields.find(f => f.name === fieldName)?.label || fieldName;
        newErrors[fieldName] = `${fieldLabel} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isDataUnchanged = () => {
    for (let key in formData) {
      if (formData[key] != originalData[key]) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isDataUnchanged()) {
      setAlertProps({
        type: "info",
        title: "Info",
        message: "Data is already up-to-date.",
        onClose: () => setAlertProps(null)
      });
      return;
    }

    const payload = {
      id: formData.id,
      name: formData.name,
      model: formData.model,
      manufacturer: formData.manufacturer,
      cost_in_credits: formData.cost_in_credits,
      length: formData.length,
      max_atmosphering_speed: formData.max_atmosphering_speed,
      crew: formData.crew,
      passengers: formData.passengers,
      cargo_capacity: formData.cargo_capacity,
      consumables: formData.consumables,
      hyperdrive_rating: formData.hyperdrive_rating,
      mglt: formData.mglt,
      starship_class: formData.starship_class,
      starshipResponseId: formData.starshipResponseId ? Number(formData.starshipResponseId) : 0
    };

    try {
      const response = await fetch(`${domain}/api/Starships?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Domain": domain,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to update starship");
      }

      setAlertProps({
        type: "success",
        title: "Success",
        message: "Starship updated successfully!",
        onClose: () => {
          setAlertProps(null);
          navigate("/update");
        }
      });
    } catch (error) {
      setAlertProps({
        type: "error",
        title: "Error",
        message: error.message || "Failed to update starship",
        onClose: () => setAlertProps(null)
      });
    }
  };

  if (loading) {
    return (
      <div className="insert-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="insert-container">
      {alertProps && <Alert {...alertProps} />}
      <form className="insert-form" onSubmit={handleSubmit} style={{ overflowY: "auto" }}>
        <h6>Edit Starship ID: {id}</h6>

        <div className="row gx-3 gy-2">
          {fields.map((field, index) => (
            <div key={field.name} className="col-12 col-md-6 mb-3">
              <label className="form-label">
                {field.required && index < 3 && <span style={{ color: "red" }}>* </span>}
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="form-control"
              />
              {errors[field.name] && (
                <small style={{ color: "red" }}>{errors[field.name]}</small>
              )}
            </div>
          ))}
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/update")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
