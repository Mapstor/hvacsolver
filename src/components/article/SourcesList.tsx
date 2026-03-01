'use client';

interface Source {
  text: string;
  url?: string;
}

interface SourcesListProps {
  sources: Source[];
  title?: string;
}

export default function SourcesList({
  sources,
  title = 'Sources & References',
}: SourcesListProps) {
  if (sources.length === 0) return null;

  return (
    <section className="sources-section mt-12">
      <div className="sources-card bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2
          id="sources-and-references"
          className="text-xl font-bold text-slate-950 mb-4"
        >
          {title}
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
          {sources.map((source, idx) => (
            <li key={idx} className="leading-relaxed">
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a5f] hover:text-[#c2410c] underline break-words"
                >
                  {source.text}
                </a>
              ) : (
                <span>{source.text}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Helper to extract sources from markdown content
export function extractSourcesFromMarkdown(content: string): Source[] {
  const sources: Source[] = [];

  // Look for Sources section
  const sourcesMatch = content.match(
    /## (?:Sources(?: and| &)? References?|References?)\n([\s\S]*?)(?=\n## |$)/i
  );
  if (!sourcesMatch) return sources;

  const sourcesContent = sourcesMatch[1];

  // Extract list items (both - and numbered)
  const listPattern = /^(?:[-\d.]+)\s*(.+)$/gm;
  let match;

  while ((match = listPattern.exec(sourcesContent)) !== null) {
    const item = match[1].trim();

    // Check if item contains a markdown link
    const linkMatch = item.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      sources.push({
        text: linkMatch[1],
        url: linkMatch[2],
      });
    } else {
      // Check for plain URL
      const urlMatch = item.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        sources.push({
          text: item.replace(urlMatch[1], '').trim() || urlMatch[1],
          url: urlMatch[1],
        });
      } else {
        sources.push({ text: item });
      }
    }
  }

  return sources;
}
