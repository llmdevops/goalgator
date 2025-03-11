
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FreeTimeBlock() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Available Time Blocks
        </CardTitle>
        <CardDescription>Unused time in your schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="bg-muted p-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Today</p>
                <p className="text-sm text-muted-foreground">4:00 PM - 6:00 PM</p>
              </div>
              <Button size="sm" variant="outline">Allocate</Button>
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Tomorrow</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 11:30 AM</p>
              </div>
              <Button size="sm" variant="outline">Allocate</Button>
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Friday</p>
                <p className="text-sm text-muted-foreground">2:00 PM - 5:00 PM</p>
              </div>
              <Button size="sm" variant="outline">Allocate</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
