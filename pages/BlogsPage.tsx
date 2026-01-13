import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BLOGS } from '../data/blogs';
import { BlogCard } from '../components/blog/BlogCard';
import { AnimatedThemeToggler } from '../components/floatbuttons/AnimatedThemeToggler';
import { HomeButton } from '../components/floatbuttons/HomeButton';
import { ResumeButton } from '../components/floatbuttons/ResumeButton';

export const BlogsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleReadMore = (slug: string) => {
    navigate(`/blogs/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container blogs-page">
      <header className="blogs-page-header">
        <button
          className="back-button"
          onClick={handleBackClick}
          aria-label="Go back to home"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1>Blog</h1>
        <p className="blogs-page-subtitle">
          Thoughts, tutorials, and insights on software development
        </p>
      </header>

      <section className="section">
        <div className="blogs-grid">
          {BLOGS.map((blog) => (
            <BlogCard
              key={blog.slug}
              blog={blog}
              onReadMore={handleReadMore}
            />
          ))}
        </div>
      </section>

      <div className="floating-dock">
        <AnimatedThemeToggler />
        <HomeButton onClick={handleBackClick} />
        <ResumeButton />
      </div>
    </div>
  );
};

export default BlogsPage;
