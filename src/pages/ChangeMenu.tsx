import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { menuItems as initialMenuItems } from '../data/dummyData';
import { Save, IndianRupee, CheckCircle, XCircle } from 'lucide-react';

const ChangeMenu = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const toggleAvailability = (itemId: number) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, available: !item.available }
          : item
      )
    );
    setHasChanges(true);
  };

  const saveChanges = () => {
    // In a real app, this would make an API call
    toast({
      title: "Menu Updated",
      description: "All menu changes have been saved successfully",
    });
    setHasChanges(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Main Course': 'bg-primary/10 text-primary',
      'Rice': 'bg-warning/10 text-warning',
      'Bread': 'bg-info/10 text-info',
      'Beverages': 'bg-success/10 text-success',
      'Snacks': 'bg-destructive/10 text-destructive',
      'Special': 'bg-purple-100 text-purple-700',
      'Sides': 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const availableCount = menuItems.filter(item => item.available).length;
  const totalCount = menuItems.length;

  // Group items by category
  const itemsByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Array<typeof menuItems[0]>>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Update item availability and manage menu</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Available Items</p>
            <p className="text-2xl font-bold text-primary">{availableCount}/{totalCount}</p>
          </div>
          {hasChanges && (
            <Button onClick={saveChanges} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(itemsByCategory).map(([category, items]: [string, Array<typeof menuItems[0]>]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{category}</h2>
              <Badge className={getCategoryColor(category)}>
                {items.filter(item => item.available).length}/{items.length} available
              </Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card 
                  key={item.id} 
                  className={`shadow-md transition-all ${
                    item.available 
                      ? 'border-l-4 border-l-success hover:shadow-lg' 
                      : 'border-l-4 border-l-destructive bg-muted/30'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <IndianRupee className="w-4 h-4" />
                          <span className="text-lg font-semibold">{item.price}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {item.available ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <Switch
                          checked={item.available}
                          onCheckedChange={() => toggleAvailability(item.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <span className={`text-sm font-medium ${
                        item.available ? 'text-success' : 'text-destructive'
                      }`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasChanges && (
        <div className="fixed bottom-6 right-6">
          <Button 
            onClick={saveChanges} 
            size="lg" 
            className="shadow-lg gap-2"
          >
            <Save className="w-5 h-5" />
            Save All Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeMenu;