import { Card } from "./Card";

export default function ColorLegend() {
  return (
    <div className="flex gap-4 p-4 ml-12 w-full bg-white">
      <Card className="w-5 h-[425px] relative rounded-none border border-gray-300">
        {/* Horizontal line with labels */}
        <div className="absolute -top-[1px] left-0 right-0 h-[1px] bg-gray-300" />
        <div className="absolute -top-4 left-0 text-[10px] font-semibold">
          P-value
        </div>
        <div className="absolute -top-4 right-0 text-[10px] font-semibold">
          TE
        </div>

        {/* Color gradient bar */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              #F60000 0%,
              #F60000 10%,
              #FF9933 25%,
              #FFFF00 40%,
              #FFFF00 50%,
              #00B050 70%,
              #0400B7 85%,
              #0400B7 100%
            )`,
          }}
        />

        {/* Horizontal divider lines */}
        <div className="absolute inset-0 flex flex-col">
          <div className="h-[20%] border-b border-black/50 relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
          <div className="h-[20%] border-b border-black/50 relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
          <div className="h-[20%] border-b border-black/50 relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
          <div className="h-[40%] relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
        </div>

        {/* P-value Labels */}
        <div className="absolute -left-8 inset-y-0 flex flex-col text-[10px] font-semibold">
          <div className="h-[20%] flex items-start pt-1">1%</div>
          <div className="h-[20%] flex items-start pt-1">5%</div>
          <div className="h-[20%] flex items-start pt-1">10%</div>
          <div className="h-[40%] flex items-start pt-1">{">"}10%</div>
        </div>

        {/* TE Labels */}
        <div className="absolute -right-8 inset-y-0 flex flex-col text-[10px]">
          <div className="h-[20%] flex flex-col justify-between py-1">
            <span>High</span>
            <span>Low</span>
          </div>
          <div className="h-[20%] flex flex-col justify-between py-1">
            <span>High</span>
            <span>Low</span>
          </div>
          <div className="h-[20%] flex flex-col justify-between py-1">
            <span>High</span>
            <span>Low</span>
          </div>
          <div className="h-[40%] flex flex-col justify-between py-1">
            <span>High</span>
            <span className="mt-auto">Low</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const ColorLegendHorizontal: React.FC<{
  width: number;
}> = ({ width }) => {
  return (
    <div
      className={`flex gap-4 p-4 w-full bg-white border-2`}
      style={{
        width: `${width}px`,
        height: "50px",
      }}
    >
      <div
        className={`h-5 /*w-[425px]*/  relative rounded-none border border-gray-300`}
        style={{
          width: `${width}px`,
        }}
      >
        {/* Horizontal line with labels */}
        <div className="absolute -top-[1px] left-0 right-0 h-[1px] bg-gray-300" />
        <div className="absolute -top-4 left-0 text-[10px] font-semibold">
          P-value
        </div>
        <div className="absolute -top-4 right-0 text-[10px] font-semibold">
          TE
        </div>

        {/* Color gradient bar */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right,
              #F60000 0%,
              #F60000 10%,
              #FF9933 25%,
              #FFFF00 40%,
              #FFFF00 50%,
              #00B050 70%,
              #0400B7 85%,
              #0400B7 100%
            )`,
          }}
        />

        {/* Horizontal divider lines */}
        <div className="absolute inset-0 flex flex-row">
          <div className="w-[20%] border-b border-black/50 relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
          <div className="w-[20%] border-b border-black/50 relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
          <div className="w-[20%] border-b border-black/50 relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
          <div className="w-[40%] relative">
            <div className="absolute left-1/2 h-full w-[1px] bg-black/50" />
          </div>
        </div>

        {/* P-value Labels */}
        <div className="absolute -left-8 inset-x-0 flex flex-row text-[10px] font-semibold">
          <div className="w-[20%] flex items-start pt-1">1%</div>
          <div className="w-[20%] flex items-start pt-1">5%</div>
          <div className="w-[20%] flex items-start pt-1">10%</div>
          <div className="w-[40%] flex items-start pt-1">{">"}10%</div>
        </div>

        {/* TE Labels */}
        <div className="absolute -right-8 inset-y-0 flex flex-row text-[10px] w-full">
          <div className="w-[20%] flex flex-row justify-between px-1">
            <span>High</span>
            <span>Low</span>
          </div>
          <div className="w-[20%] flex flex-row justify-between px-1">
            <span>High</span>
            <span>Low</span>
          </div>
          <div className="w-[20%] flex flex-row justify-between px-1">
            <span>High</span>
            <span>Low</span>
          </div>
          <div className="w-[40%] flex flex-row justify-between px-1">
            <span>High</span>
            <span className="mt-auto">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};
