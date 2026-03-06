import { addAmazonTag } from "@/lib/affiliate";

interface AffiliateLinkProps {
  href: string;
  label: string;
}

export default function AffiliateLink({ href, label }: AffiliateLinkProps) {
  const affiliateHref = addAmazonTag(href);
  return (
    <div className="bg-accent-soft border-[1.5px] border-accent/20 rounded-lg p-4 my-5 flex items-center gap-3.5">
      <span className="text-[1.5rem]">🛒</span>
      <div>
        <strong className="font-ui text-[0.82rem] text-primary block mb-0.5">{label}</strong>
        <p className="font-ui text-[0.78rem] text-muted m-0">Check price & availability</p>
      </div>
      <a 
        href={affiliateHref} 
        target="_blank" 
        rel="nofollow sponsored" 
        data-affiliate="true"
        className="ml-auto bg-accent text-white no-underline px-4 py-2 rounded-md font-ui text-[0.75rem] font-semibold whitespace-nowrap hover:bg-accent/90 transition-colors"
      >
        View on Amazon →
      </a>
    </div>
  );
}
