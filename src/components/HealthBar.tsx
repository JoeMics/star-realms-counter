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
  health: {
    label: 'Health',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function HealthBar({
  health,
  startingHealth,
  healthModifier,
}: {
  health: number;
  startingHealth: number;
  healthModifier: number;
}) {
  const chartData = [{ health: health, fill: 'var(--color-health)' }];
  const barLength = (health / startingHealth) * 360;

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-2 aspect-square min-h-48 min-w-48'
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={barLength}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType='circle'
          radialLines={false}
          stroke='none'
          className='first:shadow-white-500/50 first:fill-muted first:shadow-lg last:fill-background'
          polarRadius={[86, 74]}
        />
        <RadialBar
          dataKey='health'
          cornerRadius={10}
          animationDuration={200}
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
                      className='fill-green-500 text-6xl font-bold'
                    >
                      {chartData && chartData[0].health.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 30}
                      className='fill-muted-foreground text-base'
                    >
                      Health
                    </tspan>

                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 50}
                      className={`text-sm font-bold ${healthModifier >= 0 ? 'fill-green-500' : 'fill-red-500'} ${healthModifier === 0 && 'hidden'}`}
                    >
                      {healthModifier > 0
                        ? '+' + healthModifier
                        : healthModifier}
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
