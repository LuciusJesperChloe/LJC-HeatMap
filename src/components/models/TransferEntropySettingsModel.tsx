import { Button, ColorPicker, Input, InputNumber, Modal, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { TColorChangePorps } from "../../pages/time-varying-transfer-entropy/Tvte";
import { LJCDataContext } from "../../context/LJCDataContext";
import { Color } from "antd/es/color-picker";

const ColorConditionsNumberInput: React.FC<{
  onChangeColorCondition: (updatedObj: TColorChangePorps) => void;
  condition: TColorChangePorps;
  value: number;
  inputName: string;
}> = ({ onChangeColorCondition, condition, value, inputName }) => {
  const onChange = (value: number | null) => {
    if (value === null || value < 0) return;
    onChangeColorCondition({
      ...condition,
      [inputName]: value,
    });
  };

  return (
    <InputNumber
      onChange={onChange}
      changeOnWheel
      size="small"
      className="text-[10px] w-16"
      step={0.0001}
      value={value}
    />
  );
};

const TransferEntropySettingsModel: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  colorSettings: TColorChangePorps[];
  setColorSettings: (colorSettings: TColorChangePorps[]) => void;
}> = ({ open, setOpen }) => {
  const { tvte } = useContext(LJCDataContext);

  const onChangeColorCondition = (updatedObj: TColorChangePorps) => {
    tvte.setColorSettings((prev) =>
      prev.map((item) => (item.index === updatedObj.index ? updatedObj : item))
    );
  };

  const handleResetClick = () => {
    tvte.setColorCondtionsDefault();
  };

  const onChangeHexColor = (oldObj: TColorChangePorps, value: string) => {
    tvte.setColorSettings((prev) =>
      prev.map((item) =>
        item.index === oldObj.index
          ? {
              ...oldObj,
              hexColor: value,
            }
          : item
      )
    );
  };

  return (
    <Modal
      title={
        <div className="w-fill flex flex-row justify-between items-center mr-7">
          <div className="flex flex-row gap-3">
            <div className="text-sm font-normal">Unit root acceptance rate</div>
            <div>
              <InputNumber
                //   onChange={(value) => onChangeCanvasSize(value, "width")}
                //   value={canvas.width}
                step={5}
                changeOnWheel
                size="small"
              />
            </div>
          </div>
          <Button
            type="default"
            size="small"
            className="px-4 border-black"
            onClick={handleResetClick}
          >
            Reset
          </Button>
        </div>
      }
      centered
      maskClosable={false}
      open={open}
      onOk={() => {}}
      okButtonProps={{
        hidden: true,
      }}
      width={600}
      cancelButtonProps={{
        hidden: true,
      }}
      onCancel={() => setOpen(false)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between gap-5">
          <div className="flex flex-row justify-start items-center gap-1">
            <div className="flex flex-row items-end">
              <div>Variable 1</div>
              <Tooltip title="Variable 1">
                <div className="flex justify-center items-center border-[1px] rounded-[50%] w-[10px] h-[10px] p-[2px] text-[8px] ml-1 text-gray-500">
                  !
                </div>
              </Tooltip>
            </div>
            <Input
              placeholder="Variable 1"
              size="small"
              className="w-40"
              value={tvte.variableNames.var1}
              onChange={(e) =>
                tvte.setVariableNames((prev) => ({
                  ...prev,
                  var1: e.target.value.trim(),
                }))
              }
            />
          </div>
          <div className="flex flex-row justify-start items-center gap-1 mr-7">
            <div className="flex flex-row items-end">
              <div>Variable 2</div>
              <Tooltip title="Variable 2">
                <div className="flex justify-center items-center border-[1px] rounded-[50%] w-[10px] h-[10px] p-[2px] text-[8px] ml-1 text-gray-500">
                  !
                </div>
              </Tooltip>
            </div>
            <Input
              placeholder="Variable 2"
              size="small"
              className="w-40"
              value={tvte.variableNames.var2}
              onChange={(e) =>
                tvte.setVariableNames((prev) => ({
                  ...prev,
                  var2: e.target.value.trim(),
                }))
              }
            />
          </div>
        </div>
        {/* Color change */}
        <div className="flex flex-row items-end mt-2">
          <div>Colour change</div>
          <Tooltip title="Colour change">
            <div className="flex justify-center items-center border-[1px] rounded-[50%] w-[10px] h-[10px] p-[2px] text-[8px] ml-1 text-gray-500">
              !
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-1 self-center">
          {tvte.colorSettings.map((cSetting, index) => (
            <div className="flex flex-row items-center gap-2" key={index}>
              <ColorConditionsNumberInput
                condition={cSetting}
                onChangeColorCondition={onChangeColorCondition}
                value={cSetting.pvalMax}
                inputName="pvalMax"
              />
              <div className="text-[10px]">{"=< p-val <"}</div>
              <ColorConditionsNumberInput
                condition={cSetting}
                onChangeColorCondition={onChangeColorCondition}
                value={cSetting.pvalMin}
                inputName="pvalMin"
              />

              <div className="text-[10px]">{"&&"}</div>
              <ColorConditionsNumberInput
                condition={cSetting}
                onChangeColorCondition={onChangeColorCondition}
                value={cSetting.TE_Max}
                inputName="TE_Max"
              />

              <div className="text-[10px]">{"<= TE <"}</div>
              <ColorConditionsNumberInput
                condition={cSetting}
                onChangeColorCondition={onChangeColorCondition}
                value={cSetting.TE_Min}
                inputName="TE_Min"
              />
              <div className="text-[10px]">{"="}</div>
              {/* <Input
                size="middle"
                className="w-24 text-[10px]"
                value={cSetting.hexColor}
                onChange={(e) => onChangeHexColor(cSetting, e.target.value)}
              /> */}
              <ColorPicker
                defaultValue={cSetting.hexColor}
                showText
                allowClear
                onChange={
                  (value: Color, css: string) =>
                    onChangeHexColor(cSetting, value.toHexString())
                  //   console.log("Color picked: ", value.toHexString())
                }
                value={cSetting.hexColor}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TransferEntropySettingsModel;
