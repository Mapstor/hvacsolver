import Link from 'next/link';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import Breadcrumbs from './Breadcrumbs';

interface PillarHubProps {
  pillarKey: string;
}

export default function PillarHub({ pillarKey }: PillarHubProps) {
  const pillarInfo = PILLAR_INFO[pillarKey];
  const articles = getArticlesByPillar(pillarKey);

  // Separate calculator articles from non-calculator articles
  const calculatorArticles = articles.filter(a => a.hasCalculator);
  const guideArticles = articles.filter(a => !a.hasCalculator);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs pillar={pillarKey} />

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
            {pillarInfo.name}
          </h1>
          <p className="text-lg text-slate-600">
            {pillarInfo.description}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {articles.length} articles
          </p>
        </header>

        {/* Calculator Articles Section */}
        {calculatorArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-slate-950 mb-6 pb-2 border-b border-slate-200">
              Calculators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {calculatorArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.slug}`}
                  className="block p-5 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#c2410c] hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-slate-950 mb-2">
                    {article.title.split(' — ')[0]}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Guide Articles Section */}
        {guideArticles.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-6 pb-2 border-b border-slate-200">
              {calculatorArticles.length > 0 ? 'Guides & References' : 'Articles'}
            </h2>
            <div className="space-y-4">
              {guideArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.slug}`}
                  className="block p-5 bg-white rounded-lg border border-slate-200 hover:border-[#c2410c] hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-slate-950 mb-2">
                    {article.title.split(' — ')[0]}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
