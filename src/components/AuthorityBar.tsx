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
  authority: {
    label: 'Authority',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function AuthorityBar({
  authority,
  startingAuthority,
  authorityModifier,
}: {
  authority: number;
  startingAuthority: number;
  authorityModifier: number;
}) {
  const chartData = [{ authority, fill: 'var(--color-authority)' }];
  const barLength = 180 - 360 * (authority / startingAuthority);

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-2 aspect-square h-auto min-h-48 min-w-48'
    >
      <RadialBarChart
        data={chartData}
        startAngle={180}
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
          dataKey='authority'
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
                      {chartData && chartData[0].authority.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 30}
                      className='fill-muted-foreground text-base'
                    >
                      Authority
                    </tspan>

                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 50}
                      className={`text-sm font-bold ${authorityModifier >= 0 ? 'fill-green-500' : 'fill-red-500'} ${authorityModifier === 0 && 'hidden'}`}
                    >
                      {authorityModifier > 0
                        ? '+' + authorityModifier
                        : authorityModifier}
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
