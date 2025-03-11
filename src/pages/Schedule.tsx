
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, Mail, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for the calendar events
const events = [
  {
    id: 1,
    title: 'Research project outline',
    type: 'task',
    time: '09:00 - 11:00',
    intensity: 'aggressive',
  },
  {
    id: 2,
    title: 'Team meeting',
    type: 'work',
    time: '11:30 - 12:30',
    intensity: 'normal',
  },
  {
    id: 3,
    title: 'Lunch break',
    type: 'break',
    time: '12:30 - 13:30',
    intensity: 'calm',
  },
  {
    id: 4,
    title: 'Weekly workout',
    type: 'personal',
    time: '17:00 - 18:00',
    intensity: 'extreme',
  },
  {
    id: 5,
    title: 'Spanish practice',
    type: 'task',
    time: '19:00 - 19:30',
    intensity: 'calm',
  },
];

// Generate weekdays for the current week
const generateWeekDays = () => {
  const today = new Date();
  const day = today.getDay(); // 0 is Sunday
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  
  const monday = new Date(today.setDate(diff));
  const weekDays = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDays.push({
      date: date,
      isToday: new Date().toDateString() === date.toDateString(),
    });
  }
  
  return weekDays;
};

export default function Schedule() {
  const [weekDays, setWeekDays] = useState(generateWeekDays());
  const [selectedDay, setSelectedDay] = useState(
    weekDays.find(day => day.isToday) || weekDays[0]
  );
  const [view, setView] = useState('day');
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    const firstDay = weekDays[0].date;
    const newFirstDay = new Date(firstDay);
    
    if (direction === 'prev') {
      newFirstDay.setDate(firstDay.getDate() - 7);
    } else {
      newFirstDay.setDate(firstDay.getDate() + 7);
    }
    
    const newWeekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(newFirstDay);
      date.setDate(newFirstDay.getDate() + i);
      newWeekDays.push({
        date: date,
        isToday: new Date().toDateString() === date.toDateString(),
      });
    }
    
    setWeekDays(newWeekDays);
    // Reset selectedDay to first day of the new week
    setSelectedDay(newWeekDays[0]);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const formatDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const getEventClass = (type: string, intensity: string) => {
    let baseClass = 'border-l-4 p-3 mb-2 rounded-md bg-background';
    
    if (type === 'task') {
      switch (intensity) {
        case 'extreme':
          return `${baseClass} border-red-500`;
        case 'aggressive':
          return `${baseClass} border-amber-500`;
        case 'calm':
          return `${baseClass} border-blue-500`;
        default:
          return `${baseClass} border-gray-500`;
      }
    } else if (type === 'work') {
      return `${baseClass} border-indigo-500`;
    } else if (type === 'break') {
      return `${baseClass} border-green-500`;
    } else if (type === 'personal') {
      return `${baseClass} border-purple-500`;
    }
    
    return baseClass;
  };
  
  const getEventBadge = (type: string) => {
    switch (type) {
      case 'task':
        return <Badge className="bg-primary hover:bg-primary/90">Task</Badge>;
      case 'work':
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">Work</Badge>;
      case 'break':
        return <Badge className="bg-green-500 hover:bg-green-600">Break</Badge>;
      case 'personal':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Personal</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            Schedule
          </h1>
          <p className="text-muted-foreground">Manage your time and availability</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Email Schedule
          </Button>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <CardTitle>{formatMonth(weekDays[0].date)}</CardTitle>
              
              <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Select value={view} onValueChange={setView}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => {
                setWeekDays(generateWeekDays());
                setSelectedDay(generateWeekDays().find(day => day.isToday) || generateWeekDays()[0]);
              }}>
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day, index) => (
              <Button
                key={index}
                variant={selectedDay.date.toDateString() === day.date.toDateString() ? "default" : "outline"}
                className={`flex flex-col h-auto py-3 ${day.isToday ? "border-primary" : ""}`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="text-xs">{formatDayName(day.date)}</span>
                <span className="text-lg font-semibold">{day.date.getDate()}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              Schedule for {formatDate(selectedDay.date)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className={getEventClass(event.type, event.intensity)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{event.time}</span>
                    {getEventBadge(event.type)}
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events scheduled for this day.</p>
                  <Button variant="outline" className="mt-4">
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Free Time Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">Morning</p>
                <p className="text-sm text-muted-foreground mb-2">8:00 AM - 9:00 AM</p>
                <Button size="sm" variant="outline" className="w-full">Allocate</Button>
              </div>
              
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">Afternoon</p>
                <p className="text-sm text-muted-foreground mb-2">2:00 PM - 4:00 PM</p>
                <Button size="sm" variant="outline" className="w-full">Allocate</Button>
              </div>
              
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium">Evening</p>
                <p className="text-sm text-muted-foreground mb-2">8:00 PM - 10:00 PM</p>
                <Button size="sm" variant="outline" className="w-full">Allocate</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
