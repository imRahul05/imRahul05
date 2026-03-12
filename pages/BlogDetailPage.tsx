import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { BlogDetailPage as BlogDetailContent } from '../components/blog/BlogDetailPage';

const BlogDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/blogs" replace />;
  }

  const handleBackClick = () => {
    navigate('/blogs');
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <BlogDetailContent
      slug={slug}
      onBack={handleBackClick}
      onHome={handleHomeClick}
    />
  );
};

export default BlogDetailPage;
