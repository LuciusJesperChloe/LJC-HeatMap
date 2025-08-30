import { Link, useNavigate } from "react-router-dom";

import Logo from "../../images/Logo.png";
import journal_img from "../../images/page-cont/research/journal_research_in_globalization.webp";

const Researche = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <div>
        {/* Heading */}
        <div
          className="w-full flex flex-row items-center justify-center relative py-2"
          // style={{ backgroundColor: "#3A3A3A" }}
        >
          <Link
            className="flex flex-row gap-3 items-center cursor-pointer"
            to="/"
            style={{ position: "absolute", left: 0 }}
          >
            <img src={Logo} alt="" />
            <div className="text-white text-xl">LJC Heatmap</div>
          </Link>
          {/* Heading Text */}
          <h1 className="text-white font-bold text-xl flex justify-center items-center">
            Research
          </h1>
        </div>
      </div>
      {/* Page Content */}
      <div className="mt-10 text-white">
        <section className="mb-10 flex flex-row justify-between">
          <section className="flex-1 pr-4 border-r-2 border-[#3A3A3A]">
            <h2 className="text-[15px] font-semibold mb-10 text-center">
              Lucius Jesper Chloe (LJC) Heatmap for Granger Causality
            </h2>
            <div>
              <p>
                Brain drain or economic gain? Untangling the global
                migration-growth puzzle through causality and time-frequency
                lenses Resources Contact Us
              </p>
            </div>
            <div className="flex flex-row gap-3 mt-4">
              <img
                src={journal_img}
                alt="journal_research_in_globalization"
                style={{
                  width: "40%", // take full width of parent
                  height: "auto", // keep aspect ratio
                  maxWidth: "600px", // (optional) don’t grow too big
                }}
              />
              <div className="flex flex-col gap-3">
                <div>Journal: Research in Globalization</div>
                <div>Journal Rank: Q1</div>
                <div>Publisher: Elsevier</div>
                <div>DOI: https://doi.org/10.1016/j.resglo.2025.100305</div>
              </div>
            </div>
          </section>

          <section className="flex-1">
            <h2 className="text-[15px] font-semibold mb-10 text-center">
              Lucius Jesper Chloe Transfer Entropy (LJCTE) Heatmap
            </h2>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Researche;
