import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => `  --color-${key}: ${itemConfig.theme?.[theme] || itemConfig.color};`)
  .join("\n")}
}`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef((props, ref) => {
  const { active, payload, className } = props;
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div ref={ref} className={cn("tooltip-container", className)}>
      {payload.map((item, index) => (
        <div key={index} className="tooltip-item">
          <span>{config[item.name]?.label || item.name}</span>
          <span>{item.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef(({ className, payload }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn("legend-container", className)}>
      {payload.map((item) => (
        <div key={item.value} className="legend-item">
          <div className="legend-color" style={{ backgroundColor: item.color }} />
          <span>{config[item.value]?.label || item.value}</span>
        </div>
      ))}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };