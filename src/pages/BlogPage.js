import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SanitizedHTMLContent from '../components/SanitizedHTMLContent';
import goldBanner from '../assets/gold-banner.png';
import { Calendar, Person } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const BlogPage = () => {
    const { blogId } = useParams(); // Get blogId from URL params
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Fetch blog details from the API
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                console.log(blogId, "blog");
                const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog details');
                }
                const data = await response.json();
                console.log(data);
                setBlog(data.blog);
                setRecentBlogs(data.otherBlogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlogDetails();
    }, [blogId]);

      if (!blog) return <Loader />;

    return (
        <>

            <div className="relative">
                {/* Background Image */}
                <div
                    className="banner-container h-80 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${goldBanner})`,
                    }}
                ></div>

                {/* Overlay Content */}
                <div className="absolute top-0 left-0 h-full w-full z-10 flex items-center p-16">
                    <div className="bg-opacity-0 p-6 text-white max-w-xl">
                        <h1 className="text-4xl font-bold mb-2">{blog?.title}</h1>
                        {/* <div className="flex items-center space-x-4"> */}
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar size={20} />
                            <span>{new Date(blog?.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {/* <i className="bi bi-person mr-2"></i> */}
                            <Person size={24} />
                            <span>{blog?.createdBy}</span>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>


            <div className="container mx-40">
                {/* Banner Section */}
                {/* <div
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/payment-options/visa.png})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{blog?.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <i className="bi bi-calendar mr-2"></i>
              <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <i className="bi bi-person mr-2"></i>
              <span>{blog?.createdBy}</span>
            </div>
          </div>
        </div>
      </div> */}

                {/* Blog Content Section */}
                <div className="my-8 px-4 lg:px-0 text-gray-800">
                    <SanitizedHTMLContent style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }} htmlContent={blog?.details} />
                    {/* <p className="text-lg leading-relaxed">{blog?.details}</p> */}
                </div>
                <hr />
                {/* Share Section */}
                <div className="flex space-x-4 mb-12">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                        <i className="bi bi-share-fill"></i>
                        <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-400">
                        <i className="bi bi-twitter"></i>
                        <span>Tweet</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                        <i className="bi bi-pinterest"></i>
                        <span>Pin it</span>
                    </button>
                </div>
            </div>
            <div className="mx-20 my-auto p-4">
                <section className="recent-blogs">
                    <h2 className="text-2xl font-semibold text-gray-800 mt-6">YOU MAY ALSO LIKE</h2>
                    <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#B37E56' }}></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {recentBlogs.map((blog) => {
                            const firstParagraph = blog.details.split('</p>')[0].replace(/<[^>]+>/g, '');
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
        </>
    );
};

export default BlogPage;
