import React from 'react'

interface numProp {
  num: string | number,
  unit: string,
  flip: boolean,
}

export const NumberBox = ({ num, unit, flip }: numProp) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-transparent flex flex-col items-center justify-center rounded-lg w-8 h-8">
        <div className="rounded-md bg-[#343650] w-full h-full"></div>
        <div className="text-md absolute text-neutral-300 z-2 font-bold font-redhat font-mono">
          {num}
        </div>
        <div className="rounded-b-md rounded-t-md bg-[#2c2e3f] w-full h-full"></div>

        {/* Flip Animation */}
        <div className={`absolute w-full h-1/2 top-0 rounded-t-lg z-1 ${flip ? 'animate-flip bg-[#1e1f29] opacity-20' : 'bg-transparent'}`}></div>

        {/* Two Small Dots */}
        <div className="absolute -right-1 top-[12px] rounded-full w-[8px] h-[8px] bg-gray-700"></div>
        <div className="absolute -left-1 top-[12px] rounded-full w-[8px] h-[8px] bg-gray-700" ></div>
      </div>
      <p className="text-sm mt-1 font-semibold text-neutral-300 ">
        {unit}
      </p>
    </div>
  )
}