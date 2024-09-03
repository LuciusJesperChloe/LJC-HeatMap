import React from "react";
import { T_VarabielName, T_EntitySetting } from "../pages/rceg/RcegPage";

const Variable: React.FC<{
  variableEntity: T_VarabielName;
  ragmentListMaxVarId: number;
  entitySettings: T_EntitySetting;
}> = ({ variableEntity, ragmentListMaxVarId, entitySettings }) => {
  return (
    <div
      className={`/*w-[50px]*/ ${
        ragmentListMaxVarId !== variableEntity.ID ? `border-r-[1px]` : ""
      }  border-blue-500 flex flex-col items-center justify-evenly h-full text-white`}
      style={{
        width: entitySettings.variableNameAreaWidth,
        fontSize: entitySettings.varibleNamesFontSize,
      }}
    >
      <div className="h-[225px] flex items-center">
        <div className="rotate-90 w-full text-nowrap">
          {variableEntity.Var1Name}
        </div>
      </div>
      <div className="h-[225px] flex items-center">
        <div className="rotate-90 w-full text-nowrap">
          {variableEntity.Var2Name}
        </div>
      </div>
    </div>
  );
};

export default Variable;
