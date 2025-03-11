
import { useState } from 'react';
import { MoreHorizontal, Calendar, Clock, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface GoalCardProps {
  goal: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    createdAt: string;
    progress: number;
    tasks: number;
    completedTasks: number;
    intensity: 'extreme' | 'aggressive' | 'calm';
  };
}

export function GoalCard({ goal }: GoalCardProps) {
  const [expanded, setExpanded] = useState(false);

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
    <Card className={`transition-all duration-200 ${expanded ? 'shadow-md' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>Created on {goal.createdAt}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Goal</DropdownMenuItem>
              <DropdownMenuItem>Add Task</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Due: {goal.dueDate}</span>
          </div>
          {getIntensityBadge(goal.intensity)}
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{goal.completedTasks}/{goal.tasks} tasks completed</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" /> Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" /> More
              </>
            )}
          </Button>
        </div>
        
        {expanded && (
          <div className="pt-2 border-t mt-2">
            <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Schedule Time
              </Button>
              <Button size="sm">Add Task</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
