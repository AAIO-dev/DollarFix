import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  Briefcase,
  Code2,
  FileText,
  FileSearch,
  GraduationCap,
  ArrowRight,
  Zap,
  Check,
  Globe,
  LogOut
} from "lucide-react";

export type Language = "en" | "es" | "pt" | "fr" | "hi" | "zh";

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
  hi: "Hindi",
  zh: "Simplified Chinese"
};

export const translations: Record<Language, any> = {
  en: {
    login: "Log in",
    signup: "Sign up",
    logout: "Log out",
    heroTitle: "One problem, one dollar. Ping it!",
    heroSubtitle: "A suite of powerful, single-purpose AI tools. Buy credits instantly. No monthly subscriptions.",
    exploreApps: "Explore Apps",
    toolsTitle: "Our Specialized Tools",
    toolsSubtitle: "Pick the right Ping for the job. Each tool is built to solve one thing exceptionally well.",
    launchApp: "Launch App",
    pitchPingDesc: "Write winning, client-ready freelance pitches in seconds.",
    codePingDesc: "Instant AI code review, debugging, and refactoring.",
    resumePingDesc: "Optimize your resume to beat ATS algorithms instantly.",
    paperPingDesc: "Extract insights and summarize complex PDFs instantly.",
    bandPingDesc: "Get accurate IELTS essay band scores and feedback.",
    pricingTitle: "Universal Ping Credits",
    pricingSubtitle: "One wallet. Every app. Top up once and Ping away.",
    transparencyTitle: "🔒 Transparency Note",
    guestCheckout: "Guest Checkout:",
    guestCheckoutDesc: "You can buy credits instantly without an account, but your balance will be strictly locked to your current device and only valid for the single app you purchased it from.",
    freeAccount: "Free Account (Recommended):",
    freeAccountDesc: "Sign up to convert your balance into Universal Credits! Your credits will sync across all devices and work seamlessly across ALL 5 DollarFix apps.",
    signUpNow: "Sign Up Now",
    tierNote1: "Great for quick fixes",
    tierNote2: "Most Popular",
    tierNote3: "Best Value",
    creditsLabel: "Credits",
    feature1: "Use across all apps",
    feature2: "No expiry",
    feature3: "No subscription",
    buyCredits: "Buy Credits",
    quote: "“Don't overthink it.. Fix it fast.. Just Ping it!”",
    footer: "© 2026 DollarFix · Made for problem solvers."
  },
  es: {
    login: "Iniciar sesión",
    signup: "Registrarse",
    logout: "Cerrar sesión",
    heroTitle: "¡Un problema, un dólar, resuelto!",
    heroSubtitle: "Un conjunto de potentes herramientas de IA de un solo propósito. Compra créditos al instante. Sin suscripciones mensuales.",
    exploreApps: "Explorar Aplicaciones",
    toolsTitle: "Nuestras Herramientas Especializadas",
    toolsSubtitle: "Elige el Ping adecuado para el trabajo. Cada herramienta está diseñada para resolver una cosa excepcionalmente bien.",
    launchApp: "Iniciar Aplicación",
    pitchPingDesc: "Escribe propuestas de trabajo freelance ganadoras en segundos.",
    codePingDesc: "Revisión de código, depuración y refactorización instantánea con IA.",
    resumePingDesc: "Optimiza tu currículum para superar los algoritmos ATS al instante.",
    paperPingDesc: "Extrae información y resume PDFs complejos al instante.",
    bandPingDesc: "Obtén puntuaciones y comentarios precisos de ensayos IELTS.",
    pricingTitle: "Créditos Universal Ping",
    pricingSubtitle: "Una billetera. Todas las aplicaciones. Recarga una vez y usa Ping.",
    transparencyTitle: "🔒 Nota de Transparencia",
    guestCheckout: "Pago como Invitado:",
    guestCheckoutDesc: "Puedes comprar créditos al instante sin una cuenta, pero tu saldo estará estrictamente bloqueado en tu dispositivo actual y solo será válido para la aplicación donde lo compraste.",
    freeAccount: "Cuenta Gratuita (Recomendado):",
    freeAccountDesc: "¡Regístrate para convertir tu saldo en Créditos Universales! Tus créditos se sincronizarán en todos los dispositivos y funcionarán sin problemas en TODAS las 5 aplicaciones de DollarFix.",
    signUpNow: "Regístrate Ahora",
    tierNote1: "Ideal para arreglos rápidos",
    tierNote2: "Más Popular",
    tierNote3: "Mejor Valor",
    creditsLabel: "Créditos",
    feature1: "Úsalo en todas las apps",
    feature2: "Sin vencimiento",
    feature3: "Sin suscripción",
    buyCredits: "Comprar Créditos",
    quote: "“No lo pienses demasiado.. Arréglalo rápido.. ¡Solo haz Ping!”",
    footer: "© 2026 DollarFix · Hecho para solucionadores de problemas."
  },
  pt: {
    login: "Entrar",
    signup: "Cadastrar-se",
    logout: "Sair",
    heroTitle: "Um problema, um dólar, resolvido!",
    heroSubtitle: "Um conjunto de ferramentas de IA poderosas e de propósito único. Compre créditos instantaneamente. Sem assinaturas mensais.",
    exploreApps: "Explorar Aplicativos",
    toolsTitle: "Nossas Ferramentas Especializadas",
    toolsSubtitle: "Escolha o Ping certo para o trabalho. Cada ferramenta é construída para resolver uma coisa excepcionalmente bem.",
    launchApp: "Iniciar Aplicativo",
    pitchPingDesc: "Escreva propostas de trabalho freelance vencedoras em segundos.",
    codePingDesc: "Revisão de código, depuração e refatoração instantânea com IA.",
    resumePingDesc: "Otimize seu currículo para vencer os algoritmos ATS instantaneamente.",
    paperPingDesc: "Extraia insights e resuma PDFs complexos instantaneamente.",
    bandPingDesc: "Obtenha notas e feedback precisos de redações IELTS.",
    pricingTitle: "Créditos Universal Ping",
    pricingSubtitle: "Uma carteira. Todos os aplicativos. Recarregue uma vez e use o Ping.",
    transparencyTitle: "🔒 Nota de Transparência",
    guestCheckout: "Checkout como Convidado:",
    guestCheckoutDesc: "Você pode comprar créditos instantaneamente sem uma conta, mas seu saldo ficará estritamente bloqueado no seu dispositivo atual e só será válido para o aplicativo em que você o comprou.",
    freeAccount: "Conta Gratuita (Recomendado):",
    freeAccountDesc: "Cadastre-se para converter seu saldo em Créditos Universais! Seus créditos serão sincronizados em todos os dispositivos e funcionarão perfeitamente em TODOS os 5 aplicativos DollarFix.",
    signUpNow: "Cadastre-se Agora",
    tierNote1: "Ótimo para soluções rápidas",
    tierNote2: "Mais Popular",
    tierNote3: "Melhor Valor",
    creditsLabel: "Créditos",
    feature1: "Use em todos os apps",
    feature2: "Sem validade",
    feature3: "Sem assinatura",
    buyCredits: "Comprar Créditos",
    quote: "“Não pense demais.. Conserte rápido.. Apenas dê um Ping!”",
    footer: "© 2026 DollarFix · Feito para solucionadores de problemas."
  },
  fr: {
    login: "Se connecter",
    signup: "S'inscrire",
    logout: "Déconnexion",
    heroTitle: "Un problème, un dollar, c'est réglé !",
    heroSubtitle: "Une suite d'outils IA puissants à usage unique. Achetez des crédits instantanément. Pas d'abonnements mensuels.",
    exploreApps: "Explorer les Applications",
    toolsTitle: "Nos Outils Spécialisés",
    toolsSubtitle: "Choisissez le bon Ping pour le travail. Chaque outil est conçu pour résoudre une chose exceptionnellement bien.",
    launchApp: "Lancer l'Application",
    pitchPingDesc: "Rédigez des propositions freelance gagnantes en quelques secondes.",
    codePingDesc: "Revue de code, débogage et refactorisation IA instantanés.",
    resumePingDesc: "Optimisez votre CV pour déjouer les algorithmes ATS instantanément.",
    paperPingDesc: "Extrayez des informations et résumez des PDF complexes instantanément.",
    bandPingDesc: "Obtenez des scores et des commentaires précis pour les essais IELTS.",
    pricingTitle: "Crédits Universal Ping",
    pricingSubtitle: "Un seul portefeuille. Toutes les applications. Rechargez une fois et utilisez Ping.",
    transparencyTitle: "🔒 Note de Transparence",
    guestCheckout: "Paiement en tant qu'Invité :",
    guestCheckoutDesc: "Vous pouvez acheter des crédits instantanément sans compte, mais votre solde sera strictement verrouillé sur votre appareil actuel et uniquement valable pour l'application où vous l'avez acheté.",
    freeAccount: "Compte Gratuit (Recommandé) :",
    freeAccountDesc: "Inscrivez-vous pour convertir votre solde en Crédits Universels ! Vos crédits se synchroniseront sur tous les appareils et fonctionneront de manière transparente sur TOUTES les 5 applications DollarFix.",
    signUpNow: "S'inscrire Maintenant",
    tierNote1: "Idéal pour des solutions rapides",
    tierNote2: "Le Plus Populaire",
    tierNote3: "Meilleure Valeur",
    creditsLabel: "Crédits",
    feature1: "Utiliser sur toutes les apps",
    feature2: "Pas d'expiration",
    feature3: "Sans abonnement",
    buyCredits: "Acheter des Crédits",
    quote: "“N'y pensez pas trop.. Réparez-le vite.. Faites juste un Ping !”",
    footer: "© 2026 DollarFix · Fait pour ceux qui résolvent des problèmes."
  },
  hi: {
    login: "लॉग इन",
    signup: "साइन अप",
    logout: "लॉग आउट",
    heroTitle: "एक समस्या, एक डॉलर, काम हो गया!",
    heroSubtitle: "शक्तिशाली, एकल-उद्देश्य एआई उपकरणों का एक सूट। तुरंत क्रेडिट खरीदें। कोई मासिक सदस्यता नहीं।",
    exploreApps: "ऐप्स एक्सप्लोर करें",
    toolsTitle: "हमारे विशेष उपकरण",
    toolsSubtitle: "काम के लिए सही पिंग चुनें। प्रत्येक उपकरण को एक काम असाधारण रूप से अच्छी तरह से करने के लिए बनाया गया है।",
    launchApp: "ऐप लॉन्च करें",
    pitchPingDesc: "कुछ ही सेकंड में जीतने वाली फ्रीलांस पिच लिखें।",
    codePingDesc: "त्वरित एआई कोड समीक्षा, डिबगिंग और रीफैक्टरिंग।",
    resumePingDesc: "एटीएस एल्गोरिदम को तुरंत हराने के लिए अपने रिज्यूमे को ऑप्टिमाइज़ करें।",
    paperPingDesc: "तुरंत जटिल पीडीएफ से जानकारी निकालें और सारांशित करें।",
    bandPingDesc: "सटीक आईईएलटीएस निबंध बैंड स्कोर और फीडबैक प्राप्त करें।",
    pricingTitle: "यूनिवर्सल पिंग क्रेडिट्स",
    pricingSubtitle: "एक वॉलेट। हर ऐप। एक बार टॉप अप करें और पिंग करें।",
    transparencyTitle: "🔒 पारदर्शिता नोट",
    guestCheckout: "अतिथि चेकआउट:",
    guestCheckoutDesc: "आप बिना खाते के तुरंत क्रेडिट खरीद सकते हैं, लेकिन आपका बैलेंस आपके वर्तमान डिवाइस पर सख्ती से लॉक हो जाएगा और केवल उसी ऐप के लिए मान्य होगा जिससे आपने इसे खरीदा है।",
    freeAccount: "मुफ्त खाता (अनुशंसित):",
    freeAccountDesc: "अपने बैलेंस को यूनिवर्सल क्रेडिट में बदलने के लिए साइन अप करें! आपके क्रेडिट सभी उपकरणों में सिंक हो जाएंगे और सभी 5 डॉलरफिक्स ऐप्स में निर्बाध रूप से काम करेंगे।",
    signUpNow: "अभी साइन अप करें",
    tierNote1: "त्वरित समाधान के लिए बढ़िया",
    tierNote2: "सबसे लोकप्रिय",
    tierNote3: "सर्वश्रेष्ठ मूल्य",
    creditsLabel: "क्रेडिट्स",
    feature1: "सभी ऐप्स में उपयोग करें",
    feature2: "कोई समाप्ति नहीं",
    feature3: "कोई सदस्यता नहीं",
    buyCredits: "क्रेडिट्स खरीदें",
    quote: "“ज्यादा मत सोचो.. इसे जल्दी ठीक करो.. बस पिंग करो!”",
    footer: "© 2026 DollarFix · समस्या समाधानकर्ताओं के लिए बनाया गया।"
  },
  zh: {
    login: "登录",
    signup: "注册",
    logout: "退出登录",
    heroTitle: "一个问题，一美元，搞定！",
    heroSubtitle: "一套功能强大的单一用途 AI 工具。即时购买积分。没有包月订阅。",
    exploreApps: "探索应用",
    toolsTitle: "我们的专用工具",
    toolsSubtitle: "为您的工作选择合适的 Ping。每个工具都旨在出色地解决一个问题。",
    launchApp: "启动应用",
    pitchPingDesc: "在几秒钟内撰写出色的自由职业推介信。",
    codePingDesc: "即时 AI 代码审查、调试和重构。",
    resumePingDesc: "立即优化您的简历以击败 ATS 算法。",
    paperPingDesc: "即时提取洞察并总结复杂的 PDF。",
    bandPingDesc: "获取准确的雅思作文分数和反馈。",
    pricingTitle: "通用 Ping 积分",
    pricingSubtitle: "一个钱包。所有应用。充值一次，随时使用 Ping。",
    transparencyTitle: "🔒 透明度说明",
    guestCheckout: "访客结账：",
    guestCheckoutDesc: "您无需注册即可立即购买积分，但您的余额将严格锁定在您当前的设备上，并且仅对您购买积分的那个应用有效。",
    freeAccount: "免费账户（推荐）：",
    freeAccountDesc: "注册以将您的余额转换为通用积分！您的积分将在所有设备上同步，并在所有 5 个 DollarFix 应用中无缝使用。",
    signUpNow: "立即注册",
    tierNote1: "非常适合快速修复",
    tierNote2: "最受欢迎",
    tierNote3: "超值",
    creditsLabel: "积分",
    feature1: "在所有应用中使用",
    feature2: "永不过期",
    feature3: "无订阅费",
    buyCredits: "购买积分",
    quote: "“不要想太多.. 快速解决.. Ping 一下就好！”",
    footer: "© 2026 DollarFix · 为解决问题者打造。"
  }
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DollarFix — One problem, one dollar. Ping it!" },
      {
        name: "description",
        content:
          "DollarFix is a micro-SaaS hub of single-purpose AI tools. Buy Universal Ping Credits once and use them across PitchPing, CodePing, ResumePing, PaperPing, and BandPing.",
      },
      { property: "og:title", content: "DollarFix — One problem, one dollar. Ping it!" },
      {
        property: "og:description",
        content:
          "A suite of powerful, single-purpose AI tools powered by universal credits. No subscriptions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://dollarfix.net" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-all duration-300 group-hover:shadow-glow">
        <Zap size={18} strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        DollarFix
      </span>
    </Link>
  );
}

function Header({ language, setLanguage }: { language: Language; setLanguage: (l: Language) => void }) {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchCredits(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCredits(session.user.id);
      } else {
        setCredits(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCredits = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("ping_credits")
      .eq("id", userId)
      .single();
    if (data) setCredits(data.ping_credits);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative inline-flex items-center mr-2">
            <Globe className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="h-9 appearance-none rounded-md border border-border bg-transparent dark:bg-background pl-9 pr-6 text-sm font-medium focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              dir="ltr"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
              <option value="hi">हिन्दी</option>
              <option value="zh">中文</option>
            </select>
          </div>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 shadow-sm">
                <span className="text-lg leading-none">🪙</span>
                <span className="text-sm font-bold text-foreground">{credits} Pings</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                title={translations[language].logout}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">{translations[language].logout}</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                {translations[language].login}
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-200 hover:bg-primary/90 hover:shadow-glow"
              >
                {translations[language].signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero({ language }: { language: Language }) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl md:text-5xl lg:text-6xl">
          {translations[language].heroTitle}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {translations[language].heroSubtitle}
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#apps"
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-soft transition-all duration-200 hover:bg-primary/90 hover:shadow-glow"
          >
            {translations[language].exploreApps}
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function AppDirectory({ apps, language }: { apps: any[]; language: Language }) {
  return (
    <section id="apps" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations[language].toolsTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {translations[language].toolsSubtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${app.iconClass || 'bg-secondary text-primary'}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {app.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {app.description}
                </p>
                <a
                  href={app.href}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  {translations[language].launchApp}
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing({ language }: { language: Language }) {
  const tiers = [
    {
      credits: 100,
      price: "$1",
      note: translations[language].tierNote1,
      featured: false,
      stripeLink: "https://buy.stripe.com/5kQ9AS25U9Oz9A2f7K57W02",
    },
    {
      credits: 300,
      price: "$2",
      note: translations[language].tierNote2,
      featured: false,
      stripeLink: "https://buy.stripe.com/8x2cN46ma6CnaE6cZC57W00",
    },
    {
      credits: 500,
      price: "$3",
      note: translations[language].tierNote3,
      featured: true,
      stripeLink: "https://buy.stripe.com/aFa00i9ym5yjdQigbO57W01",
    },
  ];

  const handleBuyClick = async (stripeUrl: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      window.location.href = `${stripeUrl}?client_reference_id=${session.user.id}`;
    } else {
      window.location.href = stripeUrl;
    }
  };

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations[language].pricingTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {translations[language].pricingSubtitle}
          </p>
        </div>

        <div className="relative mx-auto mb-12 max-w-4xl overflow-hidden rounded-3xl bg-primary p-8 text-center shadow-card sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent" />
          <h3 className="relative text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl">
            {translations[language].transparencyTitle}
          </h3>
          <div className="relative mx-auto mt-5 max-w-2xl space-y-4 text-left text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            <p>
              <span className="font-semibold text-primary-foreground">{translations[language].guestCheckout}</span>{" "}
              {translations[language].guestCheckoutDesc}
            </p>
            <p>
              <span className="font-semibold text-primary-foreground">{translations[language].freeAccount}</span>{" "}
              {translations[language].freeAccountDesc}
            </p>
          </div>
          <div className="relative mt-8 flex justify-center">
            <Link
              to="/signup"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-background px-8 text-base font-semibold text-foreground shadow-soft transition-all duration-200 hover:bg-secondary hover:shadow-glow"
            >
              {translations[language].signUpNow}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.credits}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                tier.featured
                  ? "border-primary/30 bg-card shadow-card"
                  : "border-border bg-card/60 shadow-soft"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
                  {translations[language].tierNote3}
                </div>
              )}
              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-foreground">
                  {tier.price}
                </span>
              </div>
              <div className="mb-2 text-2xl font-bold text-primary">
                {tier.credits} {translations[language].creditsLabel}
              </div>
              <p className="mb-6 text-sm text-muted-foreground">{tier.note}</p>
              <ul className="mb-8 flex-1 space-y-3">
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="shrink-0 text-emerald" />
                  {translations[language].feature1}
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="shrink-0 text-emerald" />
                  {translations[language].feature2}
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground">
                  <Check size={16} className="shrink-0 text-emerald" />
                  {translations[language].feature3}
                </li>
              </ul>
              <button
                type="button"
                onClick={() => handleBuyClick(tier.stripeLink)}
                className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                  tier.featured
                    ? "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 hover:shadow-glow"
                    : "border border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {translations[language].buyCredits}
              </button>
            </div>
          ))}
        </div>

        <blockquote className="mt-16 text-center">
          <p className="mx-auto max-w-2xl text-xl font-medium italic leading-relaxed text-muted-foreground sm:text-2xl">
            {translations[language].quote}
          </p>
        </blockquote>
      </div>
    </section>
  );
}

function Footer({ language }: { language: Language }) {
  return (
    <footer className="border-t border-border bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          {translations[language].footer}
        </p>
      </div>
    </footer>
  );
}

function Index() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = typeof window !== "undefined" ? localStorage.getItem("dollarfix_language") : null;
    return (savedLang as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("dollarfix_language", language);
  }, [language]);

  const apps = [
    {
      icon: Briefcase,
      title: "PitchPing",
      description: translations[language].pitchPingDesc,
      href: "https://pitchping.dollarfix.net", // التعديل هنا
      iconClass: "text-white bg-[oklch(0.70_0.17_45)]",
    },
    {
      icon: Code2,
      title: "CodePing",
      description: translations[language].codePingDesc,
      href: "https://codeping.dollarfix.net", // التعديل هنا
      iconClass: "text-white bg-[oklch(0.60_0.16_285)]",
    },
    {
      icon: FileText,
      title: "ResumePing",
      description: translations[language].resumePingDesc,
      href: "https://resumeping.dollarfix.net", // التعديل هنا
      iconClass: "text-white bg-[oklch(0.60_0.16_160)]",
    },
    {
      icon: FileSearch,
      title: "PaperPing",
      description: translations[language].paperPingDesc,
      href: "https://paperping.dollarfix.net", // التعديل هنا
      iconClass: "text-white bg-[oklch(0.58_0.21_254)]",
    },
    {
      icon: GraduationCap,
      title: "BandPing",
      description: translations[language].bandPingDesc,
      href: "https://bandping.dollarfix.net", // التعديل هنا
      iconClass: "text-white bg-[oklch(0.45_0.18_25)]",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-1">
        <Hero language={language} />
        <AppDirectory apps={apps} language={language} />
        <Pricing language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}