import type { ReactNode } from 'react';
interface Props { eyebrow: string; title: string; description: string; action?: ReactNode; }
export default function SectionHeader({eyebrow,title,description,action}:Props) { return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{description}</p></div>{action}</div>; }