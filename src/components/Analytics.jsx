import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d')

  // Sample analytics data
  const salesData = [
    { month: 'Jan', revenue: 4200, orders: 142, customers: 89, avgOrder: 29.58 },
    { month: 'Feb', revenue: 3800, orders: 128, customers: 76, avgOrder: 29.69 },
    { month: 'Mar', revenue: 5100, orders: 167, customers: 103, avgOrder: 30.54 },
    { month: 'Apr', revenue: 4650, orders: 154, customers: 94, avgOrder: 30.19 },
    { month: 'May', revenue: 6200, orders: 201, customers: 125, avgOrder: 30.85 },
    { month: 'Jun', revenue: 5800, orders: 186, customers: 118, avgOrder: 31.18 },
    { month: 'Jul', revenue: 6800, orders: 215, customers: 134, avgOrder: 31.63 }
  ]

  const productPerformance = [
    { name: 'Spicy Pickle Mix', sales: 1250, revenue: 16237, growth: 12.5 },
    { name: 'Classic Dill Pickles', sales: 980, revenue: 10762, growth: 8.3 },
    { name: 'Mixed Vegetable Pickles', sales: 750, revenue: 11992, growth: 15.7 },
    { name: 'Hot Pepper Pickles', sales: 680, revenue: 10193, growth: 22.1 },
    { name: 'Sweet Cucumber Relish', sales: 520, revenue: 4677, growth: -5.2 },
    { name: 'Bread & Butter Pickles', sales: 450, revenue: 5395, growth: 3.8 }
  ]

  const categoryData = [
    { name: 'Spicy', value: 35, revenue: 26430, color: 'oklch(0.6 0.2 25)' },
    { name: 'Sweet', value: 25, revenue: 10072, color: 'oklch(0.85 0.05 75)' },
    { name: 'Classic', value: 20, revenue: 10762, color: 'oklch(0.35 0.08 120)' },
    { name: 'Mixed', value: 20, revenue: 11992, color: 'oklch(0.75 0.12 45)' }
  ]

  const customerSegments = [
    { segment: 'New Customers', count: 156, percentage: 23.4, revenue: 8945 },
    { segment: 'Returning Customers', count: 298, percentage: 44.7, revenue: 18760 },
    { segment: 'VIP Customers', count: 89, percentage: 13.3, revenue: 15680 },
    { segment: 'Inactive Customers', count: 124, percentage: 18.6, revenue: 2890 }
  ]

  const monthlyGrowth = [
    { month: 'Jan', growth: 5.2 },
    { month: 'Feb', growth: -9.5 },
    { month: 'Mar', growth: 34.2 },
    { month: 'Apr', growth: -8.8 },
    { month: 'May', growth: 33.3 },
    { month: 'Jun', growth: -6.5 },
    { month: 'Jul', growth: 17.2 }
  ]

  const topCustomers = [
    { name: 'Restaurant Supply Co.', orders: 24, revenue: 2850, growth: 15.2 },
    { name: 'Gourmet Foods Ltd.', orders: 18, revenue: 2340, growth: 8.7 },
    { name: 'Local Deli Chain', orders: 15, revenue: 1980, growth: 22.1 },
    { name: 'Farmers Market Vendor', orders: 12, revenue: 1560, growth: -3.4 },
    { name: 'Online Food Store', orders: 10, revenue: 1290, growth: 12.8 }
  ]

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600'
  }

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? ArrowUpRight : ArrowDownRight
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Business insights and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$46,275</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,393</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$33.21</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.4%</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="oklch(0.35 0.08 120)" 
                  fill="oklch(0.35 0.08 120 / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Growth Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Rate</CardTitle>
            <CardDescription>Month-over-month growth percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar 
                  dataKey="growth" 
                  fill="oklch(0.75 0.12 45)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance and Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Top selling products and their growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productPerformance.map((product, index) => {
                const GrowthIcon = getGrowthIcon(product.growth)
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{product.sales} units sold</span>
                        <span>{formatCurrency(product.revenue)} revenue</span>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${getGrowthColor(product.growth)}`}>
                      <GrowthIcon className="w-4 h-4" />
                      <span className="font-medium">{formatPercentage(product.growth)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(category.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Customer distribution and revenue contribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{segment.segment}</span>
                    <span className="text-sm text-muted-foreground">
                      {segment.count} customers ({segment.percentage}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 bg-muted rounded-full h-2 mr-4">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <span className="font-medium">{formatCurrency(segment.revenue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Highest value customers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => {
                const GrowthIcon = getGrowthIcon(customer.growth)
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{customer.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{customer.orders} orders</span>
                        <span>{formatCurrency(customer.revenue)}</span>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${getGrowthColor(customer.growth)}`}>
                      <GrowthIcon className="w-4 h-4" />
                      <span className="font-medium">{formatPercentage(customer.growth)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders and Customer Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Monthly order volume and customer acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="oklch(0.35 0.08 120)" 
                  strokeWidth={2}
                  name="Orders"
                />
                <Line 
                  type="monotone" 
                  dataKey="customers" 
                  stroke="oklch(0.75 0.12 45)" 
                  strokeWidth={2}
                  name="New Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Order Value Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
            <CardDescription>Monthly average order value trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Line 
                  type="monotone" 
                  dataKey="avgOrder" 
                  stroke="oklch(0.6 0.2 25)" 
                  strokeWidth={3}
                  name="Avg Order Value"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics

