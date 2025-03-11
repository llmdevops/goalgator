
import { Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const goals = [
  {
    id: 1,
    title: 'Complete Website Project',
    dueDate: 'June 15, 2024',
    progress: 65,
    intensity: 'extreme',
  },
  {
    id: 2,
    title: 'Learn Spanish Basics',
    dueDate: 'August 30, 2024',
    progress: 45,
    intensity: 'calm',
  },
  {
    id: 3,
    title: 'Fitness Challenge',
    dueDate: 'July 10, 2024',
    progress: 30,
    intensity: 'aggressive',
  },
];

export function TopGoals() {
  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'extreme':
        return <Badge className="bg-red-500 hover:bg-red-600">Extreme</Badge>;
      case 'aggressive':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Aggressive</Badge>;
      case 'calm':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Calm</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Top Goals
        </CardTitle>
        <CardDescription>Your main objectives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{goal.title}</h3>
              {getIntensityBadge(goal.intensity)}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>Due: {goal.dueDate}</span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
