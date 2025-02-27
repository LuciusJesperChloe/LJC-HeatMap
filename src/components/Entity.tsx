import React from "react";
import Circle from "./Circle";
import Arrow from "./Arrow";
import { T_Entity, T_NC_Entity, T_EntitySetting } from "../pages/rceg/RcegPage";

const Entity: React.FC<{
  ent: T_Entity | T_NC_Entity;
  entitySetting: T_EntitySetting;
  setCurrentEntity: React.Dispatch<
    React.SetStateAction<T_Entity | T_NC_Entity | undefined>
  >;
}> = ({ ent, entitySetting, setCurrentEntity }) => {
  const [entityContainerStyle, setEntityContainerStyle] = React.useState({
    // width: "200px",
    // height: "400px",
    // border: "1px solid red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <div
      className="flex flex-col items-center"
      onClick={() => setCurrentEntity(ent)}
      style={{
        ...entityContainerStyle,
        position: "relative",
        width: `${entitySetting.width}px`,
        height: `${
          entitySetting.height + entitySetting.entityNameAreaHeight
        }px`,
        maxWidth: `${entitySetting.width}px`,
        maxHeight: `${
          entitySetting.height + entitySetting.entityNameAreaHeight
        }px`,
      }}
    >
      <div
        style={{
          ...entityContainerStyle,
          position: "relative",
          width: `${entitySetting.width}px`,
          height: `${entitySetting.height}px`,
          maxWidth: `${entitySetting.width}px`,
          maxHeight: `${entitySetting.height}px`,
          // border: "2px solid yellow",
        }}
      >
        {/* Center Horizontal Line */}
        {/* <div
          style={{
            width: "100%", 
            height: "1px",
            backgroundColor: "rgba(255, 10, 88, 0.6)",
            position: "absolute",
          }}
        ></div> */}
        {/* Circle Top */}
        <Circle
          circleSize={ent.chi2Var1CircleSize}
          isTop={true}
          verticalMove={ent.r2Var1CirclePosition}
          entitySetting={entitySetting}
          colors={ent.chi2Var1CircleColors}
          isVisible={ent.r2Var1CircleVisibility}
        />
        {/* Circle Bottom */}
        <Circle
          circleSize={ent.chi2Var2CircleSize}
          isTop={false}
          verticalMove={ent.r2Var2CirclePosition}
          entitySetting={entitySetting}
          colors={ent.chi2Var2CircleColors}
          isVisible={ent.r2Var2CircleVisibility}
        />
        {/* Arrow */}
        <Arrow
          ent={ent}
          height={ent.arrowHeight}
          entitySetting={entitySetting}
          colorCode="#FFFFFF"
        />
        <div style={{ position: "absolute" }}></div>
      </div>
      <div
        className={`/*h-[50px]*/  w-full flex justify-center items-center`}
        style={{
          height: `${entitySetting.entityNameAreaHeight}px`,
          minHeight: `${entitySetting.entityNameAreaHeight}px`,
          maxHeight: `${entitySetting.entityNameAreaHeight}px`,
        }}
      >
        <div
          className="text-white"
          style={{
            fontSize: `${entitySetting.entityNamesFontSize}px`,
          }}
        >
          {ent.entityName}
        </div>
      </div>
    </div>
  );
};

export default Entity;
