import { legalTranslations } from "../legalTexts";

interface LegalPageProps {
  language: string;
  type: "terms" | "privacy";
}

export default function LegalPage({ language, type }: LegalPageProps) {
  const content = legalTranslations[language]?.[`${type}Content`] || legalTranslations["en"][`${type}Content`];
  const title = legalTranslations[language]?.[type] || legalTranslations["en"][type];

  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-10">{title}</h1>
      
      <div className="space-y-8">
        {content.map((item: any, idx: number) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold text-foreground mb-3">{item.title}</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}