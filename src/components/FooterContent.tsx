import { useNavigate } from "react-router-dom";

const FooterContent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start">
      <div className="text-lg">More LJCHeatmap</div>
      <div className="flex flex-row gap-14">
        <div className="flex flex-col gap-3 items-start mt-5">
          <div
            className="hover:font-semibold cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About\FAQ
          </div>
          <div
            className="hover:font-semibold cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact
          </div>
        </div>
        <div className="flex flex-col gap-3 items-start mt-5">
          <div className="hover:font-semibold cursor-pointer">
            Generating heatmaps
          </div>
          <div className="hover:font-semibold cursor-pointer">
            Interpreting heatmaps
          </div>
        </div>
      </div>
      <div className="mt-16 mb-3 self-center">
        <p>
          <a
            property="dct:title"
            rel="cc:attributionURL"
            href="https://www.ljcheatmap.com/"
            className="bg-slate-300"
          >
            LJC Heatmaps
          </a>{" "}
          &copy;
          {new Date().getFullYear()} by{" "}
          <span property="cc:attributionName">Lucius Jesper Chloe</span> is
          licensed under
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
            style={{ display: "inline-block" }}
            className="bg-slate-300"
          >
            CC BY-NC-SA 4.0
            {/* <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            alt="CC icon"
          />
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            alt="BY icon"
          />
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
            alt="NC icon"
          />
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
            alt="SA icon"
          /> */}
          </a>
        </p>
      </div>
    </div>
  );
};

export default FooterContent;
