import React, { useContext, useEffect, useRef, useState } from "react";

import { Button, ConfigProvider, InputNumber, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";

import useCSVData from "./useCSVData";
import Logo from "../../images/Logo.png";
import TransferEntropySettingsModel from "../../components/models/TransferEntropySettingsModel";
import { LJCDataContext } from "../../context/LJCDataContext";
import download from "downloadjs";
import { toPng } from "html-to-image";
import Heading from "../../components/Heading";

export type TColorChangePorps = {
  index: number;
  pvalMin: number;
  pvalMax: number;
  TE_Min: number;
  TE_Max: number;
  hexColor: string;
};

type TCanvas = {
  width: number;
  height: number;
  maxHeight: number;
  color: string;
  // maxCircleSize: number;
  // minCircleSize: number;
};

const DEFAULT_CANVAS_HEIGHT = 340;

const Tvte = () => {
  const { tvte } = useContext(LJCDataContext);

  const { handleFileUpload, isLoading, fileInputRef } = useCSVData();

  const mapDivRef = useRef(null);
  const [canvas, setCanvas] = useState<TCanvas>({
    width: 800,
    height: DEFAULT_CANVAS_HEIGHT,
    maxHeight: 3000,
    color: "",
  });

  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);
  // const [yearScale, setYearScale] = useState<JSX.Element | null>(null);
  const [colorSettings, setColorSettings] = useState<TColorChangePorps[]>([
    {
      index: 0,
      pvalMin: 0.0,
      pvalMax: 0.0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#BC0000",
    },
    {
      index: 1,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#DA0000",
    },
    {
      index: 2,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#F60000",
    },
    {
      index: 3,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#F26A0E",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#FF9933",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#FFC000",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#D7D200",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#FAF400",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#FFFF00",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#009A46",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#00B050",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#00C85A",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#0400B7",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#0400B7",
    },
    {
      index: 0,
      pvalMin: 0,
      pvalMax: 0,
      TE_Min: 0.0,
      TE_Max: 0.0,
      hexColor: "#0400B7",
    },
  ]);
  const [horizontalLines, setHorizontalLines] = useState<JSX.Element[]>([]);
  const [coloredSections, setColoredSections] = useState<JSX.Element | null>(
    null
  );

  /*
  const [colors, setColors] = useState<{
    [id: string]: {
      color: string;
    };
  }>({
    "1": { color: "#BC0000" },
    "2": { color: "#DA0000" },
    "3": { color: "#F60000" },
    "4": { color: "#F26A0E" },
    "5": { color: "#FF9933" },
    "6": { color: "#FFC000" },
    "7": { color: "#D7D200" },
    "8": { color: "#FAF400" },
    "9": { color: "#FFFF00" },
    "10": { color: "#009A46" },
    "11": { color: "#00B050" },
    "12": { color: "#00C85A" },
    "13": { color: "#0400B7" },
    "14": { color: "#0400B7" },
    "15": { color: "#0400B7" },
  });
  */

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [windowsSizeLegend, setWindowsSizeLegend] = useState<number[]>([]);
  const [midleLineSeparaterHeightInPx, setMidleLineSeparaterHeightInPx] =
    useState<number>(5);

  const renderHorizontalLines = () => {
    if (!tvte.startYearFreq) return null;

    const numLines =
      typeof tvte.startYearFreq === "string"
        ? Number.parseInt(tvte.startYearFreq, 10)
        : tvte.startYearFreq;
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
  /*
  const renderYearScale = () => {
    if (!tvte.startYear || !tvte.endYear) return null;

    const scale = tvte.endYear - tvte.startYear + 1;
    const years = [];

    for (let i = 0; i < scale; i++) {
      years.push(tvte.startYear + i);
    }

    setYearScale(
      <div className="absolute top-4 left-[10%] right-[1%] h-2 flex items-end">
        {years.map((year, index) => {
          const startPosition = (index / scale) * 100;
          const endPosition = ((index + 1) / scale) * 100;
          const centerPosition = (startPosition + endPosition) / 2;

          return (
            <React.Fragment key={index}>
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
            <React.Fragment key={index}>
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
  */
  const renderColoredSections = () => {
    if (!Object.keys(tvte.sectionColors).length) return null;

    const totalSections =
      Object.keys(tvte.sectionColors).filter((key) => key.includes("colors"))
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
        <div>
          {Array.from({ length: totalSections }, (_, i) => {
            const sectionKey = `section_${i + 1}_colors_x_to_y`;
            // const validationKey = `section_${i + 1}`;
            // console.log(validationKey);
            const squareList = tvte.sectionColors[sectionKey] || [];
            // const validation = statXValidationResults?.[validationKey];
            return (
              <div
                key={`top-${i}`}
                className="flex /*absolute*/ w-full"
                style={{
                  height: `${canvas.height / totalSections / 2}px`,
                }}
              >
                {squareList.map((square, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`top-${i}-${index}`}
                      className={`relative ${
                        square.upLine_x ? "border-t-[1px] border-t-white" : ""
                      }                      
                        ${
                          square.downLine_x
                            ? "border-b-[1px] border-b-white"
                            : ""
                        }
                        ${
                          square.leftLine_x
                            ? "border-l-[1px] border-l-white"
                            : ""
                        }
                        ${
                          square.rightLine_x
                            ? "border-r-[1px] border-r-white"
                            : ""
                        }
                      `}
                      style={{
                        backgroundColor: square.color,
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
              height: `${midleLineSeparaterHeightInPx}px`, // Adjustable line height
              backgroundColor: "#ffffff",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          />
        </div>

        {/* Bottom Half Container (Y to X) - Exactly 50% height */}
        <div className={`/*absolute bottom-0 left-0 right-0 h-[49.8%]*/`}>
          {Array.from({ length: totalSections }, (_, i) => {
            const sectionKey = `section_${i + 1}_colors_y_to_x`;
            const validationKey = `section_${i + 1}`;
            // console.log(validationKey);
            const squareList = tvte.sectionColors[sectionKey] || [];
            // const validation = statYValidationResults?.[validationKey];

            //console.log(colors)
            return (
              <div
                key={`bottom-${i}`}
                className="flex /*absolute*/ w-full"
                style={{
                  // top: `${(i * 70) / totalSections}%`,
                  // height: `${70 / totalSections}%`,
                  height: `${canvas.height / totalSections / 2}px`,
                }}
              >
                {squareList.map((square, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`bottom-${i}-${index}`}
                      className={`relative ${
                        square.upLine_x ? "border-t-[1px] border-t-white" : ""
                      }                      
                        ${
                          square.downLine_x
                            ? "border-b-[1px] border-b-white"
                            : ""
                        }
                        ${
                          square.leftLine_x
                            ? "border-l-[1px] border-l-white"
                            : ""
                        }
                        ${
                          square.rightLine_x
                            ? "border-r-[1px] border-r-white"
                            : ""
                        }
                      `}
                      style={{
                        backgroundColor: square.color,
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
            // console.log(validationKey);
            const squareList = tvte.sectionColors[sectionKey] || [];
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
                {squareList.map((square, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`top-${i}-${index}`}
                      className="relative"
                      style={{
                        backgroundColor: square.color,
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
            // console.log(validationKey);
            const squareList = tvte.sectionColors[sectionKey] || [];
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
                {squareList.map((square, index) => {
                  // const borderStyles = getBorderStyles(validation, index);
                  return (
                    <div
                      key={`bottom-${i}-${index}`}
                      className="relative"
                      style={{
                        backgroundColor: square.color,
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

  const generateWindowsSizeLegendValues = () => {
    if (tvte.tvteWindowsSizes.length === 0) return;
    try {
      const start_size = tvte.tvteWindowsSizes[0];
      const end_size = tvte.tvteWindowsSizes[tvte.tvteWindowsSizes.length - 1];
      const legedValues: number[] = [];

      let increment = 5;
      let cur_size = start_size;

      while (cur_size < end_size) {
        if (cur_size <= end_size) {
          legedValues.push(cur_size);
        } else {
          // legedValues.push(end_size);
        }
        cur_size += increment;
      }
      if (legedValues[legedValues.length - 1] !== end_size) {
        legedValues.push(end_size);
      }
      // console.log("== legedValues: start_size", start_size);
      // console.log("== legedValues: end_size", end_size);
      // console.log("== legedValues: ", legedValues);
      setWindowsSizeLegend(legedValues);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateWindowsSizeLegendValues();
  }, [tvte.sectionColors]);

  useEffect(() => {
    renderHorizontalLines();
  }, [tvte.sectionColors]);

  // useEffect(() => {
  //   renderYearScale();
  // }, [tvte.sectionColors]);

  useEffect(() => {
    renderColoredSections();
  }, [tvte.sectionColors]);

  const onChangeCanvasSize = (value: number | null, name: string) => {
    if (value !== null) {
      if (name === "height" && value > DEFAULT_CANVAS_HEIGHT) {
        //  alert("Invalid Canvas Height");
        if (value > DEFAULT_CANVAS_HEIGHT) {
          return;
        }
      }

      setCanvas((prev: TCanvas) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getColorLegendColorPieces = () => {
    const gap = 3;
    const colorPirces = [];
    for (let i = 0; i < tvte.colorSettings.length; i += gap) {
      colorPirces.push(
        <div
          key={i}
          className={`flex-1 content-center ${
            i !== tvte.colorSettings.length - gap
              ? "border-r-[1px] border-black"
              : ""
          }`}
        >
          <div className="flex flex-row h-[70%] w-full">
            <div
              className="w-1/3"
              style={{
                backgroundColor:
                  tvte.colorSettings.at(i)?.hexColor || "#ffffff",
              }}
            />
            <div
              className="w-1/3"
              style={{
                backgroundColor:
                  tvte.colorSettings.at(i + 1)?.hexColor || "#ffffff",
              }}
            />
            <div
              className="w-1/3"
              style={{
                backgroundColor:
                  tvte.colorSettings.at(i + 2)?.hexColor || "#ffffff",
              }}
            />
          </div>
        </div>
      );
    }
    return colorPirces;
  };

  const handleDownloadImage = async () => {
    if (mapDivRef.current === null) {
      return;
    }

    try {
      // const dataUrl = await toPng(divRef.current);
      // Increase pixelRatio for higher quality
      setIsDownloading(true);
      const dataUrl = await toPng(mapDivRef.current, {
        pixelRatio: 10, // Adjust pixel ratio (default is 1)
      });
      setIsDownloading(false);
      download(dataUrl, "LJC Transfer Entropy Heatmap-image.png");
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error Downloading Image");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
        },
        components: {
          Input: {
            colorBgContainer: "#FFFFFF",
            colorBgTextActive: "#404040",
            colorText: "#404040",
            colorTextPlaceholder: "#707070",
            hoverBorderColor: "#353535",
            activeBorderColor: "#353535",
          },
          InputNumber: {
            colorBgContainer: "#FFFFFF",
            colorBgTextActive: "#404040",
            colorText: "#404040",
            colorTextPlaceholder: "#707070",
            hoverBorderColor: "#353535",
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
            // colorBgContainer: "#0400B7",
            // colorText: "#FFFFFF",
            // colorBorder: "#0400B7",
            // colorBgTextHover: "#0400B7",
            defaultHoverColor: "#353535",
            defaultHoverBorderColor: "#353535",
          },
        },
      }}
    >
      <div className="w-full flex flex-col items-center">
        <Heading />
        {/* Heading Text */}
        <div className="font-bold text-2xl text-white">
          LJC Transfer Entropy Heatmap
        </div>
        <div className="p-3 bg-white rounded-lg w-full flex flex-col items-center justify-between gap-2 /*h-[500px]*/ h-fit mt-5">
          <div className="absolute right-14">
            {isDownloading ? (
              <Spin
                indicator={<LoadingOutlined spin />}
                size="default"
                className="p-3"
              />
            ) : (
              <Button
                size="large"
                // type="text"
                shape="circle"
                icon={<DownloadOutlined style={{ color: "gray" }} />}
                onClick={() => handleDownloadImage()}
                style={{ background: "#FFFFFF", border: "#FFFFFF" }}
              />
            )}
          </div>
          <div className="h-[450px] bg-white flex" ref={mapDivRef}>
            {/* Map Left: Y axis labels */}
            <div className="w-1/12 pr-5 text-xs mt-[60px] /*bg-red-500*/">
              <div
                className="flex items-center justify-center /*border-2 border-red-500*/"
                style={{
                  height: `${canvas.height / 2}px`,
                }}
              >
                {tvte.variableNames.var1 && (
                  <div className="[writing-mode:vertical-rl] rotate-180 flex items-center font-medium">
                    <span>{tvte.variableNames.var1}</span>
                    <span className="mx-1 text-lg">→</span>
                    <span>{tvte.variableNames.var2}</span>
                  </div>
                )}
              </div>
              <div
                className="flex items-center justify-center /*border-2 border-red-500*/"
                style={{
                  height: `${canvas.height / 2}px`,
                }}
              >
                {tvte.variableNames.var2 && (
                  <div className="[writing-mode:vertical-rl] rotate-180 flex items-center font-medium">
                    <span>{tvte.variableNames.var2}</span>
                    <span className="mx-1 text-lg">→</span>
                    <span>{tvte.variableNames.var1}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-5 text-xs mt-[50px]">
              <div
                className="flex flex-row items-center  justify-center [writing-mode:vertical-rl] rotate-180 text-[9px] /*border-2 border-red-500*/"
                style={{
                  height: `${canvas.height / 2}px`,
                }}
              >
                <div className="flex-1 text-center">Long</div>
                <div className="flex-1 text-center">Medium</div>
                <div className="flex-1 text-center">Short</div>
              </div>
              <div
                className="flex flex-row items-center  justify-center [writing-mode:vertical-rl] rotate-180 text-[9px] /*border-2 border-red-500*/"
                style={{
                  height: `${canvas.height / 2}px`,
                }}
              >
                <div className="flex-1 text-center">Long</div>
                <div className="flex-1 text-center">Medium</div>
                <div className="flex-1 text-center">Short</div>
              </div>
            </div>
            {/* Map, Map-top Map-bottom */}
            <div
              style={{
                width: `${canvas.width}px`,
              }}
              className="flex flex-col h-full"
            >
              {/* map top */}
              <div
                className="/*border-2*/"
                style={{
                  width: `${canvas.width}px`,
                  height: "55px",
                }}
              >
                {/* Color bar Top legends */}
                <div className="h-[15px] flex flex-row -mb-[3px] /*bg-green-500*/">
                  <div className="w-[28px]"></div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-between items-end">
                    <div className="px-[5px]">High</div>
                    <div className="px-[5px]">Low</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-between items-end">
                    <div className="px-[5px]">High</div>
                    <div className="px-[5px]">Low</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-between items-end">
                    <div className="px-[5px]">High</div>
                    <div className="px-[5px]">Low</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-between items-end">
                    <div className="px-[5px]">High</div>
                    <div className="px-[5px]">Low</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-between items-end">
                    <div className="px-[5px]">High</div>
                    <div className="px-[5px]">Low</div>
                  </div>
                  <div className="w-[28px]"></div>
                </div>
                {/* Color bar */}
                <div className="h-[30px] relative">
                  {/* <div className="h-[15px] w-full bg-white absolute "></div> */}
                  <div className="h-[1px] w-full bg-black absolute z-10 top-[50%]"></div>
                  <div className="h-[30px] flex flex-row /*bg-red-500*/">
                    <div className="w-[28px] flex flex-col text-[8px] justify-between items-center">
                      <div>TE</div>
                      <div>P</div>
                    </div>
                    {getColorLegendColorPieces()}
                    {/* <div className="flex-1 border-r-[1px] border-black content-center">
                      <div className="flex flex-row h-[70%] w-full">
                        <div
                          className="w-1/3"
                          style={{ backgroundColor: colors["1"].color }}
                        ></div>
                        <div
                          className="w-1/3"
                          style={{ backgroundColor: colors["2"].color }}
                        />
                        <div
                          className="w-1/3"
                          style={{ backgroundColor: colors["3"].color }}
                        />
                      </div>
                    </div> */}
                    <div className="w-[28px] flex flex-col text-[8px] justify-between items-center">
                      <div>TE</div>
                      <div>P</div>
                    </div>
                  </div>
                </div>
                {/* Color bar Bottom legends */}
                <div className="h-[10px] flex flex-row -mt-[3px] /*bg-green-500*/">
                  <div className="w-[28px]"></div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-center items-start">
                    <div>0.01</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-center items-start">
                    <div>0.05</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-center items-start">
                    <div>0.01</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-center items-start">
                    <div>0.2</div>
                  </div>
                  <div className="flex-1 /*border-black border-r-[1px]*/ text-[8px] flex flex-row justify-center items-start">
                    <div>{">"} 0.2</div>
                  </div>
                  <div className="w-[28px]"></div>
                </div>
              </div>
              {/* map */}
              <div
                style={{
                  width: `${canvas.width}px`,
                  height: `${canvas.height}px`,
                }}
                className="relative"
              >
                <div
                  className="absolute z-10  flex flex-col justify-between"
                  style={{
                    width: `${canvas.width + 10}px`,
                    height: `${canvas.height}px`,
                    right: 1,
                  }}
                >
                  <div className="flex-1 border-b-[1px] border-black z-0"></div>
                  <div className="flex-1 border-b-[1px] border-black"></div>
                  <div className="flex-1 "></div>
                  <div className="flex-1 border-b-[1px] border-black"></div>
                  <div className="flex-1 border-b-[1px] border-black"></div>
                  <div className="flex-1"></div>
                </div>
                {/* Map Canvas */}
                <div
                  className="/*h-[450px] w-11/12*/"
                  style={{
                    width: `${canvas.width}px`,
                    // minWidth: `${canvas.width}px`,
                    height: `${canvas.height}px`,
                    // minHeight: `${canvas.height}px`,
                  }}
                >
                  <div
                    className="relative h-full w-full bg-[#0400B7] overflow-hidden"
                    style={{
                      backgroundColor: "#0400B7",
                      borderRadius: "2px",
                    }}
                  >
                    <div className="absolute inset-0 border-0 border-[#4584D5] pointer-events-none">
                      {horizontalLines}
                      {coloredSections}
                    </div>
                  </div>
                </div>
              </div>
              {/* map bottom */}
              <div
                style={{
                  width: `${canvas.width}px`,
                  height: "40px",
                }}
                className="flex flex-row justify-around items-center text-[8px]"
              >
                {tvte.tvteWindowsSizes.map((windowSize, index) => (
                  <div key={index} className="content-center">
                    {windowSize}
                  </div>
                ))}
              </div>
            </div>
            {/* Map Right */}
            <div className="w-10 text-xs mt-[60px] text-[8px]">
              {/* top */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  height: `${
                    canvas.height / 2 - midleLineSeparaterHeightInPx
                  }px`,
                }}
              >
                {windowsSizeLegend.map((windowSize, index) => (
                  <div key={index} className="flex-1 content-center">
                    {windowSize}
                    <sup>+</sup>
                  </div>
                ))}
              </div>
              {/* center */}
              <div
                style={{
                  height: `${midleLineSeparaterHeightInPx}px`,
                }}
              ></div>
              {/* bottom */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  height: `${
                    canvas.height / 2 - midleLineSeparaterHeightInPx
                  }px`,
                }}
              >
                {windowsSizeLegend.map((windowSize, index) => (
                  <div key={index} className="flex-1 content-center">
                    {windowSize}
                    <sup>+</sup>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Canvas Footer - Width/Height, Settings Button */}
          <div className="w-full flex flex-row justify-between items-center px-5">
            <div className="flex gap-5 ">
              <div className="flex flex-row items-center gap-2">
                <div className="font-semibold">Width</div>
                <InputNumber
                  onChange={(value) => onChangeCanvasSize(value, "width")}
                  value={canvas.width}
                  step={5}
                  changeOnWheel
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="font-semibold">Height</div>
                <InputNumber
                  onChange={(value) => onChangeCanvasSize(value, "height")}
                  value={canvas.height}
                  step={5}
                  changeOnWheel
                />
              </div>
            </div>
            <Button
              icon={<SettingOutlined />}
              type="default"
              onClick={() => setOpenSettingsModal(true)}
            >
              Settings
            </Button>
          </div>
        </div>

        <div className="my-4 w-full flex flex-row justify-end">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload CSV"}
          </Button>
        </div>
      </div>
      <TransferEntropySettingsModel
        open={openSettingsModal}
        setOpen={setOpenSettingsModal}
        colorSettings={colorSettings}
        setColorSettings={setColorSettings}
      />
    </ConfigProvider>
  );
};

export default Tvte;
