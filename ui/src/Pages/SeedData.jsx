import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaDatabase } from "react-icons/fa";

export default function SeedData() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let domain = sessionStorage.getItem("Domain");
        let token = sessionStorage.getItem("token") || "";

        if (!domain) {
          setMessage("Domain not found in session.");
          setLoading(false);
          return;
        }

        const baseUrl = domain.startsWith("http") ? domain : `https://${domain}`;

        const response = await fetch(`${baseUrl}/api/Starships/PostDataSeeding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        setMessage(result.replace(/^"|"$/g, ""));
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getIcon = () => {
  if (message === "Data is up to date.") {
    return <FaCheckCircle className="text-white text-[9rem] mb-4" />;
  } else if (message.toLowerCase().includes("inserted")) {
    return <FaDatabase className="text-white text-[9rem] mb-4" />;
  }
  return null;
  };
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black rounded-xl p-8 text-center w-full max-w-lg">
        {loading ? (
          <p className="text-gray-300 text-white">Loading...</p>
        ) : (
          <>
            {getIcon()}
            <h1 className="text-2xl font-bold text-white">{message}</h1>
          </>
        )}
      </div>
    </div>
  );
}
