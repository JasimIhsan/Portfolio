import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  keywords?: string[];
}

export default function SEO({
  title = 'Portfolio | Full Stack Developer',
  description = 'Professional portfolio of a Full Stack Developer, showcasing modern web applications, premium designs, and scalable technical solutions.',
  name = 'My Portfolio',
  type = 'website',
  url = import.meta.env.VITE_APP_URL || 'https://myportfolio.com', // fallback URL if env not set
  image = `${import.meta.env.VITE_APP_URL || 'https://myportfolio.com'}/og-image.png`,
  keywords = ['Full Stack Developer', 'Software Engineer', 'React', 'TypeScript', 'Portfolio', 'Web Development'],
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={name} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph tags (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
