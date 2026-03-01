import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  pillar: string;
  pillarHub?: string;
  hasCalculator: boolean;
  calculatorComponent?: string;
  seoTitle: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
  slug: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  pillar: string;
  pillarHub?: string;
  hasCalculator: boolean;
}

/**
 * Get all article slugs for static generation
 */
export function getAllArticleSlugs(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get a single article by slug
 */
export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as ArticleFrontmatter,
    content,
    slug,
  };
}

/**
 * Get all articles with their frontmatter (for listings, sitemaps, etc.)
 */
export function getAllArticles(): ArticleSummary[] {
  const slugs = getAllArticleSlugs();
  const articles: ArticleSummary[] = [];

  for (const slug of slugs) {
    const article = getArticleBySlug(slug);
    if (article) {
      articles.push({
        slug: article.slug,
        title: article.frontmatter.title,
        description: article.frontmatter.description,
        pillar: article.frontmatter.pillar,
        pillarHub: article.frontmatter.pillarHub,
        hasCalculator: article.frontmatter.hasCalculator,
      });
    }
  }

  return articles;
}

/**
 * Get articles by pillar
 */
export function getArticlesByPillar(pillar: string): ArticleSummary[] {
  return getAllArticles().filter((article) => article.pillar === pillar);
}

/**
 * Pillar metadata
 */
export const PILLAR_INFO: Record<string, { name: string; hub: string; description: string }> = {
  calculators: {
    name: 'HVAC Calculators',
    hub: '/hvac-calculators',
    description: 'Size your HVAC system with engineering-grade calculators',
  },
  troubleshooting: {
    name: 'Troubleshooting',
    hub: '/hvac-troubleshooting',
    description: 'Diagnose and fix common HVAC problems',
  },
  efficiency: {
    name: 'Efficiency',
    hub: '/hvac-efficiency',
    description: 'Understand SEER, HSPF, AFUE, and efficiency ratings',
  },
  installation: {
    name: 'Installation',
    hub: '/hvac-installation',
    description: 'Installation guides and best practices',
  },
  insulation: {
    name: 'Insulation & Filters',
    hub: '/insulation',
    description: 'R-values, MERV ratings, and air quality',
  },
  'energy-costs': {
    name: 'Energy Costs',
    hub: '/energy-costs',
    description: 'Calculate and reduce your HVAC energy bills',
  },
  refrigerants: {
    name: 'Refrigerants',
    hub: '/refrigerants',
    description: 'PT charts, refrigerant types, and technical data',
  },
  'indoor-climate': {
    name: 'Indoor Climate',
    hub: '/indoor-climate',
    description: 'Temperature, humidity, and comfort optimization',
  },
  'water-heaters': {
    name: 'Water Heaters',
    hub: '/water-heaters',
    description: 'Tank and tankless water heater guides',
  },
  standalone: {
    name: 'Resources',
    hub: '/',
    description: 'Additional HVAC resources',
  },
};
