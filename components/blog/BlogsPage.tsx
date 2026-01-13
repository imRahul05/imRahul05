import React, { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BLOGS } from '../../data/blogs';
import { BlogCard } from './BlogCard';
import { AnimatedThemeToggler } from '../floatbuttons/AnimatedThemeToggler';
import { HomeButton } from '../floatbuttons/HomeButton';
import { ResumeButton } from '../floatbuttons/ResumeButton';

interface BlogsPageProps {
  onBack: () => void;
  onSelectBlog: (slug: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ onBack, onSelectBlog }) => {
  const handleBackClick = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleReadMore = useCallback((slug: string) => {
    onSelectBlog(slug);
  }, [onSelectBlog]);

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
        <HomeButton onClick={onBack} />
        <ResumeButton />
      </div>
    </div>
  );
};
