
import { NextTask } from '@/components/dashboard/NextTask';
import { TopGoals } from '@/components/dashboard/TopGoals';
import { TimeDistributionChart } from '@/components/dashboard/TimeDistributionChart';
import { FreeTimeBlock } from '@/components/dashboard/FreeTimeBlock';
import { Calendar, Mail, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your goals, manage tasks, and optimize your time.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Summary
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Sync Calendar
          </Button>
          <Button className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Notifications
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <TimeDistributionChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NextTask />
            <FreeTimeBlock />
          </div>
        </div>
        
        <div className="space-y-6">
          <TopGoals />
        </div>
      </div>
    </div>
  );
}
