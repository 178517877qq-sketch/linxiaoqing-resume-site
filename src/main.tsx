import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Database,
  LineChart,
  Mail,
  MonitorCog,
  Phone,
  Users
} from "lucide-react";
import "./styles.css";

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const heroPoster = assetPath("assets/hero-data-flow-poster.jpg");
const heroVideoWebm = assetPath("assets/hero-data-flow.webm");
const heroVideoMp4 = assetPath("assets/hero-data-flow.mp4");

const profile = {
  name: "林晓庆",
  title: "业务数据分析师 / 指标监控 / 数据治理 / 数据需求协同",
  phone: "134-8030-3776",
  email: "xunni8214@gmail.com",
  education: "广东理工学院 - 机械设计与制造 - 专科",
  summary:
    "聚焦业务数据分析，熟悉数据口径治理、资源规则管理、经营指标监控、会议复盘支持和数据功能需求协同。能够把业务问题整理成清晰的指标逻辑、数据流程和复盘结论，支持经营判断与跨团队沟通。"
};

const stats = [
  { value: "3年+", label: "2022.09-2025.12 核心数据分析岗位经历" },
  { value: "指标监控", label: "经营数据跟踪与异常检视" },
  { value: "数据派发", label: "资源规则、状态、反馈链路管理" },
  { value: "需求协同", label: "与开发沟通报表逻辑和功能体验" }
];

const projects = [
  {
    type: "BUSINESS DATA ANALYTICS",
    title: "经营数据分析与业务优化",
    metric: "3年+ 经营数据分析 · 合作商 GMV +10% · 外呼接通率 +8%",
    casePoints: [
      {
        label: "业务问题",
        text: "合作商资源分散、客群质量参差，数据口径不统一、异常发现滞后，业务与合作商之间常出现对数偏差，影响派发效率与外呼转化。"
      },
      {
        label: "分析动作",
        text: "制定数据管理与派发规则，对客群做质量分层并精准下发；搭建 20+ 核心指标监控与异常跟进，沉淀字段口径和报表文档；与开发共建外呼接通率响应模型，并主持每周对数复盘。"
      },
      {
        label: "输出价值",
        text: "数据派发规则带动合作商 GMV 提升约 10%，接通率模型带动外呼接通率提升约 8%；异常更早发现、复盘更快，经营判断有据可依。"
      }
    ],
    tags: ["数据派发", "接通率模型", "复盘协同"],
    image: assetPath("assets/project-bank-monitoring.svg?v=20260609-case-tune"),
    imageAlt: "广发银行经营数据分析与业务优化项目封面",
    evidence: [
      "制定数据管理与派发规则、客群质量分层，精准下发，带动合作商 GMV 提升约 10%",
      "与开发共建外呼接通率响应模型，外呼接通率提升约 8%",
      "主持每周对数复盘会，统一口径、降低对数偏差，异常发现从 T+3 提到 T+1"
    ]
  },
  {
    type: "China E-commerce Trends",
    title: "中国电商消费趋势分析",
    metric: "3 个官方数据源 / 线上化趋势跟踪 / 数据包·SQL视图·HTML报告",
    casePoints: [
      {
        label: "业务问题",
        text: "公开资料口径分散，电商趋势需要同时看官方零售、平台披露、用户结构、品类和消费领域。"
      },
      {
        label: "分析动作",
        text: "整理国家统计局、上市平台披露和 CNNIC 数据，形成事实表、来源血缘、SQL 视图、趋势洞察和 HTML 报告。"
      },
      {
        label: "输出价值",
        text: "输出可导入数据库的数据包和可视化报告，能解释线上零售、消费领域、平台指标和客群变化。"
      }
    ],
    tags: ["官方口径", "来源血缘", "趋势报告"],
    image: assetPath("assets/project-ecommerce-research.svg?v=20260609-case-tune"),
    imageAlt: "中国电商消费趋势网络购物用户、使用率和网上零售额封面",
    evidence: [
      "CNNIC 口径：2025 网络购物用户 9.37 亿、使用率 83.2%",
      "统计局口径：2025 全国网上零售额 15.97 万亿元，实物商品网上零售额占社零比重较 2021 提升 1.6 个百分点",
      "数据口径：官方统计与 CNNIC 用户指标结合，不混写平台 GMV"
    ]
  },
  {
    type: "Novel Market Analysis",
    title: "国际热门小说年度趋势分析",
    metric: "500 本清洗样本 / 题材结构分析 / Goodreads 平台行为代理",
    casePoints: [
      {
        label: "业务问题",
        text: "热门小说榜单容易只停留在排名，需要进一步解释平台读者行为、作品互动强度、题材结构和年度变化。"
      },
      {
        label: "分析动作",
        text: "基于 Goodreads 年度热门榜快照抓取候选池，过滤非小说，建立 500 本书档案，并统计书架标记、评分、评论和题材标签。"
      },
      {
        label: "输出价值",
        text: "把内容热度拆成可读的数据叙事，既能看平台互动趋势，也能追溯到单书档案、方法论和数据边界。"
      }
    ],
    tags: ["读者行为代理", "样本清洗", "内容洞察"],
    image: assetPath("assets/project-novel-market.svg?v=20260609-case-tune"),
    imageAlt: "国际热门小说 Goodreads 书架标记量、评分量和评论量封面",
    evidence: [
      "2025 Goodreads Top100 小说样本：书架标记量 6158.8 万",
      "评分量 2459.1 万、评论量 322.8 万；Romance 在 5 类题材中占比最高，约 40%",
      "数据口径：Goodreads 为平台行为代理，不代表出版市场真实销售"
    ]
  }
];

const strengths = [
  {
    icon: Database,
    title: "数据口径与治理",
    text:
      "能把分散的字段、规则和状态整理成可执行口径，让业务、统计、会议和复盘使用同一套数据理解。",
    points: [
      "字段含义、状态流转、资源规则口径梳理",
      "派发、统计、复盘数据的一致性检查",
      "沉淀口径说明，减少重复沟通和口径偏差"
    ]
  },
  {
    icon: LineChart,
    title: "经营指标监控",
    text:
      "关注指标变化背后的业务动作，持续跟踪项目进度、资源使用、反馈结果和异常波动。",
    points: [
      "日常进度、资源消耗、反馈状态跟踪",
      "异常数据定位与波动原因初步拆解",
      "输出会议可用的指标摘要和问题提示"
    ]
  },
  {
    icon: BarChart3,
    title: "业务复盘与汇报",
    text:
      "把阶段结果、异常问题和跟进动作整理成复盘材料，帮助团队更快判断问题来源和策略调整方向。",
    points: [
      "按阶段整理经营结果、差异和问题清单",
      "把数据结论转成会议讨论和行动项",
      "跟进复盘后的调整动作与后续表现"
    ]
  },
  {
    icon: MonitorCog,
    title: "数据需求协同",
    text:
      "能把业务反馈转成清晰的数据功能需求，与开发对齐字段、报表逻辑、展示规则和使用体验。",
    points: [
      "梳理需求背景、字段逻辑和使用场景",
      "参与报表逻辑核对、功能联调和验收",
      "推动数据工具更贴近日常经营管理"
    ]
  }
];

const timeline = [
  {
    time: "2022.09 - 2025.12",
    company: "广发银行",
    role: "数据分析师",
    detail:
      "负责项目数据管理、资源派发、数据会议材料整理、经营指标监控和异常跟进；与开发团队沟通数据功能需求，推动字段口径、报表逻辑和业务使用体验持续优化，为项目经营复盘与策略调整提供依据。",
    icon: Database,
    phase: "primary"
  },
  {
    time: "2022.02 - 2022.06",
    company: "广发信用卡中心（中英项目）",
    role: "数据岗",
    detail:
      "负责客户资源管理、资源下发规则、周/月度数据检视和异常追踪，支持团队进行资源分配、进度复盘和业务策略调整。",
    icon: LineChart,
    phase: "supporting"
  },
  {
    time: "2021.08 - 2022.01",
    company: "广州乐芙信息科技有限公司",
    role: "电商老师",
    detail:
      "维护 1500+ 会员，理解健康产品需求，制定销售方案，并通过退单率、业绩结构等数据寻找体验提升点。",
    icon: Users,
    phase: "early"
  },
  {
    time: "2020.12 - 2021.06",
    company: "泉后（广州）生物科技有限公司",
    role: "社群运营",
    detail:
      "协同 150+ 线下门店，参与直播会员引入、售后处理、销售计划和私域活跃维护，提升用户触达和运营承接效率。",
    icon: MonitorCog,
    phase: "early"
  },
  {
    time: "2018.03 - 2020.09",
    company: "中国平安广州电销分中心",
    role: "小组长",
    detail:
      "负责新人培训 PPT、产品卖点讲解、入职流程协同和每日数据追踪，帮助新人提升业务理解和产出效率。",
    icon: BadgeCheck,
    phase: "early"
  }
];

function usePortfolioMotion() {
  useEffect(() => {
    const readyFrame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add("is-ready");
    });

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-section]"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-card]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const motionTargets = [...sections, ...cards, ...reveals];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -12% 0px" }
    );

    motionTargets.forEach((target) => observer.observe(target));

    const nav = document.querySelector<HTMLElement>(".top-nav");
    let scrollCorrectionTimer = 0;
    const scrollToTarget = (targetId: string, behavior: ScrollBehavior) => {
      const target = document.querySelector<HTMLElement>(targetId);
      if (!target) return false;

      const scrollOffset = 118;
      const scrollRoot = document.scrollingElement ?? document.documentElement;
      const currentScrollTop = () =>
        window.scrollY || scrollRoot.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      const targetTop = () => target.getBoundingClientRect().top + currentScrollTop() - scrollOffset;
      const applyScroll = (top: number, scrollBehavior: ScrollBehavior) => {
        const nextTop = Math.max(0, Math.round(top));
        window.scrollTo({ top: nextTop, behavior: scrollBehavior });

        if (scrollBehavior === "auto") {
          scrollRoot.scrollTop = nextTop;
          document.documentElement.scrollTop = nextTop;
          document.body.scrollTop = nextTop;
        }
      };
      const correctScroll = (delay: number) => {
        scrollCorrectionTimer = window.setTimeout(() => {
          if (Math.abs(target.getBoundingClientRect().top - scrollOffset) > 28) {
            applyScroll(targetTop(), "auto");
          }
        }, delay);
      };

      window.clearTimeout(scrollCorrectionTimer);
      applyScroll(targetTop(), behavior);
      nav?.classList.toggle("is-floating", targetId !== "#top");

      if (behavior === "smooth") {
        correctScroll(650);
      } else {
        correctScroll(120);
      }

      return true;
    };
    let ticking = false;
    const updateNav = () => {
      nav?.classList.toggle("is-floating", window.scrollY > window.innerHeight * 0.82);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    };
    updateNav();
    const hashSyncTimer = window.setTimeout(() => {
      const targetId = window.location.hash;
      if (!targetId || targetId === "#top") return;
      if (scrollToTarget(targetId, "auto")) nav?.classList.add("is-floating");
    }, 180);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onNavClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(".top-nav a[href^='#']");
      if (!link) return;

      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      if (!document.querySelector(targetId)) return;

      event.preventDefault();
      event.stopPropagation();
      scrollToTarget(targetId, "smooth");
      window.history.replaceState(null, "", targetId);
    };
    document.addEventListener("click", onNavClick, true);

    const onHashChange = () => {
      const targetId = window.location.hash || "#top";
      window.requestAnimationFrame(() => scrollToTarget(targetId, "smooth"));
    };
    window.addEventListener("hashchange", onHashChange);

    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopVideoQuery = window.matchMedia("(min-width: 721px)");
    let heroVideoLoaded = false;
    let heroVideoInView = true;

    const unloadHeroVideo = () => {
      if (!heroVideo || !heroVideoLoaded) return;
      heroVideo.pause();
      heroVideo.querySelectorAll<HTMLSourceElement>("source").forEach((source) => {
        source.removeAttribute("src");
      });
      heroVideo.load();
      heroVideoLoaded = false;
      heroVideo.dataset.videoReady = "false";
    };

    const loadHeroVideo = () => {
      if (!heroVideo || heroVideoLoaded) return;
      heroVideo.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((source) => {
        const src = source.dataset.src;
        if (src) source.src = src;
      });
      heroVideo.load();
      heroVideoLoaded = true;
      heroVideo.dataset.videoReady = "true";
    };

    const syncHeroVideo = () => {
      if (!heroVideo) return;
      const allowMotionVideo = desktopVideoQuery.matches && !reduceMotionQuery.matches;
      if (!allowMotionVideo) {
        unloadHeroVideo();
        return;
      }

      loadHeroVideo();
      if (heroVideoInView && !document.hidden) {
        heroVideo.play().catch(() => undefined);
      } else {
        heroVideo.pause();
      }
    };

    const heroVideoObserver = heroVideo
      ? new IntersectionObserver(
          ([entry]) => {
            heroVideoInView = entry.isIntersecting && entry.intersectionRatio > 0.22;
            syncHeroVideo();
          },
          { threshold: [0, 0.22] }
        )
      : null;
    if (heroVideo) {
      heroVideoObserver?.observe(heroVideo);
      syncHeroVideo();
    }
    const onVideoPreferenceChange = () => syncHeroVideo();
    const onHeroVisibilityChange = () => syncHeroVideo();
    reduceMotionQuery.addEventListener("change", onVideoPreferenceChange);
    desktopVideoQuery.addEventListener("change", onVideoPreferenceChange);
    document.addEventListener("visibilitychange", onHeroVisibilityChange);

    const glowCards = Array.from(document.querySelectorAll<HTMLElement>(".glow-card"));
    const cleanups = glowCards.map((card) => {
      const onPointerMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
        const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
        const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        card.style.setProperty("--pointer-x", `${x}px`);
        card.style.setProperty("--pointer-y", `${y}px`);
        card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
        card.style.setProperty("--cursor-angle", `${(angle < 0 ? angle + 360 : angle).toFixed(3)}deg`);
      };
      card.addEventListener("pointermove", onPointerMove);
      return () => card.removeEventListener("pointermove", onPointerMove);
    });

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.clearTimeout(hashSyncTimer);
      window.clearTimeout(scrollCorrectionTimer);
      observer.disconnect();
      heroVideoObserver?.disconnect();
      unloadHeroVideo();
      reduceMotionQuery.removeEventListener("change", onVideoPreferenceChange);
      desktopVideoQuery.removeEventListener("change", onVideoPreferenceChange);
      document.removeEventListener("visibilitychange", onHeroVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onNavClick, true);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
    </div>
  );
}

function App() {
  usePortfolioMotion();

  return (
    <main className="site-shell">
      <header className="top-nav">
        <a className="brand-mark" href="#top" aria-label="返回顶部">
          LXQ
        </a>
        <nav aria-label="页面导航">
          <a href="#projects">项目</a>
          <a href="#profile">经历</a>
          <a href="#strengths">优势</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="contact-chip" href={`mailto:${profile.email}`}>
          联系我
        </a>
      </header>

      <section className="hero-section" id="top">
        <video
          className="hero-video"
          muted
          loop
          playsInline
          preload="none"
          poster={heroPoster}
          style={{ "--hero-video-poster": `url("${heroPoster}")` } as React.CSSProperties}
          aria-hidden="true"
        >
          <source data-src={heroVideoWebm} type="video/webm" />
          <source data-src={heroVideoMp4} type="video/mp4" />
        </video>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="hero-frame">
          <div className="hero-copy">
            <p className="prompt-badge">
              Business Data Analyst
            </p>
            <p className="kicker">业务数据分析 / 指标监控 / 数据治理 / 数据需求协同</p>
            <h1>
              <span>林晓庆</span>
              <span>业务数据分析师</span>
            </h1>
            <p className="lead">{profile.summary}</p>
            <div className="hero-actions">
              <a className="primary-action" href="#projects">
                查看精选案例 <ArrowUpRight size={18} />
              </a>
              <a className="secondary-action" href="#profile">
                查看经历
              </a>
            </div>
          </div>

        </div>
      </section>

      <section className="projects-section page-band" id="projects" data-motion-section>
        <SectionHeading label="Selected Cases" title="精选数据分析项目。" />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className="project-card glow-card"
              key={project.title}
              data-motion-card
              style={{ "--delay": `${index * 130}ms` } as React.CSSProperties}
            >
              <div className={`project-visual visual-${index + 1}`} data-reveal>
                <img src={project.image} alt={project.imageAlt} loading="lazy" />
              </div>
              <div className="project-body">
                <p>{project.type}</p>
                <h3>{project.title}</h3>
                <strong className="project-metric">{project.metric}</strong>
                <div className="case-points">
                  {project.casePoints.map((point) => (
                    <div key={point.label}>
                      <strong>{point.label}</strong>
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>
                <ul className="evidence-list" aria-label={`${project.title}项目证据`}>
                  {project.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <small key={tag}>{tag}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section page-band" id="profile" data-motion-section>
        <SectionHeading label="Experience" title="业务场景里的数据分析经历。" />
        <div className="profile-layout">
          <div className="profile-intro">
            <p>
              这部分呈现数据分析岗位最相关的工作能力：数据口径治理、资源派发、经营指标监控、会议复盘、异常跟进，
              以及与开发协同优化数据功能，帮助业务团队更快看清问题、沉淀结论并推动后续动作。
            </p>
            <div className="experience-focus" aria-label="核心工作链路">
              <span>核心工作链路</span>
              <div>
                <strong>数据口径</strong>
                <small>字段、状态、规则统一</small>
              </div>
              <div>
                <strong>指标监控</strong>
                <small>进度、异常、波动检视</small>
              </div>
              <div>
                <strong>复盘协同</strong>
                <small>会议材料、需求沟通、动作跟进</small>
              </div>
            </div>
          </div>
          <div className="stat-grid">
            {stats.map((item, index) => (
              <article className="glow-card experience-card" key={item.label} data-motion-card style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="timeline">
          {timeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                className="timeline-card glow-card experience-card"
                data-phase={item.phase}
                key={`${item.time}-${item.company}`}
                data-motion-card
                style={{ "--delay": `${index * 110}ms` } as React.CSSProperties}
              >
                <div className="timeline-icon">
                  <Icon size={20} />
                </div>
                <time>{item.time}</time>
                <h3>{item.company}</h3>
                <strong>{item.role}</strong>
                <p>{item.detail}</p>
                {item.phase === "early" && <small className="phase-note">早期业务经历</small>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="strengths-section page-band" id="strengths" data-motion-section>
        <SectionHeading label="Advantages" title="数据分析岗位核心能力。" />
        <div className="strength-grid">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                className="glow-card"
                key={item.title}
                data-motion-card
                style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <Icon size={26} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className="strength-points" aria-label={`${item.title}能力点`}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-section" id="contact" data-motion-section>
        <div className="contact-inner glow-card" data-motion-card>
          <span className="section-label">Contact</span>
          <h2>期待在数据分析、经营指标监控与业务复盘方向继续深入。</h2>
          <div className="contact-list">
            <a href={`tel:${profile.phone.replace(/-/g, "")}`}>
              <Phone size={18} />
              {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              {profile.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
