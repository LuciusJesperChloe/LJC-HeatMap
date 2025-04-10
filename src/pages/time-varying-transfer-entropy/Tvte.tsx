import React, { useEffect, useRef, useState } from "react";
import useCSVData from "./useCSVData";
import { ConfigProvider, Input } from "antd";

import ColorLegend from "./ColorLegend";
import Logo from "../../images/Logo.png";

const Tvte = () => {
  const {
    handleFileUpload,
    sectionColors,
    startYearFreq,
    var1,
    var2,
    startYear,
    endYear,
  } = useCSVData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [horizontalLines, setHorizontalLines] = useState<JSX.Element[]>([]);
  const [coloredSections, setColoredSections] = useState<JSX.Element | null>(
    null
  );

  const [yearScale, setYearScale] = useState<JSX.Element | null>(null);

  const renderHorizontalLines = () => {
    if (!startYearFreq) return null;

    const numLines =
      typeof startYearFreq === "string"
        ? Number.parseInt(startYearFreq, 10)
        : startYearFreq;
    if (isNaN(numLines)) return null;

    const lines = [];

    for (let i = 1; i < numLines; i++) {
      const percentage = i * (50 / numLines);
      lines.push(
        <div
          key={`top-${i}`}
          className="absolute left-0 right-0 border-t border-[#0000c0]"
          style={{ top: `${percentage}%` }}
        />
      );
    }

    lines.push(
      <div
        key="middle"
        className="absolute left-0 right-0 top-[50%] border-t border-[#4584D5]"
      />
    );

    for (let i = 1; i < numLines; i++) {
      const percentage = 50 + i * (50 / numLines);
      lines.push(
        <div
          key={`bottom-${i}`}
          className="absolute left-0 right-0 border-t border-[#0000c0]"
          style={{ top: `${percentage}%` }}
        />
      );
    }

    setHorizontalLines(lines);
    return lines;
  };

  const renderYearScale = () => {
    if (!startYear || !endYear) return null;

    const scale = endYear - startYear + 1;
    const years = [];

    for (let i = 0; i < scale; i++) {
      years.push(startYear + i);
    }

    setYearScale(
      <div className="absolute top-4 left-[10%] right-[1%] h-2 flex items-end">
        {years.map((year, index) => {
          const startPosition = (index / scale) * 100;
          const endPosition = ((index + 1) / scale) * 100;
          const centerPosition = (startPosition + endPosition) / 2;

          return (
            <React.Fragment key={year}>
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${startPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="h-2 w-px bg-transparent" />
              </div>
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${centerPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <span className="text-[9px] text-[#000000] mb-1">{year}</span>
              </div>
            </React.Fragment>
          );
        })}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: "100%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="h-2 w-px bg-transparent" />
        </div>
      </div>
    );

    return (
      <div className="absolute top-4 left-[10%] right-[1%] h-2 flex items-end">
        {years.map((year, index) => {
          const startPosition = (index / scale) * 100;
          const endPosition = ((index + 1) / scale) * 100;
          const centerPosition = (startPosition + endPosition) / 2;

          return (
            <React.Fragment key={year}>
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${startPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="h-2 w-px bg-transparent" />
              </div>
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: `${centerPosition}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <span className="text-[9px] text-[#000000] mb-1">{year}</span>
              </div>
            </React.Fragment>
          );
        })}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: "100%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="h-2 w-px bg-transparent" />
        </div>
      </div>
    );
  };

  const renderColoredSections = () => {
    if (!Object.keys(sectionColors).length) return null;

    const totalSections =
      Object.keys(sectionColors).filter((key) => key.includes("colors"))
        .length / 2;

    //console.log(totalSections)

    /*
    const getBorderStyles = (
      validation:
        | {
            prevRowSameSection: boolean[];
            nextRowSameSection: boolean[];
            prevSection: boolean[];
            nextSection: boolean[];
          }
        | undefined,
      index: number
    ) => {
      if (!validation) return {};

      return {
        borderLeft:
          validation.prevRowSameSection?.[index] === true
            ? "1px solid white"
            : "none",
        borderRight:
          validation.nextRowSameSection?.[index] === true
            ? "1px solid white"
            : "none",
        borderTop:
          validation.prevSection?.[index] === true ? "1px solid white" : "none",
        borderBottom:
          validation.nextSection?.[index] === true ? "1px solid white" : "none",
      };
    };
    */
    setColoredSections(
      <div className="relative h-full w-full">
        {/* Top Half Container (X to Y) - Exactly 50% height */}
        <div className="absolute top-0 left-0 right-0 h-[49.5%]">
          {Array.from({ length: totalSections }, (_, i) => {
            const sectionKey = `section_${i + 1}_colors_x_to_y`;
            const validationKey = `section_${i + 1}`;
            console.log(validationKey);
            const colors = sectionColors[sectionKey] || [];
            // const validation = statXValidationResults?.[validationKey];

            //console.log(colors)
            //console.log("----------------------------------------------")
            return (
              <div
                key={`top-${i}`}
                className="flex absolute w-full"
                style={{
                  top: `${(i * 100) / totalSections}%`,
                  height: `${100 / totalSections}%`,
                }}
              >
                {colors.map((color, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`top-${i}-${index}`}
                      className="relative"
                      style={{
                        backgroundColor: color,
                        flex: 2,
                        //...borderStyles,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Middle Line Container - Centered with its own space */}
        <div
          className="absolute left-0 right-0 h-[1%] bg-transparent"
          style={{ top: "49.8%" }}
        >
          <div
            className="absolute left-0 right-0 w-full"
            style={{
              height: "1px", // Adjustable line height
              backgroundColor: "#4584D5",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          />
        </div>

        {/* Bottom Half Container (Y to X) - Exactly 50% height */}
        <div className="absolute bottom-0 left-0 right-0 h-[49.8%]">
          {Array.from({ length: totalSections }, (_, i) => {
            const sectionKey = `section_${i + 1}_colors_y_to_x`;
            const validationKey = `section_${i + 1}`;
            console.log(validationKey);
            const colors = sectionColors[sectionKey] || [];
            // const validation = statYValidationResults?.[validationKey];

            //console.log(colors)
            return (
              <div
                key={`bottom-${i}`}
                className="flex absolute w-full"
                style={{
                  top: `${(i * 100) / totalSections}%`,
                  height: `${100 / totalSections}%`,
                }}
              >
                {colors.map((color, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`bottom-${i}-${index}`}
                      className="relative"
                      style={{
                        backgroundColor: color,
                        flex: 2,
                        // ...borderStyles,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div className="relative h-full w-full">
        {/* Top Half Container (X to Y) - Exactly 50% height */}
        <div className="absolute top-0 left-0 right-0 h-[49.5%]">
          {Array.from({ length: totalSections }, (_, i) => {
            const sectionKey = `section_${i + 1}_colors_x_to_y`;
            const validationKey = `section_${i + 1}`;
            console.log(validationKey);
            const colors = sectionColors[sectionKey] || [];
            // const validation = statXValidationResults?.[validationKey];

            //console.log(colors)
            //console.log("----------------------------------------------")
            return (
              <div
                key={`top-${i}`}
                className="flex absolute w-full"
                style={{
                  top: `${(i * 100) / totalSections}%`,
                  height: `${100 / totalSections}%`,
                }}
              >
                {colors.map((color, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`top-${i}-${index}`}
                      className="relative"
                      style={{
                        backgroundColor: color,
                        flex: 2,
                        //...borderStyles,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Middle Line Container - Centered with its own space */}
        <div
          className="absolute left-0 right-0 h-[1%] bg-transparent"
          style={{ top: "49.8%" }}
        >
          <div
            className="absolute left-0 right-0 w-full"
            style={{
              height: "1px", // Adjustable line height
              backgroundColor: "#4584D5",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          />
        </div>

        {/* Bottom Half Container (Y to X) - Exactly 50% height */}
        <div className="absolute bottom-0 left-0 right-0 h-[49.8%]">
          {Array.from({ length: totalSections }, (_, i) => {
            const sectionKey = `section_${i + 1}_colors_y_to_x`;
            const validationKey = `section_${i + 1}`;
            console.log(validationKey);
            const colors = sectionColors[sectionKey] || [];
            // const validation = statYValidationResults?.[validationKey];

            //console.log(colors)
            return (
              <div
                key={`bottom-${i}`}
                className="flex absolute w-full"
                style={{
                  top: `${(i * 100) / totalSections}%`,
                  height: `${100 / totalSections}%`,
                }}
              >
                {colors.map((color, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`bottom-${i}-${index}`}
                      className="relative"
                      style={{
                        backgroundColor: color,
                        flex: 2,
                        // ...borderStyles,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    renderHorizontalLines();
  }, [sectionColors]);

  useEffect(() => {
    renderYearScale();
  }, [sectionColors]);

  useEffect(() => {
    renderColoredSections();
  }, [sectionColors]);

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
        },
        components: {
          Input: {
            colorBgContainer: "#1E1E1E",
            colorBgTextActive: "#FFFFFF",
            colorText: "#FFFFFF",
            colorTextPlaceholder: "#707070",
          },
          InputNumber: {
            colorBgContainer: "#1E1E1E",
            colorBgTextActive: "#FFFFFF",
            colorText: "#FFFFFF",
            colorTextPlaceholder: "#707070",
          },
          Tabs: {
            itemColor: "#FFFFFF",
            itemActiveColor: "#FFFFFF",
            cardBg: "#1E1E1E",
            controlItemBgActive: "#1E1E1E",
            controlItemBgActiveHover: "#1E1E1E",
            colorBgContainer: "#3A3A3A",
            colorBgTextActive: "#FFFFFF",
          },
          Button: {
            colorBgContainer: "#0400B7",
            colorText: "#FFFFFF",
            colorBorder: "#0400B7",
          },
        },
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-row gap-3 items-center self-start">
          <img src={Logo} alt="" />
          <div className="text-white text-xl">LJC Heatmap</div>
        </div>
        {/* Heading Text */}
        <div className="font-bold text-2xl text-white">
          LJC Transfer Entropy Heatmap
        </div>
        <div className="p-3 bg-white rounded-lg w-full flex flex-col items-center justify-between gap-2 /*h-[500px]*/ h-fit mt-5">
          <div className="h-full w-5/6">
            <div className="h-[550px] bg-white">
              <div className="h-[550px]">
                <div className="h-[500px] flex flex-row">
                  <div className="h-[500px] w-5/6">
                    <div className="h-[450px] flex">
                      <div className="h-[450px] w-1/12 text-xs bg-white">
                        <div className="flex items-center justify-center h-[225px]">
                          {var1 && (
                            <div className="[writing-mode:vertical-rl] rotate-180 flex items-center font-medium">
                              <span>{var1}</span>
                              <span className="mx-1 text-lg">→</span>
                              <span>{var2}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center h-[225px]">
                          {var2 && (
                            <div className="[writing-mode:vertical-rl] rotate-180 flex items-center font-medium">
                              <span>{var2}</span>
                              <span className="mx-1 text-lg">→</span>
                              <span>{var1}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="h-[450px] w-11/12">
                        <div className="relative h-full w-full bg-[#0400B7] overflow-hidden">
                          <div className="absolute inset-0 border-0 border-[#4584D5] pointer-events-none">
                            {/* {renderHorizontalLines()} */}
                            {/* {renderColoredSections()} */}
                            {horizontalLines}
                            {coloredSections}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[50px]">
                      <div className="h-[50px] relative">
                        {/* {renderYearScale()} */}
                        {yearScale}
                      </div>
                    </div>
                  </div>
                  <div className="h-[450px] w-1/6">
                    <ColorLegend />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          // ref={fileInputRef}
          // className="hidden"
        />
      </div>
    </ConfigProvider>
  );

  //   if (!showMap) {
  //     return (
  //       <div
  //         style={{ background: "#1E1E1E" }}
  //         className="border-2 border-gray-600 p-5 rounded-lg flex justify-between items-center mx-4"
  //       >
  //         {/* <div className="h-full w-full "> */}
  //         <div className="h-[70px] mt-4 text-2xl font-medium text-center">
  //           <span>LJC Transfer Entropy Heatmap</span>
  //         </div>
  //         <Input
  //           type="file"
  //           accept=".csv"
  //           onChange={handleFileUpload}
  //           // ref={fileInputRef}
  //           // className="hidden"
  //         />
  //       </div>
  //     );
  //   }
  //   return null;
};

export default Tvte;
