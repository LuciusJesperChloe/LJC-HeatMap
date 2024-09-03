import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../images/Logo.png";
import Arrowbidirectional from "../../images/page-cont/arrow-bidirectional.png";

import ArrowDown from "../../images/page-cont/arrow-down.png";
import ArrowEntNames from "../../images/page-cont/arrow-ent-names.png";
import ArrowUpDown from "../../images/page-cont/arrow-up-down.png";
import ArrowUp from "../../images/page-cont/arrow-up.png";
import ArrowVarNames from "../../images/page-cont/arrow-var-names.png";

const InterpLJCHMap = () => {
  return (
    <div className="w-full flex flex-col">
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

        <div className="text-white font-bold text-xl flex justify-center items-center">
          Interpreting LJC Heatmaps for Granger Causality
        </div>
      </div>
      {/* Page Content */}
      <div className="mt-20 w-full">
        <section className="mb-14">
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-600 w-full text-white text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-2">Axis</th>
                  <th className="border border-gray-600 px-4 py-2">
                    Interpretation / Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2 flex flex-row justify-between">
                    <div>X-axis</div>

                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.65681 7.75728C5.26629 7.36675 4.63312 7.36675 4.2426 7.75728L1.41426 10.5857C0.633215 11.3667 0.633121 12.6331 1.41417 13.4141L4.24269 16.2425C4.63321 16.633 5.26638 16.633 5.6569 16.2425C6.04743 15.852 6.04743 15.2188 5.6569 14.8283L3.82849 12.9999L17.9998 12.9999L18.0015 12.9999H20.1714L18.3429 14.8283C17.9524 15.2188 17.9524 15.852 18.3429 16.2425C18.7335 16.633 19.3666 16.633 19.7572 16.2425L22.5856 13.4141C23.3666 12.633 23.3668 11.3667 22.5857 10.5857L19.7573 7.75725C19.3668 7.36672 18.7336 7.36672 18.3431 7.75725C17.9526 8.14777 17.9526 8.78094 18.3431 9.17146L20.1715 10.9999L3.82842 10.9999L5.65681 9.17149C6.04734 8.78097 6.04734 8.1478 5.65681 7.75728Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Entity names
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2 ">
                    <div className="flex flex-row justify-between">
                      <div>Y-axis</div>
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.2426 5.65675C16.6331 5.26623 16.6331 4.63306 16.2426 4.24254L13.4142 1.4142C12.6332 0.633154 11.3668 0.63306 10.5857 1.41411L7.75737 4.24263C7.36685 4.63315 7.36685 5.26632 7.75737 5.65684C8.1479 6.04737 8.78106 6.04737 9.17159 5.65684L11 3.82843V17.9997L11 18.0014V20.1713L9.17158 18.3429C8.78106 17.9524 8.14789 17.9524 7.75737 18.3429C7.36685 18.7334 7.36685 19.3666 7.75737 19.7571L10.5858 22.5855C11.3668 23.3666 12.6332 23.3667 13.4142 22.5857L16.2426 19.7572C16.6332 19.3667 16.6332 18.7336 16.2426 18.343C15.8521 17.9525 15.2189 17.9525 14.8284 18.343L13 20.1714V18.0007V3.82836L14.8284 5.65675C15.2189 6.04727 15.8521 6.04727 16.2426 5.65675Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Variable names (Name on the top - first variable, name on
                    the bottom - second variable)
                  </td>
                </tr>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-2">Arrows</th>
                  <th className="border border-gray-600 px-4 py-2">
                    Interpretation / Description
                  </th>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    <div className="flex flex-row justify-between">
                      <div> Downward arrows</div>
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.33199 16.3154C6.94146 15.9248 6.3083 15.9248 5.91777 16.3154C5.52725 16.7059 5.52725 17.339 5.91777 17.7296L10.5834 22.3952C11.3644 23.1762 12.6308 23.1762 13.4118 22.3952L18.0802 17.7267C18.4707 17.3362 18.4707 16.703 18.0802 16.3125C17.6897 15.922 17.0565 15.922 16.666 16.3125L13 19.9786V2.0001C13 1.44781 12.5523 1.0001 12 1.0001C11.4477 1.0001 11 1.44781 11 2.0001V19.9833L7.33199 16.3154Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Unidirectional Granger causality from first variable to
                    second variable.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    <div className="flex flex-row justify-between">
                      <div> Upward arrows</div>
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.33199 7.68464C6.94146 8.07517 6.3083 8.07517 5.91777 7.68464C5.52725 7.29412 5.52725 6.66095 5.91777 6.27043L10.5834 1.60483C11.3644 0.823781 12.6308 0.82378 13.4118 1.60483L18.0802 6.27327C18.4707 6.66379 18.4707 7.29696 18.0802 7.68748C17.6897 8.078 17.0565 8.078 16.666 7.68748L13 4.02145V21.9999C13 22.5522 12.5523 22.9999 12 22.9999C11.4477 22.9999 11 22.5522 11 21.9999V4.01666L7.33199 7.68464Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Unidirectional Granger causality from second variable to
                    first variable.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2  flex flex-row justify-between">
                    <div>Bidirectional arrows</div>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2426 5.65675C16.6331 5.26623 16.6331 4.63306 16.2426 4.24254L13.4142 1.4142C12.6332 0.633154 11.3668 0.63306 10.5857 1.41411L7.75737 4.24263C7.36685 4.63315 7.36685 5.26632 7.75737 5.65684C8.1479 6.04737 8.78106 6.04737 9.17159 5.65684L11 3.82843V17.9997L11 18.0014V20.1713L9.17158 18.3429C8.78106 17.9524 8.14789 17.9524 7.75737 18.3429C7.36685 18.7334 7.36685 19.3666 7.75737 19.7571L10.5858 22.5855C11.3668 23.3666 12.6332 23.3667 13.4142 22.5857L16.2426 19.7572C16.6332 19.3667 16.6332 18.7336 16.2426 18.343C15.8521 17.9525 15.2189 17.9525 14.8284 18.343L13 20.1714V18.0007V3.82836L14.8284 5.65675C15.2189 6.04727 15.8521 6.04727 16.2426 5.65675Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Bidirectional Granger causality between variables.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2 flex flex-row justify-between">
                    <div>Bidirectional arrows cut in middle</div>
                    <div>
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.2426 5.65675C16.6331 5.26623 16.6331 4.63306 16.2426 4.24254L13.4142 1.4142C12.6332 0.633154 11.3668 0.63306 10.5857 1.41411L7.75737 4.24263C7.36685 4.63315 7.36685 5.26632 7.75737 5.65684C8.1479 6.04737 8.78106 6.04737 9.17159 5.65684L11 3.82843V17.9997L11 18.0014V20.1713L9.17158 18.3429C8.78106 17.9524 8.14789 17.9524 7.75737 18.3429C7.36685 18.7334 7.36685 19.3666 7.75737 19.7571L10.5858 22.5855C11.3668 23.3666 12.6332 23.3667 13.4142 22.5857L16.2426 19.7572C16.6332 19.3667 16.6332 18.7336 16.2426 18.343C15.8521 17.9525 15.2189 17.9525 14.8284 18.343L13 20.1714V18.0007V3.82836L14.8284 5.65675C15.2189 6.04727 15.8521 6.04727 16.2426 5.65675Z"
                          fill="#FFFFFF"
                        />

                        <path
                          d="M10 10.5H14"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />

                        <path
                          d="M10 13.5H14"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    No Granger causality between the variables.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    Arrow length
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Longer the arrow, higher the number of lags used in the VAR
                    model.
                  </td>
                </tr>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-2">Circles</th>
                  <th className="border border-gray-600 px-4 py-2">
                    Interpretation / Description
                  </th>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    Top circle
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Granger causality from first variable to second variable.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    Bottom circle
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Granger causality from second variable to first variable.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-0 py-0 flex flex-row justify-between px-0">
                    <div className="px-4 py-2">Warm colours</div>
                    <div className="flex flex-row">
                      <div className="bg-[#CF0000] w-[20px] h-[50px]"></div>
                      <div className="bg-[#FF2A00] w-[20px] h-[50px]"></div>
                      <div className="bg-[#FFDF00] w-[20px] h-[50px]"></div>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Results are statistically significant. (Red - 1%
                    significance, Orange - 5% significance, Yellow - 10%
                    significance)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-0 py-0 flex flex-row justify-between px-0">
                    <div className="px-4 py-2">Cold colours</div>
                    <div className="flex flex-row">
                      <div className="bg-white w-[60px] h-full"></div>
                    </div>
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Results are not statistically significant. (Significance
                    more than 10%)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    Circle size
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    Higher the circle size, higher the {/* <sup> */}
                    Chi<sup>2</sup>
                    {/* </sup>*/} / z-bar tilde statistic value.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterpLJCHMap;
