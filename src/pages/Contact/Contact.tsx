import { Link, useNavigate } from "react-router-dom";

import Logo from "../../images/Logo.png";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div>
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
          <div className="ml-[30%] text-white font-bold text-xl">
            Contact Us
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className="mt-10 text-white">
        <section className="mb-10">
          <div>Get in touch for everything related to LJC Heatmap.</div>
          <div className="mt-2">Tell me about:</div>
          <ul className="ml-8 mt-3">
            <li>Awesome maps you created.</li>
            <li>Ideas for new maps and features</li>
            <li>Any bug or problem that you encountered.</li>
            <li>Any opportunity for cooperation between us.</li>
          </ul>
        </section>
        <section className="mb-10">
          <div>
            Make sure that you read our <Link to="/about">FAQ</Link> page! You
            will find answers for the most frequently asked questions, like:
          </div>

          <ul className="ml-8 mt-3">
            <li>What is a LJC heatmap for Granger causality?</li>
            <li>Who is it for?</li>
            <li>Is this free to use?</li>
            <li>
              Do I need to credit your website when using heatmaps I created
              here?
            </li>
            <li>Who is behind LJC Heatmaps?</li>
            <li>What tests can the heatmap visualize?</li>
            <li>What statics can the heatmap visualize?</li>
            <li>How to generate the LJC heatmaps?</li>
            liHow to generate the LJC heatmaps?
          </ul>
        </section>
        <section className="mb-10">
          <div>Reach out to me at luciuschloeofficial@gmail.com</div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
