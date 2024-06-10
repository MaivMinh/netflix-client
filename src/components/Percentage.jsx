import React from "react";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct*10) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="white"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"0.5rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="33%"
      y="33%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"20px"}
      fontWeight={"bold"}
      className="text-white"
    >
      {percentage}
    </text>
  );
};

const Pie = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg className="absolute top-0 mt-[200px]" width={300} height={300}>
      <g transform={`rotate(-90 ${"100 100"})`} >
        <Circle colour="lightgrey" />
        <Circle colour={colour} pct={pct} />
      </g>  
      <Text percentage={pct} />
    </svg>
  );
};

export default Pie;
