import React, { useState, useEffect } from 'react';
import blog1 from './../assets/blogs/blog-1.png';
import blog2 from './../assets/blogs/blog-2.png';
import blog3 from './../assets/blogs/blog-3.png';

const VisionAndInsights = () => {
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

  // if (blogs.length === 0) return <p>Loading...</p>;

  const latestBlog = blogs[0];
  const recentBlogs = blogs.slice(1, 3); // Get next three blogs

  return (
    <section className="container mx-auto" style={{ padding: '100px 100px' }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left side: Heading and larger blog card */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <h2 className="text-3xl font-bold mb-4">OUR VISION AND INSIGHTS... <a href="/blogs" className="text-sm text-decoration-none text-gray-600 hover:text-black">See All Posts →</a></h2>
          <a href={`/blogs/${latestBlog?._id}`} className="relative group flex-grow">
            <img
              src={blog1}
              alt={latestBlog?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 p-16 flex flex-col justify-start items-start">
              {/* <p className="text-sm text-white font-bold">OUR COMMITMENT</p> */}
              <h3 className="text-white text-xl lg:text-2xl font-bold">
                {latestBlog?.title}
              </h3>
            </div>
            <div className="absolute right-4 bottom-4 text-white text-2xl">→</div>
          </a>
        </div>


        {/* Right - Two smaller blog cards */}
        <div className="grid grid-rows-2 gap-4">
          {/* Top Right Blog Card */}
          {recentBlogs.map((rblog) => (
            <a href={`/blogs/${rblog._id}`} className="relative group">
              <img
                src={blog2}
                alt={rblog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-60 p-16 flex flex-col justify-start items-start">
                {/* <p className="text-sm text-white font-bold">OUR STORY</p> */}
                <h3 className="text-white text-xl font-bold">{rblog.title}</h3>
              </div>
              <div className="absolute right-4 bottom-4 text-white text-2xl">→</div>
            </a>
          ))}

          {/* Bottom Right Blog Card */}
          {/* <a href="/our-blog" className="relative group">
              <img 
                src={blog3} 
                alt="Our Blog"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-60 p-16 flex flex-col justify-start items-start">
                <p className="text-sm text-white font-bold">OUR BLOG</p>
                <h3 className="text-white text-xl font-bold">Your Ultimate Guide.</h3>
              </div>
              <div className="absolute right-4 bottom-4 text-white text-2xl">→</div>
            </a> */}
        </div>
      </div>
    </section>
  );
};


export default VisionAndInsights;