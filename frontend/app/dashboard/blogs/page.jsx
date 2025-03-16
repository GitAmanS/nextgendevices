"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye, Calendar, ArrowUpDown } from 'lucide-react';


const BaseApi = process.env.NEXT_PUBLIC_API;
const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BaseApi}/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const togglePublish = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !currentStatus }),
      });
      
      if (response.ok) {
        setBlogs(blogs.map(blog => 
          blog._id === id ? { ...blog, published: !currentStatus } : blog
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Button asChild>
          <Link href="/dashboard/create-blog">
            Create New Blog
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBlogs.map((blog) => (
            <TableRow key={blog._id}>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{blog.category}</Badge>
              </TableCell>
              <TableCell>{blog.views}</TableCell>
              <TableCell>
                <Badge variant={blog.published ? "default" : "secondary"}>
                  {blog.published ? 'Published' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(blog.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/blogs/${blog.slug}`} target="_blank">
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/dashboard/blogs/${blog._id}`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant={blog.published ? "secondary" : "default"}
                  size="sm"
                  onClick={() => togglePublish(blog._id, blog.published)}
                >
                  {blog.published ? 'Unpublish' : 'Publish'}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteBlog(blog._id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageBlogs;