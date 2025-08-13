import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import "../styles/Insert.css";

export default function Insert() {
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
  { name: "starshipResponseId", label: "Starship Response ID", type: "number" },
  { name: "domain", label: "Domain (from session)", type: "text" }
];


  const initialState = fields.reduce((acc, f) => {
    acc[f.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [alertProps, setAlertProps] = useState(null);

  useEffect(() => {
    const domainFromSession = sessionStorage.getItem("Domain") || "";
    setFormData((prev) => ({ ...prev, domain: domainFromSession }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
  const newErrors = {};
  const requiredFieldNames = ["name", "model", "manufacturer"];
  requiredFieldNames.forEach(fieldName => {
    if (!formData[fieldName].trim()) {
      const fieldLabel = fields.find(f => f.name === fieldName)?.label || fieldName;
      newErrors[fieldName] = `${fieldLabel} is required.`;
    }
  });
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: 0,
      Name: formData.name,
      Model: formData.model,
      Manufacturer: formData.manufacturer,
      Cost_in_credits: formData.cost_in_credits,
      Length: formData.length,
      Max_atmosphering_speed: formData.max_atmosphering_speed,
      Crew: formData.crew,
      Passengers: formData.passengers,
      Cargo_capacity: formData.cargo_capacity,
      Consumables: formData.consumables,
      Hyperdrive_rating: formData.hyperdrive_rating,
      MGLT: formData.mglt,
      Starship_class: formData.starship_class,
      starshipResponseId: formData.starshipResponseId ? Number(formData.starshipResponseId) : null,
      Domain: formData.domain
    };

    const domain = sessionStorage.getItem("Domain");
    const apiUrl = `${domain}/api/Starships/PostDataToSql`;
    const token = sessionStorage.getItem("token") || "";
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });


      const text = await res.text();

      if (!res.ok) {
        setAlertProps({
          type: "error",
          title: "Submission Failed",
          message: text || `HTTP error! Status: ${res.status}`,
          onClose: () => setAlertProps(null)
        });
      } else {
        setAlertProps({
          type: "success",
          title: "Success",
          message: text || "Starship data submitted successfully.",
          onClose: () => setAlertProps(null)
        });
        setFormData(initialState);
      }
    } catch (err) {
      console.error(err);
      setAlertProps({
        type: "error",
        title: "Error",
        message: err.message || "Error submitting data.",
        onClose: () => setAlertProps(null)
      });
    }
  };

  return (
    <div className="insert-container">
      {alertProps && <Alert {...alertProps} />}
      <form className="insert-form" onSubmit={handleSubmit}>
        <h6>Insert Starship Data</h6>
        <div className="row gx-3 gy-2">
          {fields.map((field, index) => (
            <div key={field.name} className={field.name === "domain" ? "col-12" : "col-12 col-md-6"}>
              <label>
                {field.required && index < 3 && <span style={{ color: "red" }}>* </span>}
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                readOnly={field.readOnly || false}
              />
              {errors[field.name] && <small style={{ color: "red" }}>{errors[field.name]}</small>}
            </div>
          ))}
        </div>
        <button type="submit" className="mt-3">Submit</button>
      </form>
    </div>
  );
}
