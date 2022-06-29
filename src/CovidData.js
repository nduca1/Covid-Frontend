import axios from "axios";
import React, { useEffect, useState } from "react";

import "./CovidData.css";

function CovidData() {
  const [country, setCountry] = useState("");
  const [cases, setCases] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [todayCases, setTodayCases] = useState("");
  const [deathCases, setDeathCases] = useState("");
  const [recoveredCases, setRecoveredCases] = useState("");
  const [userInput, setUserInput] = useState("");

  const [error, setError] = useState(false);

  const [flagURL, setFlagURL] = useState("");
  //   useEffect(() => {
  //     // fetch("https://disease.sh/v3/covid-19/countries")
  //     //   .then((res) => res.json())
  //     //   .then((data) => {
  //     //     setData(data);
  //     //   });
  //     fetchCovidCases();
  //   }, []);

  //   async function fetchCovidCases() {
  //     try {
  //       let payload = await axios.get(`https://disease.sh/v3/covid-19/countries`);
  //       setData(payload.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  const setData = ({
    country,
    cases,
    deaths,
    recovered,
    todayCases,
    todayDeaths,
    todayRecovered,
  }) => {
    setCountry(country);
    setCases(cases);
    setRecovered(recovered);
    setDeaths(deaths);
    setTodayCases(todayCases);
    setDeathCases(todayDeaths);
    setRecoveredCases(todayRecovered);
  };
  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = await axios.get(
        `https://disease.sh/v3/covid-19/countries/${userInput}`
      );

      setData(payload.data);
      setFlagURL(`https://countryflagsapi.com/png/${userInput}`);
      setError(false);
    } catch (e) {
      setError(e.response.data.message);
      setCountry("");
      setCases("");
      setRecovered("");
      setDeaths("");
      setTodayCases("");
      setDeathCases("");
      setRecoveredCases("");
    }
  };

  return (
    <div className="covidData">
      <h1>Covid-19 Cases per Country</h1>
      <div className="covidData_input">
        <form onSubmit={handleSubmit}>
          {}
          <input onChange={handleSearch} placeholder="Name of Country" />
          <div className="divider" />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="covidData__country__info">
        {error ? (
          error
        ) : (
          <p>
            <img src={flagURL} />
          </p>
        )}
        <p>Country Name: {country} </p>
        <p
          style={{
            color: "white",
            backgroundColor: "#453C5A71",
          }}
        >
          Cases: {cases}
        </p>
        <p>Deaths: {deaths}</p>
        <p style={{ color: "white", backgroundColor: "#453C5A71" }}>
          Recovery: {recovered}
        </p>
        <p>Cases Today: {todayCases}</p>
        <p style={{ color: "white", backgroundColor: "#453C5A71" }}>
          Deaths Today: {deathCases}
        </p>
        <p>Recovered Today: {recoveredCases}</p>
      </div>
    </div>
  );
}

export default CovidData;
