
import { ArrowRight } from "lucide-react";
import {BackLinkProps} from "@/components/BackLink/index";
export const BackLink = ({ label = "برگشت", onClick, href }: BackLinkProps) =>{
    const content = (
        <span className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary">
      <ArrowRight className="h-4 w-4" />
            {label}
    </span>
    );

    if (href) {
        return (
            <a href={href} className="inline-block">
                {content}
            </a>
        );
    }

    return (
        <button type="button" onClick={onClick} className="inline-block">
            {content}
        </button>
    );
}
