import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./recidPredictor.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
const RecidPredictor = () => {
  const { activeMenu } = useSelector((state) => state.activeMenu);
  const [formData, setFormData] = useState({
    age: "",
    priors_count: "",
    v_decile_score: "",
    decile_score: "",
    length_of_stay: "",
    c_charge_degree: "",
    race: "",
    sex: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  // const [isMdScreen, setIsMdScreen] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log("Resized!");
  //     setIsMdScreen(window.innerWidth <= 768); // Assuming 768px is the breakpoint for md screen
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize(); // Initial check on component mount

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await fetch("http://localhost:5000/predictApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setResult(data[0][0] * 100);
      console.log(data[0][0]);
      console.log(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-screen relative z-0 bg-gradient-to-l from-stone-200 via-lime-100 to-stone-200  min-h-screen p-4 flex transition-all duration-300">
      {/* <div className={`flex relative mr-4 ${isMdScreen ? "hidden" : ""}`}> */}
      <div className="flex relative mr-4">{activeMenu && <Sidebar />}</div>

      <div className="flex-1 flex flex-col">
        <Navbar title="RecidPredictor" className="md:justify-center" />
        <div name="login" className="login">
          <h1>Recidivism Predictor</h1>

          <form onSubmit={handleSubmit} action="" method="post">
            <input
              type="text"
              name="age"
              placeholder="Age"
              required="required"
              onChange={handleChange}
            />
            <input
              type="text"
              name="priors_count"
              placeholder="Prior Counts"
              required="required"
              onChange={handleChange}
            />
            <input
              type="text"
              name="v_decile_score"
              placeholder="V Decile Score"
              required="required"
              onChange={handleChange}
            />
            <input
              type="text"
              name="decile_score"
              placeholder="Decile Score"
              required="required"
              onChange={handleChange}
            />
            <input
              type="text"
              name="length_of_stay"
              placeholder="Length of Stay"
              required="required"
              onChange={handleChange}
            />

            <select
              name="c_charge_degree"
              required="required"
              onChange={handleChange}
            >
              <option value="" disabled selected>
                Select Charge Degree
              </option>
              <option value="F">F</option>
              <option value="M">M</option>
            </select>

            <select name="race" required="required" onChange={handleChange}>
              <option value="" disabled selected>
                Select Race
              </option>
              <option value="African-American">African-American</option>
              <option value="Asian">Asian</option>
              <option value="Caucasian">Caucasian</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Native American">Native American</option>
              <option value="Other">Other</option>
            </select>

            <select name="sex" required="required" onChange={handleChange}>
              <option value="" disabled selected>
                Select Sex
              </option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>

            <button type="submit" name="submit-button">
              Predict
            </button>
          </form>
          {result && <div>Result: {JSON.stringify(result)}%</div>}
          {error && <div>Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default RecidPredictor;
