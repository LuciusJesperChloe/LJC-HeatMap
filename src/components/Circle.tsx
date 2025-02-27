import React, { useEffect } from "react";
import { T_Entity, TColors, T_EntitySetting } from "../pages/rceg/RcegPage";

const Circle: React.FC<{
  isTop: boolean;
  verticalMove: number;
  circleSize: number;
  entitySetting: T_EntitySetting;
  colors: TColors;
  isVisible: boolean;
}> = ({
  isTop,
  circleSize,
  verticalMove,
  entitySetting,
  colors,
  isVisible,
}) => {
  // console.log("Circle Component:Colors: ", colors);
  /*
 
  // P = 1, white
    p  = 0 : red
    p = 0.08: yellow

     // P value: 0.026
  {
    "red": 0,
    "orange": 71.12634527671679,
    "yellow": 94.11764706
}
  */
  const [circleStyle, setCircleStyle] = React.useState<React.CSSProperties>({
    position: "absolute",
    borderRadius: "50%",
    backgroundImage: colors.backgroundImage,
    boxShadow: colors.boxShadow,
    /* background-color: yellow; */
    // background: `radial-gradient(
    //   circle at 50% 50%,
    //   red ${colors.red.toString()}%,
    //   orange ${colors.orange.toString()}%,
    //   yellow ${colors.yellow.toString()}%,
    //   white 100%
    //         )`,
    // background: `radial-gradient(
    //           circle at 50% 50%,
    //           red 0%,
    //           orange 0%,
    //           yellow 72.9%,
    //           white 100%
    //         )`,
  });

  useEffect(() => {
    console.log("Circle Component:Colors changed ");
    setCircleStyle((prev: React.CSSProperties) => ({
      ...prev,
      backgroundImage: colors.backgroundImage,
      boxShadow: colors.boxShadow,
    }));
  }, [colors]);

  // 0, 12.07, 27.59, 29.31, 31.04
  return (
    <div
      style={{
        ...circleStyle,
        position: "absolute",
        marginTop: !isTop ? `${verticalMove}px` : 0,
        marginBottom: !isTop ? 0 : `${verticalMove}px`,
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        display: `${isVisible ? "block" : "none"}`,
      }}
    ></div>
  );
};

export default Circle;
