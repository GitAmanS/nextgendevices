"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Pencil, PlusCircle, Megaphone } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const ManageAds = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Summer Sale Banner",
      type: "banner",
      status: "active",
      impressions: 1500,
      clicks: 230,
      startDate: "2024-06-01",
      endDate: "2024-06-30"
    },
    {
      id: 2,
      title: "Product Launch Popup",
      type: "popup",
      status: "paused",
      impressions: 890,
      clicks: 95,
      startDate: "2024-05-15",
      endDate: "2024-06-15"
    }
  ]);

  const [newAd, setNewAd] = useState({
    title: "",
    type: "banner",
    startDate: "",
    endDate: "",
    image: null
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateAd = (e) => {
    e.preventDefault();
    if (!newAd.title || !newAd.startDate || !newAd.endDate) return;

    setAds([...ads, { 
      ...newAd, 
      id: Date.now(),
      status: "active",
      impressions: 0,
      clicks: 0
    }]);
    setNewAd({
      title: "",
      type: "banner",
      startDate: "",
      endDate: "",
      image: null
    });
  };

  const handleDeleteAd = (id) => {
    setAds(ads.filter(ad => ad.id !== id));
  };

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Ads</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-4 py-2">
            Active Ads: {ads.filter(ad => ad.status === "active").length}
          </Badge>
          <Input
            placeholder="Search ads..."
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Create New Ad Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Ad</h2>
        <form onSubmit={handleCreateAd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Ad Title"
            value={newAd.title}
            onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
            required
          />
          
          <Select
            value={newAd.type}
            onValueChange={(value) => setNewAd({ ...newAd, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ad type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="banner">Banner Ad</SelectItem>
              <SelectItem value="popup">Popup Ad</SelectItem>
              <SelectItem value="sidebar">Sidebar Ad</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            label="Start Date"
            value={newAd.startDate}
            onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
            required
          />

          <Input
            type="date"
            label="End Date"
            value={newAd.endDate}
            onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
            required
          />

          <div className="col-span-full">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setNewAd({ ...newAd, image: e.target.files[0] })}
            />
          </div>

          <Button type="submit" className="col-span-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Ad
          </Button>
        </form>
      </div>

      {/* Ads List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAds.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ad.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={ad.status === "active" ? "default" : "secondary"}>
                    {ad.status}
                  </Badge>
                </TableCell>
                <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAd(ad.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Ad Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Impressions</h3>
          <p className="text-3xl font-bold">
            {ads.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Clicks</h3>
          <p className="text-3xl font-bold">
            {ads.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">CTR</h3>
          <p className="text-3xl font-bold">
            {(
              (ads.reduce((sum, ad) => sum + ad.clicks, 0) /
                ads.reduce((sum, ad) => sum + ad.impressions, 0)) *
              100 || 0
            ).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageAds;