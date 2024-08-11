import React, { useEffect } from "react";
import { T_Entity, T_NC_Entity, TEntity } from "../pages/rceg/RcegPage";

const ArrowHeadDown: React.FC<{
  colorCode: string;
  arrowHeigh: number;
  headWidth: number;
}> = ({ colorCode, arrowHeigh, headWidth }) => {
  return (
    <svg
      width={`${headWidth + 28}px`}
      height={`${headWidth + 28}px`}
      // width="30px"
      // height="30px"
      viewBox="0 0 1024.00 1024.00"
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFFFFF"
      transform="matrix(1, 0, 0, -1, 0, 0)"
      style={{
        zIndex: 1,
        position: "absolute",
        marginTop: `${arrowHeigh - 8}px`,
      }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="2.048"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#FFFFFF"
          d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
        />
      </g>
    </svg>
  );
};

const ArrowHeadUp: React.FC<{
  colorCode: string;
  arrowHeigh: number;
  headWidth: number;
}> = ({ colorCode, arrowHeigh, headWidth }) => {
  return (
    <svg
      width={`${headWidth + 28}px`}
      height={`${headWidth + 28}px`}
      // width="30px"
      // height="30px"
      viewBox="0 0 1024.00 1024.00"
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFFFFF"
      transform="matrix(1, 0, 0, 1, 0, 0)"
      style={{
        zIndex: 1,
        position: "absolute",
        marginBottom: `${arrowHeigh - 8}px`,
      }}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="2.048"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#FFFFFF"
          d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
        />
      </g>
    </svg>
  );
};

const Equal: React.FC<{
  colorCode: string;
}> = ({ colorCode }) => {
  return (
    <svg
      fill={colorCode}
      width="40px"
      height="40px"
      viewBox="-6.5 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        zIndex: 1,
        position: "absolute",
      }}
    >
      <title>equal</title>
      <path d="M17.5 9.813v2.25h-15.813v-2.25h15.813zM17.5 16.656v2.281h-15.813v-2.281h15.813z"></path>
    </svg>
  );
};

type ArrowType = {
  type:
    | "BSA_CIM" /* Both side arrow cut in middle (P >= 0.1 OR P >= 0.1) */
    | "BSA" /*  Both side arrow (P < 0.1 OR P < 0.1
  )  */
    | "UA" /* Up arrow (P >= 0.1 OR P < 0.1 ) */
    | "DA" /* Down arrow (P < 0.1 OR P >= 0.1)  */;
};

const ARROW_TYPE = Object.freeze({
  BSA_CIM: "BSA_CIM",
  BSA: "BSA",
  UA: "UA",
  DA: "DA",
});

const Arrow: React.FC<{
  ent: T_Entity | T_NC_Entity;
  entity: TEntity;
  height: number;
  colorCode: string;
}> = ({ ent, entity, height, colorCode }) => {
  const [arrowStyle, setArrowStyle] = React.useState({
    /* width: "4px" Adjust the width as needed */
    // height: "200px" /* Adjust the height as needed */,
    backgroundColor: colorCode,
  });

  const [arrowType, setArrowType] = React.useState<string>(
    ARROW_TYPE.BSA_CIM.toString()
  );

  useEffect(() => {
    if (ent.significanceVar1 >= 0.1 && ent.significanceVar2 >= 0.1) {
      setArrowType(ARROW_TYPE.BSA_CIM.toString());
      console.log(ARROW_TYPE.BSA_CIM);
    } else if (ent.significanceVar1 < 0.1 && ent.significanceVar2 < 0.1) {
      setArrowType(ARROW_TYPE.BSA.toString());
      console.log(ARROW_TYPE.BSA);
    } else if (ent.significanceVar1 >= 0.1 && ent.significanceVar2 < 0.1) {
      setArrowType(ARROW_TYPE.UA.toString());
      console.log(ARROW_TYPE.UA);
    } else if (ent.significanceVar1 < 0.1 && ent.significanceVar2 >= 0.1) {
      setArrowType(ARROW_TYPE.DA.toString());
      console.log(ARROW_TYPE.DA.toString());
    }
  }, [ent]);

  const isArrowHeadUpShow = (): boolean => {
    return (
      arrowType === ARROW_TYPE.BSA_CIM.toString() ||
      arrowType === ARROW_TYPE.BSA.toString() ||
      arrowType === ARROW_TYPE.UA.toString()
    );
  };
  const isArrowHeadDown = (): boolean => {
    return (
      arrowType === ARROW_TYPE.BSA_CIM.toString() ||
      arrowType === ARROW_TYPE.BSA.toString() ||
      arrowType === ARROW_TYPE.DA.toString()
    );
  };

  return (
    <>
      {isArrowHeadUpShow() && (
        <ArrowHeadUp
          arrowHeigh={height}
          headWidth={entity.arrowThickness}
          colorCode={colorCode}
        />
      )}
      {arrowType === ARROW_TYPE.BSA_CIM.toString() && (
        <Equal colorCode={colorCode} />
      )}
      <div
        style={{
          ...arrowStyle,
          width: `${entity.arrowThickness}px`,
          position: "absolute",
          height: `${height + 4}px`,
        }}
      ></div>
      {isArrowHeadDown() && (
        <ArrowHeadDown
          arrowHeigh={height}
          headWidth={entity.arrowThickness}
          colorCode={colorCode}
        />
      )}
    </>
  );
};

export default Arrow;
