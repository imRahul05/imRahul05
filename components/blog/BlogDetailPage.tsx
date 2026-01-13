import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BLOGS, Blog } from '../../data/blogs';
import { AnimatedThemeToggler } from '../floatbuttons/AnimatedThemeToggler';
import { HomeButton } from '../floatbuttons/HomeButton';
import { ResumeButton } from '../floatbuttons/ResumeButton';

interface BlogDetailPageProps {
  slug: string;
  onBack: () => void;
  onHome: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onBack, onHome }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const blog = useMemo(() => {
    return BLOGS.find((b) => b.slug === slug);
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Simple markdown-like rendering for the content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    lines.forEach((line, index) => {
      // Code block start/end
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
          codeBlockContent = [];
        } else {
          elements.push(
            <pre key={`code-${index}`} className="blog-code-block">
              <code className={`language-${codeBlockLanguage}`}>
                {codeBlockContent.join('\n')}
              </code>
            </pre>
          );
          inCodeBlock = false;
          codeBlockContent = [];
          codeBlockLanguage = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Skip empty lines
      if (line.trim() === '') {
        return;
      }

      // H1
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="blog-content-h1">
            {line.slice(2)}
          </h1>
        );
        return;
      }

      // H2
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="blog-content-h2">
            {line.slice(3)}
          </h2>
        );
        return;
      }

      // H3
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="blog-content-h3">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // List items
      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="blog-list-item">
            {renderInlineCode(line.slice(2))}
          </li>
        );
        return;
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="blog-content-p">
          {renderInlineCode(line)}
        </p>
      );
    });

    return elements;
  };

  // Render inline code with backticks
  const renderInlineCode = (text: string): React.ReactNode => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="blog-inline-code">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Handle bold text
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((boldPart, j) => {
        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
          return <strong key={`${i}-${j}`}>{boldPart.slice(2, -2)}</strong>;
        }
        return boldPart;
      });
    });
  };

  if (!blog) {
    return (
      <div className="container blog-detail-page">
        <header className="blog-detail-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back to Blogs</span>
          </button>
        </header>
        <div className="blog-not-found">
          <h1>Blog not found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
        <div className="floating-dock">
          <AnimatedThemeToggler />
          <HomeButton onClick={onHome} />
          <ResumeButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container blog-detail-page">
      <header className="blog-detail-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Blogs</span>
        </button>
      </header>

      <article className="blog-article">
        {blog.image && (
          <div className="blog-article-image-wrapper">
            {!isImageLoaded && <div className="skeleton blog-article-skeleton" />}
            <img
              src={blog.image}
              alt={blog.title}
              className={`blog-article-image ${!isImageLoaded ? 'hidden' : ''}`}
              onLoad={() => setIsImageLoaded(true)}
              style={!isImageLoaded ? { display: 'none' } : {}}
            />
          </div>
        )}

        <div className="blog-article-header">
          <h1 className="blog-article-title">{blog.title}</h1>
          
          <div className="blog-article-meta">
            <span className="blog-article-meta-item">
              <Calendar size={14} />
              {formatDate(blog.date)}
            </span>
            <span className="blog-article-meta-item">
              <Clock size={14} />
              {blog.readTime}
            </span>
          </div>

          <div className="blog-article-tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="blog-article-tag">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="blog-article-content">
          {renderContent(blog.content)}
        </div>
      </article>

      <div className="floating-dock">
        <AnimatedThemeToggler />
        <HomeButton onClick={onHome} />
        <ResumeButton />
      </div>
    </div>
  );
};
