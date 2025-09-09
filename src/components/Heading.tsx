import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";

const Heading = () => {
  return (
    // <div className="flex flex-row gap-3 items-center self-start">
    //   <img src={Logo} alt="" />
    //   <div className="text-white text-xl">LJC Heatmap</div>
    // </div>
    <Link
      className="flex flex-row gap-3 items-center self-start cursor-pointer"
      to="/"
    >
      <img src={Logo} alt="" />
      <div className="text-white text-xl">LJC Heatmap</div>
    </Link>
  );
};

export default Heading;
