import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { previousOrders } from '../data/dummyData';
import { CheckCircle, Clock, Phone, IndianRupee } from 'lucide-react';

const PreviousOrders = () => {
  const formatCompletedTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Previous Orders</h1>
          <p className="text-muted-foreground">View completed orders history</p>
        </div>
        <div className="text-lg font-semibold bg-success/10 px-4 py-2 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-success" />
          {previousOrders.length} Completed
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {previousOrders.map((order) => (
          <Card key={order.id} className="shadow-md border-l-4 border-l-success">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-primary">#{order.id}</CardTitle>
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Completed {formatCompletedTime(order.completedAt)}
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
                <span className="flex items-center text-lg text-success">
                  <IndianRupee className="w-4 h-4" />
                  {order.total}
                </span>
              </div>

              {/* Completion Time */}
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Completed at:</p>
                <p className="text-sm font-medium">
                  {order.completedAt.toLocaleString('en-IN', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {previousOrders.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No previous orders</p>
          <p className="text-sm text-muted-foreground">Completed orders will appear here</p>
        </div>
      )}
    </div>
  );
};

export default PreviousOrders;