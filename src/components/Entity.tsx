import React from "react";
import Circle from "./Circle";
import Arrow from "./Arrow";
import { T_Entity, TEntity } from "../pages/rceg/RcegPage";

const Entity: React.FC<{
  ent: T_Entity;
  entity: TEntity;
  setCurrentEntity: React.Dispatch<React.SetStateAction<T_Entity | undefined>>;
}> = ({ ent, entity, setCurrentEntity }) => {
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
    >
      <div
        style={{
          ...entityContainerStyle,
          position: "relative",
          width: `${entity.width}px`,
          height: `${entity.height}px`,
        }}
      >
        {/* Center Horizontal Line */}
        <div
          style={{
            width: "100%" /* Adjust the width as needed */,
            height: "1px" /* Adjust the height as needed */,
            backgroundColor: "rgba(255, 10, 88, 0.6)",
            position: "absolute",
          }}
        ></div>
        {/* Circle Top */}
        <Circle
          circleSize={ent.chi2Var1CircleSize}
          isTop={true}
          verticalMove={ent.r2Var1CirclePosition}
          entity={entity}
          colors={ent.chi2Var1CircleColors}
        />
        {/* Circle Bottom */}
        <Circle
          circleSize={ent.chi2Var2CircleSize}
          isTop={false}
          verticalMove={ent.r2Var2CirclePosition}
          entity={entity}
          colors={ent.chi2Var2CircleColors}
        />
        {/* Arrow */}
        <Arrow ent={ent} height={ent.arrowHeight} colorCode="#FFFFFF" />
        <div style={{ position: "absolute" }}></div>
      </div>
      <div className="h-[50px] w-full flex justify-center items-center bg-red-500">
        <div className="text-white">{ent.entityName}</div>
      </div>
    </div>
  );
};

export default Entity;
