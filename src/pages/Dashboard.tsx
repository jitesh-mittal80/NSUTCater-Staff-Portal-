import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { currentOrders, previousOrders } from '../data/dummyData';
import { Clock, TrendingUp, CheckCircle, DollarSign } from 'lucide-react';

const Dashboard = () => {
  // Calculate this week's orders (for demo, using current orders as this week)
  const thisWeekOrders = currentOrders;
  const todayOrders = currentOrders.filter(() => Math.random() > 0.5); // Random subset for demo
  const previousWeekOrders = previousOrders.slice(0, 5); // First 5 as previous week

  // Calculate statistics
  const thisWeekTotal = thisWeekOrders.reduce((sum, order) => sum + order.total, 0);
  const todayTotal = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const previousWeekTotal = previousWeekOrders.reduce((sum, order) => sum + order.total, 0);

  const OrderCard = ({ order, showStatus = false }) => (
    <div key={order.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-sm">#{order.id}</h4>
          <p className="text-xs text-muted-foreground">{order.customerName}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-sm">₹{order.total}</p>
          {showStatus && (
            <Badge 
              variant={order.status === 'Ready' ? 'default' : order.status === 'Preparing' ? 'secondary' : 'outline'}
              className="text-xs mt-1"
            >
              {order.status}
            </Badge>
          )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        {order.items.slice(0, 2).map(item => item.name).join(', ')}
        {order.items.length > 2 && ` +${order.items.length - 2} more`}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your catering operations</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{todayTotal}</div>
            <p className="text-xs text-muted-foreground">
              {todayOrders.length} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{thisWeekTotal}</div>
            <p className="text-xs text-muted-foreground">
              {thisWeekOrders.length} orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Previous Week</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{previousWeekTotal}</div>
            <p className="text-xs text-muted-foreground">
              {previousWeekOrders.length} orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Today's Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayOrders.length > 0 ? (
                todayOrders.slice(0, 4).map(order => (
                  <OrderCard key={order.id} order={order} showStatus={true} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No orders today yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* This Week's Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {thisWeekOrders.slice(0, 4).map(order => (
                <OrderCard key={order.id} order={order} showStatus={true} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Previous Week's Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Previous Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {previousWeekOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;