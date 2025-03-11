
import { useState } from 'react';
import { 
  Plus, 
  CheckSquare, 
  Filter, 
  Calendar as CalendarIcon, 
  ListFilter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const tasks = [
  {
    id: 1,
    title: 'Research project outline',
    description: 'Research and prepare the outline for the upcoming presentation',
    goalId: 1,
    goalTitle: 'Complete Website Project',
    dueDate: 'June 5, 2024',
    timeRequired: '2 hours',
    completed: false,
    intensity: 'aggressive',
  },
  {
    id: 2,
    title: 'Weekly workout routine',
    description: 'Complete this week\'s workout sessions according to plan',
    goalId: 3,
    goalTitle: 'Fitness Challenge',
    dueDate: 'June 4, 2024',
    timeRequired: '1 hour',
    completed: false,
    intensity: 'extreme',
  },
  {
    id: 3,
    title: 'Learn new vocabulary',
    description: 'Study and memorize the new vocabulary list for this week',
    goalId: 2,
    goalTitle: 'Learn Spanish Basics',
    dueDate: 'June 6, 2024',
    timeRequired: '30 minutes',
    completed: false,
    intensity: 'calm',
  },
  {
    id: 4,
    title: 'Read Chapter 3',
    description: 'Read and take notes on Chapter 3 of "The Lean Startup"',
    goalId: 4,
    goalTitle: 'Read 5 Business Books',
    dueDate: 'June 7, 2024',
    timeRequired: '1.5 hours',
    completed: false,
    intensity: 'calm',
  },
  {
    id: 5,
    title: 'Create wireframes',
    description: 'Design wireframes for the homepage and product pages',
    goalId: 1,
    goalTitle: 'Complete Website Project',
    dueDate: 'June 8, 2024',
    timeRequired: '3 hours',
    completed: true,
    intensity: 'aggressive',
  },
];

export default function Tasks() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [intensityFilter, setIntensityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const upcomingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  const filteredTasks = (activeTab === 'upcoming' ? upcomingTasks : completedTasks)
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIntensity = intensityFilter === 'all' || task.intensity === intensityFilter;
      return matchesSearch && matchesIntensity;
    });
  
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
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            Tasks
          </h1>
          <p className="text-muted-foreground">
            Manage and track your daily activities
          </p>
        </div>
        
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-1">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Intensity
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={intensityFilter} onValueChange={setIntensityFilter}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="extreme">Extreme</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="aggressive">Aggressive</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="calm">Calm</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="flex items-center gap-1">
            <ListFilter className="h-4 w-4" />
            Goal
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            Upcoming ({upcomingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <CheckSquare className="h-4 w-4" />
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="task-card">
              <div className="flex items-start gap-4">
                <Checkbox id={`task-${task.id}`} checked={task.completed} />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="outline">{task.goalTitle}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {task.dueDate}
                    </Badge>
                    {getIntensityBadge(task.intensity)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{task.timeRequired}</div>
              </div>
            </Card>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No tasks found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm('');
                setIntensityFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="task-card opacity-70">
              <div className="flex items-start gap-4">
                <Checkbox id={`task-${task.id}`} checked={task.completed} />
                <div className="flex-1">
                  <h3 className="font-medium text-lg line-through">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="outline">{task.goalTitle}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {task.dueDate}
                    </Badge>
                    {getIntensityBadge(task.intensity)}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{task.timeRequired}</div>
              </div>
            </Card>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">No completed tasks matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm('');
                setIntensityFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
