import React, { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Blog } from "../../data/blogs";

interface BlogCardProps {
  blog: Blog;
  onReadMore: (slug: string) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onReadMore }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleCardClick = () => {
    onReadMore(blog.slug);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onReadMore(blog.slug);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onReadMore(blog.slug);
  };

  return (
    <article
      className="blog-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Read blog post: ${blog.title}`}
    >
      {blog.image && (
        <div className="blog-card-image-wrapper">
          {!isImageLoaded && <div className="skeleton blog-card-skeleton" />}
          <img
            src={blog.image}
            alt={blog.title}
            className="blog-card-image"
            onLoad={() => setIsImageLoaded(true)}
            style={!isImageLoaded ? { display: "none" } : {}}
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
          onClick={handleButtonClick}
          aria-label={`Read more about ${blog.title}`}
        >
          Read More
          <ArrowRight size={14} className="blog-card-read-more-arrow" />
        </button>
      </div>
    </article>
  );
};
