
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Work', value: 8, color: '#1E40AF' },
  { name: 'Exercise', value: 1.5, color: '#0D9488' },
  { name: 'Tasks', value: 3, color: '#F59E0B' },
  { name: 'Sleep', value: 8, color: '#6366F1' },
  { name: 'Free Time', value: 3.5, color: '#10B981' },
];

const COLORS = data.map(item => item.color);

export function TimeDistributionChart() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Daily Time Distribution</CardTitle>
        <CardDescription>
          How your 24 hours are currently allocated
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}h`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} hours`, 'Time Spent']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
