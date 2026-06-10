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
  {
    value: "3年+",
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
        text: "整理国家统计局、上市平台披露和 CNNIC 第 49-57 次报告数据，建立 2021-2025 五年序列，形成事实表、来源血缘、SQL 视图、趋势洞察和 HTML 报告，推导指标单独标记不冒充官方披露。"
      },
      {
        label: "输出价值",
        text: "输出可导入数据库的数据包和可视化报告，能解释线上零售、消费领域、平台指标和客群变化，每个数字可追溯到具体报告期数。"
      }
    ],
    tags: ["官方口径", "来源血缘", "趋势报告"],
    image: assetPath("assets/project-ecommerce-research.svg?v=20260610-real-data"),
    imageAlt: "中国电商消费趋势网络购物用户、使用率和网上零售额封面",
    evidence: [
      "CNNIC 口径五年序列：网购用户 8.42 亿（2021）→ 9.74 亿（2024）→ 9.37 亿（2025），大盘进入平台期",
      "CNNIC 第57次报告口径：2025 网络购物用户 9.37 亿、使用率 83.2%",
      "统计局口径：网上零售额五年从 13.09 万亿增至 15.97 万亿，实物线上化比重较 2021 提升 1.6 个百分点",
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
        text: "基于 Goodreads 年度热门榜快照抓取候选池，按类目过滤非小说并记录剔除原因，建立 500 本书档案，统计书架标记、评分、评论和题材标签，主风格单标签与风格信号多标签两套口径分开维护。"
      },
      {
        label: "输出价值",
        text: "把内容热度拆成可读的数据叙事，既能看主风格五年变化和平台互动趋势，也能追溯到单书档案、方法论和数据边界。"
      }
    ],
    tags: ["读者行为代理", "样本清洗", "内容洞察"],
    image: assetPath("assets/project-novel-market.svg?v=20260610-real-trend"),
    imageAlt: "国际热门小说主风格五年变化与 2025 主风格分布封面",
    evidence: [
      "2025 Goodreads Top100 小说样本：书架标记量 6158.8 万",
      "2025 年度索引口径：Romance 主风格 28 本，与 Thriller Mystery 并列第一",
      "五年热度峰值：2023《Fourth Wing》书架标记 637 万，类型混合是近年最强商业信号",
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
    metric: "3 个官方数据源 / 2021-2025 五年序列 / 数据包·SQL视图·HTML报告",
    sections: [
      {
        heading: "摘要",
        body: [
          "本报告整合国家统计局、CNNIC 和上市平台披露三类公开数据，建立 2021-2025 五年可追溯序列，回答三个问题：电商用户大盘还在不在增长、交易规模处于什么阶段、线上化程度走到了哪一步。核心结论：网购用户规模进入 9 亿量级的平台期，2024 年在以旧换新政策拉动下冲高至 9.74 亿后于 2025 年回落；网上零售额五年累计增长约 22%（13.09 → 15.97 万亿）但增速明显放缓；实物商品线上化比重较 2021 年提升 1.6 个百分点，2022-2023 冲高后回落，线上线下进入再平衡阶段。电商已经从增量市场转入存量运营市场。"
        ]
      },
      {
        heading: "数据与方法",
        list: [
          "国家统计局：全国网上零售额、实物商品网上零售额及占社会消费品零售总额比重（年度公报口径）",
          "CNNIC《中国互联网络发展状况统计报告》：网络购物用户规模与网民使用率，取第 49/51/53/55/57 次报告的年末口径，每个数字标注报告期数",
          "上市平台披露：财报中的 GMV、用户与品类指标，仅作平台层参考，不与官方口径混算",
          "处理方式：原始披露值进事实表并记录来源血缘；推导指标（占比、增速）单独标记为 derived；交付可导入数据库的数据包、SQL 视图和 HTML 可视化报告"
        ]
      },
      {
        heading: "一、用户大盘：从拉新见顶到政策脉冲",
        table: {
          caption: "网络购物用户规模与使用率（CNNIC，年末口径）",
          head: ["年份", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["网购用户规模（亿）", "8.42", "8.45", "9.15", "9.74", "9.37"],
            ["占网民比例（%）", "81.6", "79.2", "83.8", "87.9", "83.2"],
            ["数据来源", "第49次", "第51次", "第53次", "第55次", "第57次"]
          ]
        },
        body: [
          "2021-2022 年用户规模几乎零增长（8.42 → 8.45 亿），拉新逻辑率先见顶。2023-2024 年重新上行，其中 2024 年较上年净增 5947 万、使用率冲至 87.9%——CNNIC 第 55 次报告将其明确归因于电商平台联合各级政府补贴推动的以旧换新带动线上成交。2025 年回落至 9.37 亿（使用率 83.2%），与网民总规模升至 11.25 亿对照，说明政策脉冲消退后大盘回归平台期均值。对业务的含义：用户增长依赖政策与场景事件驱动，常态化经营的重心应放在使用深度、复购结构和客单价上。"
        ]
      },
      {
        heading: "二、交易规模：增长仍在，斜率变缓",
        table: {
          caption: "全国网上零售额与实物线上化（国家统计局口径；增速为 derived 推导值）",
          head: ["年份", "2021", "2022", "2023", "2024", "2025"],
          rows: [
            ["全国网上零售额（万亿元）", "13.09", "13.79", "15.43", "15.52", "15.97"],
            ["同比增速（derived，%）", "—", "+5.3", "+11.9", "+0.6", "+2.9"],
            ["实物商品网上零售额占社零比重（%）", "24.5", "27.2", "27.6", "26.8", "26.1"]
          ]
        },
        body: [
          "五年序列呈现清晰的三段式：2022 年低速增长（+5.3%），2023 年补偿性反弹（+11.9%，对应线下消费场景恢复后的整体消费回暖），2024-2025 年回落到低个位数增速。交易规模仍在创新高，但 0.6%-2.9% 的增速意味着行业整体已无法靠大盘红利增长，平台与商家的竞争本质转为存量份额争夺。",
          "实物线上化比重的形态更值得注意：2022 年冲至 27.2% 的高点后逐年回落至 26.1%，并非线上衰退，而是线下消费恢复带来的再平衡。线上化率较 2021 年仍净提升 1.6 个百分点，长期趋势未逆转，但「线上无限替代线下」的叙事在数据上已不成立。"
        ]
      },
      {
        heading: "三、交叉验证：用户 × 交易的剪刀差",
        body: [
          "把两组序列放在一起看：2024 年用户冲高（+5947 万）与零售额近乎停滞（+0.6%）同年出现，剪刀差说明以旧换新拉来的增量用户客单贡献有限，政策驱动的用户增长并未等比例转化为交易增长；2025 年用户回落而零售额增速回升至 2.9%，则指向存量用户的消费深度在修复。这种「用户量与交易额背离」的结构，正是判断市场进入存量阶段的典型信号。"
        ]
      },
      {
        heading: "结论与应用",
        list: [
          "大盘判断：用户与交易双双进入低增速区间，电商整体从增量市场切换为存量市场，经营重点从获客转向留存、复购与客单结构",
          "政策敏感性：2024 年以旧换新的脉冲效应清晰可量化，做经营预测时需要把政策事件单独建模，不能直接线性外推",
          "线上化再平衡：26% 上下的实物线上化比重可作为渠道结构决策的基准线，线上线下融合而非替代是中期主旋律",
          "方法论沉淀：官方口径 + 用户口径 + 平台口径三层分离的事实表结构，可复用于任何需要多源公开数据对齐的行业分析"
        ]
      },
      {
        heading: "口径边界说明",
        body: [
          "官方统计与 CNNIC 用户指标分开标注，不混写平台 GMV；同比增速等推导指标在事实表中标记为 derived，不冒充官方直接披露值；CNNIC 用户数为年末时点值，与统计局全年流量值的时间口径不同，交叉解读时已做区分。"
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
        heading: "摘要",
        body: [
          "本报告基于 Goodreads 2021-2025 年度热门榜单，清洗建档 500 本小说样本，从主风格结构、热度集中度和题材信号三个维度刻画国际大众小说市场的年度变化。核心结论：Romance 始终是大盘主力，2023 年达到峰值（33 本）后回落；Thriller Mystery 在 2023 年探底（22 本）后连续两年回升，2025 年与 Romance 以 28 本并列第一；Romantasy（爱情幻想混合）波动最大，是近五年最强的商业混合类型。热门作品的共同信号是类型混合与高情绪密度叙事，而非单一题材快感。"
        ]
      },
      {
        heading: "数据与方法",
        list: [
          "候选池：Goodreads「Most popular books published in YEAR」年度榜单快照，2021-2025 共五年",
          "清洗规则：按 Goodreads genres 过滤非小说（保留 fiction 类目），剔除原因逐条记录在排除表，每本保留原始榜单名次（raw_rank）可回溯",
          "样本规模：每年 Top 100 小说，共 500 本，每本建立独立书档（元数据、题材标签、互动指标、市场象限）",
          "热度主口径：shelf_count（读者加入书架次数），为平台行为代理指标；辅助指标 ratings_count、text_reviews_count、average_rating",
          "两套风格口径分开维护：主风格（单标签，每本归入一个风格家族，用于结构对比）与风格信号（多标签，一本书可同时命中多个信号，用于趋势观察）"
        ]
      },
      {
        heading: "一、主风格结构：Romance 大盘、悬疑基本盘、Romantasy 高波动",
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
          "三大家族（Romance、Thriller Mystery、Romantasy）合计稳定占据每年 Top 100 的约八成，市场头部结构高度稳定。Romance 2023 年冲到 33 本的峰值与当年 BookTok 推动的爱情题材热度一致；Thriller Mystery 同年被挤压到 22 本后逐年收复，说明反转、谜团和道德不确定性仍是全球大众阅读的稳定需求；Romantasy 在 20-28 本之间大幅波动，头部系列（如 Fourth Wing 系列）的出版节奏直接影响该家族的年度占位。"
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
          "2025 年 Romance 与 Thriller Mystery 以 28 本并列第一，五年来首次出现双头格局；前三家族合计 81 本，集中度仍在高位。纯 Fantasy、恐怖和科幻在热门榜中只剩个位数——这些题材并未消失，而是被吸收进 Romantasy、悬疑等混合类型中。"
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
          "2022-2023 是热度峰值期：《The Housemaid》和《Fourth Wing》先后突破 600 万书架标记，且双双兼具高热度与高口碑。2024 年后头部作品热度回落至 300 万量级，部分是时间累积效应（新书标记量随时间增长），但头部断层收窄、腰部变厚的趋势在样本内同样可见。2025 年样本书架标记总量为 6158.8 万。"
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
          "多标签口径下，每年约三分之二的热门小说带有 Romance 信号——远高于主风格口径的 28 本左右，说明爱情元素已经是大众小说的通用配方而非独立类型。热门作品反复命中女性成长、家庭与历史创伤、危险亲密关系等高情绪密度母题；读者要的不是单一类型快感，而是强情绪驱动下的可沉浸、可讨论、可推荐的故事。"
        ]
      },
      {
        heading: "结论与应用",
        list: [
          "市场结构判断：Romance 是大盘、悬疑是基本盘、Romantasy 是弹性最大的进攻型类型，三者合计约八成，新作选型绕不开这三个家族",
          "混合策略优于单一类型：fantasy × romance、悬疑 × 亲密关系的交叠是近五年最强商业信号，纯单一题材进入头部的难度持续上升",
          "口碑与热度并非同步：象限分析显示高热度口碑分化的作品常年存在，热度指标必须搭配评分与评论结构一起读",
          "该方法论可平移到任何内容市场：榜单清洗 → 双口径建档 → 结构/集中度/信号三维拆解"
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
      "负责客户资源管理、资源下发规则、周/月度数据检视和异常追踪，支持团队进行资源分配、进度复盘和业务策略调整。这段经历形成了后续银行数据岗的口径意识和定期检视习惯。",
    icon: LineChart,
    phase: "supporting"
  },
  {
    time: "2021.08 - 2022.01",
    company: "广州乐芙信息科技有限公司",
    role: "电商老师",
    detail:
      "维护 1500+ 会员，理解健康产品需求并制定销售方案；通过退单率、业绩结构等数据定位流失原因和体验提升点，是从业务岗位转向数据视角的起点。",
    icon: Users,
    phase: "early"
  },
  {
    time: "2020.12 - 2021.06",
    company: "泉后（广州）生物科技有限公司",
    role: "社群运营",
    detail:
      "协同 150+ 线下门店，参与直播会员引入、售后处理、销售计划和私域活跃维护，提升用户触达和运营承接效率；多门店协同中积累了跨节点对齐目标与跟踪反馈的经验。",
    icon: MonitorCog,
    phase: "early"
  },
  {
    time: "2018.03 - 2020.09",
    company: "中国平安广州电销分中心",
    role: "小组长",
    detail:
      "负责新人培训 PPT、产品卖点讲解、入职流程协同和每日数据追踪，帮助新人提升业务理解和产出效率；每日盯数、用数据带人的习惯从这段经历开始养成。",
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
                <div className="card-footer">
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                  <a className="detail-link" href={`?p=${project.id}`}>
                    查看项目详情 <ArrowUpRight size={15} />
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
            <div className="edu-note" aria-label="教育背景">
              <span>教育背景</span>
              <div>
                <strong>广东理工学院</strong>
                <small>机械设计与制造 · 专科</small>
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
            <a href={assetPath("resume.html?print=1")} target="_blank" rel="noopener">
              <FileDown size={18} />
              下载简历 PDF
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
