import React, { useContext, useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import { LJCDataContext } from "../../context/LJCDataContext";

export type CELL_TYPE = {
  color: string;
  pval: number;
  upLine_x: boolean;
  downLine_x: boolean;
  leftLine_x: boolean;
  rightLine_x: boolean;
};

export const CELL_TYPES = Object.freeze({
  TOP_ROW_CELL: "TOP_ROW_CELL",
  BOTTOM_ROW_CELL: "BOTTOM_ROW_CELL",
  LEFT_COLUMN_CELL: "LEFT_COLUMN_CELL",
  RIGHT_COLUMN_CELL: "RIGHT_COLUMN_CELL",
  OTHER_CELL: "OTHER_CELL",
});

type T_AVG_DATA_OBJ = {
  avgTE_x_to_y: number;
  avgPval_x_to_y: number;
  avgTE_y_to_x: number;
  avgPval_y_to_x: number;
  avgStat_x: number;
  avgStat_y: number;
};

type T_AVG_DATA_SET = {
  windows_size: string;
  data_objs: T_AVG_DATA_OBJ[];
};
export type T_sectionColors = {
  [key: string]: CELL_TYPE[];
};

export type T_AVG_DATA_SET_MAP = {
  [windows_size: string]: T_AVG_DATA_SET;
};

export type T_CELL_TYPE = (typeof CELL_TYPES)[keyof typeof CELL_TYPES];

const useCSVData = () => {
  const [startYearFreq, setStartYearFreq] = useState(0);
  const [var1, setVar1] = useState("X");
  const [var2, setVar2] = useState("Y");
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [windowsSizes, setWindowsSizes] = useState<number[]>([]);

  const { tvte } = useContext(LJCDataContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getColorForStats = (pVal: number, te: number): string => {
    let color = "#0400B7";
    let isFound = false;
    tvte.colorSettings.map((setting) => {
      if (pVal <= setting.pvalMin && te < setting.TE_Max) {
        if (!isFound) {
          color = setting.hexColor;
          isFound = true;
        }
      }
      // if (
      //   pVal <= setting.pvalMax &&
      //   pVal >= setting.pvalMin &&
      //   te < setting.TE_Max &&
      //   te > setting.TE_Min
      // ) {
      //   color = setting.hexColor;
      // }
    });
    return color;
    // if (pVal <= 0.01) {
    //   if (te < 1 / 3) return "#F60000";
    //   else if (te < 2 / 3) return "#DA0000";
    //   else return "#BC0000";
    // } else if (pVal <= 0.05) {
    //   if (te < 1 / 3) return "#FFC000";
    //   else if (te < 2 / 3) return "#FF9933";
    //   else return "#F26A0E";
    // } else if (pVal <= 0.1) {
    //   if (te < 1 / 3) return "#FFFF00";
    //   else if (te < 2 / 3) return "#FAF400";
    //   else return "#D7D200";
    // } else if (pVal <= 0.2) {
    //   if (te < 1 / 3) return "#00C85A";
    //   else if (te < 2 / 3) return "#00B050";
    //   else return "#009A46";
    // } else return "#0400B7";
  };

  const sampleData = {
    section_1_colors_x_to_y: [
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
    ],
    section_1_colors_y_to_x: [
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
      "#F60000",
    ],
    section_2_colors_x_to_y: [
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
    ],
    section_2_colors_y_to_x: [
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
      "#FFC000",
    ],
    section_3_colors_x_to_y: [
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
    ],
    section_3_colors_y_to_x: [
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
      "#FFFF00",
    ],
    section_4_colors_x_to_y: [
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
    ],
    section_4_colors_y_to_x: [
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
      "#00C85A",
    ],
    section_5_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_5_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_6_colors_x_to_y: [
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
    ],
    section_6_colors_y_to_x: [
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
      "#DA0000",
    ],
    section_7_colors_x_to_y: [
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
    ],
    section_7_colors_y_to_x: [
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
    ],
    section_8_colors_x_to_y: [
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
    ],
    section_8_colors_y_to_x: [
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
      "#FAF400",
    ],
    section_9_colors_x_to_y: [
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
    ],
    section_9_colors_y_to_x: [
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
      "#00B050",
    ],
    section_10_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_10_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_11_colors_x_to_y: [
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
    ],
    section_11_colors_y_to_x: [
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
      "#BC0000",
    ],
    section_12_colors_x_to_y: [
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
    ],
    section_12_colors_y_to_x: [
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
      "#F26A0E",
    ],
    section_13_colors_x_to_y: [
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
    ],
    section_13_colors_y_to_x: [
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
      "#D7D200",
    ],
    section_14_colors_x_to_y: [
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
    ],
    section_14_colors_y_to_x: [
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
      "#009A46",
    ],
    section_15_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_15_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_16_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_16_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_17_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_17_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_18_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_18_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_19_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_19_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_20_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_20_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_21_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_21_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_22_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_22_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_23_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_23_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_24_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_24_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_25_colors_x_to_y: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_25_colors_y_to_x: [
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
      "#0400B7",
    ],
    section_26_colors_x_to_y: ["#0400B7"],
    section_26_colors_y_to_x: ["#0400B7"],
  };

  // const [sectionColors, setSectionColors] = useState<T_sectionColors>({});
  const [rawData, setRawData] = useState<string[][]>([]);

  const [fileName, setFileName] = useState<string>("");

  function roundToDecimal(num: number, places: number) {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
  }

  const getBordersData = (
    cell_type: T_CELL_TYPE,
    pval: number,
    top_cell_pval: number | null,
    bottom_cell_pval: number | null,
    left_cell_pval: number | null,
    right_cell_pval: number | null
  ): {
    upLine_x: boolean;
    downLine_x: boolean;
    leftLine_x: boolean;
    rightLine_x: boolean;
  } => {
    let upLine_x = false;
    let downLine_x = false;
    let leftLine_x = false;
    let rightLine_x = false;

    switch (cell_type) {
      case CELL_TYPES.TOP_ROW_CELL:
        /*
      Top row cell
      Cell < 0.1 top line
      Cell < 0.1 && bottom cell > 0.1 bottom line
      Cell < 0.1 && right cell > 0.1 right line
      Cell < 0.1 && left cell > 0.1 left line
      */
        if (pval < 0.1) {
          upLine_x = true;
          if (
            (bottom_cell_pval && bottom_cell_pval > 0.1) ||
            !bottom_cell_pval
          ) {
            downLine_x = true;
          }
          if ((right_cell_pval && right_cell_pval > 0.1) || !right_cell_pval) {
            rightLine_x = true;
          }
          if ((left_cell_pval && left_cell_pval > 0.1) || !left_cell_pval) {
            leftLine_x = true;
          }
        }
        break;
      case CELL_TYPES.BOTTOM_ROW_CELL:
        /*
        Bottom row cell
        Cell < 0.1 bottom line
        Cell < 0.1 && top cell > 0.1 top line
        Cell < 0.1 && right cell > 0.1 right line
        Cell < 0.1 && left cell > 0.1 left line
        */
        if (pval < 0.1) {
          downLine_x = true;
          if ((top_cell_pval && top_cell_pval > 0.1) || !top_cell_pval) {
            upLine_x = true;
          }
          if ((right_cell_pval && right_cell_pval > 0.1) || !right_cell_pval) {
            rightLine_x = true;
          }
          if ((left_cell_pval && left_cell_pval > 0.1) || !left_cell_pval) {
            leftLine_x = true;
          }
        }
        break;
      case CELL_TYPES.LEFT_COLUMN_CELL:
        /*
        Left column cell
        Cell < 0.1 left line
        Cell < 0.1 && top cell > 0.1 top line
        Cell < 0.1 && bottom cell > 0.1 bottom line
        Cell < 0.1 && right cell > 0.1 right line
        */
        if (pval < 0.1) {
          leftLine_x = true;
          if ((top_cell_pval && top_cell_pval > 0.1) || !top_cell_pval) {
            upLine_x = true;
          }
          if (
            (bottom_cell_pval && bottom_cell_pval > 0.1) ||
            !bottom_cell_pval
          ) {
            downLine_x = true;
          }
          if ((right_cell_pval && right_cell_pval > 0.1) || !right_cell_pval) {
            rightLine_x = true;
          }
        }
        break;
      case CELL_TYPES.RIGHT_COLUMN_CELL:
        /*
        Right column cell
        Cell < 0.1 right line
        Cell < 0.1 && top cell > 0.1 top line
        Cell < 0.1 && bottom cell > 0.1 bottom line
        Cell < 0.1 && left cell > 0.1 left line
        */
        if (pval < 0.1) {
          rightLine_x = true;
          if ((top_cell_pval && top_cell_pval > 0.1) || !top_cell_pval) {
            upLine_x = true;
          }
          if (
            (bottom_cell_pval && bottom_cell_pval > 0.1) ||
            !bottom_cell_pval
          ) {
            downLine_x = true;
          }
          if ((left_cell_pval && left_cell_pval > 0.1) || !left_cell_pval) {
            leftLine_x = true;
          }
        }
        break;
      case CELL_TYPES.OTHER_CELL:
        /*
        Other
        Cell < 0.1 && right cell > 0.1 right line
        Cell < 0.1 && top cell > 0.1 top line
        Cell < 0.1 && bottom cell > 0.1 bottom line
        Cell < 0.1 && left cell > 0.1 left line
        */
        if (pval < 0.1) {
          if (top_cell_pval && top_cell_pval > 0.1) {
            upLine_x = true;
          }
          if (bottom_cell_pval && bottom_cell_pval > 0.1) {
            downLine_x = true;
          }
          if (left_cell_pval && left_cell_pval > 0.1) {
            leftLine_x = true;
          }
          if (right_cell_pval && right_cell_pval > 0.1) {
            rightLine_x = true;
          }
        }
        break;
    }

    return {
      upLine_x,
      downLine_x,
      leftLine_x,
      rightLine_x,
    };
  };

  const getAroundCellValues = (
    dataSetList: T_AVG_DATA_SET[],
    cur_row_index: number,
    cur_cell_index: number,
    is_avgStat_x: boolean
  ): {
    top_cell_val: number | null;
    bottom_cell_val: number | null;
    left_cell_val: number | null;
    right_cell_val: number | null;
  } => {
    let top_cell_val = null;
    let bottom_cell_val = null;
    let left_cell_val = null;
    let right_cell_val = null;

    // top
    top_cell_val = is_avgStat_x
      ? dataSetList[cur_row_index - 1]?.data_objs[cur_cell_index]?.avgStat_x ||
        null
      : dataSetList[cur_row_index - 1]?.data_objs[cur_cell_index]?.avgStat_y ||
        null;

    // bottom
    bottom_cell_val = is_avgStat_x
      ? dataSetList[cur_row_index + 1]?.data_objs[cur_cell_index]?.avgStat_x ||
        null
      : dataSetList[cur_row_index + 1]?.data_objs[cur_cell_index]?.avgStat_y ||
        null;

    // left
    left_cell_val = is_avgStat_x
      ? dataSetList[cur_row_index]?.data_objs[cur_cell_index - 1]?.avgStat_x ||
        null
      : dataSetList[cur_row_index]?.data_objs[cur_cell_index - 1]?.avgStat_y ||
        null;

    // right
    right_cell_val = is_avgStat_x
      ? dataSetList[cur_row_index]?.data_objs[cur_cell_index + 1]?.avgStat_x ||
        null
      : dataSetList[cur_row_index]?.data_objs[cur_cell_index + 1]?.avgStat_y ||
        null;

    return {
      top_cell_val,
      bottom_cell_val,
      left_cell_val,
      right_cell_val,
    };
  };

  const calculateMapData = () => {
    const newSectionColors: {
      [key: string]: CELL_TYPE[];
    } = {};

    // populate map
    let m = 0;
    for (const row of rawData) {
      if (m !== 0) {
        tvte.tvteDataSetMap[row[1]].data_objs = [
          ...tvte.tvteDataSetMap[row[1]].data_objs,
          {
            avgTE_x_to_y: Number(row[2]),
            avgPval_x_to_y: Number(row[4]),
            avgTE_y_to_x: Number(row[3]),
            avgPval_y_to_x: Number(row[5]),
            avgStat_x: Number(row[6]),
            avgStat_y: Number(row[7]),
          },
        ];
      }
      m++;
    }

    let section_no = 1;
    // let total_sections = 0;
    for (const window_size of Object.values(tvte.tvteDataSetMap)) {
      newSectionColors[`section_${section_no}_colors_x_to_y`] = [];
      newSectionColors[`section_${section_no}_colors_y_to_x`] = [];
      // total_sections += 1;
      let cell_no = 1;
      for (const window_size_obj of window_size.data_objs) {
        const finalArrValues = {
          avgTE_x_to_y:
            Math.round(window_size_obj.avgTE_x_to_y * 10000) / 10000,
          avgPval_x_to_y:
            Math.round(window_size_obj.avgPval_x_to_y * 10000) / 10000,
          avgTE_y_to_x:
            Math.round(window_size_obj.avgTE_y_to_x * 10000) / 10000,
          avgPval_y_to_x:
            Math.round(window_size_obj.avgPval_y_to_x * 10000) / 10000,
          avgStat_x: Math.round(window_size_obj.avgStat_x * 10000) / 10000,
          avgStat_y: Math.round(window_size_obj.avgStat_y * 10000) / 10000,
          colx_y: getColorForStats(
            window_size_obj.avgPval_x_to_y,
            window_size_obj.avgTE_x_to_y
          ),
          coly_x: getColorForStats(
            window_size_obj.avgPval_y_to_x,
            window_size_obj.avgTE_y_to_x
          ),

          upLine_x: window_size_obj.avgStat_x,
          downLine_x: true,
          leftLine_x: true,
          rightLine_x: true,
          upLine_y: window_size_obj.avgStat_y,
          downLine_y: true,
          leftLine_y: true,
          rightLine_y: true,
        };

        let cell_type: T_CELL_TYPE = CELL_TYPES.OTHER_CELL;
        if (section_no === 1) {
          // top row cell
          cell_type = CELL_TYPES.TOP_ROW_CELL;
        } else if (section_no === Object.values(tvte.tvteDataSetMap).length) {
          // bottom row cell
          cell_type = CELL_TYPES.BOTTOM_ROW_CELL;
        } else {
          if (cell_no === 1) {
            // left coloumn cell
            cell_type = CELL_TYPES.LEFT_COLUMN_CELL;
          } else if (cell_no === window_size.data_objs.length) {
            // right column cell
            cell_type = CELL_TYPES.RIGHT_COLUMN_CELL;
          }
        }

        const cellValues_x = getAroundCellValues(
          Object.values(tvte.tvteDataSetMap),
          section_no - 1,
          cell_no - 1,
          true
        );
        const cellValues_y = getAroundCellValues(
          Object.values(tvte.tvteDataSetMap),
          section_no - 1,
          cell_no - 1,
          false
        );

        const border_data_x = getBordersData(
          cell_type,
          window_size_obj.avgStat_x,
          cellValues_x.top_cell_val, // top
          cellValues_x.bottom_cell_val, // bottom
          cellValues_x.left_cell_val, // left
          cellValues_x.right_cell_val // right
        );
        newSectionColors[`section_${section_no}_colors_x_to_y`].push({
          color: finalArrValues.colx_y,
          pval: window_size_obj.avgStat_x,
          upLine_x: border_data_x.upLine_x,
          downLine_x: border_data_x.downLine_x,
          leftLine_x: border_data_x.leftLine_x,
          rightLine_x: border_data_x.rightLine_x,
        });

        const border_data_y = getBordersData(
          cell_type,
          window_size_obj.avgStat_y,
          cellValues_y.top_cell_val, // top
          cellValues_y.bottom_cell_val, // bottom
          cellValues_y.left_cell_val, // left
          cellValues_y.right_cell_val // right
        );
        newSectionColors[`section_${section_no}_colors_y_to_x`].push({
          color: finalArrValues.coly_x,
          pval: window_size_obj.avgStat_y,
          upLine_x: border_data_y.upLine_x,
          downLine_x: border_data_y.downLine_x,
          leftLine_x: border_data_y.leftLine_x,
          rightLine_x: border_data_y.rightLine_x,
        });
        cell_no += 1;
      }
      section_no += 1;
    }

    // console.log("dataSetMap: ", dataSetMap);
    // console.log("newSectionColors: ", newSectionColors);
    // setSectionColors(newSectionColors);
    tvte.setSectionColors(newSectionColors);
  };

  useEffect(() => {
    console.log("=========== calculateMapData");
    calculateMapData();
  }, [tvte.colorSettings, tvte.setTvteExcelRawData, rawData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setFileName(file.name);
      Papa.parse(file, {
        complete: (results: any) => {
          if (results.data && Array.isArray(results.data)) {
            const rawData = results.data as string[][];
            setRawData(rawData);
            tvte.setTvteExcelRawData(rawData);

            const windowsSizes = new Set<string>();

            let i = 0;
            for (const row of rawData) {
              if (i !== 0) {
                windowsSizes.add(row[1]);
              }
              i++;
            }

            const windowsSizesList = Array.from(windowsSizes);
            const filteredWSList_1 = windowsSizesList.filter((item) => item);
            const filteredWSList = filteredWSList_1.map((item) => Number(item));
            setWindowsSizes(filteredWSList);
            // if (filteredWSList.length > 0) {
            //   setWindowsSizeStart(Number(filteredWSList[0]));
            //   setWindowsSizeEnd(
            //     Number(filteredWSList[filteredWSList.length - 1])
            //   );
            // }

            // create map
            const dataSetMap: T_AVG_DATA_SET_MAP = windowsSizesList.reduce(
              (acc: any, windowSize: string) => {
                acc[windowSize] = {
                  windows_size: windowSize,
                  data_objs: [],
                };
                return acc;
              },
              {}
            );

            tvte.setTvteWindowsSizes(filteredWSList);
            tvte.setTvteDataSetMap(dataSetMap);
          }
          setIsLoading(false);
        },
        error: (error) => {
          setIsLoading(false);
        },
      });
    }
  };

  return {
    handleFileUpload,
    // sectionColors,
    startYearFreq,
    var1,
    var2,
    startYear,
    endYear,
    windowsSizes,
    isLoading,
    fileInputRef,
  };
};

export default useCSVData;
