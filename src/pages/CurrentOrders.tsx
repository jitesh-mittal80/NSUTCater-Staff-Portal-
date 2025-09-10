import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { currentOrders as initialOrders } from '../data/dummyData';
import { Clock, Phone, IndianRupee } from 'lucide-react';

const CurrentOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Placed':
        return 'bg-info text-info-foreground';
      case 'Preparing':
        return 'bg-warning text-warning-foreground';
      case 'Ready':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Status Updated",
      description: `Order ${orderId} marked as ${newStatus}`,
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ${diffInMinutes % 60}m ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Current Orders</h1>
          <p className="text-muted-foreground">Manage live orders and update status</p>
        </div>
        <div className="text-lg font-semibold bg-primary/10 px-4 py-2 rounded-lg">
          {orders.length} Active Orders
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <Card key={order.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-primary">#{order.id}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {formatTime(order.timeStamp)}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {order.phoneNumber}
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Items:</h4>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-3 h-3" />
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 border-t font-bold">
                <span>Total:</span>
                <span className="flex items-center text-lg text-primary">
                  <IndianRupee className="w-4 h-4" />
                  {order.total}
                </span>
              </div>

              {/* Status Update */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Update Status:</label>
                <Select
                  value={order.status}
                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Placed">Placed</SelectItem>
                    <SelectItem value="Preparing">Preparing</SelectItem>
                    <SelectItem value="Ready">Ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No current orders</p>
          <p className="text-sm text-muted-foreground">New orders will appear here</p>
        </div>
      )}
    </div>
  );
};

export default CurrentOrders;