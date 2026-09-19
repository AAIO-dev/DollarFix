import { Link } from "@tanstack/react-router";
import { legalTranslations } from "../legalTexts";

export default function Footer({ language }: { language: string }) {
  return (
    <footer className="mt-20 border-t border-border py-8">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/terms" className="hover:text-primary transition-colors">
            {legalTranslations[language]?.terms || legalTranslations["en"].terms}
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            {legalTranslations[language]?.privacy || legalTranslations["en"].privacy}
          </Link>
          <a href="mailto:contact@dollarfix.net" className="hover:text-primary transition-colors">
            contact@dollarfix.net
          </a>
        </div>
        <p className="text-sm text-muted-foreground/60">
          &copy; {new Date().getFullYear()} DollarFix. {legalTranslations[language]?.rights || legalTranslations["en"].rights}
        </p>
      </div>
    </footer>
  );
}