import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Blog } from '../../data/blogs';

interface BlogCardProps {
  blog: Blog;
  onReadMore: (slug: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onReadMore }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <article
      className="blog-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {blog.image && (
        <div className="blog-card-image-wrapper">
          {!isImageLoaded && <div className="skeleton blog-card-skeleton" />}
          <img
            src={blog.image}
            alt={blog.title}
            className={`blog-card-image ${!isImageLoaded ? 'hidden' : ''}`}
            onLoad={() => setIsImageLoaded(true)}
            style={!isImageLoaded ? { display: 'none' } : {}}
          />
        </div>
      )}
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-meta-item">
            <Calendar size={12} />
            {formatDate(blog.date)}
          </span>
          <span className="blog-card-meta-item">
            <Clock size={12} />
            {blog.readTime}
          </span>
        </div>
        
        <h3 className="blog-card-title">{blog.title}</h3>
        
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        
        <div className="blog-card-tags">
          {blog.tags.map((tag) => (
            <span key={tag} className="blog-card-tag">
              {tag}
            </span>
          ))}
        </div>
        
        <button
          className="blog-card-read-more"
          onClick={() => onReadMore(blog.slug)}
        >
          Read More
          <ArrowRight 
            size={14} 
            style={{ 
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.2s ease'
            }} 
          />
        </button>
      </div>
    </article>
  );
};
