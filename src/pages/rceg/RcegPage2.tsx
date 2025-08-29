import React, { useEffect, useState, useRef } from "react";
import Entity from "../../components/Entity";
import {
  Button,
  ConfigProvider,
  Input,
  InputNumber,
  Modal,
  Spin,
  Tabs,
  Tooltip,
} from "antd";
import { toPng } from "html-to-image";
import download from "downloadjs";
import {
  MinusOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  DownloadOutlined,
  LoadingOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  AppstoreAddOutlined,
  ApiOutlined,
  DisconnectOutlined,
  AppstoreOutlined,
  DeleteOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import {
  TColors,
  T_Entity,
  T_NC_Entity,
  T_EntitySetting,
  T_VarabielName,
} from "./RcegPage";

import Logo from "../../images/Logo.png";
import Variable from "../../components/Variable";

type TCanvas = {
  width: number;
  height: number;
  maxHeight: number;
  color: string;
  // maxCircleSize: number;
  // minCircleSize: number;
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

const EntityForm: React.FC<{
  entity: T_Entity;
  currentPosition: number;
  formListLength: number;
  handleOnChangeInput: (e: any, id: number) => void;
  handleOnChangeNumberInput: (
    value: number | null,
    entityID: number,
    name: string
  ) => void;
  changeHideCircle: (
    entityID: number,
    name: string,
    is_visible: boolean
  ) => void;
  changeHideEntity: (entityID: number, is_visible: boolean) => void;
  changeEntityCalculatable: (entityID: number, is_visible: boolean) => void;
  removeEntity: (entityID: number) => void;
  duplicateEntity: (entityID: number) => void;
  changeFragmentPosition: (id: number, direction: "UP" | "DOWN") => void;
}> = ({
  entity,
  currentPosition,
  formListLength,
  handleOnChangeInput,
  handleOnChangeNumberInput,
  removeEntity,
  duplicateEntity,
  changeFragmentPosition,
  changeHideCircle,
  changeHideEntity,
  changeEntityCalculatable,
}) => {
  return (
    <div
      style={{ background: "#1E1E1E" }}
      className="border-2 border-gray-600 p-5 rounded-lg flex justify-between items-center mx-4"
    >
      {/* Left Action Buttons*/}
      <div className="flex flex-col justify-between items-center gap-2 mr-10">
        <Tooltip title="Move up">
          <Button
            icon={
              <CaretUpOutlined
                className={
                  currentPosition === 0 ? "text-gray-500" : "text-white"
                }
              />
            }
            onClick={() =>
              currentPosition === 0
                ? {}
                : changeFragmentPosition(entity.entityID, "UP")
            }
            // disabled={currentPosition === 0}
          />
        </Tooltip>
        <Tooltip title="Move down">
          <Button
            icon={
              <CaretDownOutlined
                className={
                  currentPosition === formListLength - 1
                    ? "text-gray-500"
                    : "text-white"
                }
              />
            }
            onClick={() =>
              currentPosition === formListLength - 1
                ? {}
                : changeFragmentPosition(entity.entityID, "DOWN")
            }
            // disabled={currentPosition === formListLength - 1}
          />
        </Tooltip>
      </div>
      <div className="w-full gap-2">
        <div className="flex flex-row gap-7">
          <div className="flex flex-col w-fit gap-3 justify-center">
            {/* Entity Name */}
            <div className="w-full flex gap-7 flex-row justify-center items-center">
              <div className="text-white text-nowrap font-semibold w-[80px]">
                Entity Name
              </div>
              <Input
                name="entityName"
                id={`entityName_${entity.entityID}`}
                value={entity?.entityName}
                onChange={(e) => handleOnChangeInput(e, entity.entityID)}
                size="middle"
                className="w-[212px]"
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
            {/* Chi2 */}
            <div className="flex flex-row items-center gap-7">
              <div className="text-white text-nowrap font-semibold w-[80px]">
                Causality
              </div>
              <div className="flex flex-row items-center gap-3">
                <InputNumber
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "chi2Var1"
                    )
                  }
                  value={entity.chi2Var1}
                  changeOnWheel
                  className="w-[100px]"
                />
                <InputNumber
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "chi2Var2"
                    )
                  }
                  value={entity.chi2Var2}
                  changeOnWheel
                  className="w-[100px]"
                />
              </div>
            </div>
            {/* Significance */}
            <div className="flex flex-row items-center gap-7">
              <div className="text-white text-nowrap font-semibold w-[80px]">
                P-value
              </div>
              <div className="flex flex-row items-center gap-3">
                <InputNumber
                  min={0.0}
                  max={1.0}
                  // defaultValue={0.0}
                  step={0.0001}
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "significanceVar1"
                    )
                  }
                  value={entity.significanceVar1}
                  changeOnWheel
                  className="w-[100px]"
                />
                <InputNumber
                  min={0.0}
                  max={1.0}
                  // defaultValue={0.0}
                  step={0.0001}
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "significanceVar2"
                    )
                  }
                  value={entity.significanceVar2}
                  changeOnWheel
                  className="w-[100px]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-fit gap-3 border-2 rounded-lg border-[#3A3A3A] p-2">
            <div className="text-white text-nowrap font-semibold pr-2 self-center flex flex-row justify-center items-center">
              <div>Variable 1</div>{" "}
              <div className="pl-1 pr-1 text-[10px]">{"<->"}</div>
              <div>Variable 2</div>
            </div>
            {/* Lag Range */}
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="text-white text-nowrap font-semibold pr-2">
                Lag range
              </div>
              <div className="flex flex-row items-center gap-1">
                <InputNumber
                  className="w-16"
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "lagRangeMin"
                    )
                  }
                  value={entity.lagRangeMin}
                  changeOnWheel
                  min={0}
                />
                <div className="text-white font-extrabold">-</div>
                <InputNumber
                  className="w-16"
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "lagRangeMax"
                    )
                  }
                  value={entity.lagRangeMax}
                  changeOnWheel
                  min={0}
                />
              </div>
            </div>
            {/* Lag */}
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="text-white text-nowrap font-semibold">
                Optimal lag
              </div>
              <InputNumber
                className="w-36"
                onChange={(value) =>
                  handleOnChangeNumberInput(value, entity.entityID, "lag")
                }
                value={entity.lag}
                changeOnWheel
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right Action Buttons*/}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Tooltip title="Unidirectional (V1 to V2)">
            <Button
              icon={
                entity.r2Var1CircleVisibility ? (
                  <>
                    <svg
                      width="25px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title />
                      <g id="Complete">
                        <g id="arrow-down">
                          <g>
                            <polyline
                              data-name="Right"
                              fill="none"
                              id="Right-2"
                              points="7 16.4 12 21.5 17 16.4"
                              stroke="#ffffff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                            <line
                              fill="none"
                              stroke="#ffffff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              x1="12"
                              x2="12"
                              y1="2.5"
                              y2="19.2"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      width="25px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title />
                      <g id="Complete">
                        <g id="arrow-down">
                          <g>
                            <polyline
                              data-name="Right"
                              fill="none"
                              id="Right-2"
                              points="7 16.4 12 21.5 17 16.4"
                              stroke="#CACACA"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                            <line
                              fill="none"
                              stroke="#CACACA"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              x1="12"
                              x2="12"
                              y1="2.5"
                              y2="19.2"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </>
                )
              }
              onClick={() => {
                changeHideCircle(
                  entity.entityID,
                  "r2Var2CircleVisibility",
                  !entity.r2Var2CircleVisibility
                );
              }}
            />
          </Tooltip>
          <Tooltip title="Unidirectional (V2 to V1)">
            <Button
              icon={
                entity.r2Var2CircleVisibility ? (
                  <>
                    <svg
                      width="25px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title />
                      <g id="Complete">
                        <g id="arrow-up">
                          <g>
                            <polyline
                              data-name="Right"
                              fill="none"
                              id="Right-2"
                              points="7 7.5 12 2.5 17 7.5"
                              stroke="#ffffff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                            <line
                              fill="none"
                              stroke="#ffffff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              x1="12"
                              x2="12"
                              y1="21.3"
                              y2="4.8"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      width="25px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title />
                      <g id="Complete">
                        <g id="arrow-up">
                          <g>
                            <polyline
                              data-name="Right"
                              fill="none"
                              id="Right-2"
                              points="7 7.5 12 2.5 17 7.5"
                              stroke="#CACACA"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                            <line
                              fill="none"
                              stroke="#CACACA"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              x1="12"
                              x2="12"
                              y1="21.3"
                              y2="4.8"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </>
                )
              }
              onClick={() => {
                changeHideCircle(
                  entity.entityID,
                  "r2Var1CircleVisibility",
                  !entity.r2Var1CircleVisibility
                );
              }}
            />
          </Tooltip>
          <Tooltip title="Remove Entity">
            <Button
              icon={
                entity.isCalculatable ? <ApiOutlined /> : <DisconnectOutlined />
              }
              onClick={() => {
                changeEntityCalculatable(
                  entity.entityID,
                  !entity.isCalculatable
                );
              }}
            />
          </Tooltip>
        </div>
        <div className="flex flex-row gap-2">
          <Tooltip title="Delete">
            <Button
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  />
                </svg>
              }
              onClick={() => removeEntity(entity.entityID)}
            />
          </Tooltip>
          <Tooltip title="Hide Entity">
            <Button
              icon={
                entity.isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />
              }
              onClick={() => {
                changeHideEntity(entity.entityID, !entity.isVisible);
              }}
            />
          </Tooltip>
          <Tooltip title="Duplicate Entity">
            <Button
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    stroke="#ffffff"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 16H5a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v1M9 20h10a1 1 0 001-1V9a1 1 0 00-1-1H9a1 1 0 00-1 1v10a1 1 0 001 1z"
                  />
                </svg>
              }
              onClick={() => duplicateEntity(entity.entityID)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const NonCausalityEntityForm: React.FC<{
  entity: T_NC_Entity;
  currentPosition: number;
  formListLength: number;
  handleOnChangeInput: (e: any, id: number) => void;
  handleOnChangeNumberInput: (
    value: number | null,
    entityID: number,
    name: string
  ) => void;
  removeEntity: (entityID: number) => void;
  duplicateEntity: (entityID: number) => void;
  changeFragmentPosition: (
    id: number,

    direction: "UP" | "DOWN"
  ) => void;
  changeHideCircle: (
    entityID: number,
    name: string,
    is_visible: boolean
  ) => void;
  changeHideEntity: (entityID: number, is_visible: boolean) => void;
  changeEntityCalculatable: (entityID: number, is_visible: boolean) => void;
}> = ({
  entity,
  currentPosition,
  formListLength,
  handleOnChangeInput,
  handleOnChangeNumberInput,
  removeEntity,
  duplicateEntity,
  changeFragmentPosition,
  changeHideCircle,
  changeHideEntity,
  changeEntityCalculatable,
}) => {
  return (
    <div
      style={{ background: "#1E1E1E" }}
      className="border-2 border-gray-600 p-5 rounded-lg flex flex-row justify-between gap-1 items-center mx-4"
    >
      {/* Left Action Buttons*/}
      <div className="flex flex-col justify-around items-center gap-2 scale-90 border-2">
        <Tooltip title="Move up">
          <Button
            icon={
              <CaretUpOutlined
                className={
                  currentPosition === 0 ? "text-gray-500" : "text-white"
                }
              />
            }
            onClick={() =>
              currentPosition === 0
                ? {}
                : changeFragmentPosition(entity.entityID, "UP")
            }
            // disabled={currentPosition === 0}
          />
        </Tooltip>
        <Tooltip title="Move down">
          <Button
            icon={
              <CaretDownOutlined
                className={
                  currentPosition === formListLength - 1
                    ? "text-gray-500"
                    : "text-white"
                }
              />
            }
            onClick={() =>
              currentPosition === formListLength - 1
                ? {}
                : changeFragmentPosition(entity.entityID, "DOWN")
            }
            // disabled={currentPosition === formListLength - 1}
          />
        </Tooltip>
      </div>
      <div className="w-full gap-2 scale-90 border-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-fit gap-3 justify-center">
            {/*  Entity Name & ID */}
            <div className="w-full flex flex-row justify-between items-center">
              <div className="flex items-center justify-start gap-2">
                <div className="text-white text-nowrap font-semibold w-[85px]">
                  Entity Name
                </div>
                <Input
                  name="entityName"
                  id={`entityName_${entity.entityID}`}
                  value={entity?.entityName}
                  onChange={(e) => handleOnChangeInput(e, entity.entityID)}
                  size="middle"
                  className="w-[212px]"
                />
                <input
                  className="border-2 border-black hidden"
                  type="text"
                  name="entityID"
                  id=""
                  value={entity?.entityID || ""}
                />
              </div>
            </div>

            {/* Causality */}
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="text-white text-nowrap font-semibold w-[85px]">
                Causality
              </div>
              <div className="flex flex-row items-center gap-3">
                <InputNumber
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "chi2Var1"
                    )
                  }
                  value={entity.chi2Var1}
                  changeOnWheel
                  controls={true}
                  className="w-[100px]"
                />
                <InputNumber
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "chi2Var2"
                    )
                  }
                  value={entity.chi2Var2}
                  changeOnWheel
                  controls={true}
                  className="w-[100px]"
                />
              </div>
            </div>
            {/* P-value */}
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="text-white text-nowrap font-semibold w-[85px]">
                P-value
              </div>
              <div className="flex flex-row items-center gap-3">
                <InputNumber
                  min={0.0}
                  max={1.0}
                  defaultValue={0.0}
                  step={0.0001}
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "significanceVar1"
                    )
                  }
                  value={entity.significanceVar1}
                  changeOnWheel
                  controls={true}
                  className="w-[100px]"
                />
                <InputNumber
                  min={0.0}
                  max={1.0}
                  defaultValue={0.0}
                  step={0.0001}
                  onChange={(value) =>
                    handleOnChangeNumberInput(
                      value,
                      entity.entityID,
                      "significanceVar2"
                    )
                  }
                  value={entity.significanceVar2}
                  changeOnWheel
                  controls={true}
                  className="w-[100px]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-fit gap-3 border-2 rounded-lg border-[#3A3A3A] p-2">
            <div className="text-white text-nowrap font-semibold pr-2 self-center flex flex-row justify-center items-center">
              <div>Variable 1</div>{" "}
              <div className="pl-1 pr-1 text-[10px]">{"->"}</div>
              <div>Variable 2</div>
            </div>
            {/* Lag Range */}
            <div className="flex flex-row justify-start items-center gap-5">
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="text-white text-nowrap font-semibold w-[75px]">
                  Lag range
                </div>
                <div className="flex flex-row items-center gap-1">
                  <InputNumber
                    onChange={(value) =>
                      handleOnChangeNumberInput(
                        value,
                        entity.entityID,
                        "lagRange1Min"
                      )
                    }
                    value={entity.lagRange1Min}
                    changeOnWheel
                    controls={true}
                    className="w-16"
                  />
                  <div className="text-white font-extrabold">-</div>
                  <InputNumber
                    onChange={(value) =>
                      handleOnChangeNumberInput(
                        value,
                        entity.entityID,
                        "lagRange1Max"
                      )
                    }
                    value={entity.lagRange1Max}
                    changeOnWheel
                    controls={true}
                    className="w-16"
                  />
                </div>
              </div>
            </div>
            {/* Lag */}
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="text-white text-nowrap font-semibold w-[75px]">
                Optimal lag
              </div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeNumberInput(value, entity.entityID, "lagVar1")
                }
                value={entity.lagVar1}
                changeOnWheel
                controls={true}
                className="w-36"
              />
            </div>
          </div>
          <div className="flex flex-col w-fit gap-3 border-2 rounded-lg border-[#3A3A3A] p-2">
            <div className="text-white text-nowrap font-semibold pr-2 self-center flex flex-row justify-center items-center">
              <div>Variable 1</div>{" "}
              <div className="pl-1 pr-1 text-[10px]">{"<-"}</div>
              <div>Variable 2</div>
            </div>
            {/* Lag Range */}
            <div className="flex flex-row justify-start items-center gap-5">
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="text-white text-nowrap font-semibold w-[75px]">
                  Lag range
                </div>
                <div className="flex flex-row items-center gap-1">
                  <InputNumber
                    onChange={(value) =>
                      handleOnChangeNumberInput(
                        value,
                        entity.entityID,
                        "lagRange2Min"
                      )
                    }
                    value={entity.lagRange2Min}
                    changeOnWheel
                    controls={true}
                    className="w-16"
                  />
                  <div className="text-white font-extrabold">-</div>
                  <InputNumber
                    onChange={(value) =>
                      handleOnChangeNumberInput(
                        value,
                        entity.entityID,
                        "lagRange2Max"
                      )
                    }
                    value={entity.lagRange2Max}
                    changeOnWheel
                    controls={true}
                    className="w-16"
                  />
                </div>
              </div>
            </div>
            {/* Lag */}
            <div className="flex flex-row items-center justify-between gap-3">
              <div className="text-white text-nowrap font-semibold w-[75px]">
                Optimal lag
              </div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeNumberInput(value, entity.entityID, "lagVar2")
                }
                value={entity.lagVar2}
                changeOnWheel
                controls={true}
                className="w-36 float-end"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right Action Buttons*/}
      <div className="flex flex-col gap-2 scale-90">
        <div className="flex flex-row gap-2">
          <Tooltip title="Hide Entity">
            <Button
              icon={
                entity.isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />
              }
              onClick={() => {
                changeHideEntity(entity.entityID, !entity.isVisible);
              }}
            />
          </Tooltip>
          <Tooltip title="Remove Entity">
            <Button
              icon={
                entity.isCalculatable ? <ApiOutlined /> : <DisconnectOutlined />
              }
              onClick={() => {
                changeEntityCalculatable(
                  entity.entityID,
                  !entity.isCalculatable
                );
              }}
            />
          </Tooltip>
        </div>
        <div className="flex flex-row gap-2">
          <Tooltip title="Duplicate Entity">
            <Button
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    stroke="#ffffff"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 16H5a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v1M9 20h10a1 1 0 001-1V9a1 1 0 00-1-1H9a1 1 0 00-1 1v10a1 1 0 001 1z"
                  />
                </svg>
              }
              onClick={() => duplicateEntity(entity.entityID)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  />
                </svg>
              }
              onClick={() => removeEntity(entity.entityID)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const VariableForm: React.FC<{
  variable: T_VarabielName;
  currentPosition: number;
  waldTestFragmentListLength: number;
  nonCausalityFragmentListLength: number;
  currentTab: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    entityID: number
  ) => void;
  removeEntity: (entityID: number) => void;
  changeFragmentPosition: (
    id: number,

    direction: "UP" | "DOWN"
  ) => void;
}> = ({
  variable,
  currentPosition,
  handleOnChange,
  removeEntity,
  changeFragmentPosition,
  currentTab,
  waldTestFragmentListLength,
  nonCausalityFragmentListLength,
}) => {
  return (
    <div
      style={{ background: "#1E1E1E" }}
      className="border-2 border-gray-600 p-5 rounded-lg flex justify-between items-center gap-5 mx-4"
    >
      {/* Action Buttons */}
      <div className="flex flex-col justify-between items-center gap-2 mr-10">
        <Tooltip title="Move up">
          <Button
            icon={
              <CaretUpOutlined
                className={
                  currentPosition === 0 ? "text-gray-500" : "text-white"
                }
              />
            }
            onClick={() => changeFragmentPosition(variable.ID, "UP")}
            disabled={currentPosition === 0}
          />
        </Tooltip>
        <Tooltip title="Move down">
          <Button
            icon={
              <CaretDownOutlined
              // className={
              //   currentPosition === formListLength - 1
              //     ? "text-gray-500"
              //     : "text-white"
              // }
              />
            }
            onClick={() => changeFragmentPosition(variable.ID, "DOWN")}
            disabled={
              currentTab === "WALD_TEST"
                ? currentPosition === waldTestFragmentListLength - 1
                : currentPosition === nonCausalityFragmentListLength - 1
            }
          />
        </Tooltip>
      </div>
      <div className="w-full gap-2">
        <div className="flex flex-row gap-5">
          <div className="flex flex-col w-fit gap-4">
            <div className="flex flex-row justify-between items-center gap-7">
              <div className="text-white text-nowrap font-semibold">
                Variable names
              </div>
              <div className="flex flex-row items-center gap-3">
                <Input
                  name="Var1Name"
                  value={variable?.Var1Name}
                  onChange={(e) => handleOnChange(e, variable.ID)}
                  size="middle"
                  className="w-[40%]"
                />
                <Input
                  name="Var2Name"
                  value={variable?.Var2Name}
                  onChange={(e) => handleOnChange(e, variable.ID)}
                  size="middle"
                  className="w-[40%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Tooltip title="Delete">
            <Button
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  />
                </svg>
              }
              onClick={() => removeEntity(variable.ID)}
            />
          </Tooltip>
          <Tooltip title="Hide Entity">
            <Button
              icon={
                variable.Var1Name ? <EyeInvisibleOutlined /> : <EyeOutlined />
              }
              // onClick={() => {
              //   changeHideEntity(entity.entityID, !entity.isVisible);
              // }}
            />
          </Tooltip>
          <Tooltip title="Duplicate Entity">
            <Button
              icon={
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    stroke="#ffffff"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 16H5a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1v1M9 20h10a1 1 0 001-1V9a1 1 0 00-1-1H9a1 1 0 00-1 1v10a1 1 0 001 1z"
                  />
                </svg>
              }
              // onClick={() => duplicateEntity(entity.entityID)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const RcegPage2 = () => {
  const [waldTestFormsList, setWaldTestFormsList] = useState<
    (T_Entity | T_VarabielName)[]
  >([]);
  const [nonCausFormsList, setNonCausFormsList] = useState<
    (T_NC_Entity | T_VarabielName)[]
  >([]);

  const [currentTab, setCurrentTab] = useState<"WALD_TEST" | "NON_CAUSALITY">(
    "WALD_TEST"
  );
  const [chi2MinMax, setChi2MinMax] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [currentEntity, setCurrentEntity] = useState<
    T_Entity | T_NC_Entity | undefined
  >(undefined);
  const [waldTestFragmentListMaxVarId, setWaldTestFragmentListMaxVarId] =
    useState<number>(0);
  const [nonCausalityFragmentMaxVarId, setNonCausalityFragmentMaxVarId] =
    useState<number>(0);
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);
  const divRef = useRef(null);

  const [isSettingPanelOpen, setIsSettingPanelOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [curActionSettingPanel, setCurActionSettingPanel] = useState<
    "MOUSE_ENTER" | "MOUSE_LEAVE"
  >("MOUSE_LEAVE");

  const DEFAULT_CANVAS_HEIGHT = 340;
  const [canvasStyle, setCanvasStyle] = useState({
    display: "flex",
    backgroundColor: "#0400B7",
    // minHeight: "150px",
    // maxHeight: `${MAX_CANVAS_HEIGHT}px`,
    justifyContent: "start",
    alignItems: "center",
  });

  const [canvas, setCanvas] = useState<TCanvas>({
    width: 800,
    height: DEFAULT_CANVAS_HEIGHT,
    maxHeight: 3000,
    color: "",
  });

  const [entitySetting, setEntitySetting] = useState<T_EntitySetting>({
    width: 1050,
    height: DEFAULT_CANVAS_HEIGHT - 50,
    maxCircleDiameter: 180,
    minCircleDiameter: 60,
    maxArrowHeight: 180,
    minArrowHeight: 50,
    arrowThickness: 4,
    variableNameAreaWidth: 50,
    entityNameAreaHeight: 50,
    entityNamesFontSize: 12,
    varibleNamesFontSize: 12,
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
    if (curActionSettingPanel === "MOUSE_ENTER") {
      setIsSettingPanelOpen(true);
    }
    const delayedTask = setTimeout(() => {
      switch (curActionSettingPanel) {
        case "MOUSE_ENTER":
          setIsSettingPanelOpen(true);
          break;

        case "MOUSE_LEAVE":
          setIsSettingPanelOpen(false);
          break;
      }
    }, 1000);

    return () => clearTimeout(delayedTask);
  }, [curActionSettingPanel]);

  //   React.useEffect(() => {
  //     if (currentTab.toString() === "WALD_TEST") {
  //       generateLJCHeadMap_v2(waldTestFormsList);
  //     } else if (currentTab.toString() === "NON_CAUSALITY") {
  //       generateLJCHeadMap_v2(nonCausFormsList);
  //     }
  //   }, [canvas, entitySetting, currentTab]);

  React.useEffect(() => {
    refreshLJCHeadMap();
  }, [currentTab, canvas]);

  // input handlers

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    entityID: number
  ) => {
    if (currentTab.toString() === "WALD_TEST") {
      setWaldTestFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return {
              ...item,
              [e.target.name]: [e.target.value],
            } as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // Handle T_Entity
            return {
              ...item,
              [e.target.name]: [e.target.value],
            } as T_Entity;
          }
          return item;
        })
      );

      /*   ...........for real time map generate................. */
      const updatedWaldTestFormsList = waldTestFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return {
            ...item,
            [e.target.name]: [e.target.value],
          } as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            [e.target.name]: [e.target.value],
          } as T_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedWaldTestFormsList);
      /*   ...........for real time map generate................. */
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return {
              ...item,
              [e.target.name]: [e.target.value],
            } as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // Handle T_Entity
            return {
              ...item,
              [e.target.name]: [e.target.value],
            } as T_NC_Entity;
          }
          return item;
        })
      );

      /*   ...........for real time map generate................. */
      const updatedNonCausFormsList = nonCausFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return {
            ...item,
            [e.target.name]: [e.target.value],
          } as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            [e.target.name]: [e.target.value],
          } as T_NC_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedNonCausFormsList);
      /*   ...........for real time map generate................. */
    }
  };

  const handleOnChangeNumberInput = (
    value: number | null,
    entityID: number,
    name: string
  ) => {
    if (value !== null) {
      if (currentTab.toString() === "WALD_TEST") {
        setWaldTestFormsList((prevFormsList) =>
          prevFormsList.map((item) => {
            if ("ID" in item && item.ID === entityID) {
              // Handle T_VarabielName
              return {
                ...item,
                [name]: value,
              } as T_VarabielName;
            } else if ("entityID" in item && item.entityID === entityID) {
              // Handle T_Entity
              // keep lag value between rag range
              let validValue = value;
              let newLagValue = item.lag;
              switch (name) {
                case "lagRangeMin":
                  validValue =
                    value >= 1 && value < item.lagRangeMax
                      ? value
                      : item.lagRangeMin;
                  newLagValue = value > newLagValue ? value : newLagValue;
                  break;
                case "lagRangeMax":
                  validValue =
                    value >= 1 && value > item.lagRangeMin
                      ? value
                      : item.lagRangeMax;
                  newLagValue = value < newLagValue ? value : newLagValue;
                  break;
                case "lag":
                  validValue =
                    value >= item.lagRangeMin && value <= item.lagRangeMax
                      ? value
                      : item.lag;
                  newLagValue = validValue;
                  break;
                default:
                  break;
              }
              return {
                ...item,
                [name]: validValue,
                lag: newLagValue,
              } as T_Entity;
            }
            return item;
          })
        );
        /*   ...........for real time map generate................. */
        const updatedWaldTestFormsList = waldTestFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return {
              ...item,
              [name]: value,
            } as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // Handle T_Entity
            // keep lag value between rag range
            let validValue = value;
            let newLagValue = item.lag;
            switch (name) {
              case "lagRangeMin":
                validValue =
                  value >= 1 && value < item.lagRangeMax
                    ? value
                    : item.lagRangeMin;

                newLagValue = value > newLagValue ? value : newLagValue;
                break;
              case "lagRangeMax":
                validValue =
                  value >= 1 && value > item.lagRangeMin
                    ? value
                    : item.lagRangeMax;

                newLagValue = value < newLagValue ? value : newLagValue;
                break;
              case "lag":
                validValue =
                  value >= item.lagRangeMin && value <= item.lagRangeMax
                    ? value
                    : item.lag;
                newLagValue = validValue;
                break;
              default:
                break;
            }
            return {
              ...item,
              [name]: validValue,
              lag: newLagValue,
            } as T_Entity;
          }
          return item;
        });

        generateLJCHeadMap_v2(updatedWaldTestFormsList);
        /*   ...........for real time map generate................. */
      } else if (currentTab.toString() === "NON_CAUSALITY") {
        setNonCausFormsList((prevFormsList) =>
          prevFormsList.map((item) => {
            if ("ID" in item && item.ID === entityID) {
              // Handle T_VarabielName
              return {
                ...item,
                [name]: value,
              } as T_VarabielName;
            } else if ("entityID" in item && item.entityID === entityID) {
              // Handle T_Entity
              // keep lag value between rag range
              let validValue = value;
              let newLag1Value = item.lagVar1;
              let newLag2Value = item.lagVar2;
              switch (name) {
                case "lagRange1Min":
                  validValue =
                    value >= 1 && value < item.lagRange1Max
                      ? value
                      : item.lagRange1Min;
                  newLag1Value = value > newLag1Value ? value : newLag1Value;
                  break;
                case "lagRange1Max":
                  validValue =
                    value >= 1 && value > item.lagRange1Min
                      ? value
                      : item.lagRange1Max;
                  newLag1Value = value < newLag1Value ? value : newLag1Value;
                  break;

                case "lagRange2Min":
                  validValue =
                    value >= 1 && value < item.lagRange2Max
                      ? value
                      : item.lagRange2Min;
                  newLag2Value = value > newLag2Value ? value : newLag2Value;
                  break;
                case "lagRange2Max":
                  validValue =
                    value >= 1 && value > item.lagRange2Min
                      ? value
                      : item.lagRange2Max;
                  newLag2Value = value < newLag2Value ? value : newLag2Value;
                  break;
                case "lagVar1":
                  validValue =
                    value >= item.lagRange1Min && value <= item.lagRange1Max
                      ? value
                      : item.lagVar1;
                  newLag1Value = validValue;
                  break;
                case "lagVar2":
                  validValue =
                    value >= item.lagRange2Min && value <= item.lagRange2Max
                      ? value
                      : item.lagVar2;
                  newLag2Value = validValue;
                  break;
                default:
                  break;
              }
              return {
                ...item,
                [name]: validValue,
                lagVar1: newLag1Value,
                lagVar2: newLag2Value,
              } as T_NC_Entity;
            }
            return item;
          })
        );

        /*   ...........for real time map generate................. */
        const updatedNonCausFormsListt = nonCausFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return {
              ...item,
              [name]: value,
            } as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // Handle T_Entity
            // keep lag value between rag range
            let validValue = value;
            let newLag1Value = item.lagVar1;
            let newLag2Value = item.lagVar2;
            switch (name) {
              case "lagRange1Min":
                validValue =
                  value >= 1 && value < item.lagRange1Max
                    ? value
                    : item.lagRange1Min;
                newLag1Value = value > newLag1Value ? value : newLag1Value;
                break;
              case "lagRange1Max":
                validValue =
                  value >= 1 && value > item.lagRange1Min
                    ? value
                    : item.lagRange1Max;
                newLag1Value = value < newLag1Value ? value : newLag1Value;
                break;

              case "lagRange2Min":
                validValue =
                  value >= 1 && value < item.lagRange2Max
                    ? value
                    : item.lagRange2Min;
                newLag2Value = value > newLag2Value ? value : newLag2Value;
                break;
              case "lagRange2Max":
                validValue =
                  value >= 1 && value > item.lagRange2Min
                    ? value
                    : item.lagRange2Max;
                newLag2Value = value < newLag2Value ? value : newLag2Value;
                break;
              case "lagVar1":
                validValue =
                  value >= item.lagRange1Min && value <= item.lagRange1Max
                    ? value
                    : item.lagVar1;
                newLag1Value = validValue;
                break;
              case "lagVar2":
                validValue =
                  value >= item.lagRange2Min && value <= item.lagRange2Max
                    ? value
                    : item.lagVar2;
                newLag2Value = validValue;
                break;
              default:
                break;
            }
            return {
              ...item,
              [name]: validValue,
              lagVar1: newLag1Value,
              lagVar2: newLag2Value,
            } as T_NC_Entity;
          }
          return item;
        });

        generateLJCHeadMap_v2(updatedNonCausFormsListt);
        /*   ...........for real time map generate................. */
      }
    }
  };

  const handleOnChangeHideCircle = (
    entityID: number,
    name: string,
    is_visible: boolean
  ) => {
    if (currentTab.toString() === "WALD_TEST") {
      setWaldTestFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return item as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // alert(`is_visible: ${is_visible}`);
            // Handle T_Entity
            return {
              ...item,
              [name]: is_visible,
            } as T_Entity;
          }
          return item;
        })
      );
      /*   ...........for real time map generate................. */
      const updatedWaldTestFormsList = waldTestFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return item as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            [name]: is_visible,
          } as T_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedWaldTestFormsList);
      /*   ...........for real time map generate................. */
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      console.log("handleOnChangeHideCircle");

      setNonCausFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return item as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            console.log("handleOnChangeHideCircle 2: ", name);
            // Handle T_Entity
            return {
              ...item,
              [name]: is_visible,
            } as T_NC_Entity;
          }
          return item;
        })
      );

      /*   ...........for real time map generate................. */
      const updatedNonCausFormsListt = nonCausFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return item as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            [name]: is_visible,
          } as T_NC_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedNonCausFormsListt);
      /*   ...........for real time map generate................. */
    }
  };

  const handleOnChangeHideEntity = (entityID: number, is_visible: boolean) => {
    if (currentTab.toString() === "WALD_TEST") {
      setWaldTestFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return item as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // alert(`is_visible: ${is_visible}`);
            // Handle T_Entity
            return {
              ...item,
              isVisible: is_visible,
            } as T_Entity;
          }
          return item;
        })
      );
      /*   ...........for real time map generate................. */
      const updatedWaldTestFormsList = waldTestFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return item as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            isVisible: is_visible,
          } as T_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedWaldTestFormsList);
      /*   ...........for real time map generate................. */
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return item as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // Handle T_Entity
            return {
              ...item,
              isVisible: is_visible,
            } as T_NC_Entity;
          }
          return item;
        })
      );

      /*   ...........for real time map generate................. */
      const updatedNonCausFormsListt = nonCausFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return item as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            isVisible: is_visible,
          } as T_NC_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedNonCausFormsListt);
      /*   ...........for real time map generate................. */
    }
  };

  const handleChangeEntityCalculatableAndVisible = (
    entityID: number,
    is_calculatable: boolean
  ) => {
    if (currentTab.toString() === "WALD_TEST") {
      setWaldTestFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return item as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // alert(`is_visible: ${is_visible}`);
            // Handle T_Entity
            return {
              ...item,
              isCalculatable: is_calculatable,
              isVisible: is_calculatable,
            } as T_Entity;
          }
          return item;
        })
      );
      /*   ...........for real time map generate................. */
      const updatedWaldTestFormsList = waldTestFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return item as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            isCalculatable: is_calculatable,
            isVisible: is_calculatable,
          } as T_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedWaldTestFormsList);
      /*   ...........for real time map generate................. */
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausFormsList((prevFormsList) =>
        prevFormsList.map((item) => {
          if ("ID" in item && item.ID === entityID) {
            // Handle T_VarabielName
            return item as T_VarabielName;
          } else if ("entityID" in item && item.entityID === entityID) {
            // Handle T_Entity
            return {
              ...item,
              isCalculatable: is_calculatable,
              isVisible: is_calculatable,
            } as T_NC_Entity;
          }
          return item;
        })
      );

      /*   ...........for real time map generate................. */
      const updatedNonCausFormsListt = nonCausFormsList.map((item) => {
        if ("ID" in item && item.ID === entityID) {
          // Handle T_VarabielName
          return item as T_VarabielName;
        } else if ("entityID" in item && item.entityID === entityID) {
          // Handle T_Entity
          return {
            ...item,
            isCalculatable: is_calculatable,
            isVisible: is_calculatable,
          } as T_NC_Entity;
        }
        return item;
      });

      generateLJCHeadMap_v2(updatedNonCausFormsListt);
      /*   ...........for real time map generate................. */
    }
  };

  const addAnotherEntity = () => {
    let newEntityID = 1;

    newEntityID = new Date().getTime();
    if (currentTab.toString() === "WALD_TEST") {
      setWaldTestFormsList((prev) => [
        ...prev,
        {
          entityID: newEntityID, //new Date().getTime(),
          entityName: `Entity`,
          isVisible: true,
          isCalculatable: true,
          r2Var1: 0,
          r2Var2: 0,
          chi2Var1: 0,
          chi2Var2: 0,
          lagRangeMin: 1,
          lagRangeMax: 2,
          lag: 1,
          significanceVar1: 0,
          significanceVar2: 0,
          chi2Var1CircleSize: 0,
          chi2Var2CircleSize: 0,
          r2Var1CirclePosition: 0,
          r2Var2CirclePosition: 0,
          r2Var1CircleVisibility: true,
          r2Var2CircleVisibility: true,
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

      /*   ...........for real time map generate................. */
      generateLJCHeadMap_v2([
        ...waldTestFormsList,
        {
          entityID: newEntityID, //new Date().getTime(),
          isVisible: true,
          isCalculatable: true,
          entityName: `Entity`,
          r2Var1: 0,
          r2Var2: 0,
          chi2Var1: 0,
          chi2Var2: 0,
          lagRangeMin: 1,
          lagRangeMax: 2,
          lag: 0,
          significanceVar1: 0,
          significanceVar2: 0,
          chi2Var1CircleSize: 0,
          chi2Var2CircleSize: 0,
          r2Var1CirclePosition: 0,
          r2Var2CirclePosition: 0,
          r2Var1CircleVisibility: true,
          r2Var2CircleVisibility: true,
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
      /*   ...........for real time map generate................. */
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausFormsList((prev) => [
        ...prev,
        {
          entityID: newEntityID,
          isVisible: true,
          isCalculatable: true,
          entityName: `Entity`,
          chi2Var1: 0,
          chi2Var2: 0,
          lagRange1Min: 1,
          lagRange1Max: 2,
          lagRange2Min: 1,
          lagRange2Max: 2,
          lagVar1: 1,
          lagVar2: 1,
          significanceVar1: 0,
          significanceVar2: 0,
          chi2Var1CircleSize: 0,
          chi2Var2CircleSize: 0,
          r2Var1CirclePosition: 0,
          r2Var2CirclePosition: 0,
          r2Var1CircleVisibility: true,
          r2Var2CircleVisibility: true,
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

      /*   ...........for real time map generate................. */
      generateLJCHeadMap_v2([
        ...nonCausFormsList,
        {
          entityID: newEntityID,
          isVisible: true,
          isCalculatable: true,
          entityName: `Entity`,
          chi2Var1: 0,
          chi2Var2: 0,
          lagRange1Min: 1,
          lagRange1Max: 2,
          lagRange2Min: 1,
          lagRange2Max: 2,
          lagVar1: 0,
          lagVar2: 0,
          significanceVar1: 0,
          significanceVar2: 0,
          chi2Var1CircleSize: 0,
          chi2Var2CircleSize: 0,
          r2Var1CirclePosition: 0,
          r2Var2CirclePosition: 0,
          r2Var1CircleVisibility: true,
          r2Var2CircleVisibility: true,
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
      /*   ...........for real time map generate................. */
    }
  };

  const addVariable = () => {
    let newEntityID = 1;

    newEntityID = new Date().getTime();
    if (currentTab.toString() === "WALD_TEST") {
      setWaldTestFormsList((prev) => [
        ...prev,
        {
          ID: newEntityID,
          Var1Name: "Var 1",
          Var2Name: "Var 2",
        },
      ]);
      /*   ...........for real time map generate................. */
      generateLJCHeadMap_v2([
        ...waldTestFormsList,
        {
          ID: newEntityID,
          Var1Name: "Var 1",
          Var2Name: "Var 2",
        },
      ]);
      /*   ...........for real time map generate................. */
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      setNonCausFormsList((prev) => [
        ...prev,
        {
          ID: newEntityID,
          Var1Name: "Var 1",
          Var2Name: "Var 2",
        },
      ]);
      /*   ...........for real time map generate................. */
      generateLJCHeadMap_v2([
        ...nonCausFormsList,
        {
          ID: newEntityID,
          Var1Name: "Var 1",
          Var2Name: "Var 2",
        },
      ]);
      /*   ...........for real time map generate................. */
    }
  };

  const handleOnChangeSettings = (property: string, value: number | null) => {
    if (!value) return;
    switch (property) {
      case "arrowThickness":
        setEntitySetting((prev: T_EntitySetting) => ({
          ...prev,
          arrowThickness: value,
        }));
        break;
      case "variableNameAreaWidth":
        setEntitySetting((prev: T_EntitySetting) => ({
          ...prev,
          variableNameAreaWidth: value,
        }));
        break;
      case "entityNameAreaHeight":
        setEntitySetting((prev: T_EntitySetting) => ({
          ...prev,
          entityNameAreaHeight: value,
        }));
        setCanvas((prev: TCanvas) => ({
          ...prev,
          height:
            entitySetting.entityNameAreaHeight > value
              ? prev.height - value
              : prev.height + value,
          // value >= 50 ? prev.height + (value - 50) : prev.height - value,
        }));
        break;
      case "entityNamesFontSize":
        setEntitySetting((prev: T_EntitySetting) => ({
          ...prev,
          entityNamesFontSize: value,
        }));
        break;
      case "varibleNamesFontSize":
        setEntitySetting((prev: T_EntitySetting) => ({
          ...prev,
          varibleNamesFontSize: value,
        }));
        break;
    }
  };

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

  const handleMouseMovementSettingsSpanBtn = (
    action: "MOUSE_ENTER" | "MOUSE_LEAVE"
  ) => {
    switch (action) {
      case "MOUSE_ENTER":
        setCurActionSettingPanel("MOUSE_ENTER");
        break;

      case "MOUSE_LEAVE":
        setCurActionSettingPanel("MOUSE_LEAVE");
        break;
    }
  };

  const onChangeTab = (key: string) => {
    if (key === "WALD_TEST") {
      setCurrentTab("WALD_TEST");
    } else if (key === "NON_CAUSALITY") {
      setCurrentTab("NON_CAUSALITY");
    }
  };

  const resetMapSettings = () => {
    setEntitySetting((prev) => ({
      ...prev,
      arrowThickness: 4,
      variableNameAreaWidth: 50,
      entityNameAreaHeight: 50,
      entityNamesFontSize: 12,
      varibleNamesFontSize: 12,
    }));
    setCanvas((prev: TCanvas) => ({
      ...prev,
      height: DEFAULT_CANVAS_HEIGHT,
    }));
  };

  const removeEntity = (entityID: number) => {
    if (currentTab.toString() === "WALD_TEST") {
      const result = waldTestFormsList.filter(
        (entity) =>
          ("entityID" in entity && entity.entityID !== entityID) ||
          ("ID" in entity && entity.ID !== entityID)
      );
      generateLJCHeadMap_v2(result);
      setWaldTestFormsList(result);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      const result = nonCausFormsList.filter(
        (entity) =>
          ("entityID" in entity && entity.entityID !== entityID) ||
          ("ID" in entity && entity.ID !== entityID)
      );
      generateLJCHeadMap_v2(result);
      setNonCausFormsList(result);
    }
  };

  const duplicateEntity = (entityID: number) => {
    if (currentTab.toString() === "WALD_TEST") {
      const result = waldTestFormsList.filter(
        (entity) =>
          ("entityID" in entity && entity.entityID === entityID) ||
          ("ID" in entity && entity.ID === entityID)
      );
      if (result && result.length > 0) {
        generateLJCHeadMap_v2([
          ...waldTestFormsList,
          { ...result[0], entityID: new Date().getTime() },
        ]);
        setWaldTestFormsList([
          ...waldTestFormsList,
          { ...result[0], entityID: new Date().getTime() },
        ]);
      }
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      const result = nonCausFormsList.filter(
        (entity) =>
          ("entityID" in entity && entity.entityID === entityID) ||
          ("ID" in entity && entity.ID === entityID)
      );
      generateLJCHeadMap_v2([
        ...nonCausFormsList,
        { ...result[0], entityID: new Date().getTime() },
      ]);
      setNonCausFormsList([
        ...nonCausFormsList,
        { ...result[0], entityID: new Date().getTime() },
      ]);
    }
  };

  const changeFragmentPosition = (id: number, direction: "UP" | "DOWN") => {
    let currentFragmentIndex = -1;
    let swapFragmentIndex = -1;

    switch (currentTab) {
      case "WALD_TEST":
        currentFragmentIndex = waldTestFormsList.findIndex(
          (item) =>
            ("entityID" in item && item.entityID === id) ||
            ("ID" in item && item.ID === id)
        );

        swapFragmentIndex =
          direction === "UP"
            ? currentFragmentIndex - 1
            : currentFragmentIndex + 1;

        setWaldTestFormsList((prevList) => {
          const index1 = currentFragmentIndex;
          const index2 = swapFragmentIndex;

          // If either item is not found, return the original list
          if (index1 === -1 || index2 === -1) return prevList;

          // Create a copy of the list to avoid mutating the original state
          const newList = [...prevList];

          // Swap the two items
          [newList[index1], newList[index2]] = [
            newList[index2],
            newList[index1],
          ];

          // Return the new list to update the state
          return newList;
        });
        /*   ...........for real time map generate................. */
        const index1 = currentFragmentIndex;
        const index2 = swapFragmentIndex;

        // If either item is not found, return the original list
        if (index1 === -1 || index2 === -1) return waldTestFormsList;

        // Create a copy of the list to avoid mutating the original state
        const newList = [...waldTestFormsList];

        // Swap the two items
        [newList[index1], newList[index2]] = [newList[index2], newList[index1]];
        generateLJCHeadMap_v2(newList);
        /*   ...........for real time map generate................. */
        break;
      case "NON_CAUSALITY":
        currentFragmentIndex = nonCausFormsList.findIndex(
          (item) =>
            ("entityID" in item && item.entityID === id) ||
            ("ID" in item && item.ID === id)
        );

        swapFragmentIndex =
          direction === "UP"
            ? currentFragmentIndex - 1
            : currentFragmentIndex + 1;

        setNonCausFormsList((prevList) => {
          const index1 = currentFragmentIndex;
          const index2 = swapFragmentIndex;

          // If either item is not found, return the original list
          if (index1 === -1 || index2 === -1) return prevList;

          // Create a copy of the list to avoid mutating the original state
          const newList = [...prevList];

          // Swap the two items
          [newList[index1], newList[index2]] = [
            newList[index2],
            newList[index1],
          ];

          // Return the new list to update the state
          return newList;
        });
        /*   ...........for real time map generate................. */
        const index11 = currentFragmentIndex;
        const index22 = swapFragmentIndex;

        // If either item is not found, return the original list
        if (index11 === -1 || index22 === -1) return nonCausFormsList;

        // Create a copy of the list to avoid mutating the original state
        const newList2 = [...nonCausFormsList];

        // Swap the two items
        [newList2[index11], newList2[index22]] = [
          newList2[index22],
          newList2[index11],
        ];
        generateLJCHeadMap_v2(newList2);
        /*   ...........for real time map generate................. */
        break;
      default:
        break;
    }
  };

  // process & calculations
  /*
  const calAndAssignChi2MinMax = (): {
    chi2Min: number;
    chi2Max: number;
  } => {
    const chiList: number[] = [];
    // find max chi value

    if (currentTab.toString() === "WALD_TEST") {
      waldTestFormsList.forEach((e) => {
        if ("entityID" in e) {
          chiList.push(e.chi2Var1);
          chiList.push(e.chi2Var2);
        }
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      nonCausFormsList.forEach((e) => {
        if ("entityID" in e) {
          chiList.push(e.chi2Var1);
          chiList.push(e.chi2Var2);
        }
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

    return {
      chi2Min: MIN_CHi2,
      chi2Max: MAX_CHi2,
    };
  };
  */

  const calAndAssignChi2MinMax = (
    updatedFormsList:
      | (T_Entity | T_VarabielName)[]
      | (T_NC_Entity | T_VarabielName)[]
  ): {
    chi2Min: number;
    chi2Max: number;
  } => {
    const chiList: number[] = [];
    // find max chi value

    if (currentTab.toString() === "WALD_TEST") {
      updatedFormsList.forEach((e) => {
        if ("entityID" in e) {
          if (e.isCalculatable) {
            chiList.push(e.chi2Var1);
            chiList.push(e.chi2Var2);
          }
        }
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      updatedFormsList.forEach((e) => {
        if ("entityID" in e) {
          if (e.isCalculatable) {
            chiList.push(e.chi2Var1);
            chiList.push(e.chi2Var2);
          }
        }
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

    return {
      chi2Min: MIN_CHi2,
      chi2Max: MAX_CHi2,
    };
  };

  const calAndGetLagMinMAx = () => {
    const lagRangeList: number[] = [];
    // find max chi value
    if (currentTab.toString() === "WALD_TEST") {
      waldTestFormsList.forEach((e) => {
        if ("entityID" in e) {
          if (e.isCalculatable) {
            lagRangeList.push(e.lagRangeMin);
            lagRangeList.push(e.lagRangeMax);
          }
        }
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      nonCausFormsList.forEach((e) => {
        if ("entityID" in e) {
          if (e.isCalculatable) {
            lagRangeList.push(e.lagRange1Max);
            lagRangeList.push(e.lagRange1Min);
            lagRangeList.push(e.lagRange2Max);
            lagRangeList.push(e.lagRange2Min);
          }
        }
      });
    }

    return {
      lagRangeMin: Math.min(...lagRangeList),
      lagRangeMax: Math.max(...lagRangeList),
    };
  };

  const calAndAssignEntityAndCircleSizes = (
    updatedFormsList:
      | (T_Entity | T_VarabielName)[]
      | (T_NC_Entity | T_VarabielName)[]
  ): T_EntitySetting => {
    let variableFragmentsCount = 0;
    let entitiesCount = 0;
    let visibleEntitiesCount = 0;

    if (currentTab.toString() === "WALD_TEST") {
      updatedFormsList.forEach((entity) => {
        if ("entityID" in entity) {
          // entity
          if (entity.isCalculatable) {
            entitiesCount++;
          }
          if (entity.isVisible) {
            visibleEntitiesCount++;
          }
        } else if ("ID" in entity) {
          // variable
          variableFragmentsCount++;
        }
      });
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      updatedFormsList.forEach((entity) => {
        if ("entityID" in entity) {
          // entity
          if (entity.isCalculatable) {
            entitiesCount++;
          }
          if (entity.isVisible) {
            visibleEntitiesCount++;
          }
        } else if ("ID" in entity) {
          // variable
          variableFragmentsCount++;
        }
      });
    }

    console.log("entitiesCount ", entitiesCount);
    console.log("variableFragmentsCount ", variableFragmentsCount);
    // const entityWidth = (canvas.width - 50) / entities.length;
    // const entityWidth =
    //   (canvas.width - variableFragmentsCount * 50) / entitiesCount;
    // const entityHeight = canvas.height - 50;
    const entityWidth =
      (canvas.width -
        variableFragmentsCount * entitySetting.variableNameAreaWidth) /
      visibleEntitiesCount;
    const entityHeight = canvas.height - entitySetting.entityNameAreaHeight;

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

    const { lagRangeMin, lagRangeMax } = calAndGetLagMinMAx();

    const maxArrowHeight = entityHeight * 0.9;
    const minArrowHeight = maxArrowHeight / (lagRangeMax - lagRangeMin + 1);

    console.log("lagRange Min:", lagRangeMin, "Max", lagRangeMax);

    console.log("canvas: w=", canvas.width, "h=", canvas.height);
    console.log("entity: w=", entityWidth, "h=", entityHeight);

    console.log("Max circle size: ", maxCircleDiameter);
    console.log("Min circle size: ", minCircleDiameter);

    console.log("Max arrow size: ", maxArrowHeight);
    console.log("Min arrow size: ", minArrowHeight);

    setEntitySetting((prev: T_EntitySetting) => ({
      ...prev,
      width: entityWidth,
      height: entityHeight,
      maxCircleDiameter: maxCircleDiameter,
      minCircleDiameter: minCircleDiameter,
      maxArrowHeight: maxArrowHeight,
      minArrowHeight: minArrowHeight,
    }));

    return {
      ...entitySetting,
      width: entityWidth,
      height: entityHeight,
      maxCircleDiameter: maxCircleDiameter,
      minCircleDiameter: minCircleDiameter,
      maxArrowHeight: maxArrowHeight,
      minArrowHeight: minArrowHeight,
    };
  };

  const calculateCircleSize = (
    chi2Value: number,
    _entity: T_EntitySetting,
    _chi2MinMax: { min: number; max: number }
  ) => {
    const chi2Var1CircleSize =
      ((chi2Value - _chi2MinMax.min) / (_chi2MinMax.max - _chi2MinMax.min)) *
        (_entity.maxCircleDiameter - _entity.minCircleDiameter) +
      _entity.minCircleDiameter;

    return _chi2MinMax.min === _chi2MinMax.max
      ? _chi2MinMax.max
      : chi2Var1CircleSize;
  };

  const handleDownloadImage = async () => {
    if (divRef.current === null) {
      return;
    }

    try {
      // const dataUrl = await toPng(divRef.current);
      // Increase pixelRatio for higher quality
      setIsDownloading(true);
      const dataUrl = await toPng(divRef.current, {
        pixelRatio: 10, // Adjust pixel ratio (default is 1)
      });
      setIsDownloading(false);
      download(dataUrl, "ljcheatmap-image.png");
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const calculateArrowSize = (
    lag: number,
    lagMin: number,
    lagMax: number,
    _entity: T_EntitySetting
  ) => {
    // const arrowHeight =
    //   ((lag - lagMin) / (lagMax - lagMin)) *
    //     (_entity.maxArrowHeight - _entity.minArrowHeight) +
    //   _entity.minArrowHeight;
    const arrowHeight =
      ((lag - lagMin) / (lagMax - lagMin + 1)) * _entity.maxArrowHeight +
      _entity.minArrowHeight;

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

  const generateCircles = (
    _entity: T_EntitySetting,
    _chi2MinMax: { min: number; max: number }
  ) => {
    const { lagRangeMin, lagRangeMax } = calAndGetLagMinMAx();

    const circleSizes: number[] = [];
    let isAllCircleSizesSame: boolean = false;

    if (currentTab.toString() === "WALD_TEST") {
      // check all circle sizes are same
      waldTestFormsList.map((ent) => {
        if ("entityID" in ent) {
          if (ent.isCalculatable) {
            const chi2Var1CircleSize = calculateCircleSize(
              (ent as T_Entity).chi2Var1,
              _entity,
              _chi2MinMax
            );
            const chi2Var2CircleSize = calculateCircleSize(
              (ent as T_Entity).chi2Var2,
              _entity,
              _chi2MinMax
            );

            circleSizes.push(chi2Var1CircleSize);
            circleSizes.push(chi2Var2CircleSize);
          }
        }
      });

      // compare sizes
      circleSizes.map((size) => {
        isAllCircleSizesSame = size === circleSizes.at(0);
      });

      setWaldTestFormsList((prevItem) =>
        prevItem.map((e) => {
          console.log("check point 1");

          const chi2Var1CircleSize = isAllCircleSizesSame
            ? _entity.maxCircleDiameter
            : calculateCircleSize(
                (e as T_Entity).chi2Var1,
                _entity,
                _chi2MinMax
              );
          const chi2Var2CircleSize = isAllCircleSizesSame
            ? _entity.maxCircleDiameter
            : calculateCircleSize(
                (e as T_Entity).chi2Var2,
                _entity,
                _chi2MinMax
              );

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
            r2Var1CirclePosition: _entity.height / 2,
            // r2Var2CirclePosition: calCirclePosition(
            //   e.r2Var2,
            //   { rMin, rMax },
            //   maxPosition
            // ),
            r2Var2CirclePosition: _entity.height / 2,
            // r2Var1CircleVisibility: true,
            // r2Var2CircleVisibility: true,
            arrowHeight: calculateArrowSize(
              (e as T_Entity).lag,
              // e.lagRangeMin,
              // e.lagRangeMax,
              lagRangeMin,
              lagRangeMax,
              _entity
            ),
            chi2Var1CircleColors: calculateCircleColorPercentages(
              (e as T_Entity).significanceVar1,
              chi2Var1CircleSize
            ),
            chi2Var2CircleColors: calculateCircleColorPercentages(
              (e as T_Entity).significanceVar2,
              chi2Var2CircleSize
            ),
          };
        })
      );
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      // check all circle sizes are same
      nonCausFormsList.map((ent) => {
        if ("entityID" in ent) {
          if (ent.isCalculatable) {
            const chi2Var1CircleSize = calculateCircleSize(
              (ent as T_NC_Entity).chi2Var1,
              _entity,
              _chi2MinMax
            );
            const chi2Var2CircleSize = calculateCircleSize(
              (ent as T_NC_Entity).chi2Var2,
              _entity,
              _chi2MinMax
            );

            circleSizes.push(chi2Var1CircleSize);
            circleSizes.push(chi2Var2CircleSize);
          }
        }
      });

      // compare sizes
      circleSizes.map((size) => {
        isAllCircleSizesSame = size === circleSizes.at(0);
      });

      setNonCausFormsList((prevItem) =>
        prevItem.map((e) => {
          if ("entityID" in e) {
            const chi2Var1CircleSize = isAllCircleSizesSame
              ? _entity.maxCircleDiameter
              : calculateCircleSize(
                  (e as T_NC_Entity).chi2Var1,
                  _entity,
                  _chi2MinMax
                );
            const chi2Var2CircleSize = isAllCircleSizesSame
              ? _entity.maxCircleDiameter
              : calculateCircleSize(
                  (e as T_NC_Entity).chi2Var2,
                  _entity,
                  _chi2MinMax
                );

            const lagRangeVales: number[] = [];
            lagRangeVales.push((e as T_NC_Entity).lagRange1Max);
            lagRangeVales.push((e as T_NC_Entity).lagRange2Max);

            // const lagRangeMin =
            //   e.lagRange1Min < e.lagRange2Min ? e.lagRange1Min : e.lagRange2Min;
            // const lagRangeMax =
            //   e.lagRange1Max > e.lagRange2Max ? e.lagRange1Max : e.lagRange2Max;

            const lag =
              ((e as T_NC_Entity).lagVar1 + (e as T_NC_Entity).lagVar2) / 2;

            return {
              ...e,
              chi2Var1CircleSize: chi2Var1CircleSize,
              chi2Var2CircleSize: chi2Var2CircleSize,
              // r2Var1CirclePosition: calCirclePosition(
              //   e.r2Var1,
              //   { rMin, rMax },
              //   maxPosition
              // ),
              r2Var1CirclePosition: _entity.height / 2,
              // r2Var2CirclePosition: calCirclePosition(
              //   e.r2Var2,
              //   { rMin, rMax },
              //   maxPosition
              // ),
              r2Var2CirclePosition: _entity.height / 2,
              // r2Var1CircleVisibility: true,
              // r2Var2CircleVisibility: true,
              arrowHeight: calculateArrowSize(
                lag,
                lagRangeMin,
                lagRangeMax,
                _entity
              ),
              chi2Var1CircleColors: calculateCircleColorPercentages(
                (e as T_NC_Entity).significanceVar1,
                chi2Var1CircleSize
              ),
              chi2Var2CircleColors: calculateCircleColorPercentages(
                (e as T_NC_Entity).significanceVar2,
                chi2Var2CircleSize
              ),
            };
          } else {
            return e;
          }
        })
      );
    }
  };

  const refreshLJCHeadMap = () => {
    // todo: provide updated dependancies and try to automate map genaration
    // const updatedEntity: T_EntitySetting = calAndAssignEntityAndCircleSizes();
    // const { chi2Min, chi2Max } = calAndAssignChi2MinMax();
    //  generateCircles(updatedEntity, {
    //   min: chi2Min,
    //   max: chi2Max,
    // });
    if (currentTab.toString() === "WALD_TEST") {
      generateLJCHeadMap_v2(waldTestFormsList);
    } else if (currentTab.toString() === "NON_CAUSALITY") {
      generateLJCHeadMap_v2(nonCausFormsList);
    }
  };

  const generateLJCHeadMap_v2 = (
    updatedFormsList:
      | (T_Entity | T_VarabielName)[]
      | (T_NC_Entity | T_VarabielName)[]
  ) => {
    const updatedEntity: T_EntitySetting =
      calAndAssignEntityAndCircleSizes(updatedFormsList);

    const { chi2Min, chi2Max } = calAndAssignChi2MinMax(updatedFormsList);

    generateCircles(updatedEntity, {
      min: chi2Min,
      max: chi2Max,
    });
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
            colorBgContainer: "#0400B7",
            colorText: "#FFFFFF",
            colorBorder: "#0400B7",
          },
        },
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-row gap-3 items-center self-start">
          <img src={Logo} alt="" />
          <div className="text-white text-xl">LJC Heatmap</div>
        </div>
        {/* Heading Text */}
        <div className="font-bold text-2xl text-white">
          Lucius Jesper Chloe Heatmap for Granger Causality
        </div>

        {/* Canvas Background */}
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
          {/* Canvas */}
          <div className="flex justify-center items-center w-full h-full">
            <div className="bg-white p-3" ref={divRef}>
              {/* P value Bar */}
              {/* 
              width = 110
              scaleLength = (width - 10)
              r = scaleLength * 0.01
              o = scaleLength * 0.04
              y = scaleLength * 0.05
              w = scaleLength * 0.9
              */}
              {/* P value bar */}
              <div className="relative mb-3">
                <div
                  style={{
                    width: `${canvas.width + 10}px`,
                    height: `${30}px`,
                  }}
                  className=" flex flex-row"
                >
                  {/* Label Front (0.00) */}
                  <div
                    style={{
                      width: canvas.width * 0.05,
                      fontSize: "12px",
                    }}
                    className="flex justify-center items-center"
                  >
                    0.00
                  </div>
                  {/* Colors Bar */}
                  <div className="/*bg-yellow-200*/  flex flex-grow">
                    {/* Red 0% - 1% */}
                    <div
                      className="flex justify-start items-center"
                      style={{
                        background:
                          /*gradient red-to-orange*/ /*"#E60000" */ "linear-gradient(90deg, rgba(230,0,0,1) 62%, rgba(255,165,0,1) 100%)",
                        width: (canvas.width - canvas.width * 0.1) * 0.01,
                        border: "solid 1px black",
                        textAlign: "center",
                        fontSize: "10px",
                      }}
                    ></div>
                    {/* Orange 1% - 5% */}
                    <div
                      className="flex justify-start items-center"
                      style={{
                        background:
                          /*gradient orange-to-yellow */ /*"orange"*/ "linear-gradient(90deg, rgba(255,55,0,1) 0%, rgba(255,94,0,1) 6%, rgba(255,175,0,1) 100%)",
                        width: (canvas.width - canvas.width * 0.1) * 0.04,
                        border: "solid 1px black",
                        borderLeft: "0px",
                        fontSize: "12px",
                      }}
                    >
                      <p className="rotate-90 w-fit h-fit ml-[-5px]">0.01</p>
                    </div>
                    {/* Yellow 5% - 10% */}
                    <div
                      className="flex justify-start items-center"
                      style={{
                        background:
                          /*gradient yellow-to-white*/ /*"yellow"*/ "linear-gradient(90deg, rgba(255,175,0,1) 0%, rgba(255,205,0,0.9976365546218487) 28%, rgba(255,248,0,1) 100%)",
                        width: (canvas.width - canvas.width * 0.1) * 0.05,
                        border: "solid 1px black",
                        borderLeft: "0px",
                        fontSize: "12px",
                      }}
                    >
                      <p className="rotate-90 w-fit h-fit ml-[-5px]">0.05</p>
                    </div>
                    {/* White 10% - 100% */}

                    <div
                      className="flex justify-start items-center"
                      style={{
                        background: "#FFFFFF",
                        // width: (canvas.width - canvas.width * 0.1) * 0.9,
                        width: "100%",
                        border: "solid 1px black",
                        borderLeft: "0px",
                        fontSize: "12px",
                      }}
                    >
                      <p className="rotate-90 w-fit h-fit ml-[-5px]">0.10</p>
                      <div className="w-full flex items-center justify-center  text-gray-400">
                        {/* <div>P Value</div> */}
                      </div>
                    </div>
                  </div>
                  {/* Label Tail (1.00) */}
                  <div
                    style={{
                      width: canvas.width * 0.05,
                      textAlign: "end",
                      fontSize: "12px",
                    }}
                    className="flex justify-center items-center"
                  >
                    1.00
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: `${canvas.width + 10}px`,
                    height: `${30}px`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  className="flex justify-center items-center"
                >
                  <div>p-value</div>
                </div>
              </div>
              {/* Heat Map */}
              <div
                style={{
                  backgroundColor: "#0400B7",
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
                  className="border-[1px] border-blue-500"
                >
                  {currentTab.toString() === "WALD_TEST" && (
                    <>
                      {waldTestFormsList.map((f, key: number) => (
                        <React.Fragment key={key}>
                          {isTEntity(f) && f.isVisible && (
                            <Entity
                              ent={f as T_Entity}
                              entitySetting={entitySetting}
                              setCurrentEntity={setCurrentEntity}
                            />
                          )}
                          {isTVarabielName(f) && (
                            <Variable
                              variableEntity={f}
                              ragmentListMaxVarId={waldTestFragmentListMaxVarId}
                              entitySettings={entitySetting}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  )}

                  {currentTab.toString() === "NON_CAUSALITY" && (
                    <>
                      {nonCausFormsList.map((f, key: number) => (
                        <React.Fragment key={key}>
                          {isTEntity(f) && (
                            <Entity
                              ent={f as T_Entity}
                              entitySetting={entitySetting}
                              setCurrentEntity={setCurrentEntity}
                            />
                          )}
                          {isTVarabielName(f) && (
                            <Variable
                              variableEntity={f}
                              ragmentListMaxVarId={nonCausalityFragmentMaxVarId}
                              entitySettings={entitySetting}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  )}
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
                  defaultHoverColor: "#555556",
                  defaultHoverBorderColor: "#555556",
                  colorBgContainer: "#FFFFFF",
                  colorText: "#555556",
                  colorBorder: "#E5E7EB",
                },
              },
            }}
          >
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
          </ConfigProvider>
        </div>
        {/* Forms Tab */}
        <Tabs
          onChange={onChangeTab}
          type="card"
          className="self-start bg-[#3A3A3A] rounded-lg pb-3 mt-5 w-full"
          items={[
            {
              key: "WALD_TEST",
              label: (
                <div className="w-[350px] text-center">
                  Symmetric Lag Granger Causality
                </div>
              ),
              animated: true,
              children: (
                <div>
                  <div className=" w-full flex flex-col gap-2">
                    {waldTestFormsList.map((form, index) => {
                      if ("entityID" in form) {
                        // Type is T_Entity
                        return (
                          <EntityForm
                            key={form.entityID} // Using a unique identifier as the key
                            entity={form}
                            currentPosition={index}
                            formListLength={waldTestFormsList.length}
                            handleOnChangeInput={handleOnChange}
                            handleOnChangeNumberInput={
                              handleOnChangeNumberInput
                            }
                            removeEntity={removeEntity}
                            duplicateEntity={duplicateEntity}
                            changeFragmentPosition={changeFragmentPosition}
                            changeHideCircle={handleOnChangeHideCircle}
                            changeHideEntity={handleOnChangeHideEntity}
                            changeEntityCalculatable={
                              handleChangeEntityCalculatableAndVisible
                            }
                          />
                        );
                      } else if ("ID" in form) {
                        // Type is T_VarabielName
                        return (
                          <VariableForm
                            key={form.ID} // Using a unique identifier as the key
                            variable={form}
                            currentPosition={index}
                            currentTab={currentTab}
                            waldTestFragmentListLength={
                              waldTestFormsList.length
                            }
                            nonCausalityFragmentListLength={
                              nonCausFormsList.length
                            }
                            handleOnChange={handleOnChange}
                            removeEntity={removeEntity}
                            changeFragmentPosition={changeFragmentPosition}
                          />
                        );
                      } else {
                        // Fallback if the type is not recognized
                        return null;
                      }
                    })}
                  </div>
                </div>
              ),
            },
            {
              key: "NON_CAUSALITY",
              label: (
                <div className="w-[350px]">
                  Asymmetric Lag Granger Causality
                </div>
              ),
              animated: true,
              children: (
                <div>
                  <div className=" w-full flex flex-col gap-2">
                    {nonCausFormsList.map((form, index) => {
                      if ("entityID" in form) {
                        // Type is T_NC_Entity
                        return (
                          <NonCausalityEntityForm
                            key={form.entityID} // Using a unique identifier as the key
                            entity={form}
                            currentPosition={index}
                            formListLength={waldTestFormsList.length}
                            handleOnChangeInput={handleOnChange}
                            handleOnChangeNumberInput={
                              handleOnChangeNumberInput
                            }
                            removeEntity={removeEntity}
                            duplicateEntity={duplicateEntity}
                            changeFragmentPosition={changeFragmentPosition}
                            changeHideCircle={handleOnChangeHideCircle}
                            changeHideEntity={handleOnChangeHideEntity}
                            changeEntityCalculatable={
                              handleChangeEntityCalculatableAndVisible
                            }
                          />
                        );
                      } else if ("ID" in form) {
                        // Type is T_VarabielName
                        return (
                          <VariableForm
                            key={form.ID} // Using a unique identifier as the key
                            variable={form}
                            currentPosition={index}
                            handleOnChange={handleOnChange}
                            removeEntity={removeEntity}
                            changeFragmentPosition={changeFragmentPosition}
                            currentTab={currentTab}
                            waldTestFragmentListLength={
                              waldTestFormsList.length
                            }
                            nonCausalityFragmentListLength={
                              nonCausFormsList.length
                            }
                          />
                        );
                      } else {
                        // Fallback if the type is not recognized
                        return null;
                      }
                    })}
                  </div>
                </div>
              ),
            },
          ]}
          tabBarStyle={{
            backgroundColor: "#1E1E1E",
          }}
        />
        <div className="flex flex-row gap-5 mt-4 self-start">
          <Button type="default" onClick={addAnotherEntity}>
            + Add Entity
          </Button>
          <Button type="default" onClick={addVariable}>
            + Add Variables
          </Button>
        </div>
      </div>

      <Modal
        title={<div>Settings</div>}
        centered
        maskClosable={false}
        open={openSettingsModal}
        onOk={() => {}}
        okButtonProps={{
          hidden: true,
        }}
        width={600}
        cancelButtonProps={{
          hidden: true,
        }}
        onCancel={() => setOpenSettingsModal(false)}
      >
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
          <div className="flex flex-col  border-2 p-3 rounded-md self-start gap-3">
            {/* <div
            className={`flex flex-col  border-2 p-3 rounded-md self-start ${
              isSettingPanelOpen ? "gap-3" : ""
            }`}
          > */}
            {/* <div className="flex gap-5 ">
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
            <Button
              size="large"
              type="text"
              shape="circle"
              icon={
                isSettingPanelOpen ? (
                  <UpSquareOutlined className="text-gray-600" />
                ) : (
                  <DownSquareOutlined className="text-gray-600" />
                )
              }
              onMouseEnter={() =>
                handleMouseMovementSettingsSpanBtn("MOUSE_ENTER")
              }
              onMouseLeave={() =>
                handleMouseMovementSettingsSpanBtn("MOUSE_LEAVE")
              }
            />
          </div> */}
            {/* <div
            className={`flex flex-col gap-2 w-full  transition-all duration-500 ease-in-out ${
              !isSettingPanelOpen
                ? "max-h-0 opacity-0 overflow-hidden"
                : "max-h-screen opacity-100"
            }`}
            onMouseEnter={() =>
              handleMouseMovementSettingsSpanBtn("MOUSE_ENTER")
            }
            onMouseLeave={() =>
              handleMouseMovementSettingsSpanBtn("MOUSE_LEAVE")
            }
          > */}
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="font-semibold">
                Width of variable names section
              </div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeSettings("variableNameAreaWidth", value)
                }
                value={entitySetting.variableNameAreaWidth}
                step={1}
                changeOnWheel
              />
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="font-semibold">
                Height of entity names section
              </div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeSettings("entityNameAreaHeight", value)
                }
                value={entitySetting.entityNameAreaHeight}
                step={1}
                changeOnWheel
              />
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="font-semibold">Arrow thickness</div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeSettings("arrowThickness", value)
                }
                value={entitySetting.arrowThickness}
                step={1}
                changeOnWheel
                max={15}
              />
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="font-semibold">Entity names font size</div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeSettings("entityNamesFontSize", value)
                }
                value={entitySetting.entityNamesFontSize}
                step={1}
                max={40}
                changeOnWheel
              />
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="font-semibold">Variable names font size</div>
              <InputNumber
                onChange={(value) =>
                  handleOnChangeSettings("varibleNamesFontSize", value)
                }
                value={entitySetting.varibleNamesFontSize}
                step={1}
                max={40}
                changeOnWheel
              />
            </div>
            <div className="self-end">
              <Button type="default" onClick={resetMapSettings}>
                Reset
              </Button>
            </div>
            {/* </div> */}
          </div>
        </ConfigProvider>
      </Modal>
    </ConfigProvider>
  );
};

export default RcegPage2;
