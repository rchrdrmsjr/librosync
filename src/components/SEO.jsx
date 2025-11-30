import { Helmet } from "react-helmet-async";
import {
  defaultSEO,
  generateOpenGraphTags,
  generateTwitterCardTags,
  generateCanonicalUrl,
} from "@/lib/seo";

/**
 * SEO Component for managing meta tags
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.image - Page image URL
 * @param {string} props.path - Current page path
 * @param {Object} props.structuredData - JSON-LD structured data
 * @returns {JSX.Element} SEO component
 */
const SEO = ({
  title,
  description,
  keywords,
  image,
  path = "",
  structuredData,
}) => {
  const seoConfig = {
    title: title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: generateCanonicalUrl(path),
  };

  const ogTags = generateOpenGraphTags(seoConfig);
  const twitterTags = generateTwitterCardTags(seoConfig);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoConfig.title}</title>
      <meta name="description" content={seoConfig.description} />
      <meta name="keywords" content={seoConfig.keywords} />
      <meta name="author" content={defaultSEO.author} />
      <link rel="canonical" href={seoConfig.url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTags["og:title"]} />
      <meta property="og:description" content={ogTags["og:description"]} />
      <meta property="og:image" content={ogTags["og:image"]} />
      <meta property="og:url" content={ogTags["og:url"]} />
      <meta property="og:type" content={ogTags["og:type"]} />
      <meta property="og:site_name" content={ogTags["og:site_name"]} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterTags["twitter:card"]} />
      <meta name="twitter:title" content={twitterTags["twitter:title"]} />
      <meta
        name="twitter:description"
        content={twitterTags["twitter:description"]}
      />
      <meta name="twitter:image" content={twitterTags["twitter:image"]} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

