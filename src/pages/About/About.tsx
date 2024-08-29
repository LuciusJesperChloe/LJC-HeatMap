import { useNavigate, Link } from "react-router-dom";

import Logo from "../../images/Logo.png";

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="w-full flex flex-row items-center"
        // style={{ backgroundColor: "#3A3A3A" }}
      >
        <div
          className="flex flex-row gap-3 items-center self-start cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="" />
          <div className="text-white text-xl">LJC Heatmap</div>
        </div>
        <div className="ml-[30%] text-white font-bold text-xl">About/FAQ</div>
      </div>
      {/* Page Content */}
      <div className="mt-10 text-white">
        <section className="mb-10">
          <div className="font-bold pb-3">
            What is a LJC heatmap for Granger causality?
          </div>
          <p>
            The Lucius Jesper Chloe heatmaps (LJC heatmaps) for Granger
            causality is an innovative visualisation method for visualising
            Granger causality test results. It allows Granger causality results
            comparison across different entities with enhanced clarity.
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">Who is it for?</div>
          <p>
            The heatmap is useful for anyone including but not limited to
            researchers, data analysts and policy makers who wants to visualize
            the obtained Granger causality results in an effective way.
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">Is this free to use?</div>
          <p>All heatmaps are available for free under our copyright.</p>
          <div className="font-bold pb-1 pt-4">
            Do I need to credit your website when using heatmaps I created here?
          </div>
          <p>
            This work is licensed under a{" "}
            <Link to="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0
              International
            </Link>
            . (
            <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1">
              CC BY-NC-SA 4.0
            </Link>
            ) This license requires that re-users give credit to the creator. It
            allows re-users to distribute, remix, adapt, and build upon the
            material in any medium or format, for noncommercial purposes only.
            If others modify or adapt the material, they must license the
            modified material under identical terms.
          </p>
          <div className="mt-3">
            <div className="flex flex-row gap-2 ml-2">
              <img
                style={{
                  height: "22px",
                  marginLeft: "3px",
                  verticalAlign: "text-bottom",
                }}
                src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                alt="BY icon"
              />
              <div>BY: Credit must be given to you, the creator.</div>
            </div>
            <div className="flex flex-row gap-2 ml-2">
              <img
                style={{
                  height: "22px",
                  marginLeft: "3px",
                  verticalAlign: "text-bottom",
                }}
                src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
                alt="NC icon"
              />
              <div>
                NC: Only noncommercial use of your work is permitted.
                Noncommercial means not primarily intended for or directed
                towards commercial advantage or monetary compensation.
              </div>
            </div>
            <div className="flex flex-row gap-2 ml-2">
              <img
                style={{
                  height: "22px",
                  marginLeft: "3px",
                  verticalAlign: "text-bottom",
                }}
                src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
                alt="SA icon"
              />
              <div>SA: Adaptations must be shared under the same terms.</div>
            </div>
          </div>
          <div className="mt-3">
            More info here:{" "}
            <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1">
              Creative Commons License
            </Link>
          </div>
          <div className="mt-3">
            If the above don't cover your use case, please{" "}
            <Link to="/contact">reach out</Link> for more details!{" "}
          </div>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">Who is behind LJC Heatmaps?</div>
          <p>
            A young researcher who is passionate about web development and data
            visualization called Lucius.
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">
            What tests can the heatmap visualise?
          </div>
          <p>
            It has the ability to visualise Granger causality WALD test results
            and Dumitrescu and Hurlin Granger non-causality test results.
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">
            What tests can the heatmap visualise?
          </div>
          <p>
            It has the ability to visualise Granger causality WALD test results
            and Dumitrescu and Hurlin Granger non-causality test results.
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">
            What statics can the heatmap visualise?
          </div>
          <p>
            The LJC heatmap can visualize the Chi 2 / Z-bar tilde statistics,
            lag ranges, lags, and significance levels of the Granger causality
            results.
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">
            How to generate the LJC heatmaps?
          </div>
          <p>
            A step by step guide for generating LJC heatmaps is available at{" "}
            <Link to="/generating-LJC-eatmaps">generating LJC heatmaps</Link>
          </p>
        </section>
        <section className="mb-10">
          <div className="font-bold pb-3">
            How to interpret the LJC heatmaps?
          </div>
          <p>
            A guide for interpreting LJC heatmaps is available at
            <Link to="/interpreting-ljc-heat-map">
              interpreting LJC heatmaps
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
