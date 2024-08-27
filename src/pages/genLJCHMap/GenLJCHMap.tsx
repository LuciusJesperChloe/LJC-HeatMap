import React from "react";

import glh_1 from "../../images/page-cont/glh-1.png";
import glh_2 from "../../images/page-cont/glh-2.png";
import glh_3 from "../../images/page-cont/glh-3.png";

const genLJCHMap = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Heading Text */}
      <div className="font-extrabold text-2xl self-center text-white">
        Generating LJC Heatmaps
      </div>
      {/* Page Content */}
      <div className="mt-20">
        <section className="mb-14">
          <div className="font-bold text-xl pb-5 text-white">
            Selecting the Test
          </div>
          <ul className="list-disc text-white ml-5 mb-7">
            <li>
              Scroll down the page and select the Granger Causality test, of
              which results that needs to be visualised.
            </li>
          </ul>
          <img src={glh_1} alt="glh_1" />
        </section>
        <section className="mb-14">
          <div className="font-bold text-xl pb-5 text-white">
            Adding Entities
          </div>
          <ul className="list-disc text-white ml-5 mb-7">
            <li>Click on the "+ Add Entity" button to add new entities.</li>
          </ul>
          <img src={glh_2} alt="glh_1" />
          <ul className="list-disc text-white ml-5 mb-7">
            <li>
              Enter the “Entity Name”. This can be any identifier for the entity
              you are visualising.
            </li>
            <li>
              Input the Chi<sup>2</sup>/ Z-bar tilde values for the particular
              entity.
            </li>
            <li>
              Specify the Lag Range. This range should include the lags
              considered for the analysis.
            </li>
            <li>
              Enter the p values . These are the significance level values of
              the causality.
            </li>
            <li>
              Add the specific Lag value from the Lag Range, which is the lag
              length considered for the analysis.
            </li>
          </ul>
        </section>
        <section className="mb-14">
          <img src={glh_2} alt="glh_1" />
        </section>
        <section className="mb-14">
          <div className="font-bold text-xl pb-5 text-white">
            Deleting Added Entities and Variables
          </div>
          <ul className="list-disc text-white ml-5 mb-7">
            <li>
              Click the “-” buttons on the left side to delete the particular
              entities and variables.
            </li>
          </ul>
          <img src={glh_3} alt="glh_1" />
        </section>
      </div>
    </div>
  );
};

export default genLJCHMap;
