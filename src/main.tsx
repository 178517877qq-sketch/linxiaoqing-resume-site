import React, { useEffect, useRef, useState } from "react";
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
const heroImage = assetPath("assets/hero-data-flow-clean.jpg");

const projectPagePaths: Record<string, string> = {
  bank: "bank.html",
  ecommerce: "ecommerce.html",
  novel: "novel.html",
  feimiao: "feimiao.html"
};

const projectDocumentTitles: Record<string, string> = {
  bank: "经营数据分析与业务优化 | 林晓庆数据分析作品集",
  ecommerce: "中国电商消费趋势分析 | 林晓庆数据分析作品集",
  novel: "国际热门小说年度趋势分析 | 林晓庆数据分析作品集",
  feimiao: "肥喵记账个人财务数据产品 | 林晓庆数据分析作品集"
};

const projectHref = (id: string) => assetPath(projectPagePaths[id] ?? "index.html");

const profile = {
  name: "林晓庆",
  role: "业务数据分析师",
  title: "业务数据分析师 / 指标监控 / 数据治理 / 数据需求协同",
  email: "xunni8214@gmail.com",
  educationSchool: "广东理工学院",
  educationDetail: "机械设计与制造 · 专科",
  summary:
    "聚焦业务数据分析，熟悉数据口径治理、资源规则管理、经营指标监控、会议复盘支持和数据功能需求协同。能够把业务问题整理成清晰的指标逻辑、数据流程和复盘结论，支持经营判断与跨团队沟通。"
};

const toolMethods = [
  { label: "SQL 视图", value: "官方值与分析标签分层" },
  { label: "数据包", value: "CSV 样例与来源记录" },
  { label: "HTML 报告", value: "可视化趋势与边界说明" },
  { label: "口径文档", value: "字段、状态与统计规则" }
];

const stats = [
  {
    value: "3 年+",
    label: "2022.09-2025.12 核心数据分析岗位经历，覆盖口径治理、派发规则、指标监控、复盘协同全链路",
    note: "广发银行 + 广发信用卡中心两段银行数据岗"
  },
  {
    value: "指标监控",
    label: "搭建并维护核心经营指标的日常跟踪，定位异常波动、拆解原因并推动跟进闭环",
    note: "20+ 核心指标体系 · 异常发现 T+3 → T+1"
  },
  {
    value: "数据派发",
    label: "制定资源派发与状态流转规则，管理派发、反馈、回收全链路的数据一致性",
    note: "客群质量分层 · 带动合作商 GMV 提升约 10%"
  },
  {
    value: "需求协同",
    label: "把业务反馈转成字段与报表逻辑需求，与开发完成联调、验收和使用体验优化",
    note: "共建外呼接通率响应模型 · 接通率提升约 8%"
  }
];

const projects = [
  {
    id: "bank",
    type: "BUSINESS DATA ANALYTICS",
    title: "经营数据分析与业务优化",
    metric: "3 年+ 经营数据分析 · 合作商 GMV 提升约 10% · 外呼接通率提升约 8%",
    casePoints: [
      {
        label: "业务问题",
        text: "资源分散、客群质量参差、口径不统一，异常发现和协作对数都较滞后。"
      },
      {
        label: "分析动作",
        text: "建立派发与分层规则、20+ 指标监控和异常归因机制，并与开发共建接通率响应模型。"
      },
      {
        label: "输出价值",
        text: "合作商 GMV 提升约 10%，外呼接通率提升约 8%，异常发现从 T+3 提前到 T+1。"
      }
    ],
    tags: ["数据派发", "接通率模型", "复盘协同"],
    image: assetPath("assets/project-bank-monitoring.svg?v=20260711-approx-labels"),
    imageAlt: "广发银行经营数据分析与业务优化项目封面"
  },
  {
    id: "ecommerce",
    type: "China E-commerce Trends",
    title: "中国电商消费趋势分析",
    metric: "2 类权威公开来源 / 五年趋势跟踪 / 数据包·SQL 视图·HTML 报告",
    casePoints: [
      {
        label: "业务问题",
        text: "公开口径分散，用户规模、零售额与线上化率难以直接对齐。"
      },
      {
        label: "分析动作",
        text: "对齐国家统计局与 CNNIC 口径，建立 2021-2025 事实表、来源记录、SQL 视图和 HTML 报告。"
      },
      {
        label: "输出价值",
        text: "形成可复核的数据包与趋势报告，官方值与分析标签分开维护。"
      }
    ],
    tags: ["官方口径", "来源可追溯", "趋势报告"],
    image: assetPath("assets/project-ecommerce-research.svg?v=20260711-source-labels"),
    imageAlt: "中国电商消费趋势网络购物用户、使用率和网上零售额封面"
  },
  {
    id: "novel",
    type: "Goodreads Content Trends",
    title: "国际热门小说年度趋势分析",
    metric: "500 本清洗样本 / 2025 主风格 Romance 28 本 / Goodreads 平台行为代理",
    casePoints: [
      {
        label: "业务问题",
        text: "热门榜只有排名，难以解释平台互动、题材结构和年度变化。"
      },
      {
        label: "分析动作",
        text: "清洗 Goodreads 年度榜并记录剔除原因，建立 500 本书档案，分开维护单标签主风格与多标签信号。"
      },
      {
        label: "输出价值",
        text: "输出五年主风格与平台互动趋势，并保留单书档案、方法和数据边界。"
      }
    ],
    tags: ["读者行为代理", "样本清洗", "内容洞察"],
    image: assetPath("assets/project-novel-market.svg?v=20260711-label-spacing"),
    imageAlt: "国际热门小说主风格五年变化与 2025 主风格分布封面"
  },
  {
    id: "feimiao",
    type: "INDEPENDENT DATA PRODUCT",
    title: "肥喵记账｜个人财务数据产品",
    metric: "从交易数据模型到预算、统计与资产复盘的产品闭环",
    casePoints: [
      {
        label: "业务问题",
        text: "日常账目容易分散在不同账户和场景中，转账、退款、报销、预算等口径也容易混用。"
      },
      {
        label: "分析动作",
        text: "围绕交易、账户、分类、标签、预算与资产设计数据结构，串联录入、查询、统计和复盘流程。"
      },
      {
        label: "输出价值",
        text: "形成可运行的 Android 产品，把数据口径、用户需求和持续验收落成真实使用链路。"
      }
    ],
    tags: ["数据产品", "指标口径", "产品迭代"],
    image: assetPath("assets/project-feimiao-accounting.svg?v=20260719-portfolio"),
    imageAlt: "肥喵记账个人财务数据产品界面结构示意封面，不含真实账单数据"
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
  meta: { label: string; value: string }[];
  resources: { label: string; description: string; href?: string; download?: boolean }[];
  sections: DetailSection[];
};

const projectDetails: Record<string, ProjectDetailData> = {
  bank: {
    type: "BUSINESS DATA ANALYTICS",
    title: "经营数据分析与业务优化（广发银行）",
    metric: "3 年+ 经营数据分析 · 合作商 GMV 提升约 10% · 外呼接通率提升约 8% · 异常发现 T+3 → T+1",
    meta: [
      { label: "项目周期", value: "2022.09 - 2025.12" },
      { label: "本人职责", value: "口径治理、资源规则、指标监控、复盘协同" },
      { label: "协作对象", value: "业务团队、开发团队、合作商" },
      { label: "交付载体", value: "指标口径、监控报表、异常跟进与周复盘材料" }
    ],
    resources: [
      { label: "脱敏指标体系", description: "页面仅展示指标域、监控节奏和异常动作，不含内部绝对值。" },
      { label: "异常归因框架", description: "按口径、客群/合作商、业务环节三层逐步缩小问题范围。" },
      { label: "协作边界", description: "本人负责业务目标、数据口径和效果验证；开发团队负责模型与功能实现。" }
    ],
    sections: [
      {
        heading: "摘要",
        body: [
          "2022.09-2025.12，在多合作商资源派发与外呼经营场景中，从零搭建数据口径治理、资源派发规则、指标监控和对数复盘四套机制，并与开发共建外呼接通率响应模型。最终结果：合作商 GMV 提升约 10%，外呼接通率提升约 8%，异常发现时效从 T+3 提前到 T+1。本报告复盘机制设计的完整思路——这套方法的价值不依赖具体行业，任何多方协作、口径分散的经营场景都可复用。"
        ]
      },
      {
        heading: "一、问题定义：三类数据病灶",
        body: [
          "接手时业务面临的不是「缺数据」而是「数据不可信」，拆解后归为三类病灶：",
          "口径病灶——同一个指标在业务、合作商和统计侧有三种算法，分子分母、统计时点、剔除规则各不相同，周会大量时间消耗在「你的数为什么和我的不一样」上；流程病灶——资源派发后状态流转无统一规则，派发、跟进、反馈、回收各环节数据断点多，资源空耗无法量化；时效病灶——异常依赖人工对账发现，平均滞后三天（T+3），发现时损失已经发生。",
          "三类病灶相互放大：口径不一致让异常更难被确认，流程断点让异常无法归因。因此治理顺序必须是先口径、再流程、后时效，顺序错了都是返工。"
        ]
      },
      {
        heading: "二、口径治理：让所有人说同一种数据语言",
        list: [
          "为每个核心指标建立三要素定义：分子分母与剔除规则、统计时点与更新频率、负责维护的归属方，沉淀为口径文档和报表说明",
          "对派发、统计、复盘三类场景的数据做一致性检查，发现口径冲突先对齐定义再使用，不允许带病上会",
          "状态流转标准化：资源从下发到回收的每个状态有唯一定义和流转条件，杜绝同一资源在不同系统里状态打架",
          "效果：周会从「对数会」变回「决策会」，跨团队重复沟通和对数偏差明显减少，新人凭文档即可接手报表"
        ]
      },
      {
        heading: "三、派发规则与客群分层：把资源配给承接得住的人",
        body: [
          "基于历史反馈率和转化表现对客群做质量分层，同时对合作商的承接能力建立画像（处理时效、跟进质量、历史转化），派发规则的核心逻辑是双向匹配：高质量资源优先配给承接能力强的合作商，避免好资源被低效消耗；长尾资源批量下发并设回收时限，到期未跟进自动回池。",
          "规则上线后配合每周资源使用复盘，跟踪各层资源的转化漏斗，分层阈值按季度校准。该套规则与分层机制是合作商 GMV 提升约 10% 的主要驱动。"
        ]
      },
      {
        heading: "四、指标监控与异常定位：三层归因漏斗",
        table: {
          caption: "监控指标体系结构（20+ 指标，按域划分；具体数值涉密不展示）",
          head: ["指标域", "关注问题", "监控节奏", "异常处理"],
          rows: [
            ["进度域", "派发量、跟进量是否符合节奏", "日", "当日提示、次日跟进"],
            ["质量域", "接通率、转化率、反馈质量", "日/周", "三层归因后派单跟进"],
            ["资源域", "资源消耗、空耗、回收时效", "周", "调整派发规则参数"],
            ["协同域", "对数偏差、口径冲突、反馈断点", "周", "复盘会专项对齐"]
          ]
        },
        body: [
          "异常波动统一走三层归因漏斗：第一层先排除口径问题（统计时点、规则变更），第二层定位到客群或合作商（哪一层资源、哪一家伙伴），第三层落到具体环节（派发、跟进还是反馈）。先问「数对不对」再问「业务怎么了」，避免拿着口径问题当业务问题开会。这套机制把异常发现时效从 T+3 压到 T+1。"
        ]
      },
      {
        heading: "五、接通率模型协同：数据侧与开发侧的共建",
        body: [
          "外呼接通率是转化漏斗的第一道闸口。与开发共建响应模型时，数据侧负责三件事：定义目标变量与口径（什么算有效接通）、梳理特征候选（外呼时段、号码状态、客群特征、历史触达记录）、设计上线后的效果验证方案（分组对照、按周跟踪）。模型按建议时段和优先级重排外呼队列，上线后接通率提升约 8%，并进入「监控-反馈-迭代」的常态循环。",
          "这段协同的关键经验：数据分析师在模型项目里的价值不是抢着写模型，而是把业务问题翻译成可建模的目标、把模型输出翻译成业务动作，并守住效果验证的口径。"
        ]
      },
      {
        heading: "六、结果与可迁移经验",
        list: [
          "数据派发规则与客群分层带动合作商 GMV 提升约 10%；接通率响应模型带动外呼接通率提升约 8%；异常发现时效 T+3 → T+1",
          "经验一：口径治理是一切经营分析的地基，先统一语言再谈洞察，否则所有结论都建立在流沙上",
          "经验二：监控体系按域分层、异常按漏斗归因，比堆指标数量更重要的是每个指标有明确的「异常之后谁做什么」",
          "经验三：复盘会的产出必须是带负责人和检查节点的行动项，数据结论不落到动作就只是数字汇报"
        ]
      },
      {
        heading: "数据边界说明",
        body: [
          "涉及银行内部经营数据，本报告只描述口径、机制和相对结果（约 10% / 约 8% 等区间表达），不展示任何明细数据与绝对值；监控指标表只呈现体系结构，不含真实指标值。封面图表为相对口径示意。"
        ]
      }
    ]
  },
  ecommerce: {
    type: "CHINA E-COMMERCE TRENDS",
    title: "中国电商消费趋势分析",
    metric: "2 类权威公开来源 / 2021-2025 五年序列 / 数据包·SQL 视图·HTML 报告",
    meta: [
      { label: "项目性质", value: "独立公开数据研究" },
      { label: "数据范围", value: "2021 - 2025 年度口径" },
      { label: "本人职责", value: "来源核验、事实表设计、官方口径对齐、趋势解读" },
      { label: "工具与交付", value: "CSV 数据包、SQL 视图、HTML 报告" }
    ],
    resources: [
      {
        label: "CNNIC 统计报告",
        description: "网络购物用户规模与使用率的报告索引。",
        href: "https://www.cnnic.net.cn/6/86/88/index.html"
      },
      {
        label: "国家统计局公开数据",
        description: "网上零售额与实物商品网上零售额占比的官方发布入口。",
        href: "https://www.stats.gov.cn/sj/zxfb/"
      },
      {
        label: "五年事实表样例",
        description: "页面核心序列、来源期数和官方可比口径同比，可下载复核。",
        href: assetPath("assets/ecommerce-2021-2025-sample.csv"),
        download: true
      },
      {
        label: "SQL 视图样例",
        description: "演示官方披露值与分析标签分层的视图逻辑。",
        href: assetPath("assets/ecommerce-trend-view.sql"),
        download: true
      }
    ],
    sections: [
      {
        heading: "摘要",
        body: [
          "2021-2025 年，CNNIC 年末网络购物用户规模从 8.42 亿升至 2024 年的 9.74 亿，2025 年回落至 9.37 亿，呈现高位波动。国家统计局各年公布的全国网上零售额从 13.09 万亿元升至 15.97 万亿元，2024、2025 年官方可比口径同比增速分别为 7.2% 和 8.6%。实物商品网上零售额占社零比重在 2023 年达到 27.6% 的五年高点，随后降至 26.8% 和 26.1%。这些数据支持观察用户规模、交易金额与渠道占比的变化，但不足以单独证明客单价、复购或用户结构变化。"
        ]
      },
      {
        heading: "数据与方法",
        list: [
          "CNNIC《中国互联网络发展状况统计报告》：网络购物用户规模与网民使用率分别取第 49、51、53、55、57 次报告的年末口径",
          "国家统计局：采用各年度直接披露的全国网上零售额、官方可比口径同比增速及实物商品网上零售额占社零比重",
          "处理方式：官方披露值进入事实表并记录来源链接；官方同比及其来源单独记录，分析标签分层维护；交付 CSV 数据包、SQL 视图和 HTML 可视化报告"
        ]
      },
      {
        heading: "一、用户规模：五年高位波动",
        table: {
          caption: "网络购物用户规模与使用率（CNNIC，年末口径）",
          head: ["年份", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["网购用户规模（亿）", "8.42", "8.45", "9.15", "9.74", "9.37"],
            ["占网民比例（%）", "81.6", "79.2", "83.8", "87.9", "83.2"],
            ["数据来源", "第 49 次", "第 51 次", "第 53 次", "第 55 次", "第 57 次"]
          ]
        },
        body: [
          "2021-2022 年末网络购物用户规模从 8.42 亿小幅增至 8.45 亿；2023、2024 年分别升至 9.15 亿和 9.74 亿，2025 年回落至 9.37 亿。第 55 次报告将以旧换新和跨境电商列为 2024 年电子商务行业发展的重要因素，但没有把用户增量全部归因于这些因素。因此，本序列更适合描述用户规模的高位波动，政策贡献仍需专项识别。"
        ]
      },
      {
        heading: "二、交易规模：增长仍在，斜率变缓",
        table: {
          caption: "全国网上零售额与实物线上化（国家统计局口径；同比为官方可比口径）",
          head: ["年份", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["全国网上零售额（万亿元）", "13.09", "13.79", "15.43", "15.52", "15.97"],
            ["官方可比口径同比（%）", "+14.1", "+4.0", "+11.0", "+7.2", "+8.6"],
            ["实物商品网上零售额占社零比重（%）", "24.5", "27.2", "27.6", "26.8", "26.1"]
          ]
        },
        body: [
          "国家统计局直接披露的可比口径同比增速在 2022 年降至 4.0%，2023 年回升至 11.0%，2024、2025 年分别为 7.2% 和 8.6%。由于纳入统计的重点平台范围每年变化，官方同比所采用的同期数会按本期平台范围调整，不能用相邻年度公布值简单相除替代官方增速。",
          "实物商品网上零售额占社零比重从 2021 年的 24.5% 升至 2023 年的 27.6%，随后连续两年回落至 26.1%。份额回落不等于网上零售额萎缩，但其原因不能仅凭这组宏观数据归因于线下消费恢复，还需结合社零分项、品类与渠道数据验证。"
        ]
      },
      {
        heading: "三、交叉观察：两类指标并不同步",
        body: [
          "2024 年用户规模与网上零售额均增长；2025 年年末用户规模回落，而全国网上零售额按官方可比口径增长 8.6%。由于前者是年末人数、后者是全年金额，且统计范围不同，这一现象只能说明两类指标没有保持同步，不能据此推断增量用户客单贡献、政策转化效率或存量用户消费深度。"
        ]
      },
      {
        heading: "结论与应用",
        list: [
          "用户规模：2021-2025 年由 8.42 亿升至 9.37 亿，但年度路径并非单向增长，2025 年较 2024 年回落",
          "交易规模：网上零售额持续上升，年度增速必须采用国家统计局直接披露的可比口径",
          "渠道占比：实物线上化比重在 2023 年达到五年高点后连续两年回落，原因仍需更多分项数据验证",
          "方法论沉淀：用户时点值、全年金额与渠道占比三类指标分表维护，可复用于多源公开数据对齐"
        ]
      },
      {
        heading: "口径边界说明",
        body: [
          "CNNIC 用户数为年末时点人数，国家统计局网上零售额为全年金额，两者不能直接相除或替代人均消费指标。国家统计局各年绝对额与官方同比还受平台统计范围变化影响，增速分析优先采用官方可比口径。"
        ]
      }
    ]
  },
  novel: {
    type: "GOODREADS CONTENT TRENDS",
    title: "国际热门小说年度趋势分析",
    metric: "500 本清洗样本 / 2021-2025 / Goodreads 平台行为代理口径",
    meta: [
      { label: "项目性质", value: "独立内容趋势研究" },
      { label: "数据范围", value: "2021 - 2025，每年 Top 100 小说样本" },
      { label: "本人职责", value: "候选池清洗、标签口径、趋势表与边界说明" },
      { label: "交付载体", value: "500 本书档案、排除记录、年度索引与趋势表" }
    ],
    resources: [
      {
        label: "Goodreads 年度热门榜",
        description: "候选池来源；研究仅使用公开元数据，不下载小说全文。",
        href: "https://www.goodreads.com/book/popular_by_date/2025"
      },
      {
        label: "清洗与口径样例",
        description: "展示年度样本规则、热度最高作品、双风格口径规则与指标边界。",
        href: assetPath("assets/novel-methodology-sample.csv"),
        download: true
      }
    ],
    sections: [
      {
        heading: "摘要",
        body: [
          "本报告基于 Goodreads 2021-2025 年度热门榜单，清洗建档 500 本小说样本，从主风格结构、平台热度和题材信号三个维度观察样本变化。Romance 在 2023 年达到 33 本后回落；Thriller Mystery 在 2023 年为 22 本，2025 年与 Romance 以 28 本并列第一；Romantasy 在 20-28 本间波动，是样本中变化较明显的主风格之一。现有数据不包含销量、收入或营销曝光，因此结论只限于 Goodreads 样本。"
        ]
      },
      {
        heading: "数据与方法",
        list: [
          "候选池：Goodreads「Most popular books published in YEAR」年度榜单快照，2021-2025 共五年",
          "清洗规则：按 Goodreads genres 过滤非小说（保留 fiction 类目），剔除原因逐条记录在排除表，每本保留原始榜单名次（raw_rank）可回溯",
          "样本规模：每年 Top 100 小说，共 500 本，每本建立独立书档（元数据、题材标签、互动指标、热度-评分象限）",
          "热度主口径：shelf_count（读者加入书架次数），为平台行为代理指标；辅助指标 ratings_count、text_reviews_count、average_rating",
          "两套风格口径分开维护：主风格（单标签，每本归入一个风格家族，用于结构对比）与风格信号（多标签，一本书可同时命中多个信号，用于趋势观察）"
        ]
      },
      {
        heading: "一、主风格结构：三类风格占比较高",
        table: {
          caption: "主风格五年变化（每年 Top 100 中的数量，年度索引口径）",
          head: ["主风格", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["Romance / 大众爱情", "25", "29", "33", "30", "28"],
            ["Thriller Mystery / 悬疑惊悚", "27", "25", "22", "27", "28"],
            ["Romantasy / 爱情幻想混合", "26", "20", "28", "24", "25"],
            ["Historical / 历史小说", "12", "9", "8", "7", "9"],
            ["Literary Bookclub / 读书会文学", "3", "3", "5", "7", "5"]
          ]
        },
        body: [
          "Romance、Thriller Mystery 与 Romantasy 三类合计每年占样本 74-83 本，说明 Goodreads 热门样本的主风格结构较为集中。Romance 在 2023 年达到 33 本；现有数据未记录 BookTok 曝光，不能将该峰值归因于 BookTok。Romantasy 在 20-28 本间波动，是样本中变化较明显的主风格之一。"
        ]
      },
      {
        heading: "二、2025 年切片：双头格局形成",
        table: {
          caption: "2025 年主风格完整分布（Top 100，年度索引口径）",
          head: ["主风格", "数量", "占比"],
          rows: [
            ["Romance / 大众爱情", "28", "28%"],
            ["Thriller Mystery / 悬疑惊悚", "28", "28%"],
            ["Romantasy / 爱情幻想混合", "25", "25%"],
            ["Historical / 历史小说", "9", "9%"],
            ["Literary Bookclub / 读书会文学", "5", "5%"],
            ["Fantasy / 幻想", "2", "2%"],
            ["Horror Dark / 暗黑恐怖", "2", "2%"],
            ["Speculative Sci-Fi / 推想与科幻", "1", "1%"]
          ]
        },
        body: [
          "2025 年 Romance 与 Thriller Mystery 以 28 本并列第一，五年来首次出现双头格局；前三家族合计 81 本，集中度仍在高位。Fantasy、Horror Dark 与 Speculative Sci-Fi 的主风格计数均为个位数；现有汇总数据不足以判断相关题材是否被归入其他混合类型。"
        ]
      },
      {
        heading: "三、热度集中度：峰值年份与头部效应",
        table: {
          caption: "各年度热度最高作品（shelf_count，Goodreads 平台行为代理）",
          head: ["年份", "作品", "主风格", "书架标记", "评分"],
          rows: [
            ["2021", "People We Meet on Vacation", "Romance", "394 万", "3.84"],
            ["2022", "The Housemaid", "Thriller", "625 万", "4.27"],
            ["2023", "Fourth Wing", "Romantasy", "637 万", "4.57"],
            ["2024", "The Women", "Historical", "317 万", "4.59"],
            ["2025", "Onyx Storm", "Romantasy", "326 万", "4.21"]
          ]
        },
        body: [
          "各年度最高 shelf_count 在当前抓取快照中于 2022-2023 年超过 600 万，2024-2025 年约为 300 万。由于 shelf_count 会随时间累积，不同出版年份的曝光窗口不同，不能据此判断头部效应减弱或腰部变厚。2025 年样本书架标记总量为 6158.8 万。"
        ]
      },
      {
        heading: "四、风格信号（多标签口径）：混合是常态",
        table: {
          caption: "风格信号命中数（多标签，一本书可命中多个信号）",
          head: ["信号", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["Romance", "66", "67", "70", "67", "66"],
            ["Literary", "41", "44", "50", "43", "46"],
            ["Thriller/Mystery", "34", "44", "44", "36", "41"],
            ["Horror/Dark", "36", "42", "34", "26", "32"],
            ["Fantasy", "39", "28", "33", "28", "31"]
          ]
        },
        body: [
          "多标签口径下，每年约三分之二的样本带有 Romance 信号，高于主风格单标签计数。爱情、奇幻、悬疑等信号经常共同出现，这支持‘类型组合在样本中较常见’的描述，但不能证明混合类型具有更高销量或商业回报。"
        ]
      },
      {
        heading: "结论与应用",
        list: [
          "样本结构：Romance、Thriller Mystery 与 Romantasy 合计每年占 74-83 本，是当前样本的主要风格家族",
          "类型组合：多标签结果显示爱情、奇幻、悬疑等信号经常共同出现，但商业优势仍需销量和曝光数据验证",
          "口碑与热度：shelf_count、评分与评论量反映不同维度，不能以单一指标替代市场表现",
          "方法论：榜单清洗 → 双口径建档 → 结构、平台热度与信号拆解"
        ]
      },
      {
        heading: "边界与版权说明",
        body: [
          "shelf_count 为 Goodreads 平台行为代理，受平台用户结构影响，不代表出版市场真实销售；「每年 100 本」是采样规则而非分析结论；年度对比未对时间累积效应做折算，跨年热度对比需谨慎。",
          "项目不下载受版权保护的小说全文，仅基于公开元数据建档；合法文本来源状态单独记录在案。"
        ]
      }
    ]
  },
  feimiao: {
    type: "INDEPENDENT DATA PRODUCT",
    title: "肥喵记账｜个人财务数据产品",
    metric: "从交易数据模型到预算、统计与资产复盘的产品闭环",
    meta: [
      { label: "项目性质", value: "独立 Android 数据产品" },
      { label: "本人职责", value: "产品定义、数据口径、交互验收与版本迭代" },
      { label: "技术与数据", value: "Flutter / Dart / SQLite / Android" },
      { label: "公开状态", value: "Android 测试版持续迭代，作品集不展示真实账单" }
    ],
    resources: [
      {
        label: "Android 测试版",
        description: "进入公开发布页查看安装说明与当前测试版本，不在作品集页面直接触发大文件下载。",
        href: "https://github.com/178517877qq-sketch/xunni/releases/tag/android-latest"
      },
      {
        label: "公开源码分支",
        description: "查看 Flutter、SQLite 数据层、测试与持续迭代记录。",
        href: "https://github.com/178517877qq-sketch/xunni/tree/codex/feimiao-p0-fixes"
      },
      {
        label: "脱敏界面结构",
        description: "封面依据真实功能结构绘制，仅作界面示意，不含个人金额、商户、账户或通知信息。"
      },
      {
        label: "工程验证记录",
        description: "版本交付包含静态分析、自动化测试、Release 构建、签名与文件哈希核验。"
      }
    ],
    sections: [
      {
        heading: "摘要与产品定位",
        body: [
          "肥喵记账是一款本地优先的 Android 个人财务数据产品。它不只解决“记一笔账”，而是把交易语义、账户流转、分类标签、预算计划、统计报告与资产记录组织成可以持续回顾的数据链路。本人负责产品定义、数据口径、交互验收和版本推进，并通过 Flutter 与 SQLite 工程把需求落成可运行产品。",
          "这个项目补充了传统分析报告之外的能力证明：从用户任务出发定义字段和状态，处理退款、转账、报销、不计入等边界，再把同一套语义供查询、预算、统计、报告与 Widget 等消费端使用。"
        ]
      },
      {
        heading: "一、核心任务：从快速记录到周期复盘",
        list: [
          "记录：支持手动与 AI 辅助录入，补充账户、分类、标签、日期、备注、报销和不计入等信息",
          "管理：按账本与账户组织交易，提供搜索、编辑、退款、转账、分类管理和导入导出流程",
          "计划：围绕周期预算、分类范围与专项计划管理可花边界，并保留调整后的历史语义",
          "分析：提供周、月、年与自定义周期统计，从收支、分类、趋势和预算执行角度回顾消费",
          "扩展：将资产、报告、定时与自动记账、桌面 Widget 等能力接入同一套本地数据基础"
        ]
      },
      {
        heading: "二、数据模型：先定义业务语义，再做页面",
        table: {
          caption: "肥喵记账核心数据对象与边界",
          head: ["数据对象", "承担的业务语义", "关键边界"],
          rows: [
            ["账本与账户", "组织个人财务范围、资金归属与账户流转", "账本视图与总账本视图分开，转账记录双边账户关系"],
            ["交易", "收入、支出、转账、退款等原始事实", "金额、归属日期、账户、分类和状态独立保存，不以页面颜色代替语义"],
            ["分类与标签", "承担统计分组、搜索筛选和用户自定义维度", "层级分类与多标签分开，避免把同一维度重复计数"],
            ["预算与专项", "描述周期目标、范围和执行进度", "计划值与实际发生分开，周期、范围和调整记录均需明确"],
            ["资产与报告", "连接账户余额、物品记录、估值与周期复盘", "事实、推定和待确认状态分开呈现，不把未知值伪装成零"]
          ]
        }
      },
      {
        heading: "三、指标口径：处理看似简单的边界问题",
        list: [
          "转账描述账户之间的资金移动，不作为普通收入或支出重复进入消费统计",
          "退款与原交易建立关联，统计时关注退款后的净影响，而不是把退款简单当作一笔新收入",
          "报销、不计入和时间精度作为显式状态保留，让页面知道哪些金额参与预算、哪些只用于资金结算",
          "预算、统计、报告与 Widget 以共享的数据语义为目标，避免同一个金额在不同页面出现不同解释",
          "对未知、部分可用或证据冲突的数据保留状态，不用默认值制造看似完整的结论"
        ]
      },
      {
        heading: "四、统计与复盘：让记录产生下一步行动",
        body: [
          "统计页支持周、月、年和自定义周期，围绕收支、结余、分类构成、趋势和预算执行组织信息。产品设计不追求堆满图表，而是让用户能回答三个问题：钱花到哪里、与计划差多少、下一周期需要调整什么。",
          "报告与 AI 能力建立在用户已有账本数据之上，用于查询、归纳和周期回顾；没有真实证据时不展示用户量、节省金额或商业效果等指标。"
        ]
      },
      {
        heading: "五、工程与验收：把迭代过程也当作数据质量问题",
        list: [
          "SQLite 使用版本化迁移和事务边界维护历史数据，导入、退款、定时任务等多步骤操作需要幂等与回滚保护",
          "功能交付执行静态分析、定向回归与全量自动化测试，Release 包继续核对版本、结构、签名和 SHA256",
          "界面验收覆盖窄屏、长金额、主题切换、键盘焦点和后台任务恢复等真实使用边界",
          "版本文档区分已发布基线、本地开发包和待真机复测项，不把构建成功等同于运行态全部通过"
        ]
      },
      {
        heading: "公开与数据边界",
        body: [
          "账本数据默认保存在设备本地；当用户主动启用 AI 功能时，所选择的输入与上下文可能发送给用户配置的模型服务，因此本页不使用“绝不上传”或“绝对隐私”等表述。",
          "作品集封面为脱敏界面结构示意，不含真实账单、账户、金额、商户、头像或通知内容。页面仅链接公开测试版发布页和公开源码分支，不公开签名材料、API Key、内部发布地址或个人账本文件。"
        ]
      },
      {
        heading: "结论与下一步",
        body: [
          "肥喵记账证明了我可以把“字段怎么定义、状态如何流转、指标如何解释”继续推进到实际产品：从需求拆解到数据模型、从页面交互到回归验收，最终形成可持续迭代的 Android 应用。后续重点仍是用真实设备反馈继续校准启动体验、数据一致性与复杂财务边界，而不是用未经验证的增长数字包装产品。"
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
      "把分散字段、规则和状态整理成可执行口径，让业务与复盘使用同一套数据语言。",
    points: [
      "明确指标分子分母、统计边界与状态流转",
      "沉淀口径文档并做跨场景一致性检查"
    ]
  },
  {
    icon: LineChart,
    title: "经营指标监控",
    text:
      "按日/周节奏跟踪进度、资源与反馈状态，把异常定位到具体规则、客群或环节。",
    points: [
      "维护核心指标视图并识别异常波动",
      "输出问题提示、初步归因与跟进动作"
    ]
  },
  {
    icon: BarChart3,
    title: "业务复盘与汇报",
    text:
      "把事实、判断和建议整理成结构化复盘材料，让数据结论落到负责人和检查节点。",
    points: [
      "整理经营结果、目标差异和问题清单",
      "跟进调整动作与后续表现，验证实际效果"
    ]
  },
  {
    icon: MonitorCog,
    title: "数据需求协同",
    text:
      "把业务反馈拆成字段、报表逻辑与验收规则，并与开发完成联调和上线验证。",
    points: [
      "把模糊反馈拆成可开发的数据需求",
      "用真实业务数据核对逻辑、联调并验收"
    ]
  }
];

const timeline = [
  {
    time: "2022.09 - 2025.12",
    company: "广发银行",
    role: "数据分析师",
    detail:
      "负责数据管理、资源派发、指标监控、异常跟进与复盘材料；协同开发优化字段口径、报表逻辑和数据功能。",
    icon: Database,
    phase: "primary"
  },
  {
    time: "2022.02 - 2022.06",
    company: "广发信用卡中心（中英项目）",
    role: "数据岗（资源管理与经营检视）",
    detail:
      "负责客户资源管理、下发规则、周/月度检视和异常追踪，支持资源分配与进度复盘。",
    icon: LineChart,
    phase: "supporting"
  },
  {
    time: "2021.08 - 2022.01",
    company: "广州乐芙信息科技有限公司",
    role: "电商老师",
    detail:
      "维护 1500+ 会员并制定销售方案，通过退单率、业绩结构定位流失原因和体验提升点。",
    icon: Users,
    phase: "early"
  },
  {
    time: "2020.12 - 2021.06",
    company: "泉后（广州）生物科技有限公司",
    role: "社群运营",
    detail:
      "协同 150+ 线下门店，参与会员引入、售后、销售计划和私域维护，跟踪多门店反馈。",
    icon: MonitorCog,
    phase: "early"
  },
  {
    time: "2018.03 - 2020.09",
    company: "中国平安广州电销分中心",
    role: "小组长",
    detail:
      "负责新人培训、产品讲解、入职协同和每日数据追踪，用数据支持新人产出提升。",
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

    const findHashTarget = (targetId: string) => {
      if (!targetId.startsWith("#") || targetId.length === 1) return null;
      try {
        return document.getElementById(decodeURIComponent(targetId.slice(1)));
      } catch {
        return null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    motionTargets.forEach((target) => observer.observe(target));

    const nav = document.querySelector<HTMLElement>(".top-nav");
    let scrollCorrectionTimer = 0;
    const scrollToTarget = (targetId: string, behavior: ScrollBehavior) => {
      const target = findHashTarget(targetId);
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
    const navLinks = nav
      ? Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"))
      : [];
    const updateActiveLink = () => {
      const sections = (["projects", "profile", "strengths", "contact"] as const).map(
        (id) => document.getElementById(id)
      );
      let active = "";
      for (const sec of sections) {
        if (sec && sec.getBoundingClientRect().top <= 160) {
          active = sec.id;
        }
      }
      navLinks.forEach((a) => {
        const matches = active ? a.getAttribute("href") === `#${active}` : false;
        a.classList.toggle("is-active", matches);
        if (matches) {
          a.setAttribute("aria-current", "location");
        } else {
          a.removeAttribute("aria-current");
        }
      });
    };
    const updateNav = () => {
      nav?.classList.toggle("is-floating", window.scrollY > window.innerHeight * 0.82);
      updateActiveLink();
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
      if (!findHashTarget(targetId)) return;

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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onNavClick, true);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}

function PhoneReveal() {
  const [phone, setPhone] = useState<string | null>(null);
  const phoneLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (phone) phoneLinkRef.current?.focus();
  }, [phone]);

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
      <span className="phone-reveal-result">
        <a ref={phoneLinkRef} href={`tel:${phone.replace(/-/g, "")}`}>
          <Phone size={18} aria-hidden="true" focusable="false" />
          {phone}
        </a>
        <span className="sr-only" role="status">手机号已显示，可按回车拨打。</span>
      </span>
    );
  }

  return (
    <button type="button" className="phone-reveal" onClick={reveal} aria-label="显示手机号">
      <Phone size={18} aria-hidden="true" focusable="false" />
      点击查看手机号
    </button>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="section-heading">
      <span className="section-label" aria-hidden="true">{label}</span>
      <h2>{title}</h2>
    </div>
  );
}

function ProjectDetailPage({ id }: { id: string }) {
  const detail = projectDetails[id];
  const cover = projects.find((item) => item.id === id);
  const homeHref = assetPath("index.html");
  const projectsHref = assetPath("index.html#projects");

  useEffect(() => {
    document.title = projectDocumentTitles[id] ?? `${detail.title} | 林晓庆数据分析作品集`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "林晓庆 | 数据分析简历与项目作品集";
    };
  }, [detail.title]);

  return (
    <div className="site-shell detail-shell">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="top-nav is-floating detail-nav">
        <a className="brand-mark" href={homeHref} aria-label="返回首页">
          LXQ
        </a>
        <nav aria-label="详情页导航">
          <a href={homeHref}>返回首页</a>
          <a href={projectsHref}>全部项目</a>
        </nav>
        <a className="contact-chip" href={`mailto:${profile.email}`}>
          联系我
        </a>
      </header>

      <main id="main-content" tabIndex={-1}>
      <article className="detail-page page-band">
        <p className="detail-type">{detail.type}</p>
        <h1>{detail.title}</h1>
        <strong className="project-metric detail-metric">{detail.metric}</strong>
        <dl className="detail-meta" aria-label="项目概况">
          {detail.meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        {cover && (
          <div className="detail-cover">
            <img src={cover.image} alt={cover.imageAlt} width="720" height="420" />
          </div>
        )}
        <section className="detail-section detail-resources" aria-labelledby="detail-resources-title">
          <h2 id="detail-resources-title">来源与交付物</h2>
          <div className="resource-grid">
            {detail.resources.map((resource) => {
              const content = (
                <>
                  <strong>{resource.label}</strong>
                  <span>{resource.description}</span>
                </>
              );
              return resource.href ? (
                <a
                  key={resource.label}
                  href={resource.href}
                  target={resource.download ? undefined : "_blank"}
                  rel={resource.download ? undefined : "noopener noreferrer"}
                  download={resource.download || undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={resource.label}>{content}</div>
              );
            })}
          </div>
        </section>
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
              <>
              <div className="detail-table-wrap" tabIndex={0} aria-label={`${section.table.caption ?? section.heading}，可横向滚动`}>
                <table className="detail-table">
                  {section.table.caption && <caption>{section.table.caption}</caption>}
                  <thead>
                    <tr>
                      {section.table.head.map((cell) => (
                        <th key={cell} scope="col">{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, cellIndex) => (
                          cellIndex === 0 ? (
                            <th key={`${row[0]}-${cellIndex}`} scope="row">{cell}</th>
                          ) : (
                            <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                          )
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-scroll-hint" aria-hidden="true">← 横向滑动查看</p>
              </>
            )}
          </section>
        ))}
        <a className="back-link" href={projectsHref}>
          ← 返回项目列表
        </a>
      </article>
      </main>
    </div>
  );
}

function App() {
  const pageProjectId = document.body.dataset.project;
  const queryProjectId = new URLSearchParams(window.location.search).get("p");
  const detailId = pageProjectId || queryProjectId;
  if (detailId && Object.prototype.hasOwnProperty.call(projectDetails, detailId)) {
    return <ProjectDetailPage id={detailId} />;
  }
  return <HomePage />;
}

function HomePage() {
  usePortfolioMotion();

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
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

      <main id="main-content" tabIndex={-1}>
      <section
        className="hero-section"
        id="top"
        style={{ "--hero-image": `url("${heroImage}")` } as React.CSSProperties}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <div className="hero-frame">
          <div className="hero-copy">
            <p className="prompt-badge">
              Business Data Analyst
            </p>
            <p className="kicker">业务数据分析 / 指标监控 / 数据治理 / 数据需求协同</p>
            <h1>
              <span>{profile.name}</span>
              <span>{profile.role}</span>
            </h1>
            <p className="lead">{profile.summary}</p>
            <div className="hero-actions">
              <a className="primary-action" href="#projects">
                查看精选案例 <ArrowUpRight size={18} aria-hidden="true" focusable="false" />
              </a>
              <a className="secondary-action" href="#profile">
                查看经历
              </a>
            </div>
          </div>

        </div>
      </section>

      <section className="method-strip" aria-label="已验证的工具与交付方式">
        {toolMethods.map((item) => (
          <div key={item.label}>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </div>
        ))}
      </section>

      <section className="projects-section page-band" id="projects" data-motion-section>
        <SectionHeading label="Selected Cases" title="精选数据分析与产品项目。" />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className="project-card glow-card"
              key={project.title}
              data-motion-card
              style={{ "--delay": `${index * 130}ms` } as React.CSSProperties}
            >
              <a className="project-cover-link" href={projectHref(project.id)} aria-label={`查看${project.title}详情`}>
                <div className={`project-visual visual-${index + 1}`} data-reveal>
                  <img src={project.image} alt={project.imageAlt} width="720" height="420" loading="lazy" />
                </div>
              </a>
              <div className="project-body">
                <p>{project.type}</p>
                <h3><a href={projectHref(project.id)}>{project.title}</a></h3>
                <strong className="project-metric">{project.metric}</strong>
                <div className="case-points">
                  {project.casePoints.map((point) => (
                    <div key={point.label}>
                      <strong>{point.label}</strong>
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                  <a className="detail-link" href={projectHref(project.id)}>
                    查看项目详情 <ArrowUpRight size={15} aria-hidden="true" focusable="false" />
                  </a>
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
              日常工作贯穿"定义口径 → 监控指标 → 定位异常 → 复盘沉淀 → 推动改进"：
              先统一字段、状态和统计规则，再把异常拆到规则、客群或环节，最后将结论转成行动项和数据功能需求。
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
            <div className="edu-note" aria-label="教育背景">
              <span>教育背景</span>
              <div>
                <strong>{profile.educationSchool}</strong>
                <small>{profile.educationDetail}</small>
              </div>
            </div>
          </div>
          <div className="stat-grid">
            {stats.map((item, index) => (
              <article className="glow-card experience-card" key={item.label} data-motion-card style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small className="stat-note">{item.note}</small>
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
                  <Icon size={20} aria-hidden="true" focusable="false" />
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
                <Icon size={26} aria-hidden="true" focusable="false" />
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
          <span className="section-label" aria-hidden="true">Contact</span>
          <h2>期待在数据分析、经营指标监控与业务复盘方向继续深入。</h2>
          <div className="contact-list">
            <PhoneReveal />
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} aria-hidden="true" focusable="false" />
              {profile.email}
            </a>
            <a href={assetPath("assets/lin-xiaoqing-data-analyst-resume.pdf")} download>
              <FileDown size={18} aria-hidden="true" focusable="false" />
              下载简历 PDF
            </a>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
