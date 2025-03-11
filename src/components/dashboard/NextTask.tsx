
import { CheckSquare, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function NextTask() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          Next Task
        </CardTitle>
        <CardDescription>Your upcoming priority</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Research project outline</h3>
          <p className="text-sm text-muted-foreground">
            Research and prepare the outline for the upcoming presentation
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            2 hours
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Today, 2:00 PM
          </Badge>
          <Badge className="bg-amber-500 hover:bg-amber-600">Aggressive</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Postpone</Button>
        <Button size="sm">Mark Complete</Button>
      </CardFooter>
    </Card>
  );
}
