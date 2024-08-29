import React from "react";

import glh_1 from "../../images/page-cont/glh-1.png";
import glh_2 from "../../images/page-cont/glh-2.png";
import glh_3 from "../../images/page-cont/glh-3.png";
import glh_4 from "../../images/page-cont/glh-4.png";
import glh_5 from "../../images/page-cont/glh-5.png";
import glh_6 from "../../images/page-cont/glh-6.png";
import glh_7 from "../../images/page-cont/glh-7.png";
import glh_8 from "../../images/page-cont/glh-8.png";
import glh_9 from "../../images/page-cont/glh-9.png";
import { Link } from "react-router-dom";
import Logo from "../../images/Logo.png";

const genLJCHMap = () => {
  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full flex flex-row items-center"
        // style={{ backgroundColor: "#3A3A3A" }}
      >
        <Link
          className="flex flex-row gap-3 items-center self-start cursor-pointer"
          to="/"
        >
          <img src={Logo} alt="" />
          <div className="text-white text-xl">LJC Heatmap</div>
        </Link>
        {/* Heading Text */}

        <div className="ml-[30%] text-white font-bold text-xl">
          Generating LJC Heatmaps for Granger Causality
        </div>
      </div>
      {/* Page Content */}
      <div className="mt-20 w-full">
        <section className="mb-14 flex flex-col">
          <div className="font-bold text-lg pb-5 text-white">
            Selecting the Test
          </div>
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
            <li>
              Scroll down the page and select the Granger Causality test, of
              which results that needs to be visualised.
            </li>
          </ul>
          <img className="self-center" width={800} src={glh_1} alt="glh_1" />
        </section>
        <section className="mb-14 flex flex-col">
          <div className="font-bold text-lg pb-5 text-white">
            Adding Entities
          </div>
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
            <li>Click on the "+ Add Entity" button to add new entities.</li>
          </ul>
          <img className="self-center" width={800} src={glh_2} alt="glh_1" />
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
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
          <div className="flex flex-row gap-4">
            <img className="self-center" width={600} src={glh_3} alt="glh_1" />
            <img className="self-center" width={600} src={glh_4} alt="glh_1" />
          </div>
        </section>

        <section className="mb-14 flex flex-col text-white">
          <div className="font-bold text-lg pb-5 ">Adding Variables</div>
          <ul className=" text-white ml-5 mb-7">
            <li>Click on the "+ Add Variables" button to add new variables.</li>
          </ul>
          <img className="self-center" width={800} src={glh_5} alt="glh_1" />
          <div>Enter the Variable Names that are part of the analysis.</div>
        </section>

        <section className="mb-14">
          <div className="font-bold text-lg pb-5 text-white">
            Deleting Added Entities and Variables
          </div>
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
            <li>
              Click the “-” buttons on the left side to delete the particular
              entities and variables.
            </li>
          </ul>
          <img src={glh_6} alt="glh_1" />
        </section>
        <section className="mb-14">
          <div className="font-bold text-lg pb-5 text-white">
            Chaing the Order of Added Entities and Variables
          </div>
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
            <li>
              Click the up and down buttons, on the left side to change the
              order of particular entitities and variables by moving them up and
              down.
            </li>
          </ul>
          <img src={glh_7} alt="glh_1" />
        </section>
        <section className="mb-14">
          <div className="font-bold text-lg pb-5 text-white">
            Generating the Heatmap
          </div>
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
            <li>
              After inputting all the values click “Generate LJC Heatmap” button
              to generate the heatmap.
            </li>
          </ul>
          <img src={glh_8} alt="glh_1" />
        </section>
        <section className="mb-14">
          <div className="font-bold text-lg pb-5 text-white">
            Saving or Exporting the Heatmap
          </div>
          <ul className="/*list-disc*/ text-white ml-5 mb-7">
            <li>
              After generating the heatmap, download the heatmap as an image for
              further use by clicking the download button.
            </li>
          </ul>
          <img src={glh_9} alt="glh_1" />
        </section>
      </div>
    </div>
  );
};

export default genLJCHMap;
