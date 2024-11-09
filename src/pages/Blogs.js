import React, { useEffect, useState } from 'react';
// import { fetchBlogs } from './api'; // Mocked API call to fetch blog data
import { Calendar } from 'react-bootstrap-icons';
import goldBanner from '../assets/gold-banner.png';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs/latest'); // Replace with the actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();

        // Assuming the API returns an array of blogs sorted by date in descending order
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const latestBlog = blogs[0];
  const recentBlogs = blogs.slice(1, 4); // Get next three blogs
  const firstParagraph = latestBlog?.details?.split('</p>')[0].replace(/<[^>]+>/g, '');

  return (
    <div className="mx-20 my-auto p-4">
      {/* <header className="text-center mb-8"> */}
      <h1 className="text-2xl font-semibold text-gray-800">Latest Blog</h1>
      <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#B37E56' }}></div>
      {/* </header> */}

      <section className="latest-blog">
      <Link to={`/blogs/${latestBlog?._id}`} className="text-black no-underline">
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 hover:underline">{latestBlog?.title}</h2>
        <p className="text-gray-700 mt-2">{firstParagraph}...</p>
        <p className="d-flex text-sm text-gray-500 mt-2 gap-2"><Calendar size={20} />{new Date(latestBlog?.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
        <img src={goldBanner} alt={latestBlog?.title} className="w-full h-[500px] object-cover" />
        </Link>
      </section>

      <section className="recent-blogs">
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Recent Blogs</h2>
        <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#B37E56' }}></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {recentBlogs.map((blog) => {
            const firstParagraph = blog?.details?.split('</p>')[0].replace(/<[^>]+>/g, '');

            return (
            <div key={blog?._id} className="blog-card bg-white">
                  <Link to={`/blogs/${blog?._id}`} className="text-black no-underline">
                    <img src={goldBanner} alt={blog?.title} className="w-full h-64 object-cover" />
                    <h3 className="text-xl font-semibold text-gray-800 mt-4 hover:underline">{blog?.title}</h3>
                    <p className="flex items-center text-sm text-gray-500 mt-2 gap-2">
                      <Calendar size={20} />
                      {new Date(blog?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-600 mt-2">{firstParagraph}</p>
                    <span className="text-black inline-block mt-0 mb-4 hover:underline">Read More</span>
                  </Link>
                </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
