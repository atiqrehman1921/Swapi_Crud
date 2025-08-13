import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/Home.css";

const Home = () => {
  const [isActive, setIsActive] = useState(true);

    sessionStorage.setItem("Domain", "https://localhost:7080/");

  useEffect(() => {
    const checkActive = () => {
      const active = sessionStorage.getItem("Active") === "1";
      setIsActive(active);
    };

    checkActive();

    const intervalId = setInterval(checkActive, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="home flex flex-col justify-center items-center relative min-h-screen bg-gray-900">
      <div className="cursor"></div>
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="welcome-text swing-animation text-center">
        <h1 className="text-white text-6xl font-bold">Welcome</h1>
        <h2 className="text-white text-xl mt-2">Go Engineer</h2>
      </div>

      {isActive && (
        <div className="button-group fade-in flex flex-wrap justify-center gap-6 mt-8 p-4">
          {[
            { to: "/dataseeding", label: "Data Seeding", color: "bg-gradient-to-br from-emerald-400 to-teal-600" },
            { to: "/get", label: "Get", color: "bg-gradient-to-br from-blue-400 to-indigo-600" },
            { to: "/insert", label: "Insert", color: "bg-gradient-to-br from-amber-400 to-orange-600" },
            { to: "/update", label: "Update", color: "bg-gradient-to-br from-purple-400 to-fuchsia-600" },
            { to: "/delete", label: "Delete", color: "bg-gradient-to-br from-rose-400 to-pink-600" },
          ].map(({ to, label, color }) => (
            <Link
              key={to}
              to={to}
              className={`
                ${color} text-white no-underline font-bold py-3 px-6 rounded-xl
                shadow-lg hover:shadow-xl transform transition-all
                duration-300 hover:-translate-y-1 hover:scale-105
                border-2 border-white border-opacity-20
                relative overflow-hidden
                min-w-[160px] text-center
                after:absolute after:inset-0 after:bg-white after:opacity-0 
                after:transition-opacity after:duration-300 hover:after:opacity-10
              `}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
