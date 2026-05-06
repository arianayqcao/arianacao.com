import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  summary: string;
  href: string;
}

export default function CaseStudyCard({ title, summary, href }: CaseStudyCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 p-6">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-slate-600">{summary}</p>
      <Link href={href} className="mt-5 inline-block text-sm font-medium text-slate-700">
        View case study
      </Link>
    </article>
  );
}
