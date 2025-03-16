"use client";

import { useState } from 'react';
import { Bar, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Eye, Clock, ArrowUpDown, Layout } from 'lucide-react';
import { ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7days');

  const visitorData = [
    { date: '2024-06-01', visitors: 2345, pageViews: 4567 },
    { date: '2024-06-02', visitors: 3456, pageViews: 5678 },
    { date: '2024-06-03', visitors: 2789, pageViews: 4890 },
    { date: '2024-06-04', visitors: 4123, pageViews: 6123 },
    { date: '2024-06-05', visitors: 3890, pageViews: 5789 },
  ];

  const trafficSources = [
    { source: 'Organic Search', visits: 12345, percentage: 45 },
    { source: 'Direct', visits: 6789, percentage: 25 },
    { source: 'Social Media', visits: 4567, percentage: 17 },
    { source: 'Referral', visits: 2345, percentage: 9 },
    { source: 'Email', visits: 1234, percentage: 4 },
  ];

  const topPages = [
    { page: '/home', visits: 12345, duration: '3m 45s', bounceRate: 32 },
    { page: '/blog', visits: 9876, duration: '5m 12s', bounceRate: 28 },
    { page: '/products', visits: 7654, duration: '2m 30s', bounceRate: 45 },
    { page: '/about', visits: 5432, duration: '1m 55s', bounceRate: 38 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+12.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124,543</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+8.7%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-500">-2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.1%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">-4.3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#2563eb" />
              <Line type="monotone" dataKey="pageViews" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSources}>
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Pages Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Avg. Duration</TableHead>
                  <TableHead>Bounce Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPages.map((page) => (
                  <TableRow key={page.page}>
                    <TableCell>{page.page}</TableCell>
                    <TableCell>{page.visits.toLocaleString()}</TableCell>
                    <TableCell>{page.duration}</TableCell>
                    <TableCell>{page.bounceRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;