import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('../../pages/HomePage'));
const ProjectsPage = lazy(() => import('../../pages/ProjectsPage'));
const BlogsPage = lazy(() => import('../../pages/BlogsPage'));
const BlogDetailPage = lazy(() => import('../../pages/BlogDetailPage'));

// Simple loading fallback
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        {/* Redirect old hash-based routes to new paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
