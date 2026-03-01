import Link from 'next/link';
import { PILLAR_INFO } from '@/lib/articles';

interface BreadcrumbsProps {
  pillar?: string;
  articleTitle?: string;
}

export default function Breadcrumbs({ pillar, articleTitle }: BreadcrumbsProps) {
  const pillarInfo = pillar ? PILLAR_INFO[pillar] : null;

  return (
    <nav className="text-sm text-slate-500 mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-[#1e3a5f] transition-colors">
            Home
          </Link>
        </li>

        {pillarInfo && (
          <>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={pillarInfo.hub} className="hover:text-[#1e3a5f] transition-colors">
                {pillarInfo.name}
              </Link>
            </li>
          </>
        )}

        {articleTitle && (
          <>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-slate-700 truncate max-w-[200px] md:max-w-none">
              {articleTitle}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
