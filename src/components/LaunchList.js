import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaunches } from "../features/launches/launchesSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./LaunchList.css";

function LaunchList() {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches.launches);
  const loading = useSelector((state) => state.launches.loading);
  const error = useSelector((state) => state.launches.error);
  const navigate = useNavigate();

  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  useEffect(() => {
    let filtered = launches;

    if (year) {
      filtered = filtered.filter(
        (launch) =>
          new Date(launch.launch_date_local).getFullYear() === parseInt(year)
      );
    }

    if (status) {
      filtered = filtered.filter(
        (launch) => launch.launch_success === (status === "success")
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((launch) =>
        launch.mission_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLaunches(filtered);
  }, [year, status, searchQuery, launches]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="launch-list">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by mission name"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filters">
        <select onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          {[
            ...new Set(
              launches.map((launch) =>
                new Date(launch.launch_date_local).getFullYear()
              )
            ),
          ]
            .sort((a, b) => a - b)
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>
      <div className="launch-items">
        {filteredLaunches.map((launch) => (
          <div
            className="launch-item"
            key={`${launch.flight_number}-${launch.launch_date_local}`}
          >
            <img src={launch.links.mission_patch} alt={launch.mission_name} />
            <h3>{launch.mission_name}</h3>
            <p>{new Date(launch.launch_date_local).toLocaleDateString()}</p>
            <p>Rocket: {launch.rocket.rocket_name}</p>
            <p>Launch Site: {launch.launch_site.site_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LaunchList;