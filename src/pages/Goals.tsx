
import { useState } from 'react';
import { Plus, Target, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoalCard } from '@/components/goals/GoalCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const goals = [
  {
    id: 1,
    title: 'Complete Website Project',
    description: 'Finish the design and development of the client website including responsive design, content integration, and performance optimization.',
    dueDate: 'June 15, 2024',
    createdAt: 'May 1, 2024',
    progress: 65,
    tasks: 10,
    completedTasks: 6,
    intensity: 'extreme' as const,
  },
  {
    id: 2,
    title: 'Learn Spanish Basics',
    description: 'Master basic Spanish vocabulary, grammar, and conversational phrases through daily practice and structured lessons.',
    dueDate: 'August 30, 2024',
    createdAt: 'April 15, 2024',
    progress: 45,
    tasks: 20,
    completedTasks: 9,
    intensity: 'calm' as const,
  },
  {
    id: 3,
    title: 'Fitness Challenge',
    description: 'Complete a 30-day fitness challenge to improve strength, endurance, and overall health through consistent workouts.',
    dueDate: 'July 10, 2024',
    createdAt: 'June 1, 2024',
    progress: 30,
    tasks: 30,
    completedTasks: 9,
    intensity: 'aggressive' as const,
  },
  {
    id: 4,
    title: 'Read 5 Business Books',
    description: 'Read and take notes on 5 business and productivity books to improve professional knowledge and skills.',
    dueDate: 'July 31, 2024',
    createdAt: 'May 15, 2024',
    progress: 20,
    tasks: 5,
    completedTasks: 1,
    intensity: 'calm' as const,
  },
];

export default function Goals() {
  const [sortOrder, setSortOrder] = useState('due-date');
  const [searchTerm, setSearchTerm] = useState('');
  const [intensityFilter, setIntensityFilter] = useState('all');
  
  // Filter and sort goals
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntensity = intensityFilter === 'all' || goal.intensity === intensityFilter;
    return matchesSearch && matchesIntensity;
  }).sort((a, b) => {
    if (sortOrder === 'due-date') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortOrder === 'progress-asc') {
      return a.progress - b.progress;
    } else if (sortOrder === 'progress-desc') {
      return b.progress - a.progress;
    }
    return 0;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            Goals
          </h1>
          <p className="text-muted-foreground">Set, track, and achieve your goals</p>
        </div>
        
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-1">
          <Input
            placeholder="Search goals..."
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                {sortOrder.includes('desc') ? (
                  <SortDesc className="h-4 w-4" />
                ) : (
                  <SortAsc className="h-4 w-4" />
                )}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <DropdownMenuRadioItem value="due-date">Due Date (Soonest)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="progress-desc">Progress (Highest)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="progress-asc">Progress (Lowest)</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
        
        {filteredGoals.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-muted-foreground">No goals found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchTerm('');
              setIntensityFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
