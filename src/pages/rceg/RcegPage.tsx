import React, { useEffect, useState, useRef } from "react";
import Entity from "../../components/Entity";
import { Button, ConfigProvider, Input, InputNumber, Tabs } from "antd";
import { toPng } from "html-to-image";
import download from "downloadjs";
import {
  MinusOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

export type TColors = {
  backgroundImage: string;
  boxShadow: string;
};

export type T_Entity = {
  entityID: number;
  entityName: string;
  // R2
  r2Var1: number;
  r2Var2: number;
  // Chi2
  chi2Var1: number;
  chi2Var2: number;
  //Lag Range
  lagRangeMin: number;
  lagRangeMax: number;
  lag: number;
  // significance
  significanceVar1: number;
  significanceVar2: number;
  // sizes
  chi2Var1CircleSize: number;
  chi2Var2CircleSize: number;
  r2Var1CirclePosition: number;
  r2Var2CirclePosition: number;
  arrowHeight: number;
  //colors
  chi2Var1CircleColors: TColors;
  chi2Var2CircleColors: TColors;
};

export type T_NC_Entity = {
  entityID: number;
  entityName: string;
  // Chi2
  chi2Var1: number;
  chi2Var2: number;
  //Lag Range
  lagRange1Min: number;
  lagRange1Max: number;
  lagRange2Min: number;
  lagRange2Max: number;
  lagVar1: number;
  lagVar2: number;
  // significance
  significanceVar1: number;
  significanceVar2: number;
  // sizes
  chi2Var1CircleSize: number;
  chi2Var2CircleSize: number;
  r2Var1CirclePosition: number;
  r2Var2CirclePosition: number;
  arrowHeight: number;
  //colors
  chi2Var1CircleColors: TColors;
  chi2Var2CircleColors: TColors;
};

type TCanvas = {
  width: number;
  height: number;
  maxHeight: number;
  color: string;
  // maxCircleSize: number;
  // minCircleSize: number;
};

export type TEntity = {
  width: number;
  height: number;
  maxCircleDiameter: number;
  minCircleDiameter: number;
  maxArrowHeight: number;
  minArrowHeight: number;
};

export type T_VarabielName = {
  ID: number;
  Var1Name: string;
  Var2Name: string;
};

type WaldTestFragment = {
  fragment: T_Entity | T_VarabielName;
};

type NonCausalityFragment = {
  fragment: T_NC_Entity | T_VarabielName;
};

// Type guards
const isTEntity = (obj: any): obj is T_Entity => "entityID" in obj;
const isT_NC_Entity = (obj: any): obj is T_NC_Entity => "entityID" in obj;
const isTVarabielName = (obj: any): obj is T_VarabielName =>
  "Var1Name" in obj && "Var2Name" in obj;

const RcegPage = () => {
  const divRef = useRef(null);

  const [currentEntity, setCurrentEntity] = useState<
    T_Entity | T_NC_Entity | undefined
  >(undefined);

  const [currentTab, setCurrentTab] = useState<"WALD_TEST" | "NON_CAUSALITY">(
    "WALD_TEST"
  );

  const [chi2MinMax, setChi2MinMax] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  // wald-test entities & variable names

  const [entities, setEntities] = useState<T_Entity[]>([
    // {
    //   entityID: 1,
    //   entityName: "Entity 1",
    //   r2Var1: 4,
    //   r2Var2: 6,
    //   chi2Var1: 4,
    //   chi2Var2: 6,
    //   lagRangeMin: 1,
    //   lagRangeMax: 5,
    //   lag: 2,
    //   significanceVar1: 0.0002,
    //   significanceVar2: 0.0003,
    //   chi2Var1CircleSize: 0,
    //   chi2Var2CircleSize: 0,
    //   r2Var1CirclePosition: 0,
    //   r2Var2CirclePosition: 0,
    //   arrowHeight: 0,
    //   chi2Var1CircleColors: {
    //     backgroundImage: "",
    //     boxShadow: "",
    //   },
    //   chi2Var2CircleColors: {
    //     backgroundImage: "",
    //     boxShadow: "",
    //   },
    // },
    // {
    //   entityID: 2,
    //   entityName: "Entity 2",
    //   r2Var1: 3,
    //   r2Var2: 8,
    //   chi2Var1: 4,
    //   chi2Var2: 6,
    //   lagRangeMin: 1,
    //   lagRangeMax: 5,
    //   lag: 2,
    //   significanceVar1: 0.0002,
    //   significanceVar2: 0.0003,
    //   chi2Var1CircleSize: 0,
    //   chi2Var2CircleSize: 0,
    //   r2Var1CirclePosition: 0,
    //   r2Var2CirclePosition: 0,
    //   arrowHeight: 0,
    //   chi2Var1CircleColors: {
    //     backgroundImage: "",
    //     boxShadow: "",
    //   },
    //   chi2Var2CircleColors: {
    //     backgroundImage: "",
    //     boxShadow: "",
    //   },
    // },
    // {
    //   entityID: 3,
    //   entityName: "Entity 3",
    //   r2Var1: 4,
    //   r2Var2: 6,
    //   chi2Var1: 5,
    //   chi2Var2: 7,
    //   lagRangeMin: 1,
    //   lagRangeMax: 5,
    //   lag: 2,
    //   significanceVar1: 0.0002,
    //   significanceVar2: 0.0003,
    //   chi2Var1CircleSize: 0,
    //   chi2Var2CircleSize: 0,
    //   r2Var1CirclePosition: 0,
    //   r2Var2CirclePosition: 0,
    //   arrowHeight: 0,
    //   chi2Var1CircleColors: {
    //     backgroundImage: "",
    //     boxShadow: "",
    //   },
    //   chi2Var2CircleColors: {
    //     backgroundImage: "",
    //     boxShadow: "",
    //   },
    // },
  ]);

  const [entities2, setEntities2] = useState<T_Entity[]>([]);

  const [variableNames, setVariableNames] = useState<T_VarabielName[]>([]);

  // non-causality Entities, Variable Names

  const [nonCausalityEntities, setNonCausalityEntities] = useState<
    T_NC_Entity[]
  >([
    {
      entityID: 1,
      entityName: "Entity 1",
      chi2Var1: 4,
      chi2Var2: 6,
      lagRange1Min: 1,
      lagRange1Max: 5,
      lagRange2Min: 1,
      lagRange2Max: 5,
      lagVar1: 2,
      lagVar2: 2,
      significanceVar1: 0.0002,
      significanceVar2: 0.0003,
      chi2Var1CircleSize: 0,
      chi2Var2CircleSize: 0,
      r2Var1CirclePosition: 0,
      r2Var2CirclePosition: 0,
      arrowHeight: 0,
      chi2Var1CircleColors: {
        backgroundImage: "",
        boxShadow: "",
      },
      chi2Var2CircleColors: {
        backgroundImage: "",
        boxShadow: "",
      },
    },
  ]);

  const [nonCausalityEntities2, setNonCausalityEntities2] = useState<
    T_NC_Entity[]
  >([]);

  const [nonCausalityVariableNames, setNonCausalityVariableNames] = useState<
    T_VarabielName[]
  >([]);

  // fragments states [wald-test, non-causality]

  const [waldTestFragmentList, setWaldTestFragmentList] = useState<
    WaldTestFragment[]
  >([]);

  const [nonCausalityFragmentList, setNonCausalityFragmentList] = useState<
    NonCausalityFragment[]
  >([]);

  const [waldTestFragmentListMaxVarId, setWaldTestFragmentListMaxVarId] =
    useState<number>(0);
  const [nonCausalityFragmentMaxVarId, setNonCausalityFragmentMaxVarId] =
    useState<number>(0);

  const MAX_CANVAS_HEIGHT = 340;
  const [canvasStyle, setCanvasStyle] = useState({
    display: "flex",
    // padding: "10px",
    backgroundColor: "blue",
    // borderRadius: "8px",
    // height: "450px",
    // width: "1050px",
    minHeight: "150px",
    maxHeight: `${MAX_CANVAS_HEIGHT}px`,
    justifyContent: "start",
    alignItems: "center",
  });

  const [canvas, setCanvas] = useState<TCanvas>({
    width: 800,
    height: MAX_CANVAS_HEIGHT,
    maxHeight: MAX_CANVAS_HEIGHT,
    color: "",
  });

  const [entity, setEntity] = useState<TEntity>({
    width: 1050,
    height: MAX_CANVAS_HEIGHT - 50,
    maxCircleDiameter: 180,
    minCircleDiameter: 60,
    maxArrowHeight: 180,
    minArrowHeight: 50,
  });

  const COLOR_VAL = Object.freeze({
    red: {
      max: 93.75,
      min: 5.882352941,
    },
    orange: {
      max: 100,
      min: 41.17647059,
    },
    yellow: {
      max: 100.0,
      min: 10.0,
    },
  });

  React.useEffect(() => {
    // console.log("entities: ", entities);
    calAndAssignChi2MinMax();
    calAndAssignEntityAndCircleSizes();

    //this will alternate - entities and nonCausalityEntities
    generateCircles();
    // generateLJCHeadMap();
  }, [entities, canvas, nonCausalityEntities]);

  useEffect(() => {
    prepareFragmentList();
  }, [entities2, variableNames]);

  useEffect(() => {
    prepareFragmentList();
  }, [nonCausalityEntities2, nonCausalityVariableNames]);

  // calculations

  const prepareFragmentList = () => {
    if (currentTab.toString() === "WALD_TEST") {
      const waldTestFragmentTempList: WaldTestFragment[] = [];
      entities2.map((e: T_Entity) =>
        waldTestFragmentTempList.push({ fragment: e })
      );

      let maxVarID = 0;

      variableNames.map((v: T_VarabielName) => {
        waldTestFragmentTempList.push({ fragment: v });
        maxVarID = v.ID > maxVarID ? v.ID : maxVarID;
      });

      setWaldTestFragmentListMaxVarId(maxVarID);

      // Sort function
      const sortedWaldTestFragmentTempList = waldTestFragmentTempList.sort(
        (a, b) => {
          const aFragment = a.fragment;
          const bFragment = b.fragment;

          if ("entityID" in aFragment && "entityID" in bFragment) {
            return aFragment.entityID - bFragment.entityID;
          } else if ("ID" in aFragment && "ID" in bFragment) {
            return aFragment.ID - bFragment.ID;
          } else if ("entityID" in aFragment && "ID" in bFragment) {
            return aFragment.entityID - bFragment.ID;
          } else if ("ID" in aFragment && "entityID" in bFragment) {
            return aFragment.ID - bFragment.entityID;
          }

          return 0;
        }
      );

      setWaldTestFragmentList(sortedWaldTestFragmentTempList);

      console.log(
        "sortedWaldTestFragmentTempList ",
        sortedWaldTestFragmentTempList
      );
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      const nonCausalityEntitiesTempList: NonCausalityFragment[] = [];

      nonCausalityEntities2.map((e: T_NC_Entity) =>
        nonCausalityEntitiesTempList.push({ fragment: e })
      );

      let maxVarID = 0;
      nonCausalityVariableNames.map((v: T_VarabielName) => {
        nonCausalityEntitiesTempList.push({ fragment: v });
        maxVarID = v.ID > maxVarID ? v.ID : maxVarID;
      });

      setNonCausalityFragmentMaxVarId(maxVarID);

      // Sort function
      const sortedNonCausalityFragmentTempList =
        nonCausalityEntitiesTempList.sort((a, b) => {
          const aFragment = a.fragment;
          const bFragment = b.fragment;

          if ("entityID" in aFragment && "entityID" in bFragment) {
            return aFragment.entityID - bFragment.entityID;
          } else if ("ID" in aFragment && "ID" in bFragment) {
            return aFragment.ID - bFragment.ID;
          } else if ("entityID" in aFragment && "ID" in bFragment) {
            return aFragment.entityID - bFragment.ID;
          } else if ("ID" in aFragment && "entityID" in bFragment) {
            return aFragment.ID - bFragment.entityID;
          }

          return 0;
        });

      console.log(
        "sortedNonCausalityFragmentTempList ",
        sortedNonCausalityFragmentTempList
      );

      setNonCausalityFragmentList(sortedNonCausalityFragmentTempList);
    }
  };

  const calAndAssignEntityAndCircleSizes = () => {
    let variableFragmentsCount = 0;
    let entitiesCount = 0;
    if (currentTab.toString() === "WALD_TEST") {
      variableFragmentsCount = variableNames.length;
      entitiesCount = entities.length;
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      variableFragmentsCount = nonCausalityVariableNames.length;
      entitiesCount = nonCausalityEntities.length;
    }

    // const entityWidth = (canvas.width - 50) / entities.length;
    const entityWidth =
      (canvas.width - variableFragmentsCount * 50) / entitiesCount;
    const entityHeight = canvas.height - 50;

    console.log("=entityHeight=", entityHeight);

    const halfHeighOfEntity = entityHeight / 2;
    //compare and find minimum value for cal. max circle diameter
    const maxCircleDiameter =
      entityWidth >= halfHeighOfEntity
        ? halfHeighOfEntity * 0.8
        : entityWidth * 0.8;

    const minCircleDiameter =
      entityWidth >= halfHeighOfEntity
        ? halfHeighOfEntity * 0.3
        : entityWidth * 0.3;

    // calculate arrow sizes
    const maxArrowHeight = entityHeight * 0.8;
    const minArrowHeight = entityHeight * 0;

    console.log("canvas: w=", canvas.width, "h=", canvas.height);
    console.log("entity: w=", entityWidth, "h=", entityHeight);

    console.log("Max circle size: ", maxCircleDiameter);
    console.log("Min circle size: ", minCircleDiameter);

    console.log("Max arrow size: ", maxArrowHeight);
    console.log("Min arrow size: ", minArrowHeight);

    setEntity((prev: TEntity) => ({
      ...prev,
      width: entityWidth,
      height: entityHeight,
      maxCircleDiameter: maxCircleDiameter,
      minCircleDiameter: minCircleDiameter,
      maxArrowHeight: maxArrowHeight,
      minArrowHeight: minArrowHeight,
    }));
  };

  const calAndAssignChi2MinMax = () => {
    const chiList: number[] = [];
    // find max chi value

    if (currentTab.toString() === "WALD_TEST") {
      entities.forEach((e: T_Entity) => {
        chiList.push(e.chi2Var1);
        chiList.push(e.chi2Var2);
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      nonCausalityEntities.forEach((e: T_NC_Entity) => {
        chiList.push(e.chi2Var1);
        chiList.push(e.chi2Var2);
      });
    }

    const MAX_CHi2 = Math.max(...chiList);
    const MIN_CHi2 = Math.min(...chiList);

    console.log("chiList: ", chiList);
    console.log("MAX_CHi2: ", MAX_CHi2, " MIN_CHi2: ", MIN_CHi2);
    setChi2MinMax({
      min: MIN_CHi2,
      max: MAX_CHi2,
    });
  };

  const calculateCircleSize = (chi2Value: number) => {
    const chi2Var1CircleSize =
      ((chi2Value - chi2MinMax.min) / (chi2MinMax.max - chi2MinMax.min)) *
        (entity.maxCircleDiameter - entity.minCircleDiameter) +
      entity.minCircleDiameter;

    return chi2Var1CircleSize;
  };

  const calculateArrowSize = (lag: number, lagMin: number, lagMax: number) => {
    const arrowHeight =
      ((lag - lagMin) / (lagMax - lagMin)) *
        (entity.maxArrowHeight - entity.minArrowHeight) +
      entity.minArrowHeight;

    return arrowHeight;
  };

  const calculateCircleColorPercentages = (
    pVal: number,
    circleDiameter: number
  ): TColors => {
    if (pVal >= 0.0 && pVal <= 0.0099) {
      const red =
        COLOR_VAL.red.max -
        ((COLOR_VAL.red.max - COLOR_VAL.red.min) / 99) * pVal * 10000;
      const orange = 96.875;
      const yellow = 100;

      const redpx = ((red / 100) * circleDiameter) / 2;
      const orapx = ((orange / 100) * circleDiameter) / 2;
      const yelpx = ((yellow / 100) * circleDiameter) / 2;

      const backgroundImage = `radial-gradient(#E60000 ${redpx}px, orange ${orapx}px, yellow ${yelpx}px, #0400B7)`;
      const boxShadow = `0px 0px 5px 3px #FFFF00`;
      return {
        backgroundImage,
        boxShadow,
      };
    } else if (pVal >= 0.01 && pVal <= 0.0499) {
      const red = 0;
      const orange =
        COLOR_VAL.orange.max -
        ((COLOR_VAL.orange.max - COLOR_VAL.orange.min) / 399) *
          (pVal * 10000 - 100);
      const yellow = 100;

      const redpx = ((red / 100) * circleDiameter) / 2;
      const orapx = ((orange / 100) * circleDiameter) / 2;
      const yelpx = ((yellow / 100) * circleDiameter) / 2;

      const backgroundImage = `radial-gradient(red ${redpx}px, #FF3C00 ${orapx}px, yellow ${yelpx}px, #0400B7)`;
      const boxShadow = `0px 0px 5px 3px #FFFF00`;
      return {
        backgroundImage,
        boxShadow,
      };
    } else if (pVal >= 0.05 && pVal <= 0.0999) {
      const red = 0;
      const orange = 0;
      const yellow =
        99 -
        ((COLOR_VAL.yellow.max - COLOR_VAL.yellow.min) / 499) *
          (pVal * 10000 - 500);

      const whi = 1;
      const whipx = ((whi / 100) * circleDiameter) / 2;
      const redpx = ((red / 100) * circleDiameter) / 2;
      const orapx = ((orange / 100) * circleDiameter) / 2;
      const yelpx = ((yellow / 100) * circleDiameter) / 2;

      const backgroundImage = `radial-gradient(red ${redpx}px, orange ${orapx}px, yellow ${yelpx}px, white)`;
      const boxShadow = `0px 0px 5px 3px #FFFFFFFF`;
      return {
        backgroundImage,
        boxShadow,
      };
    } else {
      return {
        backgroundImage: `radial-gradient(white 0px,  #0400B7)`,
        boxShadow: "",
      };
    }
  };

  /*
  const getRMinAndRMax = (): { rMin: number; rMax: number } => {
    const rValues: number[] = [];

    if (currentTab.toString() === "WALD_TEST") {
      entities.forEach((e: T_Entity) => {
        rValues.push(e.r2Var1);
        rValues.push(e.r2Var2);
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      nonCausalityEntities.forEach((e: T_NC_Entity) => {
        rValues.push(e.r2Var1);
        rValues.push(e.r2Var2);
      });
    }

    console.log("rValues: ", rValues);
    return {
      rMin: Math.min(...rValues),
      rMax: Math.max(...rValues),
    };
  };
  */

  // generaters

  const generateCircles = () => {
    if (currentTab.toString() === "WALD_TEST") {
      const result = entities.map((e: T_Entity) => {
        const chi2Var1CircleSize = calculateCircleSize(e.chi2Var1);
        const chi2Var2CircleSize = calculateCircleSize(e.chi2Var2);

        // const maxPosition = (canvas.height - 50) / 2;
        // const { rMin, rMax } = getRMinAndRMax();

        // console.log("getRMinAndRMax: ", rMin, " ", rMax);

        return {
          ...e,
          chi2Var1CircleSize: chi2Var1CircleSize,
          chi2Var2CircleSize: chi2Var2CircleSize,
          // r2Var1CirclePosition: calCirclePosition(
          //   e.r2Var1,
          //   { rMin, rMax },
          //   maxPosition
          // ),
          r2Var1CirclePosition: entity.height / 2,
          // r2Var2CirclePosition: calCirclePosition(
          //   e.r2Var2,
          //   { rMin, rMax },
          //   maxPosition
          // ),
          r2Var2CirclePosition: entity.height / 2,
          arrowHeight: calculateArrowSize(e.lag, e.lagRangeMin, e.lagRangeMax),
          chi2Var1CircleColors: calculateCircleColorPercentages(
            e.significanceVar1,
            chi2Var1CircleSize
          ),
          chi2Var2CircleColors: calculateCircleColorPercentages(
            e.significanceVar2,
            chi2Var2CircleSize
          ),
        };
      });

      setEntities2(result);
      console.log("Updated Entities: ", result);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      const result = nonCausalityEntities.map((e: T_NC_Entity) => {
        const chi2Var1CircleSize = calculateCircleSize(e.chi2Var1);
        const chi2Var2CircleSize = calculateCircleSize(e.chi2Var2);

        // const maxPosition = (canvas.height - 50) / 2;
        // const { rMin, rMax } = getRMinAndRMax();

        // console.log("getRMinAndRMax: ", rMin, " ", rMax);

        const lagRangeVales: number[] = [];
        lagRangeVales.push(e.lagRange1Max);
        lagRangeVales.push(e.lagRange2Max);

        const lagRangeMin =
          e.lagRange1Min < e.lagRange2Min ? e.lagRange1Min : e.lagRange2Min;
        const lagRangeMax =
          e.lagRange1Max > e.lagRange2Max ? e.lagRange1Max : e.lagRange2Max;
        const lag = e.lagVar1 + e.lagVar2;

        return {
          ...e,
          chi2Var1CircleSize: chi2Var1CircleSize,
          chi2Var2CircleSize: chi2Var2CircleSize,
          // r2Var1CirclePosition: calCirclePosition(
          //   e.r2Var1,
          //   { rMin, rMax },
          //   maxPosition
          // ),
          r2Var1CirclePosition: entity.height / 2,
          // r2Var2CirclePosition: calCirclePosition(
          //   e.r2Var2,
          //   { rMin, rMax },
          //   maxPosition
          // ),
          r2Var2CirclePosition: entity.height / 2,
          arrowHeight: calculateArrowSize(lag, lagRangeMin, lagRangeMax),
          chi2Var1CircleColors: calculateCircleColorPercentages(
            e.significanceVar1,
            chi2Var1CircleSize
          ),
          chi2Var2CircleColors: calculateCircleColorPercentages(
            e.significanceVar2,
            chi2Var2CircleSize
          ),
        };
      });
      // setEntities(result);
      setNonCausalityEntities2(result);
      console.log("Updated Entities: ", result);
    }
  };

  const generateLJCHeadMap = () => {
    calAndAssignEntityAndCircleSizes();
    calAndAssignChi2MinMax();
    generateCircles();
    prepareFragmentList();
  };

  // onchange handlers

  const handleOnChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    entityID: number
  ) => {
    // console.log("name: ", e.target.name);
    // console.log("value: ", e.target.value);

    const result = entities.map((entity: T_Entity) => {
      return entity.entityID !== entityID
        ? entity
        : {
            ...entity,
            [e.target.name]: e.target.value,
          };
    });
    setEntities(result);
  };

  const onChangeNumberInput = (
    value: number | null,
    entityID: number,
    name: string
  ) => {
    if (value !== null) {
      const result = entities.map((entity: T_Entity) => {
        return entity.entityID !== entityID
          ? entity
          : {
              ...entity,
              [name]: value,
            };
      });
      setEntities(result);
    }
  };

  const onChangeCanvasSize = (value: number | null, name: string) => {
    if (value !== null) {
      if (name === "height" && value > MAX_CANVAS_HEIGHT) {
        //  alert("Invalid Canvas Height");
        return;
      }

      setCanvas((prev: TCanvas) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnChangeVariableName = (
    variable: T_VarabielName,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVariableNames((prev) =>
      prev.map((v: T_VarabielName) =>
        v.ID === variable.ID ? { ...v, [e.target.name]: e.target.value } : v
      )
    );
  };

  const onChangeTab = (key: string) => {
    if (key === "WALD_TEST") {
      setCurrentTab("WALD_TEST");
    } else if (key === "NON_CAUSALITY") {
      setCurrentTab("NON_CAUSALITY");
    }
  };

  const addAnotherEntity = () => {
    if (currentTab.toString() === "WALD_TEST") {
      let newEntityID = 1;
      if (entities.length === 0) {
        newEntityID = 1;
      } else {
        let maxId = 1;

        entities.forEach((e: T_Entity) => {
          maxId = e.entityID > maxId ? e.entityID : maxId;
        });
        variableNames.forEach((e: T_VarabielName) => {
          maxId = e.ID > maxId ? e.ID : maxId;
        });

        newEntityID = maxId + 1;
      }

      newEntityID = new Date().getTime();

      setEntities((prev) => [
        ...prev,
        {
          entityID: newEntityID, //new Date().getTime(),
          entityName: `Entity`,
          r2Var1: 0,
          r2Var2: 0,
          chi2Var1: 0,
          chi2Var2: 0,
          lagRangeMin: 0,
          lagRangeMax: 0,
          lag: 0,
          significanceVar1: 0,
          significanceVar2: 0,
          chi2Var1CircleSize: 0,
          chi2Var2CircleSize: 0,
          r2Var1CirclePosition: 0,
          r2Var2CirclePosition: 0,
          arrowHeight: 0,
          chi2Var1CircleColors: {
            backgroundImage: "",
            boxShadow: "",
          },
          chi2Var2CircleColors: {
            backgroundImage: "",
            boxShadow: "",
          },
        },
      ]);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      let newEntityID = 1;
      if (nonCausalityEntities.length === 0) {
        newEntityID = 1;
      } else {
        let maxId = 1;

        nonCausalityEntities.forEach((e: T_NC_Entity) => {
          maxId = e.entityID > maxId ? e.entityID : maxId;
        });
        nonCausalityVariableNames.forEach((e: T_VarabielName) => {
          maxId = e.ID > maxId ? e.ID : maxId;
        });

        newEntityID = maxId + 1;
      }

      setNonCausalityEntities((prev) => [
        ...prev,
        {
          entityID: newEntityID,
          entityName: `Entity`,
          chi2Var1: 0,
          chi2Var2: 0,
          lagRange1Min: 0,
          lagRange1Max: 0,
          lagRange2Min: 0,
          lagRange2Max: 0,
          lagVar1: 0,
          lagVar2: 0,
          significanceVar1: 0,
          significanceVar2: 0,
          chi2Var1CircleSize: 0,
          chi2Var2CircleSize: 0,
          r2Var1CirclePosition: 0,
          r2Var2CirclePosition: 0,
          arrowHeight: 0,
          chi2Var1CircleColors: {
            backgroundImage: "",
            boxShadow: "",
          },
          chi2Var2CircleColors: {
            backgroundImage: "",
            boxShadow: "",
          },
        },
      ]);
    }
  };

  const addVariable = () => {
    if (currentTab.toString() === "WALD_TEST") {
      let newEntityID = 1;
      if (entities.length === 0) {
        newEntityID = 1;
      } else {
        let maxId = 1;

        entities.forEach((e: T_Entity) => {
          maxId = e.entityID > maxId ? e.entityID : maxId;
        });
        variableNames.forEach((e: T_VarabielName) => {
          maxId = e.ID > maxId ? e.ID : maxId;
        });

        newEntityID = maxId + 1;
      }

      newEntityID = new Date().getTime();

      setVariableNames((prev) => [
        ...prev,
        {
          ID: newEntityID,
          Var1Name: "Var 1",
          Var2Name: "Var 2",
        },
      ]);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      let newEntityID = 1;
      if (nonCausalityEntities.length === 0) {
        newEntityID = 1;
      } else {
        let maxId = 1;

        nonCausalityEntities.forEach((e: T_NC_Entity) => {
          maxId = e.entityID > maxId ? e.entityID : maxId;
        });
        nonCausalityVariableNames.forEach((e: T_VarabielName) => {
          maxId = e.ID > maxId ? e.ID : maxId;
        });

        newEntityID = maxId + 1;
      }

      setNonCausalityVariableNames((prev) => [
        ...prev,
        {
          ID: newEntityID,
          Var1Name: "Var 1",
          Var2Name: "Var 2",
        },
      ]);
    }
  };

  const removeEntity = (entityID: number) => {
    if (currentTab.toString() === "WALD_TEST") {
      const result = entities.filter(
        (entity: T_Entity) => entity.entityID !== entityID
      );
      setEntities(result);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      const result = nonCausalityEntities.filter(
        (entity: T_NC_Entity) => entity.entityID !== entityID
      );
      setNonCausalityEntities(result);
    }
  };

  const removeVariable = (entityID: number) => {
    if (currentTab.toString() === "WALD_TEST") {
      const result = variableNames.filter(
        (entity: T_VarabielName) => entity.ID !== entityID
      );
      setVariableNames(result);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      const result = nonCausalityVariableNames.filter(
        (entity: T_VarabielName) => entity.ID !== entityID
      );
      setNonCausalityVariableNames(result);
    }
  };

  const entitySwapUp = (entityID: number) => {
    if (currentTab.toString() === "WALD_TEST") {
      setEntities((prevEntities) => {
        const index = prevEntities.findIndex(
          (entity) => entity.entityID === entityID
        );
        if (index > 0) {
          const newStudents = [...prevEntities];
          [newStudents[index - 1], newStudents[index]] = [
            newStudents[index],
            newStudents[index - 1],
          ];
          return newStudents;
        }
        return prevEntities;
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausalityEntities((prevEntities) => {
        const index = prevEntities.findIndex(
          (entity) => entity.entityID === entityID
        );
        if (index > 0) {
          const newEntities = [...prevEntities];
          [newEntities[index - 1], newEntities[index]] = [
            newEntities[index],
            newEntities[index - 1],
          ];
          return newEntities;
        }
        return prevEntities;
      });
    }
  };

  const entitySwapDown = (entityID: number) => {
    if (currentTab.toString() === "WALD_TEST") {
      setEntities((prevEntities) => {
        const index = prevEntities.findIndex(
          (entity) => entity.entityID === entityID
        );
        if (index < prevEntities.length - 1) {
          const newStudents = [...prevEntities];
          [newStudents[index + 1], newStudents[index]] = [
            newStudents[index],
            newStudents[index + 1],
          ];
          return newStudents;
        }
        return prevEntities;
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausalityEntities((prevEntities) => {
        const index = prevEntities.findIndex(
          (entity) => entity.entityID === entityID
        );
        if (index < prevEntities.length - 1) {
          const newEntities = [...prevEntities];
          [newEntities[index + 1], newEntities[index]] = [
            newEntities[index],
            newEntities[index + 1],
          ];
          return newEntities;
        }
        return prevEntities;
      });
    }
  };

  const handleDownloadImage = async () => {
    if (divRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(divRef.current);
      download(dataUrl, "hcj-heat-map-imag.png");
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  // UI Components

  const EntityForm: React.FC<{ entity: T_Entity }> = ({ entity }) => {
    return (
      <div className="border-2 border-gray-600 p-5 rounded-lg flex gap-5 mx-4">
        {/* Action Buttons */}
        <div className="flex flex-row justify-around">
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<MinusOutlined className="text-white" />}
            onClick={() => removeEntity(entity.entityID)}
          />
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<UpSquareOutlined className="text-white" />}
            onClick={() => entitySwapUp(entity.entityID)}
          />
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<DownSquareOutlined className="text-white" />}
            onClick={() => entitySwapDown(entity.entityID)}
          />
        </div>
        <div>
          {/*  Entity Name & ID */}
          <div className="pb-4 flex items-center justify-start gap-3">
            <div className="text-white text-nowrap font-semibold">
              Entity Name
            </div>
            <Input
              name="entityName"
              id={`entityName_${entity.entityID}`}
              value={entity?.entityName}
              onChange={(e) => handleOnChangeInput(e, entity.entityID)}
              size="middle"
              className="w-[40%]"
            />
            <input
              className="border-2 border-black hidden"
              type="text"
              name="entityID"
              id=""
              onChange={(e) => handleOnChangeInput(e, entity.entityID)}
              value={entity?.entityID || ""}
            />
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-fit gap-3">
              {/* R2 */}
              {/* <div className="flex flex-row justify-between items-center gap-7">
                <div className="text-white text-nowrap font-semibold">R2</div>
                <div className="flex flex-row items-center gap-3">
                  <InputNumber
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "r2Var1")
                    }
                    value={entity.r2Var1}
                    changeOnWheel
                  />
                  <InputNumber
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "r2Var2")
                    }
                    value={entity.r2Var2}
                    changeOnWheel
                  />
                </div>
              </div> */}
              {/* Chi2 */}
              <div className="flex flex-row justify-between items-center gap-7">
                <div className="text-white text-nowrap font-semibold">Chi2</div>
                <div className="flex flex-row items-center gap-3">
                  <InputNumber
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "chi2Var1")
                    }
                    value={entity.chi2Var1}
                    changeOnWheel
                  />
                  <InputNumber
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "chi2Var2")
                    }
                    value={entity.chi2Var2}
                    changeOnWheel
                  />
                </div>
              </div>
              {/* Significance */}
              <div className="flex flex-row items-center gap-3">
                <div className="text-white text-nowrap font-semibold">
                  P Value
                </div>
                <div className="flex flex-row items-center gap-3">
                  <InputNumber
                    min={0.0}
                    max={1.0}
                    defaultValue={0.0}
                    step={0.0001}
                    onChange={(value) =>
                      onChangeNumberInput(
                        value,
                        entity.entityID,
                        "significanceVar1"
                      )
                    }
                    value={entity.significanceVar1}
                    changeOnWheel
                  />
                  <InputNumber
                    min={0.0}
                    max={1.0}
                    defaultValue={0.0}
                    step={0.0001}
                    onChange={(value) =>
                      onChangeNumberInput(
                        value,
                        entity.entityID,
                        "significanceVar2"
                      )
                    }
                    value={entity.significanceVar2}
                    changeOnWheel
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-fit gap-3">
              {/* Lag Range */}
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="text-white text-nowrap font-semibold pr-2">
                  Lag Range
                </div>
                <div className="flex flex-row items-center gap-1">
                  <InputNumber
                    className="w-16"
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "lagRangeMin")
                    }
                    value={entity.lagRangeMin}
                    changeOnWheel
                  />
                  <div className="text-white font-extrabold">-</div>
                  <InputNumber
                    className="w-16"
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "lagRangeMax")
                    }
                    value={entity.lagRangeMax}
                    changeOnWheel
                  />
                </div>
              </div>
              {/* Lag */}
              <div className="flex flex-row items-center justify-between gap-3">
                <div className="text-white text-nowrap font-semibold">Lag</div>
                <InputNumber
                  className="w-36"
                  onChange={(value) =>
                    onChangeNumberInput(value, entity.entityID, "lag")
                  }
                  value={entity.lag}
                  changeOnWheel
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NonCausalityEntityForm: React.FC<{ entity: T_NC_Entity }> = ({
    entity,
  }) => {
    return (
      <div className="border-2 border-gray-600 p-5 rounded-lg flex gap-5 mx-4">
        {/* Action Buttons */}
        <div className="flex flex-col justify-around">
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<MinusOutlined className="text-white" />}
            onClick={() => removeEntity(entity.entityID)}
          />
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<UpSquareOutlined className="text-white" />}
            onClick={() => entitySwapUp(entity.entityID)}
          />
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<DownSquareOutlined className="text-white" />}
            onClick={() => entitySwapDown(entity.entityID)}
          />
        </div>
        <div>
          {/*  Entity Name & ID */}
          <div className="pb-4 flex items-center justify-start gap-3">
            <div className="text-white text-nowrap font-semibold">
              Entity Name
            </div>
            <Input
              name="entityName"
              id={`entityName_${entity.entityID}`}
              value={entity?.entityName}
              onChange={(e) => handleOnChangeInput(e, entity.entityID)}
              size="middle"
              className="w-[40%]"
            />
            <input
              className="border-2 border-black hidden"
              type="text"
              name="entityID"
              id=""
              onChange={(e) => handleOnChangeInput(e, entity.entityID)}
              value={entity?.entityID || ""}
            />
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-fit gap-3">
              {/* Chi2 */}
              <div className="flex flex-row justify-between items-center gap-7">
                <div className="text-white text-nowrap font-semibold">
                  Z Bar
                </div>
                <div className="flex flex-row items-center gap-3">
                  <InputNumber
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "chi2Var1")
                    }
                    value={entity.chi2Var1}
                    changeOnWheel
                  />
                  <InputNumber
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "chi2Var2")
                    }
                    value={entity.chi2Var2}
                    changeOnWheel
                  />
                </div>
              </div>
              {/* Significance */}
              <div className="flex flex-row items-center gap-3">
                <div className="text-white text-nowrap font-semibold">
                  P Value
                </div>
                <div className="flex flex-row items-center gap-3">
                  <InputNumber
                    min={0.0}
                    max={1.0}
                    defaultValue={0.0}
                    step={0.0001}
                    onChange={(value) =>
                      onChangeNumberInput(
                        value,
                        entity.entityID,
                        "significanceVar1"
                      )
                    }
                    value={entity.significanceVar1}
                    changeOnWheel
                  />
                  <InputNumber
                    min={0.0}
                    max={1.0}
                    defaultValue={0.0}
                    step={0.0001}
                    onChange={(value) =>
                      onChangeNumberInput(
                        value,
                        entity.entityID,
                        "significanceVar2"
                      )
                    }
                    value={entity.significanceVar2}
                    changeOnWheel
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-fit gap-3">
              {/* Lag Range */}
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="flex flex-row justify-between items-center gap-3">
                  <div className="text-white text-nowrap font-semibold pr-2">
                    Lag Range V1
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <InputNumber
                      className="w-16"
                      onChange={(value) =>
                        onChangeNumberInput(
                          value,
                          entity.entityID,
                          "lagRange1Min"
                        )
                      }
                      value={entity.lagRange1Min}
                      changeOnWheel
                    />
                    <div className="text-white font-extrabold">-</div>
                    <InputNumber
                      className="w-16"
                      onChange={(value) =>
                        onChangeNumberInput(
                          value,
                          entity.entityID,
                          "lagRange1Max"
                        )
                      }
                      value={entity.lagRange1Max}
                      changeOnWheel
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-3">
                  <div className="text-white text-nowrap font-semibold pr-2">
                    Lag Range V2
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <InputNumber
                      className="w-16"
                      onChange={(value) =>
                        onChangeNumberInput(
                          value,
                          entity.entityID,
                          "lagRange2Min"
                        )
                      }
                      value={entity.lagRange2Min}
                      changeOnWheel
                    />
                    <div className="text-white font-extrabold">-</div>
                    <InputNumber
                      className="w-16"
                      onChange={(value) =>
                        onChangeNumberInput(
                          value,
                          entity.entityID,
                          "lagRange2Max"
                        )
                      }
                      value={entity.lagRange2Max}
                      changeOnWheel
                    />
                  </div>
                </div>
              </div>
              {/* Lag */}
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row items-center justify-between gap-3  w-[50%]">
                  <div className="text-white text-nowrap font-semibold">
                    Lag
                  </div>
                  <InputNumber
                    className="w-36"
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "lagVar1")
                    }
                    value={entity.lagVar1}
                    changeOnWheel
                  />
                </div>
                <div className="w-[50%]">
                  <InputNumber
                    className="w-36 float-end"
                    onChange={(value) =>
                      onChangeNumberInput(value, entity.entityID, "lagVar2")
                    }
                    value={entity.lagVar1}
                    changeOnWheel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VariableForm: React.FC<{ variable: T_VarabielName }> = ({
    variable,
  }) => {
    return (
      <div className="border-2 border-gray-600 p-5 rounded-lg flex gap-5 mx-4">
        {/* Action Buttons */}
        <div className="flex flex-row">
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<MinusOutlined className="text-white" />}
            onClick={() => removeVariable(variable.ID)}
          />
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<UpSquareOutlined className="text-white" />}
            onClick={() => {}}
          />
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={<DownSquareOutlined className="text-white" />}
            onClick={() => {}}
          />
        </div>
        <div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-fit gap-4">
              <div className="flex flex-row justify-between items-center gap-7">
                <div className="text-white text-nowrap font-semibold">
                  Variable Names
                </div>
                <div className="flex flex-row items-center gap-3">
                  <Input
                    name="Var1Name"
                    value={variable?.Var1Name}
                    onChange={(e) => handleOnChangeVariableName(variable, e)}
                    size="middle"
                    className="w-[40%]"
                  />
                  <Input
                    name="Var2Name"
                    value={variable?.Var2Name}
                    onChange={(e) => handleOnChangeVariableName(variable, e)}
                    size="middle"
                    className="w-[40%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        },
      }}
    >
      <div className="w-full flex flex-col items-center">
        {/* Heading Text */}
        <div className="font-extrabold text-2xl text-white">
          Lucius Jesper Chloe Heatmap (LJC Heatmap)
        </div>
        <div className="font-extrabold text-md pt-2 text-white">
          Granger Causality Visualization Heatmaps
        </div>
        {/* Canvas Background */}
        <div
          ref={divRef}
          className="p-3 bg-white rounded-lg w-full flex flex-col items-center justify-between gap-2 h-[500px] mt-5"
        >
          <div className="absolute right-14">
            <Button
              size="large"
              // type="text"
              shape="circle"
              icon={<DownloadOutlined className="text-gray-700" />}
              onClick={() => handleDownloadImage()}
            />
          </div>
          {/* Canvas */}
          <div className="flex justify-center items-center w-full h-full ">
            <div
              style={{
                backgroundColor: "blue",
                borderRadius: "8px",
                width: `${canvas.width + 10}px`,
                height: `${canvas.height + 10}px`,
              }}
              className="flex justify-center items-center"
            >
              <div
                style={{
                  ...canvasStyle,
                  width: `${canvas.width}px`,
                  height: `${canvas.height}px`,
                }}
                className="border-[1px] border-blue-500 "
              >
                {/* {entities2.map((e: T_Entity, key: number) => (
              <Entity
                key={key}
                ent={e}
                entity={entity}
                // circle={circle}
                setCurrentEntity={setCurrentEntity}
              />
            ))} */}
                {/* if (currentTab.toString() === "WALD_TEST") {
else if (currentTab.toString() === "NON_CAUSALITY") { */}
                {currentTab.toString() === "WALD_TEST" && (
                  <>
                    {waldTestFragmentList.map(
                      (f: WaldTestFragment, key: number) => (
                        <React.Fragment key={key}>
                          {isTEntity(f.fragment) && (
                            <Entity
                              ent={f.fragment as T_Entity}
                              entity={entity}
                              setCurrentEntity={setCurrentEntity}
                            />
                          )}
                          {isTVarabielName(f.fragment) && (
                            <div
                              className={`w-[50px] ${
                                waldTestFragmentListMaxVarId !== f.fragment.ID
                                  ? `border-r-[1px]`
                                  : ""
                              }  border-blue-500 flex flex-col items-center justify-evenly h-full text-white`}
                            >
                              <div className="h-[225px] flex items-center">
                                <div className="rotate-90 w-full text-nowrap">
                                  {f.fragment.Var1Name}
                                </div>
                              </div>
                              <div className="h-[225px] flex items-center">
                                <div className="rotate-90 w-full text-nowrap">
                                  {f.fragment.Var2Name}
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </>
                )}

                {currentTab.toString() === "NON_CAUSALITY" && (
                  <>
                    {nonCausalityFragmentList.map(
                      (f: NonCausalityFragment, key: number) => (
                        <React.Fragment key={key}>
                          {isT_NC_Entity(f.fragment) && (
                            <Entity
                              ent={f.fragment as T_NC_Entity}
                              entity={entity}
                              setCurrentEntity={setCurrentEntity}
                            />
                          )}
                          {isTVarabielName(f.fragment) && (
                            <div
                              className={`w-[50px] ${
                                nonCausalityFragmentMaxVarId !== f.fragment.ID
                                  ? `border-r-[1px]`
                                  : ""
                              }  border-blue-500 flex flex-col items-center justify-evenly h-full text-white`}
                            >
                              <div className="h-[225px] flex items-center">
                                <div className="rotate-90 w-full text-nowrap">
                                  {f.fragment.Var1Name}
                                </div>
                              </div>
                              <div className="h-[225px] flex items-center">
                                <div className="rotate-90 w-full text-nowrap">
                                  {f.fragment.Var2Name}
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </>
                )}

                {/* Width & Height */}
                {/* <div className="border-yellow-300 flex flex-col items-center justify-evenly h-full text-white">
              <div className="h-[225px] flex items-center">
                <div className="rotate-90 w-full text-nowrap">
                  {yAxixVariables.var1}
                </div>
              </div>
              <div className="h-[225px] flex items-center">
                <div className="rotate-90 w-full text-nowrap">
                  {yAxixVariables.var2}
                </div>
              </div>
            </div> */}
              </div>
            </div>
          </div>
          {/* Width Height Inputs */}
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
              },
              components: {
                InputNumber: {
                  colorBgContainer: "#FFFFFF",
                  colorBgTextActive: "#404040",
                  colorText: "#404040",
                  colorTextPlaceholder: "#707070",
                },
              },
            }}
          >
            <div className="flex gap-5 border-2 p-2 rounded-md self-start">
              <div className="flex flex-row items-center gap-3">
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
          </ConfigProvider>
        </div>
        {/* Forms Tab */}
        <Tabs
          onChange={onChangeTab}
          type="card"
          className="self-start bg-[#3A3A3A] rounded-lg pb-3 mt-5"
          items={[
            {
              key: "WALD_TEST",
              label: "Wald Test",
              children: (
                <div>
                  <div className=" w-full flex flex-col gap-2">
                    {/* Add Entity Form */}
                    {waldTestFragmentList.map(
                      (f: WaldTestFragment, key: number) => (
                        <React.Fragment key={key}>
                          {isTEntity(f.fragment) && (
                            <EntityForm entity={f.fragment} key={key} />
                          )}
                          {isTVarabielName(f.fragment) && (
                            <VariableForm variable={f.fragment} key={key} />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              ),
            },
            {
              key: "NON_CAUSALITY",
              label: "Non-Causality",
              children: (
                <div>
                  <div className=" w-full flex flex-col gap-2">
                    {/* Add Entity Form */}
                    {nonCausalityFragmentList.map(
                      (f: NonCausalityFragment, key: number) => (
                        <React.Fragment key={key}>
                          {isT_NC_Entity(f.fragment) && (
                            <NonCausalityEntityForm
                              entity={f.fragment}
                              key={key}
                            />
                          )}
                          {isTVarabielName(f.fragment) && (
                            <VariableForm variable={f.fragment} key={key} />
                          )}
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              ),
            },
          ]}
        />
        <div className="flex flex-row gap-5 mt-4 self-start">
          <Button type="primary" onClick={addAnotherEntity}>
            + Add Entity
          </Button>
          <Button type="primary" onClick={addVariable}>
            + Add Variable
          </Button>
          <Button type="primary" onClick={generateLJCHeadMap}>
            Generate LJC HeadMap
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default RcegPage;
