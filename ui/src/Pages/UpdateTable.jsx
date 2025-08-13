import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Model", accessor: "model" },
  { header: "Manufacturer", accessor: "manufacturer" },
  { header: "Cost", accessor: "cost_in_credits" },
  { header: "Length", accessor: "length" },
  { header: "Max Speed", accessor: "max_atmosphering_speed" },
  { header: "Crew", accessor: "crew" },
  { header: "Passengers", accessor: "passengers" },
  { header: "Cargo Capacity", accessor: "cargo_capacity" },
  { header: "Consumables", accessor: "consumables" },
  { header: "Hyperdrive Rating", accessor: "hyperdrive_rating" },
  { header: "MGLT", accessor: "mglt" },
  { header: "Starship Class", accessor: "starship_class" },
];

export default function UpdateTable() {
  const [allData, setAllData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [singleSearchTerm, setSingleSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [alertProps, setAlertProps] = useState(null);
  const navigate = useNavigate();

  const domain = sessionStorage.getItem("Domain") || "";
  const token = sessionStorage.getItem("token") || "";

  const fetchAllStarships = async () => {
    if (!domain) {
      setError("API domain not set in sessionStorage.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `${domain}/api/Starships/GetAllStarshipsFromDb`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Domain": domain,
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch starships");
      const result = await response.json();
      setAllData(result);
      setDisplayData(result);
    } catch (e) {
      setError(e.message);
      setAllData([]);
      setDisplayData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleStarship = async (query) => {
    if (!query) return;
    if (!domain) {
      setError("API domain not set in sessionStorage.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const isId = /^\d+$/.test(query);
      const url = isId
        ? `${domain}/api/Starships?id=${query}`
        : `${domain}/api/Starships?name=${encodeURIComponent(query)}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Domain": domain,
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        setError("Starship not found.");
        setDisplayData([]);
      } else if (!response.ok) {
        throw new Error("Failed to fetch starship");
      } else {
        const starship = await response.json();
        setDisplayData(Array.isArray(starship) ? starship : [starship]);
      }
    } catch (e) {
      setError(e.message);
      setDisplayData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStarships();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const filteredData = displayData.filter((row) =>
    columns.some((col) => {
      const val = row[col.accessor];
      return val && val.toString().toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSingleSearchChange = (e) => {
    setSingleSearchTerm(e.target.value);
  };

  const handleSingleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSingleStarship(singleSearchTerm.trim());
  };

  return (
    <div className="min-h-screen bg-black p-5 text-white font-sans mt-[45px]">
      {alertProps && <Alert {...alertProps} />}
      
      <form onSubmit={handleSingleSearchSubmit} className="mb-4 flex space-x-2 items-center">
        <input
          type="text"
          placeholder="Search starship by ID or Name..."
          value={singleSearchTerm}
          onChange={handleSingleSearchChange}
          className="px-3 py-1 rounded-md text-black w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 transition px-4 py-1 rounded-md"
          disabled={loading}
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSingleSearchTerm("");
            setSearchTerm("");
            setError(null);
            fetchAllStarships();
          }}
          className="bg-gray-600 hover:bg-gray-800 transition px-3 py-1 rounded-md"
        >
          Clear
        </button>
      </form>

      <div className="flex items-center mb-3">
        <input
          type="text"
          placeholder="🔍 Search table..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-1 cursor-pointer text-sm rounded-md bg-white/10 text-black placeholder-gray-400 border border-white/30 focus:outline-none focus:border-white transition w-48"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-white/30 border-collapse bg-transparent text-white shadow-lg rounded-lg overflow-hidden min-w-max">
          <thead>
            <tr className="bg-white/10">
              <th className="text-left p-3 border-b border-white/30 font-semibold whitespace-nowrap">
                Actions
              </th>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="text-left p-3 border-b border-white/30 font-semibold whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-5 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`transition hover:bg-white/20 ${idx % 2 === 0 ? "bg-white/5" : ""}`}
                >
                  <td className="p-3 border-b border-white/10 whitespace-nowrap">
                    <button
                      onClick={() => handleEditClick(row.id)}
                      className="bg-yellow-600 hover:bg-yellow-800 transition px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="p-3 border-b border-white/10 whitespace-nowrap"
                    >
                      {row[col.accessor] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="p-3 text-center text-gray-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3 space-x-3">
        {page > 1 && (
          <button
            onClick={handlePrev}
            className="px-3 py-1 rounded-md bg-white/30 hover:bg-white/50 transition text-sm"
          >
            Previous
          </button>
        )}

        <span className="flex items-center text-sm">
          Page {page} of {totalPages || 1}
        </span>

        {page < totalPages && (
          <button
            onClick={handleNext}
            className="px-3 py-1 rounded-md bg-white/30 hover:bg-white/50 transition text-sm"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}