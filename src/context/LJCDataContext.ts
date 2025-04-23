import { createContext } from "react";

import { TColorChangePorps } from "../pages/time-varying-transfer-entropy/Tvte";
import { T_sectionColors } from "../pages/time-varying-transfer-entropy/useCSVData";

export type TVTEContextType = {
  colorSettings: TColorChangePorps[];
  setColorSettings: React.Dispatch<React.SetStateAction<TColorChangePorps[]>>;
  variableNames: {
    var1: string;
    var2: string;
  };
  setVariableNames: React.Dispatch<
    React.SetStateAction<{
      var1: string;
      var2: string;
    }>
  >;
  unitRootAcceptanceRate: number;
  setUnitRootAcceptanceRate: React.Dispatch<React.SetStateAction<number>>;
  setColorCondtionsDefault: () => void;
  tvteExcelRawData: string[][];
  tvteWindowsSizes: number[];
  setTvteExcelRawData: React.Dispatch<React.SetStateAction<string[][]>>;
  setTvteWindowsSizes: React.Dispatch<React.SetStateAction<number[]>>;
  sectionColors: T_sectionColors;
  setSectionColors: React.Dispatch<React.SetStateAction<T_sectionColors>>;
  startYearFreq: number;
  setStartYearFreq: React.Dispatch<React.SetStateAction<number>>;
  startYear: number | null;
  setStartYear: React.Dispatch<React.SetStateAction<number | null>>;
  endYear: number | null;
  setEndYear: React.Dispatch<React.SetStateAction<number | null>>;
};

export type LJCDataContextType = {
  tvte: TVTEContextType;
};

export const LJCDataContext = createContext<LJCDataContextType>({
  tvte: {
    colorSettings: [],
    setColorSettings: () => {},
    variableNames: {
      var1: "",
      var2: "",
    },
    setVariableNames: () => {},
    unitRootAcceptanceRate: 0.1,
    setUnitRootAcceptanceRate: () => {},
    setColorCondtionsDefault: () => {},
    tvteExcelRawData: [],
    tvteWindowsSizes: [],
    setTvteExcelRawData: () => {},
    setTvteWindowsSizes: () => {},
    sectionColors: {},
    setSectionColors: () => {},
    startYearFreq: 0,
    setStartYearFreq: () => {},
    startYear: null,
    setStartYear: () => {},
    endYear: null,
    setEndYear: () => {},
  },
});
