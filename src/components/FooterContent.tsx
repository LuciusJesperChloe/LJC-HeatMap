import { Link } from "react-router-dom";

const FooterContent = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="text-lg">More LJC Heatmap</div>
      <div className="flex flex-row gap-14 mt-3">
        <Link to="/about">About\FAQ</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/research">Research</Link>
        <Link to="/contact">Contact Us</Link>
        {/* <div className="flex flex-col gap-3 items-start mt-5">
          <Link to="/generating-LJC-eatmaps">Generating heatmaps</Link>
          <Link to="/interpreting-ljc-heat-map">Interpreting heatmaps</Link>
        </div> */}
      </div>
      <div className="mt-16 mb-3 self-center">
        <p>
          <Link
            property="dct:title"
            rel="cc:attributionURL"
            to="https://www.ljcheatmap.com/"
          >
            LJC Heatmap
          </Link>{" "}
          &copy; {new Date().getFullYear()} by{" "}
          <span property="cc:attributionName">Lucius Jesper Chloe</span> is
          licensed under{" "}
          <Link
            to="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
            target="_blank"
            rel="license noopener noreferrer"
            style={{ display: "inline-block" }}
          >
            CC BY-NC-SA 4.0
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterContent;
