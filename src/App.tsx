import { useState, useEffect } from 'react';
import { 
  Terminal, Shield, BookOpen, User, FolderGit2, Cpu, 
  ExternalLink, Code2, Search, Calendar, Clock, Sparkles, 
  ChevronRight, Award, Lock, HelpCircle, Check, Eye, ListFilter,
  Globe, ArrowRight, Github, ArrowUpRight, Mail, Twitter, Send
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BLOG_POSTS, RESEARCH_PROJECTS } from './data';
import { BlogPost, ResearchProject } from './types';

const TRANSLATIONS = {
  en: {
    navHome: "HOME",
    navResearch: "RESEARCH PAPERS",
    navCommunity: "COMMUNITY",
    navAbout: "ABOUT",
    title: "x86byte",
    subtitle: "Low-Level Systems Security & Vulnerability Research",
    tagline: "Unveiling the inner mechanics of compilation boundaries, advanced reverse engineering, and offensive cybersecurity.",
    bioTitle: "About x86byte",
    bioBody: "Security researcher specializing in Windows and iOS internals, low-level debugging, and vulnerability research. Creator of the OrcaCyberWeapons community. Focused on exploit development, system-level security architecture, and offensive cybersecurity.",
    filterAll: "ALL RESEARCH",
    filterMalware: "MALWARE ANALYSIS",
    filterReversing: "REVERSE ENGINEERING",
    filterObfuscation: "OBFUSCATION",
    filterKernel: "KERNEL ARCHITECTURE",
    difficulty: "DIFFICULTY",
    decryptButton: "Read Article",
    backButton: "← BACK TO CATALOG",
    copied: "Copied!",
    repoBtn: "View Repository",
    statusActive: "Status: Active",
    noTelemetry: "© 2026 x86byte. Strict privacy rules. No analytics cookies or server-side user logs."
  },
  es: {
    navHome: "INICIO",
    navResearch: "ARTÍCULOS DE INVESTIGACIÓN",
    navCommunity: "COMUNIDAD",
    navAbout: "ACERCA DE",
    title: "x86byte",
    subtitle: "Investigación de Seguridad de Sistemas y Vulnerabilidades de Bajo Nivel",
    tagline: "Revelando los mecanismos internos de los límites de compilación, ingeniería inversa avanzada y la seguridad ofensiva.",
    bioTitle: "Sobre x86byte",
    bioBody: "Investigador de seguridad especializado en el funcionamiento interno de Windows e iOS, depuración de bajo nivel e investigación de vulnerabilidades. Creador de la comunidad OrcaCyberWeapons. Enfocado en el desarrollo de exploits y ciberseguridad ofensiva.",
    filterAll: "TODA LA INVESTIGACIÓN",
    filterMalware: "ANÁLISIS DE MALWARE",
    filterReversing: "INGENIERÍA INVERSA",
    filterObfuscation: "OFUSCACIÓN",
    filterKernel: "ARQUITECTURA DEL KERNEL",
    difficulty: "DIFICULTAD",
    decryptButton: "Leer Artículo",
    backButton: "← VOLVER AL CATÁLOGO",
    copied: "¡Copiado!",
    repoBtn: "Ver Repositorio",
    statusActive: "Estado: Activo",
    noTelemetry: "© 2026 x86byte. Reglas de privacidad estrictas. Sin cookies de análisis ni registros."
  },
  fr: {
    navHome: "ACCUEIL",
    navResearch: "RECHERCHES ET ARTICLES",
    navCommunity: "COMMUNAUTÉ",
    navAbout: "À PROPOS",
    title: "x86byte",
    subtitle: "Sécurité Système Bas Niveau & Recherche de Vulnérabilités",
    tagline: "Découvrir les mécanismes internes des frontières de compilation, de la rétro-ingénierie avancée et de la cybersécurité offensive.",
    bioTitle: "À Propos de x86byte",
    bioBody: "Chercheur en sécurité spécialisé dans les systèmes internes Windows et iOS, le débogage bas niveau et la recherche de vulnérabilités. Créateur de la communauté OrcaCyberWeapons. Expert en développement d'exploits.",
    filterAll: "TOUTE LA RECHERCHE",
    filterMalware: "ANALYSE DE MALWARE",
    filterReversing: "RÉTRO-INGÉNIERIE",
    filterObfuscation: "OBFUSCATION",
    filterKernel: "ARCHITECTURE NOYAU",
    difficulty: "DIFICULTÉ",
    decryptButton: "Consulter l'Article",
    backButton: "← RETOUR AU CATALOGUE",
    copied: "Copié !",
    repoBtn: "Dépôt GitHub",
    statusActive: "Statut : Actif",
    noTelemetry: "© 2026 x86byte. Règles d'éthique strictes. Aucun cookie de suivi."
  },
  ru: {
    navHome: "ГЛАВНАЯ",
    navResearch: "ИССЛЕДОВАНИЯ",
    navCommunity: "СООБЩЕСТВО",
    navAbout: "ОБО МНЕ",
    title: "x86byte",
    subtitle: "Низкоуровневые Исследования Уязвимостей и Системной Безопасности",
    tagline: "Раскрытие внутренних механизмов компиляционных слоёв, продвинутого реверс-инжиниринга и наступательной кибербезопасности.",
    bioTitle: "О x86byte",
    bioBody: "Исследователь безопасности, специализирующийся на внутреннем устройстве Windows и iOS, низкоуровневой отладке и поиске уязвимостей. Создатель сообщества OrcaCyberWeapons.",
    filterAll: "ВСЕ ПУБЛИКАЦИИ",
    filterMalware: "АНАЛИЗ МАЛВАРИ",
    filterReversing: "РЕВЕРС-ИНЖИНИРИНГ",
    filterObfuscation: "ОБФУСКАЦИЯ",
    filterKernel: "АРХИТЕКТУРА ЯДРА",
    difficulty: "СЛОЖНОСТЬ",
    decryptButton: "Читать Статью",
    backButton: "← К СПИСКУ ПУБЛИКАЦИЙ",
    copied: "Скопировано!",
    repoBtn: "Репозиторий",
    statusActive: "Статус: Активен",
    noTelemetry: "© 2026 x86byte. Полное отсутствие кук отслеживания и телеметрии."
  }
};

const TYPING_CODE_BLOCKS = [
  {
    title: "C++ AES sbox parser",
    code: `template <size_t N>
constexpr auto EncryptConstexpr(const char* str, uint64_t salt) {
    std::array<uint8_t, N> data{};
    AES128_Engine blockCipher(0xfd2a9b1c ^ salt);
    for(size_t i = 0; i < N-1; ++i) {
        data[i] = blockCipher.EncryptShift(str[i]);
    }
    return data;
}`
  },
  {
    title: "x64 Decompiled Call Hook",
    code: `mov r10, rcx
mov eax, 18h         ; System Service Number
syscall              ; Kernel transit
ret                  ; Safe return execution`
  },
  {
    title: "AST Control Flow State Flattener",
    code: `void mutate_cfg_ast(ASTContext& ctx) {
    uint32_t dispatcher_key = ctx.generate_opaque_seed();
    auto switch_stmt = ctx.create_dynamic_dispatcher(dispatcher_key);
    for (auto& basic_block : ctx.get_statements()) {
        switch_stmt.inject_flat_state(basic_block);
    }
}`
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'blog' | 'community' | 'about'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [blogCategory, setBlogCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState<'en' | 'es' | 'fr' | 'ru'>('en');
  const [repoStars, setRepoStars] = useState<Record<string, number>>({});

  useEffect(() => {
    RESEARCH_PROJECTS.forEach(proj => {
      fetch(`https://api.github.com/repos/x86byte/${proj.id}`)
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          if (data && typeof data.stargazers_count === 'number') {
            setRepoStars(prev => ({ ...prev, [proj.id]: data.stargazers_count }));
          }
        })
        .catch(err => console.warn("Could not fetch stars for", proj.id));
    });
  }, []);

  // Background Live Typing Simulator Variables
  const [currentBlockIdx, setCurrentBlockIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIdx, setCharIdx] = useState(0);

  // Typewriting effect
  useEffect(() => {
    const targetText = TYPING_CODE_BLOCKS[currentBlockIdx].code;
    if (charIdx < targetText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + targetText[charIdx]);
        setCharIdx(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIdx(0);
        setCurrentBlockIdx(prev => (prev + 1) % TYPING_CODE_BLOCKS.length);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, currentBlockIdx]);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = blogCategory === 'all' || post.category === blogCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const loc = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-[#060402] text-slate-100 selection:bg-rose-500 selection:text-white font-sans relative overflow-x-hidden flex flex-col">
      
      {/* FULLSCREEN BACKGROUND IDE PARSER AND FLOATING BLOCKS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main typing block */}
        <div className="absolute top-[15%] left-[5%] opacity-[0.08] border border-orange-500/20 p-4 rounded bg-slate-950/40 hidden md:block">
          <div className="text-[10px] text-slate-500 border-b border-orange-500/10 pb-1 mb-2">sub_parse_payload:</div>
          <pre className="text-orange-500 font-mono text-[10px] whitespace-pre-wrap leading-relaxed select-none">
            <code>{displayedText}</code>
            <span className="w-1.5 h-3 bg-orange-500 inline-block align-middle ml-1 animate-pulse"></span>
          </pre>
        </div>

        {/* Secondary background block */}
        <div className="absolute top-[40%] right-[10%] opacity-[0.05] border border-orange-500/20 p-4 rounded bg-slate-950/40 hidden md:block">
          <div className="text-[10px] text-slate-500 border-b border-orange-500/10 pb-1 mb-2">loc_hypercall_dispatcher:</div>
          <pre className="text-orange-500 font-mono text-[10px] whitespace-pre-wrap leading-relaxed select-none">
{`mov eax, 0x1F
vmcall
test eax, eax
jnz short loc_trap
ret`}
          </pre>
        </div>

        {/* Tertiary background block */}
        <div className="absolute bottom-[20%] left-[20%] opacity-[0.03] border border-orange-500/20 p-4 rounded bg-slate-950/40 hidden md:block">
          <div className="text-[10px] text-slate-500 border-b border-orange-500/10 pb-1 mb-2">sub_resolve_iat:</div>
          <pre className="text-orange-500 font-mono text-[10px] whitespace-pre-wrap leading-relaxed select-none">
{`mov rcx, [rbp+arg_0]
call get_module_base
mov rdx, [rax+3Ch]
add rdx, rax
mov r8d, [rdx+88h]`}
          </pre>
        </div>
      </div>

      {/* COHESIVE SLATE AMBIENT BACKGROUND SYSTEM */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-orange-900/10 blur-[160px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed top-[600px] right-1/4 w-[600px] h-[600px] bg-slate-800/20 blur-[200px] rounded-full pointer-events-none z-0"></div>
      
      {/* TOP DECORATIVE LOGO AND NAV BAR */}
      <div className="border-b border-orange-900/40 bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 self-start lg:self-center">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></div>
            <span className="font-display font-medium text-slate-100 tracking-tight text-sm">
              x86byte
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 w-full lg:w-auto">
            {/* Nav Links */}
            <div className="flex flex-wrap justify-center items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => { setActiveTab('home'); setSelectedPost(null); }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeTab === 'home'
                    ? 'text-orange-400 bg-slate-900/80 border border-orange-800/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {loc.navHome}
              </button>
              <button
                onClick={() => { setActiveTab('blog'); setSelectedPost(null); }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeTab === 'blog'
                    ? 'text-orange-400 bg-slate-900/80 border border-orange-800/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {loc.navResearch}
              </button>
              <button
                onClick={() => { setActiveTab('community'); setSelectedPost(null); }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeTab === 'community'
                    ? 'text-orange-400 bg-slate-900/80 border border-orange-800/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {loc.navCommunity}
              </button>
              <button
                onClick={() => { setActiveTab('about'); setSelectedPost(null); }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeTab === 'about'
                    ? 'text-orange-400 bg-slate-900/80 border border-orange-800/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {loc.navAbout}
              </button>
            </div>

            {/* Language Selection Bar */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-900 p-1 rounded-lg">
              <Globe className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" />
              {(['en', 'es', 'fr', 'ru'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold transition-all ${
                    currentLang === lang
                      ? 'bg-orange-950/50 text-orange-400 border border-orange-800/40'
                      : 'text-slate-500 hover:text-slate-350'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HEADER BANNER */}
      <div className="relative w-full border-b border-orange-900/40 py-20 overflow-hidden z-10">
        
        {/* IDA Pro Call Graph Background Overlay */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ 
            backgroundImage: "url('./img/image.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 w-full h-full bg-slate-950/70 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl bg-slate-950/40 p-6 rounded-xl backdrop-blur-sm border border-slate-800/50">
            <h1 className="text-3.5xl md:text-5xl font-display font-bold text-white tracking-tight leading-none text-shadow-sm">
              {loc.title}
            </h1>
            <p className="text-slate-200 font-sans text-sm md:text-base leading-relaxed text-shadow-sm">
              {loc.tagline}
            </p>
          </div>

          {/* IDA Basic Blocks / Custom Assembly Display */}
          <div className="relative shrink-0 w-full md:w-[320px] bg-slate-950/90 backdrop-blur-md border border-orange-900/50 rounded-lg p-4 font-mono text-[10px] text-orange-300/90 shadow-2xl">
            <div className="flex items-center justify-between text-[8px] text-slate-400 border-b border-slate-800 pb-2 mb-2">
            </div>
            
            <div className="space-y-1">
              <div className="text-rose-400">vmx_ept_violation:</div>
              <div className="pl-3">vmread  rax, 0x6400       ; read guest PA</div>
              <div className="pl-3">mov     rcx, cr3</div>
              <div className="pl-3">and     rax, ~0xFFF       ; page align</div>
              <div className="pl-3">cmp     rax, [rbp+8h]     ; check hook addr</div>
              <div className="pl-3 text-orange-400">je      loc_ept_trampoline</div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED VIEWS */}
      <main className="max-w-6xl w-full mx-auto px-4 py-10 relative z-10 flex-grow">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              
              {/* Profile Card Info Box */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-slate-950/60 border border-orange-900/30 rounded-xl p-6 md:p-8 space-y-4 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <img 
                      src="/pfp.jpg" // Will be replaced by user's actual image if available via relative path. Using generic fallback visually if not overridden locally. 
                      onError={(e) => {
                         // Fallback structure
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                      alt="x86byte"
                      className="h-16 w-16 rounded-lg border border-orange-500/50 object-cover"
                    />
                    <div className="hidden h-16 w-16 rounded-lg bg-gradient-to-tr from-orange-400 to-slate-800 p-[1px] shrink-0" id="fallback-pfp">
                      <div className="h-full w-full bg-slate-950 rounded-lg flex items-center justify-center text-orange-400 font-mono font-bold text-sm">
                        x86
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-lg text-slate-100 flex items-center gap-2">
                        {loc.bioTitle}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
                    {loc.bioBody}
                  </p>

                  <div className="pt-4 border-t border-slate-900/60 inline-flex items-center gap-6">
                    <button
                      onClick={() => setActiveTab('blog')}
                      className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1"
                    >
                      Browse Papers <ArrowRight className="w-3 h-3" />
                    </button>
                    <a
                      href="https://github.com/x86byte"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      github.com/x86byte
                    </a>
                  </div>
                </div>
              </div>

              {/* Research Projects Listing Minimal */}
              <div className="lg:col-span-2 space-y-4">
                 <h2 className="text-sm font-display font-semibold text-slate-100 flex items-center gap-2 mb-2">
                    <FolderGit2 className="text-orange-400 w-4 h-4" />
                    Repositories
                  </h2>
                {RESEARCH_PROJECTS.map(proj => (
                  <a 
                    href={`https://github.com/x86byte/${proj.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={proj.id} 
                    className="block bg-slate-950/60 hover:bg-slate-900 border border-slate-900 hover:border-orange-900/50 rounded-lg p-4 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-mono font-semibold text-xs text-slate-200">
                        {proj.name}
                      </h3>
                      {(repoStars[proj.id] ?? proj.githubStars) !== undefined && (
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-semibold">
                          ★ {repoStars[proj.id] ?? proj.githubStars}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-2 leading-relaxed">
                       {proj.description}
                    </p>
                  </a>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: RESEARCH PAPERS & BLOGS */}
        {activeTab === 'blog' && (
          <div className="space-y-8">
            {!selectedPost ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Topic Filter Column */}
                <div className="space-y-6 lg:col-span-1">
                  <div className="bg-slate-950/60 border border-orange-900/20 backdrop-blur-sm rounded-xl p-5 space-y-4 shadow-lg">
                    <h3 className="font-display font-semibold text-xs text-slate-300 uppercase tracking-widest border-b border-orange-900/30 pb-2.5 flex items-center gap-2 font-mono">
                      <ListFilter className="w-4 h-4 text-orange-400" />
                      Topic Index
                    </h3>
                    <div className="space-y-1 font-mono text-xs">
                      {[
                        { key: 'all', label: loc.filterAll, count: BLOG_POSTS.length },
                        { key: 'malware-dev', label: loc.filterMalware, count: BLOG_POSTS.filter(b=>b.category==='malware-dev').length },
                        { key: 'reverse-engineering', label: loc.filterReversing, count: BLOG_POSTS.filter(b=>b.category==='reverse-engineering').length },
                        { key: 'obfuscation', label: loc.filterObfuscation, count: BLOG_POSTS.filter(b=>b.category==='obfuscation').length },
                        { key: 'kernel-hacking', label: loc.filterKernel, count: BLOG_POSTS.filter(b=>b.category==='kernel-hacking').length },
                      ]
                      .filter(cat => cat.count > 0)
                      .map(cat => (
                        <button
                          key={cat.key}
                          onClick={() => setBlogCategory(cat.key)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                            blogCategory === cat.key 
                              ? 'bg-orange-950/40 text-orange-400 border border-orange-900/30' 
                              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-900/60'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 text-slate-500 font-bold">
                            {cat.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Articles Stream */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Styled Search Field */}
                  <div className="relative backdrop-blur-sm">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Query topics (e.g. sbox, LummaC2, PEB Internals)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/30 transition-colors"
                    />
                  </div>

                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-12 bg-slate-950/40 border border-slate-900/40 rounded-xl text-slate-500 font-mono text-xs">
                      No system archives located matching your descriptors.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {filteredPosts.map(post => {
                        const styleMap = {
                          "malware-dev": { label: "MALWARE", color: "text-slate-300 border-slate-800 bg-slate-950" },
                          "reverse-engineering": { label: "REVERSING", color: "text-orange-400 border-orange-950/40 bg-orange-950/30" },
                          "kernel-hacking": { label: "KERNEL", color: "text-slate-300 border-slate-800 bg-slate-950" },
                          "obfuscation": { label: "OBFUSCATION", color: "text-orange-400 border-orange-950/40 bg-orange-950/30" }
                        };
                        const catDetails = styleMap[post.category as keyof typeof styleMap] || { label: "RESEARCH", color: "text-slate-350 border-slate-800 bg-slate-950" };

                        return (
                          <article 
                            key={post.id}
                            className="bg-slate-950/60 backdrop-blur-md border border-slate-900 hover:border-orange-900/50 rounded-xl p-6 transition-all hover:-translate-y-0.5 duration-200 flex flex-col justify-between shadow-lg"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className={`text-[9px] font-mono border px-2.5 py-0.5 rounded uppercase tracking-wider font-bold ${catDetails.color}`}>
                                  {catDetails.label}
                                </span>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                  {post.difficulty.toUpperCase()}
                                </div>
                              </div>

                              <h2 className="text-lg md:text-xl font-display font-medium text-slate-100 hover:text-orange-400 transition-colors">
                                {post.title}
                              </h2>

                              <p className="text-xs md:text-sm text-slate-400 font-sans leading-relaxed">
                                {post.excerpt}
                              </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-mono">
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                              </div>

                              <button
                                onClick={() => setSelectedPost(post)}
                                className="inline-flex items-center gap-1 text-[11px] font-mono text-orange-400 hover:text-orange-300 transition-colors bg-orange-950/30 hover:bg-orange-950/50 border border-orange-900/40 px-3 py-1.5 rounded"
                              >
                                <span>{loc.decryptButton}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              // Inside detailed blog layout
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-slate-200 transition-all font-semibold"
                  >
                    {loc.backButton}
                  </button>
                  <span className="text-[10px] font-mono text-orange-400 bg-orange-950/30 border border-orange-900/40 px-2 py-0.5 rounded uppercase font-bold">
                    STEALTH RECTIFIER PROBED
                  </span>
                </div>

                <article className="max-w-4xl mx-auto space-y-6 bg-slate-950/70 backdrop-blur-md border border-orange-900/20 p-6 md:p-10 rounded-2xl select-text shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-4 mb-4">
                    <span>SECTOR_ARCHIVE :: {selectedPost.id.toUpperCase()}</span>
                    <span>MD_AUTHOR: {selectedPost.author}</span>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-2.5xl md:text-3.5xl font-display font-medium text-slate-50 leading-tight">
                      {selectedPost.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono border-b border-slate-900/60 pb-5">
                      <span className="bg-orange-950/40 border border-orange-900/40 text-orange-400 px-2.5 py-0.5 rounded font-bold">{selectedPost.category.toUpperCase()}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
                      <span className="bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded">DIFFICULTY: {selectedPost.difficulty}</span>
                    </div>
                  </div>

                  {/* Render content segments */}
                  <div className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed space-y-6">
                    <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:font-display prose-headings:text-orange-400 prose-a:text-orange-500 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:font-mono prose-pre:text-orange-300 prose-code:font-mono prose-code:text-orange-400 prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {selectedPost.content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Footer tags */}
                  <div className="pt-8 border-t border-slate-900/60 flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-950 border border-slate-900 text-slate-500 text-[10px] font-mono px-2.5 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </article>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMMUNITY PAGE */}
        {activeTab === 'community' && (
          <div className="max-w-4xl mx-auto space-y-10">
            
            <div className="text-center space-y-4 pt-4">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-white text-shadow-orange">
                OrcaCyberWeapons Community
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
                The OrcaCyberWeapons community is a focused space for reverse engineers, exploit developers, and system-level hackers. We specialize in Windows and iOS vulnerability research, low-level debugging, and modern exploitation techniques.
              </p>
            </div>

            <div className="flex justify-center w-full my-8">
              <img 
                src="/community.jpg" // Will be mapped to the provided picture
                alt="Community Warfighter"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="max-w-full h-auto rounded-xl border border-orange-900/40 shadow-2xl object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
               {/* Vulnerability Researchers */}
               <div className="bg-slate-950/80 backdrop-blur-md border border-slate-900 hover:border-orange-900/50 rounded-xl p-6 transition-all shadow-xl space-y-4">
                  <h3 className="font-display font-semibold text-lg text-orange-400">
                     Vulnerability Researchers (Group)
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                     A global research-oriented Telegram group originally based in the Russian security scene. It's home to vulnerability hunters and system-level researchers discussing low-level exploitation, CVEs, and reverse engineering.
                  </p>
                  <a href="https://t.me/VulnerabilityResearchers" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded font-bold transition-colors">
                     [ JOIN GROUP ] <ArrowRight className="w-3.5 h-3.5" />
                  </a>
               </div>

               {/* Orca Cyber Weapons */}
               <div className="bg-slate-950/80 backdrop-blur-md border border-slate-900 hover:border-orange-900/50 rounded-xl p-6 transition-all shadow-xl space-y-4">
                  <h3 className="font-display font-semibold text-lg text-orange-400">
                     Orca Cyber Weapons (Channel)
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                     A high-quality feed of real-world exploits, vulnerability discoveries, advanced CVEs, and system-level research. Ideal for professionals tracking offensive security and low-level attack surfaces.
                  </p>
                  <a href="https://t.me/OrcaCyberWeapons" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded font-bold transition-colors">
                     [ VIEW CHANNEL ] <ArrowRight className="w-3.5 h-3.5" />
                  </a>
               </div>
            </div>

            <div className="bg-orange-950/20 border border-orange-900/40 p-6 rounded-xl text-center shadow-lg mb-10">
               <p className="text-amber-500 font-sans text-sm md:text-base leading-relaxed">
                  If you're passionate about security research, reverse engineering, and low-level systems, you'll find valuable content and like-minded individuals in these spaces. Everyone with genuine interest is welcome to join and learn.
               </p>
            </div>

          </div>
        )}

        {/* TAB 4: ABOUT PAGE */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="bg-slate-950/80 backdrop-blur-md border border-slate-900 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-center md:items-start">
              
              <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative rounded-full overflow-hidden border-4 border-orange-900/50 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                <img 
                  src="/pfp.png" 
                  alt="x86byte profile picture"
                  onError={(e) => { e.currentTarget.src = 'https://github.com/x86byte.png'; }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6 text-center md:text-left flex-1">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                    x86byte
                  </h1>
                  <p className="text-orange-400 font-mono text-sm font-semibold">
                    [ SYSTEMS SECURITY RESEARCHER & EXPLOIT DEVELOPER ]
                  </p>
                </div>

                <div className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-300">
                  <p>
                    I am <strong>x86byte</strong>, an aspiring software security engineer and malware reverse engineer. My primary focus lies in obfuscation engineering, reverse engineering of both malware and software, and advanced deobfuscation techniques.
                  </p>
                  <p>
                    With a deep passion for LLVM, Clang, and compiler design, my work frequently explores advanced execution environments, control flow manipulation, and both source-code based and bin2bin dynamic obfuscation engines. I specialize in tearing down complex malware, analyzing system internals, and am always happy to collaborate on interesting security projects.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-slate-900/60">
                  <a href="https://github.com/x86byte" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-colors border border-slate-800">
                    <Github className="w-4 h-4" /> GITHUB
                  </a>
                  <a href="https://x.com/x86byte" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-colors border border-slate-800">
                    <Twitter className="w-4 h-4" /> X.COM
                  </a>
                  <a href="https://t.me/x86byte" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-colors border border-slate-800">
                    <Send className="w-4 h-4 text-orange-500" /> TELEGRAM: @x86byte
                  </a>
                  <div className="flex items-center gap-2 bg-slate-900 text-slate-200 px-4 py-2 rounded-lg font-mono text-xs font-semibold border border-slate-800">
                    <Terminal className="w-4 h-4 text-orange-500" /> DISCORD: @x86byte
                  </div>
                  <a href="mailto:ztafjout@student.1337.ma" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-colors border border-slate-800">
                    <Mail className="w-4 h-4 text-orange-500" /> EMAIL ME
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 backdrop-blur-md py-8 text-xs font-mono text-slate-500 relative z-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
          <div className="flex gap-6 items-center">
            <a href="https://x.com/x86byte" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="X (Twitter)">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com/x86byte" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://t.me/x86byte" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="Telegram">
              <Send className="w-5 h-5" />
            </a>
            <a href="mailto:ztafjout@student.1337.ma" className="hover:text-orange-400 transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <span>{loc.noTelemetry}</span>
        </div>
      </footer>

    </div>
  );
}
