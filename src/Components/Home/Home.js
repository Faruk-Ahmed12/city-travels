import React from "react";
import fakeData from "../fakeData/fakeData";
import ShowCard from "../ShowCard/ShowCard";
import "./Home.css";
const Home = () => {
  return (
    <div className="main-section">
      <div className="container">
          <div className="row">
          {fakeData.map((test) => <ShowCard cardDetail={test}></ShowCard>)}
          </div>
      </div>
    </div>
  );
};

export default Home;
