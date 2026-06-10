import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Database,
  FileDown,
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
  email: "xunni8214@gmail.com",
  education: "广东理工学院 - 机械设计与制造 - 专科",
  summary:
    "聚焦业务数据分析，熟悉数据口径治理、资源规则管理、经营指标监控、会议复盘支持和数据功能需求协同。能够把业务问题整理成清晰的指标逻辑、数据流程和复盘结论，支持经营判断与跨团队沟通。"
};

const stats = [
  { value: "3年+", label: "2022.09-2025.12 核心数据分析岗位经历，覆盖口径治理、派发规则、指标监控、复盘协同全链路" },
  { value: "指标监控", label: "搭建并维护核心经营指标的日常跟踪，定位异常波动、拆解原因并推动跟进闭环" },
  { value: "数据派发", label: "制定资源派发与状态流转规则，管理派发、反馈、回收全链路的数据一致性" },
  { value: "需求协同", label: "把业务反馈转成字段与报表逻辑需求，与开发完成联调、验收和使用体验优化" }
];

const projects = [
  {
    id: "bank",
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
    image: assetPath("assets/project-bank-monitoring.svg?v=20260610-chart-fill"),
    imageAlt: "广发银行经营数据分析与业务优化项目封面",
    evidence: [
      "制定数据管理与派发规则、客群质量分层，精准下发，带动合作商 GMV 提升约 10%",
      "与开发共建外呼接通率响应模型，外呼接通率提升约 8%",
      "主持每周对数复盘会，统一口径、降低对数偏差，异常发现从 T+3 提到 T+1"
    ]
  },
  {
    id: "ecommerce",
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
    image: assetPath("assets/project-ecommerce-research.svg?v=20260610-real-data"),
    imageAlt: "中国电商消费趋势网络购物用户、使用率和网上零售额封面",
    evidence: [
      "CNNIC 第57次报告口径：2025 网络购物用户 9.37 亿、使用率 83.2%",
      "统计局口径：2025 全国网上零售额 15.97 万亿元，实物商品网上零售额占社零比重较 2021 提升 1.6 个百分点",
      "数据口径：官方统计与 CNNIC 用户指标结合，不混写平台 GMV"
    ]
  },
  {
    id: "novel",
    type: "Novel Market Analysis",
    title: "国际热门小说年度趋势分析",
    metric: "500 本清洗样本 / 2025 主风格 Romance 28 本 / Goodreads 平台行为代理",
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
    image: assetPath("assets/project-novel-market.svg?v=20260610-real-trend"),
    imageAlt: "国际热门小说主风格五年变化与 2025 主风格分布封面",
    evidence: [
      "2025 Goodreads Top100 小说样本：书架标记量 6158.8 万",
      "2025 年度索引口径：Romance 主风格 28 本，与 Thriller Mystery 并列第一",
      "数据口径：Goodreads 为平台行为代理，不代表出版市场真实销售"
    ]
  }
];

type DetailSection = {
  heading: string;
  body?: string[];
  list?: string[];
  table?: { caption?: string; head: string[]; rows: string[][] };
};

type ProjectDetailData = {
  type: string;
  title: string;
  metric: string;
  sections: DetailSection[];
};

const projectDetails: Record<string, ProjectDetailData> = {
  bank: {
    type: "BUSINESS DATA ANALYTICS",
    title: "经营数据分析与业务优化（广发银行）",
    metric: "3年+ 经营数据分析 · 合作商 GMV +10% · 外呼接通率 +8% · 异常发现 T+3 → T+1",
    sections: [
      {
        heading: "背景与目标",
        body: [
          "项目涉及多家合作商的资源派发与外呼经营。合作商资源分散、客群质量参差，且各方数据口径不统一：同一个指标在业务、合作商和统计侧可能有三种算法，对数偏差频发，异常发现滞后，直接影响派发效率和外呼转化。",
          "目标是建立一套各方认可的数据口径与派发规则，让经营指标可监控、异常可定位、复盘有依据。"
        ]
      },
      {
        heading: "我负责的部分",
        list: [
          "数据口径治理：梳理字段含义、状态流转和统计规则，沉淀口径文档与报表说明，统一业务、统计、会议三套数据语言",
          "资源派发规则：制定数据管理与派发规则，对客群做质量分层并精准下发，管理派发、反馈、回收全链路",
          "指标监控：搭建并维护 20+ 核心经营指标的日常监控与异常跟进机制",
          "复盘协同：主持每周对数复盘会，整理会议材料与行动项；与开发共建外呼接通率响应模型并跟进落地"
        ]
      },
      {
        heading: "分析与机制设计",
        body: [
          "客群质量分层：基于历史反馈和转化表现对客群打分分层，高质量资源优先下发给承接能力强的合作商，降低资源空耗。",
          "指标监控体系：按日/周两个节奏跟踪进度、资源消耗和反馈状态，异常波动按规则、客群、环节三层逐级定位，先判断是口径问题还是业务问题再跟进。",
          "对数复盘机制：每周固定对数会统一各方口径，差异先归因（统计口径 / 数据时点 / 业务动作）再讨论对策，避免会议在数字层面空转。",
          "接通率响应模型：与开发协同，把外呼时段、号码状态、客群特征等因素纳入响应模型，按模型建议调整外呼策略。"
        ]
      },
      {
        heading: "业务结果",
        list: [
          "数据派发规则与客群分层带动合作商 GMV 提升约 10%",
          "接通率响应模型带动外呼接通率提升约 8%",
          "异常发现时效从 T+3 提前到 T+1，复盘节奏从被动响应转为主动检视",
          "口径文档沉淀后，跨团队对数偏差和重复沟通明显减少"
        ]
      },
      {
        heading: "数据边界说明",
        body: [
          "涉及银行内部经营数据，本页只描述口径、机制和相对结果（约 10% / 约 8% 等区间表达），不展示任何明细数据与绝对值。封面图表为相对口径示意。"
        ]
      }
    ]
  },
  ecommerce: {
    type: "CHINA E-COMMERCE TRENDS",
    title: "中国电商消费趋势分析",
    metric: "3 个官方数据源 / 2021-2025 五年序列 / 数据包·SQL视图·HTML报告",
    sections: [
      {
        heading: "背景与目标",
        body: [
          "公开资料口径分散：官方零售统计、平台财报披露、用户调查各说各话，直接引用容易混淆口径。项目目标是把分散的公开数据整理成可复用、可追溯的事实表，并输出能解释线上零售、消费领域、平台指标和客群变化的趋势报告。"
        ]
      },
      {
        heading: "数据源与血缘",
        list: [
          "国家统计局：全国网上零售额、实物商品网上零售额及占社会消费品零售总额比重（年度公报口径）",
          "CNNIC《中国互联网络发展状况统计报告》：网络购物用户规模与网民使用率（第 49/51/53/55/57 次，年末口径）",
          "上市平台披露：财报中的 GMV、用户与品类指标，仅作平台层参考，不与官方口径混算",
          "交付物：可导入数据库的数据包、带来源血缘的事实表、SQL 视图和 HTML 可视化报告"
        ]
      },
      {
        heading: "关键序列（2021-2025）",
        table: {
          caption: "网络购物用户与使用率（CNNIC，年末口径）",
          head: ["年份", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["网购用户规模（亿）", "8.42", "8.45", "9.15", "9.74", "9.37"],
            ["占网民比例（%）", "81.6", "79.2", "83.8", "87.9", "83.2"]
          ]
        }
      },
      {
        heading: "",
        table: {
          caption: "网上零售额与实物线上化（国家统计局口径）",
          head: ["年份", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["全国网上零售额（万亿元）", "13.09", "13.79", "15.43", "15.52", "15.97"],
            ["实物商品网上零售额占社零比重（%）", "24.5", "27.2", "27.6", "26.8", "26.1"]
          ]
        }
      },
      {
        heading: "核心结论",
        list: [
          "用户大盘进入平台期：网购用户规模在 9 亿量级上波动，增长动力从拉新转向使用深度和客单结构",
          "交易规模持续增长但增速放缓：网上零售额五年从 13.09 万亿增至 15.97 万亿",
          "实物线上化程度较 2021 年提升 1.6 个百分点，2022-2023 冲高后小幅回落，线上线下进入再平衡阶段"
        ]
      },
      {
        heading: "口径边界说明",
        body: [
          "官方统计与 CNNIC 用户指标分开标注，不混写平台 GMV；由基础数据推导的指标（如占比、增速）在事实表中标记为 derived，不冒充官方直接披露值。"
        ]
      }
    ]
  },
  novel: {
    type: "NOVEL MARKET ANALYSIS",
    title: "国际热门小说年度趋势分析",
    metric: "500 本清洗样本 / 2021-2025 / Goodreads 平台行为代理口径",
    sections: [
      {
        heading: "背景与目标",
        body: [
          "热门小说榜单通常只停留在排名本身。项目目标是基于 Goodreads 公开数据，解释榜单背后的读者行为、作品互动强度、题材结构和年度变化，形成可追溯的内容市场分析。"
        ]
      },
      {
        heading: "样本与清洗",
        list: [
          "候选池：Goodreads「Most popular books published in YEAR」年度榜单快照，2021-2025 共五年",
          "清洗规则：按 Goodreads genres 过滤非小说（保留 fiction 类目），剔除原因逐条记录在排除表",
          "样本规模：每年 Top 100 小说，共 500 本，每本建立独立书档（元数据、题材标签、互动指标）",
          "每本书保留原始榜单名次（raw_rank），保证清洗后仍可回溯到原始热度位置"
        ]
      },
      {
        heading: "指标口径",
        list: [
          "热度主口径：shelf_count（读者加入书架次数），是平台行为代理指标，不等同销量",
          "辅助指标：ratings_count、text_reviews_count、average_rating",
          "主风格（单标签）：每本书归入一个主风格家族，用于年度结构对比；风格信号（多标签）单独统计，两套口径不混用"
        ]
      },
      {
        heading: "关键发现",
        table: {
          caption: "主风格五年变化（每年 Top 100 中的数量，年度索引口径）",
          head: ["主风格", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["Romance / 大众爱情", "25", "29", "33", "30", "28"],
            ["Thriller Mystery / 悬疑惊悚", "27", "25", "22", "27", "28"],
            ["Romantasy / 爱情幻想混合", "26", "20", "28", "24", "25"]
          ]
        }
      },
      {
        heading: "",
        list: [
          "2025 主风格分布：Romance 28、Thriller Mystery 28（并列第一）、Romantasy 25、Historical 9、Literary 5",
          "五年热度峰值：2023 年《Fourth Wing》书架标记 637 万，为五年样本最高；2022 年《The Housemaid》625 万次之",
          "2025 样本书架标记总量 6158.8 万；类型混合（romance × fantasy、悬疑 × 亲密关系）是近年最强商业信号",
          "热门作品反复命中女性成长、家庭/历史创伤、高情绪密度叙事，悬疑惊悚保持稳定基本盘"
        ]
      },
      {
        heading: "边界与版权说明",
        body: [
          "shelf_count 为 Goodreads 平台行为代理，不代表出版市场真实销售；「每年 100 本」是采样规则而非分析结论。",
          "项目不下载受版权保护的小说全文，仅基于公开元数据建档；合法文本来源状态单独记录。"
        ]
      }
    ]
  }
};

const strengths = [
  {
    icon: Database,
    title: "数据口径与治理",
    text:
      "能把分散的字段、规则和状态整理成可执行口径，明确每个指标的定义、统计范围和更新频率，让业务、统计、会议和复盘使用同一套数据理解，从源头减少对数偏差。",
    points: [
      "梳理字段含义、状态流转和资源规则口径，明确指标的分子分母与统计边界",
      "对派发、统计、复盘三类数据做一致性检查，发现口径冲突先对齐再使用",
      "沉淀口径说明和字段文档，让新人和跨团队成员能快速复用，减少重复沟通"
    ]
  },
  {
    icon: LineChart,
    title: "经营指标监控",
    text:
      "关注指标变化背后的业务动作，持续跟踪项目进度、资源使用、反馈结果和异常波动，区分正常波动和真实异常，让监控结果能直接支撑经营判断。",
    points: [
      "按日/周节奏跟踪进度、资源消耗和反馈状态，维护核心指标的监控视图",
      "定位异常数据并拆解波动原因，按规则、客群、环节逐层缩小排查范围",
      "输出会议可用的指标摘要和问题提示，附带初步判断和建议跟进动作"
    ]
  },
  {
    icon: BarChart3,
    title: "业务复盘与汇报",
    text:
      "把阶段结果、异常问题和跟进动作整理成结构化复盘材料，区分事实、判断和建议，帮助团队更快判断问题来源和策略调整方向，并跟踪调整后的实际效果。",
    points: [
      "按阶段整理经营结果、目标差异和问题清单，让差异能追溯到具体动作",
      "把数据结论转成会议讨论和可执行行动项，明确负责人和检查节点",
      "跟进复盘后的调整动作与后续表现，验证策略调整是否真正生效"
    ]
  },
  {
    icon: MonitorCog,
    title: "数据需求协同",
    text:
      "能把业务反馈转成清晰的数据功能需求，与开发对齐字段、报表逻辑、展示规则和使用体验，在需求、联调、验收各环节把住数据准确性，降低返工成本。",
    points: [
      "梳理需求背景、字段逻辑和使用场景，把模糊反馈拆成可开发的明确需求",
      "参与报表逻辑核对、功能联调和上线验收，用真实业务数据交叉验证结果",
      "持续收集使用反馈并推动迭代，让数据工具更贴近日常经营管理动作"
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

function PhoneReveal() {
  const [phone, setPhone] = useState<string | null>(null);
  const reveal = () => {
    // 号码分段倒序存放，避免被爬虫直接抓取明文
    const parts = ["6773", "0308", "431"];
    setPhone(
      parts
        .map((part) => part.split("").reverse().join(""))
        .reverse()
        .join("-")
    );
  };

  if (phone) {
    return (
      <a href={`tel:${phone.replace(/-/g, "")}`}>
        <Phone size={18} />
        {phone}
      </a>
    );
  }

  return (
    <button type="button" className="phone-reveal" onClick={reveal}>
      <Phone size={18} />
      点击查看手机号
    </button>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
    </div>
  );
}

function ProjectDetailPage({ id }: { id: string }) {
  const detail = projectDetails[id];
  const cover = projects.find((item) => item.id === id);

  useEffect(() => {
    document.title = `${detail.title} | 林晓庆数据分析作品集`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "林晓庆 | 数据分析简历与项目作品集";
    };
  }, [detail.title]);

  return (
    <main className="site-shell detail-shell">
      <header className="top-nav is-floating detail-nav">
        <a className="brand-mark" href="./" aria-label="返回首页">
          LXQ
        </a>
        <nav aria-label="详情页导航">
          <a href="./">返回首页</a>
          <a href="./#projects">全部项目</a>
        </nav>
        <a className="contact-chip" href={`mailto:${profile.email}`}>
          联系我
        </a>
      </header>

      <article className="detail-page page-band">
        <p className="detail-type">{detail.type}</p>
        <h1>{detail.title}</h1>
        <strong className="project-metric detail-metric">{detail.metric}</strong>
        {cover && (
          <div className="detail-cover">
            <img src={cover.image} alt={cover.imageAlt} />
          </div>
        )}
        {detail.sections.map((section, index) => (
          <section className="detail-section" key={`${section.heading}-${index}`}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.body?.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            {section.list && (
              <ul className="detail-list">
                {section.list.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            )}
            {section.table && (
              <figure className="detail-table-wrap">
                {section.table.caption && <figcaption>{section.table.caption}</figcaption>}
                <table className="detail-table">
                  <thead>
                    <tr>
                      {section.table.head.map((cell) => (
                        <th key={cell}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            )}
          </section>
        ))}
        <a className="back-link" href="./#projects">
          ← 返回项目列表
        </a>
      </article>
    </main>
  );
}

function App() {
  const detailId = new URLSearchParams(window.location.search).get("p");
  if (detailId && projectDetails[detailId]) {
    return <ProjectDetailPage id={detailId} />;
  }
  return <HomePage />;
}

function HomePage() {
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
                <a className="detail-link" href={`?p=${project.id}`}>
                  查看项目详情 <ArrowUpRight size={15} />
                </a>
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
              以及与开发协同优化数据功能。日常工作贯穿"定义口径 → 监控指标 → 定位异常 → 复盘沉淀 → 推动改进"的完整链路：
              先把字段含义、状态流转和统计规则定义清楚，让业务、统计和会议使用同一套数据语言；再通过日常监控发现进度
              和质量的异常波动，拆解到具体规则、客群或环节；最后把结论整理成复盘材料和功能需求，推动规则调整与工具优化，
              帮助业务团队更快看清问题、沉淀结论并推动后续动作。
            </p>
            <div className="experience-focus" aria-label="核心工作链路">
              <span>核心工作链路</span>
              <div>
                <strong>数据口径</strong>
                <small>统一字段含义、状态流转与统计规则，沉淀口径文档，减少对数偏差</small>
              </div>
              <div>
                <strong>指标监控</strong>
                <small>日常跟踪进度与质量指标，识别异常波动并拆解到规则、客群和环节</small>
              </div>
              <div>
                <strong>复盘协同</strong>
                <small>整理会议材料与结论行动项，沟通数据需求，跟进调整后的实际表现</small>
              </div>
            </div>
            <p className="edu-note" aria-label="教育背景">
              教育背景：{profile.education}
            </p>
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
            <PhoneReveal />
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              {profile.email}
            </a>
            <a href={assetPath("resume.html")} target="_blank" rel="noopener">
              <FileDown size={18} />
              简历版（可保存 PDF）
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
