import React, { useEffect, useState } from "react";
import Entity from "../../components/Entity";
import { Button, ConfigProvider, Input, InputNumber, Tabs } from "antd";
import {
  MinusOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
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

// export type TCircle = {
//   maxDiameter: number;
//   minDiameter: number;
// };

const RcegPage = () => {
  const [currentEntity, setCurrentEntity] = useState<T_Entity | undefined>(
    undefined
  );

  const [yAxixVariables, setYAxixVariables] = useState<{
    var1: string;
    var2: string;
  }>({
    var1: "Variable 1",
    var2: "Variable 2",
  });

  const [chi2MinMax, setChi2MinMax] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  const [entities, setEntities] = useState<T_Entity[]>([
    {
      entityID: 1,
      entityName: "Entity 1",
      r2Var1: 4,
      r2Var2: 6,
      chi2Var1: 4,
      chi2Var2: 6,
      lagRangeMin: 1,
      lagRangeMax: 5,
      lag: 2,
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
    {
      entityID: 2,
      entityName: "Entity 2",
      r2Var1: 3,
      r2Var2: 8,
      chi2Var1: 4,
      chi2Var2: 6,
      lagRangeMin: 1,
      lagRangeMax: 5,
      lag: 2,
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
    {
      entityID: 3,
      entityName: "Entity 3",
      r2Var1: 4,
      r2Var2: 6,
      chi2Var1: 5,
      chi2Var2: 7,
      lagRangeMin: 1,
      lagRangeMax: 5,
      lag: 2,
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
  const [entities2, setEntities2] = useState<T_Entity[]>([
    {
      entityID: 1,
      entityName: "Entity 1",
      r2Var1: 4,
      r2Var2: 6,
      chi2Var1: 4,
      chi2Var2: 6,
      lagRangeMin: 1,
      lagRangeMax: 5,
      lag: 2,
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
    {
      entityID: 2,
      entityName: "Entity 2",
      r2Var1: 3,
      r2Var2: 8,
      chi2Var1: 4,
      chi2Var2: 6,
      lagRangeMin: 1,
      lagRangeMax: 5,
      lag: 2,
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
    {
      entityID: 3,
      entityName: "Entity 3",
      r2Var1: 4,
      r2Var2: 6,
      chi2Var1: 5,
      chi2Var2: 7,
      lagRangeMin: 1,
      lagRangeMax: 5,
      lag: 2,
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

  const MAX_CANVAS_HEIGHT = 340;
  const [canvasStyle, setCanvasStyle] = useState({
    display: "flex",
    // padding: "10px",
    backgroundColor: "blue",
    borderRadius: "8px",
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
      max: 96.875,
      min: 41.17647059,
    },
    yellow: {
      max: 100.0,
      min: 10.0,
    },
  });

  useEffect(() => {
    console.log("currentEntity: ", currentEntity);
  }, [currentEntity]);

  // useEffect(() => {
  //   calAndAssignEntityAndCircleSizes();
  // }, [canvas]);

  // useEffect(() => {
  //   calAndAssignChi2MinMax();
  //   console.log(entities);
  // }, [entities]);

  React.useEffect(() => {
    // console.log("entities: ", entities);
    calAndAssignChi2MinMax();
    calAndAssignEntityAndCircleSizes();
    generateCircles();
    // generateLJCHeadMap();
  }, [entities, canvas]);

  const handleOnChangeVariableNames = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYAxixVariables((prev: { var1: string; var2: string }) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calAndAssignEntityAndCircleSizes = () => {
    const entityWidth = (canvas.width - 50) / entities.length;
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
    const minArrowHeight = entityHeight * 0.3;

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
    entities.forEach((e: T_Entity) => {
      chiList.push(e.chi2Var1);
      chiList.push(e.chi2Var2);
    });
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

      const backgroundImage = `radial-gradient(red ${redpx}px, orange ${orapx}px, yellow ${yelpx}px, blue)`;
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

      const backgroundImage = `radial-gradient(red ${redpx}px, orange ${orapx}px, yellow ${yelpx}px, blue)`;
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
        backgroundImage: `radial-gradient(white 0px,  blue)`,
        boxShadow: "",
      };
    }
  };

  const getRMinAndRMax = (): { rMin: number; rMax: number } => {
    const rValues: number[] = [];
    entities.forEach((e: T_Entity) => {
      rValues.push(e.r2Var1);
      rValues.push(e.r2Var2);
    });
    console.log("rValues: ", rValues);
    return {
      rMin: Math.min(...rValues),
      rMax: Math.max(...rValues),
    };
  };

  /*
  const calCirclePosition = (
    r2Val: number,
    rMinMax: { rMin: number; rMax: number },
    maxPosition: number
  ): number => {
    return (
      ((rMinMax.rMax - r2Val) / (rMinMax.rMax - rMinMax.rMin)) * maxPosition
    );
  };
 */

  const calCirclePosition = (entityHeight: number): number => {
    return entityHeight / 2;
  };

  const generateCircles = () => {
    const result = entities.map((e: T_Entity) => {
      const chi2Var1CircleSize = calculateCircleSize(e.chi2Var1);
      const chi2Var2CircleSize = calculateCircleSize(e.chi2Var2);

      const maxPosition = (canvas.height - 50) / 2;
      const { rMin, rMax } = getRMinAndRMax();

      console.log("getRMinAndRMax: ", rMin, " ", rMax);

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
    // setEntities(result);
    setEntities2(result);

    console.log("Updated Entities: ", result);
  };

  const generateLJCHeadMap = () => {
    calAndAssignEntityAndCircleSizes();
    calAndAssignChi2MinMax();
    generateCircles();
  };

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

  const handlePressUpdateEntity = () => {
    const result = entities.map((e: T_Entity) => {
      return e.entityID !== currentEntity?.entityID ? e : currentEntity;
    });
    setEntities(result);
  };

  const handlePressClearForm = () => {
    setCurrentEntity(undefined);
  };

  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const addAnotherEntity = () => {
    setEntities((prev) => [
      ...prev,
      {
        entityID: new Date().getTime(),
        entityName: `Entity ${prev.length + 1}`,
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
  };

  const removeEntity = (entityID: number) => {
    const result = entities.filter(
      (entity: T_Entity) => entity.entityID !== entityID
    );
    setEntities(result);
  };

  const entitySwapUp = (entityID: number) => {
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
  };

  const entitySwapDown = (entityID: number) => {
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
  };

  const EntityForm: React.FC<{ entity: T_Entity }> = ({ entity }) => {
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
          <div className="pb-7 flex items-center justify-start gap-3">
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
            <div className="flex flex-col w-fit gap-4">
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
                  Significance
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
            <div className="flex flex-col w-fit gap-4">
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

  const tabList = [
    {
      key: "1",
      label: "Wald Test",
      children: (
        <div>
          <div className=" w-full flex flex-col gap-5">
            {/* Add Entity Form */}
            {entities.map((e: T_Entity, index: number) => (
              <EntityForm entity={e} key={index} />
            ))}
            {/* Buttons */}
            <div className="flex flex-row gap-5">
              <Button type="primary" onClick={addAnotherEntity}>
                + Add Another Entity
              </Button>
              <Button type="primary" onClick={generateLJCHeadMap}>
                Generate LJC HeadMap
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Non-Causality",
      children: <div>Wald Test content</div>,
    },
  ];

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
          Generate Granger Causality Visualization Heatmaps
        </div>
        <div className="font-extrabold text-md pt-2 text-white">
          Insighful visualization
        </div>
        {/* Canvas Background */}
        <div className="p-3 bg-white rounded-lg w-full flex flex-col items-center justify-between gap-2 h-[500px] mt-5">
          {/* Canvas */}
          <div className="flex justify-center items-center w-full h-full">
            <div
              style={{
                ...canvasStyle,
                width: `${canvas.width}px`,
                height: `${canvas.height}px`,
              }}
            >
              {entities2.map((e: T_Entity, key: number) => (
                <Entity
                  key={key}
                  ent={e}
                  entity={entity}
                  // circle={circle}
                  setCurrentEntity={setCurrentEntity}
                />
              ))}
              {/* Width & Height */}
              <div className="border-yellow-300 flex flex-col items-center justify-evenly h-full text-white">
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
        <div className="flex flex-row items-center gap-5 border-2 border-gray-600 p-3 my-4 self-start rounded-md text-white">
          <div className="w-full font-semibold">Variable Names</div>
          <Input
            name="var1"
            placeholder="Var 1"
            value={yAxixVariables.var1}
            onChange={(e) => handleOnChangeVariableNames(e)}
            size="middle"
          />
          <Input
            name="var2"
            placeholder="Var 2"
            value={yAxixVariables.var2}
            onChange={(e) => handleOnChangeVariableNames(e)}
            size="middle"
          />
        </div>
        <Tabs
          onChange={onChangeTab}
          type="card"
          className="self-start bg-[#3A3A3A] rounded-lg"
          // items={tabList}
          items={[
            {
              key: "1",
              label: "Wald Test",
              children: (
                <div>
                  <div className=" w-full flex flex-col gap-2">
                    {/* Add Entity Form */}
                    {entities.map((e: T_Entity, index: number) => (
                      <EntityForm entity={e} key={index} />
                    ))}
                    {/* Buttons */}
                    <div className="flex flex-row gap-5 m-4">
                      <Button type="primary" onClick={addAnotherEntity}>
                        + Add Another Entity
                      </Button>
                      <Button type="primary" onClick={generateLJCHeadMap}>
                        Generate LJC HeadMap
                      </Button>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "2",
              label: "Non-Causality",
              children: <div>Wald Test content</div>,
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
};

export default RcegPage;
