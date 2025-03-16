"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, UserPlus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  const [writers, setWriters] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "writer" },
  ]);

  const [newWriter, setNewWriter] = useState({
    name: "",
    email: "",
    role: "writer"
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddWriter = (e) => {
    e.preventDefault();
    if (!newWriter.name || !newWriter.email) return;

    setWriters([...writers, { ...newWriter, id: Date.now() }]);
    setNewWriter({ name: "", email: "", role: "writer" });
  };

  const handleDeleteWriter = (id) => {
    setWriters(writers.filter(writer => writer.id !== id));
  };

  const filteredWriters = writers.filter(writer =>
    writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    writer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Add New Writer Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Writer</h2>
        <form onSubmit={handleAddWriter} className="flex gap-4">
          <Input
            placeholder="Name"
            value={newWriter.name}
            onChange={(e) => setNewWriter({ ...newWriter, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={newWriter.email}
            onChange={(e) => setNewWriter({ ...newWriter, email: e.target.value })}
            required
          />
          <Select
            value={newWriter.role}
            onValueChange={(value) => setNewWriter({ ...newWriter, role: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="writer">Writer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Writer
          </Button>
        </form>
      </div>

      {/* Manage Existing Writers */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Writers</h2>
          <Input
            placeholder="Search writers..."
            className="max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWriters.map((writer) => (
              <TableRow key={writer.id}>
                <TableCell>{writer.name}</TableCell>
                <TableCell>{writer.email}</TableCell>
                <TableCell>
                  <Badge variant={writer.role === "admin" ? "default" : "secondary"}>
                    {writer.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteWriter(writer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Additional Settings Sections */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Site Maintenance Mode</h3>
              <p className="text-sm text-muted-foreground">
                Enable to take the site offline for maintenance
              </p>
            </div>
            <Button variant="outline">Enable Maintenance</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">API Access</h3>
              <p className="text-sm text-muted-foreground">
                Manage API keys and permissions
              </p>
            </div>
            <Button variant="outline">Manage API</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;