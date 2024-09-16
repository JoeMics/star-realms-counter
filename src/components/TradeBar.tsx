'use client';

import {
  RadialBarChart,
  PolarGrid,
  RadialBar,
  PolarRadiusAxis,
  Label,
  Cell,
} from 'recharts';
import { ChartConfig, ChartContainer } from './ui/chart';

const chartConfig = {
  trade: {
    label: 'Trade',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function TradeBar({ trade }: { trade: number }) {
  const chartData = [{ trade, fill: 'var(--color-trade)' }];
  const barLength = (trade / 20) * 360;

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-2 aspect-square h-auto min-h-48 min-w-48'
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={barLength}
        innerRadius={75}
        outerRadius={115}
      >
        <PolarGrid
          gridType='circle'
          radialLines={false}
          stroke='none'
          className='first:shadow-white-500/50 first:fill-muted first:shadow-lg last:fill-background'
          polarRadius={[82, 68]}
        />
        <RadialBar
          dataKey='trade'
          cornerRadius={10}
          animationDuration={500}
          animationEasing='ease-in-out'
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill}
              style={{
                filter: `drop-shadow(0px 0px 6px ${entry.fill}`,
              }}
            />
          ))}
        </RadialBar>
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='fill-yellow-600 text-6xl font-bold'
                    >
                      {chartData && chartData[0].trade.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 30}
                      className='fill-muted-foreground text-base'
                    >
                      Trade
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
