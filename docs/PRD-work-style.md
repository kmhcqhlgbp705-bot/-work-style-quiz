# Work Style Quiz — 产品需求文档（PRD）

> **单一事实来源（SSOT）**：本文件为 Work Style 测验的产品与内容定义。实现题目、计分、结果文案、分享文案时，以本文为准；变更题目或类型时请同步更新版本号与修订记录。

| 属性 | 值 |
|------|-----|
| 文档版本 | 1.6 |
| 题目数量 | 30（单选） |
| 结果类型数 | 6 |
| 默认语言 | English（结构预留 i18n） |
| 最后更新 | 2026-04-10 |

**文件路径（供实现引用）**：`/docs/PRD-work-style.md`（本仓库根目录下 `docs` 文件夹）。

---

## 1. 产品概述

| 项目 | 内容 |
|------|------|
| **工作名** | Work Style Quiz |
| **一句话** | 约 8–12 分钟完成的职场「工作风格」测验，输出易记忆的类型名、适合的工作环境与协作方式，便于社媒转发。 |
| **首发市场** | 海外泛英语用户 |

### 1.1 目标

- **完成率**：进入测验的用户中完成并看到结果的比例。
- **传播**：结果页「复制链接 / 分享」使用；外链回访。
- **可迭代**：题目与权重可版本化（见 §8）。

### 1.2 非目标（MVP）

- 临床或严肃心理测量效度声明。
- 账号、付费、团队版（可列 backlog）。

### 1.3 免责声明（须出现在落地页与结果页）

本测验仅供娱乐与自我反思，不构成职业、心理或法律建议。

---

## 2. 信息架构与页面

| 页面 | 说明 |
|------|------|
| Landing | 顶栏 + 情感化主标题 + 时间承诺 + 主 CTA + 插画/视觉区 + 数据条；第二屏类型预览与免责声明（见 §2.3）。 |
| Quiz | 一题一屏，进度条；建议支持「上一题」。 |
| Result | 类型名、tagline、分块文案、Share / Copy link、Retake。 |
| Result URL | 每种类型可被分享、可被 OG 抓取的稳定路径（实现时定义，如 `/result/deep-focus`）。 |

### 2.1 Landing（首页）吸引力优化要求

> 目标：用户在 **3-5 秒** 内明白「这是什么」「我做完能得到什么」「值不值得现在做」。

#### A. 首屏信息层级（必须）

1. **Value Proposition（H1）**  
   用一句话说清结果价值，而不是只写产品名。  
   示例（英文）：`Discover your work style and the team setup where you do your best work.`

2. **Subheadline（补充收益）**  
   明确结果包含内容：工作环境 + 协作方式 + 可分享结果卡。  
   示例（英文）：`Get a personalized profile in 8-12 minutes: strengths, watch-outs, best environment, and collaboration style.`

3. **Primary CTA（主按钮）**  
   避免泛化 `Start`，改为结果导向文案。  
   推荐：`See My Work Style` / `Get My Result`

4. **Friction Reducer（阻力消除）**  
   CTA 附近必须展示：`30 questions · 8-12 min · No signup`

#### B. 信任与兴趣触发（建议 MVP 即做）

- **Type Preview**：首屏展示 6 种类型中的 3-6 个小卡片（名称 + 1 句标签），激发好奇心。  
- **Result Preview**：展示一张结果页示意图（静态 mock 即可），降低“做完不知道得到什么”的不确定感。  
- **Disclaimer 位置优化**：免责声明保留，但视觉权重降低到页底，避免压制转化。

#### C. 可直接使用的首页英文文案（v1）

- **H1**: `What is your Work Style?`
- **Subheadline**: `Answer 30 quick questions to discover your strengths, ideal work environment, and collaboration style.`
- **Meta line**: `30 questions · 8-12 min · No signup`
- **Primary CTA**: `See My Work Style`
- **Secondary CTA（可选）**: `Preview the 6 styles`

#### D. 首页验收标准（新增）

- 用户进入首页后无需滚动即可看到：H1、Subheadline、Meta line、Primary CTA。  
- 首屏明确出现 `No signup` 与时长信息。  
- 首屏至少提供一种「结果预期」可视化（Type Preview 或 Result Preview）。

### 2.2 Landing（Apple-like Hero）视觉规范（新增）

> 目标：首屏达到“强视觉 + 单一动作”的高端感，减少信息干扰，提高点击 `Start` 的意愿。

#### A. Hero 结构（必须）

1. **全屏或近全屏视觉区**：建议 `min-height: 90vh`。  
2. **背景大图 + 深色遮罩**：可使用渐变与光斑效果，不可喧宾夺主。  
3. **居中内容**：仅保留 `H1`、`Subheadline`、`Meta line`、`Primary CTA`。  
4. **单一主动作**：首屏仅一个高优先级按钮（`Start the Quiz` 或同义文案）。

#### B. 信息降噪策略（必须）

- 首屏不展示 6 张类型卡片。  
- 类型预览与结果示意下沉到 Hero 下方的第二屏模块。  
- 免责声明保留在首页下方，不占用 Hero 核心视觉焦点。

#### C. 视觉参数建议（建议）

- `H1` 字号：`clamp(2rem, 5vw, 4.5rem)`  
- Hero 内容最大宽度：`760px`  
- 主按钮尺寸：高度 `56-64px`，横向 `220-280px`，圆角 `999px`  
- 按钮动效：hover 轻微上浮（`translateY(-1px)`）  

#### D. Hero 英文文案建议（v2）

- **H1**: `Discover Your Work Style`
- **Subheadline**: `A quick 30-question assessment for your ideal environment and collaboration rhythm.`
- **Meta line**: `30 questions · 8-12 min · No signup`
- **Primary CTA**: `Start the Quiz`

#### E. 设计参考来源（新增）

- 参考仓库：`awesome-design-md-main`  
- Apple 条目可用关键词：`Premium white space`、`SF Pro`、`cinematic imagery`  
- 当前本地 Apple 条目为跳转说明页（非完整 token 文档），实现层先以关键词约束为准；后续拿到完整 DESIGN.md 后再对颜色与组件 token 做精修。

### 2.3 Landing（人格测试类站点 UI 参考 — 如 16Personalities）

> 参考对象：[16Personalities 中文站](https://www.16personalities.com/ch) 等主流人格测试落地页的 **信息架构与视觉节奏**（非复制其商标、插画、文案或专有布局资产）。

#### A. 必须对齐的 UX 模式

1. **顶栏（Site header）**：白底、轻分割；左侧品牌名 + 小图形标识（须为原创，不得沿用第三方 logo）。  
2. **主标题情绪化**：一句话强调「被理解 / 看清自己 / 适合团队」类收益（可随英文市场改写）。  
3. **时间承诺**：首屏明确写出约 **8–12 分钟** 与 **30 题**。  
4. **主 CTA**：高对比行动色按钮（绿色系可参考 `#33a474` 量级），文案使用 `Take the test` 或同义英文。  
5. **右侧或上方的「场景感」视觉区**：可用原创插画 / 抽象场景（不得使用对方站点图片）。  
6. **底部数据条（Proof strip）**：展示若干「数字 + 标签」增强信任（可用真实统计或产品内指标，若暂无数据则用题目数、风格数、时长等 **诚实指标**）。

#### B. 色彩与排版（建议）

- **背景**：浅灰绿 / 薄荷灰页面底（`#eef4f4` 量级），卡片白底。  
- **标题色**：深紫灰（`#594673` 量级）呼应「类型感」；**行动色**：绿色（`#33a474` 量级）。  
- **辅助色**：紫、蓝、黄、绿点缀（用于类型卡左侧色条等），与「多类型」心智一致。  
- **字体**：友好圆角无衬线（如 **Nunito Sans**），字重对比明显（标题 800、正文 400–600）。

#### C. 测验页与结果页（建议）

- **进度条**：柔和底色 + 绿到青渐变填充；题干预设为较大字重、紫色标题感。  
- **选项**：大圆角卡片，选中态用绿色描边/浅绿底（替代过重的单选框视觉）。  
- **结果页**：顶部居中展示类型名 + tagline；下方分块信息卡。

#### D. 合规与品牌边界（必须）

- 不得使用第三方注册商标、官方插画、相同排版像素级复刻。  
- 页脚可注明「灵感来自常见人格测试落地页模式，与任何第三方测试无关联」。

---

## 3. 功能需求（MVP）

| ID | 需求 | 优先级 |
|----|------|--------|
| F1 | 30 题单选；提交后计算唯一主导类型（平局规则见 §5）。 | P0 |
| F2 | 展示 6 种类型之一的完整结果文案（§6）。 | P0 |
| F3 | 分享：复制链接 + 预设英文模板；可选 Web Share API。 | P0 |
| F4 | 每种类型的 `og:title` / `og:description` 与结果页一致。 | P1 |
| F5 | 轻量事件：quiz_start、quiz_complete、share_click（无 PII）。 | P2 |
| F6 | Landing 首屏需符合 §2.1 信息层级与文案要求。 | P0 |
| F7 | Landing 展示类型预览或结果预览（至少一种）。 | P1 |
| F8 | Landing 需符合 §2.2 Apple-like Hero 视觉规范（大图、居中、单主按钮）。 | P0 |
| F9 | Landing / Quiz / Result 视觉需符合 §2.3 人格测试类落地页参考（顶栏、绿 CTA、proof strip、类型色条等）；与 F8 冲突时以 **§2.3 为优先**（面向传播型测验场景）。 | P0 |

---

## 4. 六种 Work Style（类型定义）

内部 **ID** 用于代码与 URL slug；**对外名称** 用于 UI 与分享。

| ID | URL slug（建议） | 对外名称 |
|----|------------------|----------|
| `deep_focus` | `deep-focus` | **The Deep Focus Builder** |
| `collab_spark` | `collab-spark` | **The Collaborative Spark** |
| `systems_orchestrator` | `systems-orchestrator` | **The Systems Orchestrator** |
| `nimble_navigator` | `nimble-navigator` | **The Nimble Navigator** |
| `people_connector` | `people-connector` | **The People Connector** |
| `independent_owner` | `independent-owner` | **The Independent Owner** |

### 4.1 画像摘要（用于结果文案与 OG）

| ID | 核心画像 |
|----|----------|
| `deep_focus` | 深度工作、少打断、异步沟通、安静可控环境。 |
| `collab_spark` | 同步碰撞、头脑风暴、白板与高能协作。 |
| `systems_orchestrator` | 流程、文档、角色清晰、可预测节奏。 |
| `nimble_navigator` | 变化快、容忍模糊、小步实验、快速转向。 |
| `people_connector` | 关系与信任、倾听、协调、团队心理安全。 |
| `independent_owner` | 强自主、端到端负责、少 micromanagement。 |

---

## 5. 计分规则

1. **每题**：用户选择 A/B/C/D 之一，每个选项对应 **一个类型 ID**（见 §7 题库）。
2. **分值**：每选一次，对应类型 **+1 分**（若需与旧版 12 题对齐，可统一改为 +3，仅相对排序不变）。
3. **结果**：30 题结束后，**总分最高**的类型为结果。
4. **平局（tie-break）**：按题目顺序 **Q1 → Q30**，取「在最高分之一组中、最后一次被用户选中的类型」为胜者；若仍并列，按固定顺序：`deep_focus` → `collab_spark` → `systems_orchestrator` → `nimble_navigator` → `people_connector` → `independent_owner`（实现与文档须一致）。

---

## 6. 结果页文案结构（每类型需准备）

以下字段均为 **English**，实现时可放入 CMS 或 i18n JSON。

| 字段 | 说明 |
|------|------|
| `title` | 对外名称（与 §4 一致） |
| `tagline` | 1 句，适合分享 |
| `strengths` | 2–3 条要点 |
| `watch_outs` | 2 条「盲点」或压力点 |
| `best_environment` | 适合的工作环境（物理/节奏/打断） |
| `collaboration_style` | 偏好的协作方式（同步/异步、角色、沟通） |

（具体英文长文案可在实现阶段根据 §4.1 扩写；本 PRD 以类型定义与题库为 SSOT。）

---

## 7. 题库（30 题 × 4 选项）

**说明**：选项后的箭头表示该选项计分归属的类型 ID。

---

**Q1. Your ideal workweek rhythm is…**

- **A** — Long quiet blocks; meetings are exceptions. → `deep_focus`
- **B** — Lots of co-working time and live discussions. → `collab_spark`
- **C** — Predictable rituals: standups, docs, handoffs. → `systems_orchestrator`
- **D** — Plans change often; I adapt day by day. → `nimble_navigator`

**Q2. When a project starts, you first want…**

- **A** — A written brief and owners for each piece. → `systems_orchestrator`
- **B** — A kickoff that gets everyone aligned emotionally. → `people_connector`
- **C** — Freedom to explore before commitments. → `independent_owner`
- **D** — A whiteboard session to shape the idea together. → `collab_spark`

**Q3. Feedback that helps you most sounds like…**

- **A** — “Here’s exactly what to change next time.” → `systems_orchestrator`
- **B** — “Here’s how this landed for the team.” → `people_connector`
- **C** — “Take another pass when you’re in flow.” → `deep_focus`
- **D** — “Let’s try a quick experiment and see.” → `collab_spark`

**Q4. Your nightmare workday includes…**

- **A** — Constant pings with no time to think. → `deep_focus`
- **B** — Silent solo work all day with no collaboration. → `collab_spark`
- **C** — Chaos: no roles, no written decisions. → `systems_orchestrator`
- **D** — Rigid process when the situation already changed. → `nimble_navigator`

**Q5. In meetings, you naturally…**

- **A** — Take notes and turn chaos into next steps. → `independent_owner`
- **B** — Make sure quieter voices are heard. → `people_connector`
- **C** — Prefer async updates instead of another call. → `deep_focus`
- **D** — Push for a decision and move on. → `nimble_navigator`

**Q6. You feel most trusted when a manager…**

- **A** — Sets clear outcomes and gets out of the way. → `independent_owner`
- **B** — Checks in on how you’re doing, not just tasks. → `people_connector`
- **C** — Protects your calendar for deep work. → `deep_focus`
- **D** — Creates space for the team to ideate together. → `collab_spark`

**Q7. Under a tight deadline, you…**

- **A** — Cut scope and ship something real. → `collab_spark`
- **B** — Lock in a plan and execute calmly. → `systems_orchestrator`
- **C** — Go heads-down and minimize noise. → `deep_focus`
- **D** — Pull the right people in to unblock fast. → `people_connector`

**Q8. Your favorite collaboration setup is…**

- **A** — Shared docs with clear owners. → `independent_owner`
- **B** — Live calls and real-time brainstorming. → `collab_spark`
- **C** — Async threads; reply on my own time. → `deep_focus`
- **D** — Minimal tools; I own the outcome end-to-end. → `independent_owner`

**Q9. Conflict on the team makes you…**

- **A** — Step in to clarify facts and next steps. → `systems_orchestrator`
- **B** — Talk privately to rebuild trust first. → `people_connector`
- **C** — Prefer to step away until it’s calmer. → `deep_focus`
- **D** — Address it quickly so we don’t stall. → `nimble_navigator`

**Q10. You’d rather be evaluated on…**

- **A** — Reliable delivery against commitments. → `independent_owner`
- **B** — The quality of relationships you build. → `people_connector`
- **C** — Impact you drove with autonomy. → `independent_owner`
- **D** — Creativity and ideas brought to the group. → `collab_spark`

**Q11. “Remote vs office” for you is really about…**

- **A** — Controlling interruptions and deep work. → `deep_focus`
- **B** — Energy from being around people. → `collab_spark`
- **C** — Freedom to structure my own day. → `independent_owner`
- **D** — Whatever helps the team move fastest today. → `nimble_navigator`

**Q12. Your career happiness spikes when…**

- **A** — You can own a problem end-to-end. → `independent_owner`
- **B** — The team feels safe and aligned. → `people_connector`
- **C** — The system runs smoothly without heroics. → `systems_orchestrator`
- **D** — You’re learning fast in a changing environment. → `nimble_navigator`

**Q13. When you learn something new for work, you prefer to…**

- **A** — Read quietly and practice alone first. → `deep_focus`
- **B** — Pair with someone and learn by doing together. → `collab_spark`
- **C** — Follow a structured course or checklist. → `systems_orchestrator`
- **D** — Jump into a real task and fix gaps as you go. → `nimble_navigator`

**Q14. A vague goal with no metrics feels…**

- **A** — Fine if I can carve focus time to figure it out. → `deep_focus`
- **B** — Exciting if we can workshop it as a group. → `collab_spark`
- **C** — Uncomfortable until we define owners and milestones. → `systems_orchestrator`
- **D** — Normal; clarity can emerge while we move. → `nimble_navigator`

**Q15. Your default reaction to a new company process is…**

- **A** — “Will this protect my focus time?” → `deep_focus`
- **B** — “How will this affect team vibes?” → `people_connector`
- **C** — “Show me the RACI and the template.” → `systems_orchestrator`
- **D** — “We’ll probably rewrite it in two weeks anyway.” → `nimble_navigator`

**Q16. The best praise you can get is…**

- **A** — “You delivered—no drama.” → `independent_owner`
- **B** — “You made the team feel unstuck.” → `people_connector`
- **C** — “Your doc made everything obvious.” → `independent_owner`
- **D** — “Your idea changed the room.” → `collab_spark`

**Q17. After a stressful week, you recharge by…**

- **A** — Long offline time with zero work chat. → `deep_focus`
- **B** — Talking it out with a trusted colleague. → `people_connector`
- **C** — Tidying your tasks and inbox so Monday is clean. → `systems_orchestrator`
- **D** — Starting something new to regain momentum. → `people_connector`

**Q18. Your ideal team size for daily work is…**

- **A** — Small enough that I can own a slice solo. → `independent_owner`
- **B** — Big enough for energy, small enough to know everyone. → `collab_spark`
- **C** — Large if roles and interfaces are clear. → `systems_orchestrator`
- **D** — Whatever ships fastest for this phase. → `nimble_navigator`

**Q19. You get skeptical when leadership says…**

- **A** — “We’ll figure out the details later.” (with no owner) → `systems_orchestrator`
- **B** — “Just be available all day on Slack.” → `deep_focus`
- **C** — “Process for process’s sake.” → `nimble_navigator`
- **D** — “Don’t worry about how people feel.” → `people_connector`

**Q20. In a brainstorm, you’re most likely to…**

- **A** — Build on others’ ideas in real time. → `collab_spark`
- **B** — Ask the question that names the tradeoff. → `systems_orchestrator`
- **C** — Stay quiet until you have one sharp idea. → `collab_spark`
- **D** — Suggest a cheap test before a big debate. → `nimble_navigator`

**Q21. You respect a coworker who…**

- **A** — Doesn’t need hand-holding and still communicates clearly. → `independent_owner`
- **B** — Makes hard conversations feel safer. → `people_connector`
- **C** — Writes decisions down so nobody is guessing. → `independent_owner`
- **D** — Turns ambiguity into a prototype. → `nimble_navigator`

**Q22. Your “productive morning” usually means…**

- **A** — Two hours of uninterrupted work before chat. → `deep_focus`
- **B** — A quick sync to align the team’s energy. → `collab_spark`
- **C** — Checking the plan and updating the board. → `systems_orchestrator`
- **D** — Picking the highest-leverage move and switching fast. → `nimble_navigator`

**Q23. If you disagree with a popular plan, you…**

- **A** — Write a clear alternative with tradeoffs. → `independent_owner`
- **B** — Talk to key people 1:1 before the room decides. → `people_connector`
- **C** — Opt out of the debate and prove it with work. → `independent_owner`
- **D** — Challenge it live so the group can react. → `collab_spark`

**Q24. “Scope creep” to you sounds like…**

- **A** — A focus problem unless someone says no. → `deep_focus`
- **B** — A people problem if expectations weren’t shared. → `people_connector`
- **C** — A planning problem: change control needed. → `systems_orchestrator`
- **D** — Sometimes the signal that we should pivot. → `nimble_navigator`

**Q25. You feel most productive in a workplace that…**

- **A** — Lets me block deep work without guilt. → `deep_focus`
- **B** — Has lively collaboration spaces. → `collab_spark`
- **C** — Has clear norms and written agreements. → `systems_orchestrator`
- **D** — Rewards speed of learning over perfection. → `nimble_navigator`

**Q26. Your 1:1 with a manager should mostly be about…**

- **A** — Removing blockers and clarifying ownership. → `independent_owner`
- **B** — How you’re doing as a human, not only output. → `people_connector`
- **C** — Priorities, timelines, and expectations. → `systems_orchestrator`
- **D** — What experiments to run next week. → `nimble_navigator`

**Q27. When documentation is missing, you…**

- **A** — Create the minimum doc so future-you survives. → `independent_owner`
- **B** — Pull people together to align verbally first. → `collab_spark`
- **C** — Prefer to stay in flow and document later. → `deep_focus`
- **D** — Ship something small and document what broke. → `nimble_navigator`

**Q28. You’re happiest when your role is…**

- **A** — A clear lane you can run end-to-end. → `independent_owner`
- **B** — A glue role that helps others succeed. → `people_connector`
- **C** — A stabilizer who makes the machine work. → `systems_orchestrator`
- **D** — A scout in changing terrain. → `nimble_navigator`

**Q29. “Good collaboration” to you means…**

- **A** — Fewer meetings, clearer handoffs. → `deep_focus`
- **B** — Psychological safety and honest dialogue. → `people_connector`
- **C** — Shared definitions of done and who decides what. → `systems_orchestrator`
- **D** — Rapid feedback loops and quick iterations. → `collab_spark`

**Q30. If you had to pick your strongest professional edge, it would be…**

- **A** — Sustained focus on hard problems → `deep_focus`
- **B** — Building trust and helping people feel heard → `people_connector`
- **C** — Owning outcomes without needing oversight → `independent_owner`
- **D** — Staying adaptable when everything shifts → `nimble_navigator`

---

### 7.1 题型覆盖说明

- Q1–Q12 为初版 12 题核心题（与 v1.0 文档一致），语义覆盖节奏、协作、反馈、冲突、评估、场域。
- Q13–Q30 扩展学习风格、模糊容忍、流程反应、团队规模、压力恢复、角色偏好等，使 30 题区分度更稳定；**Q30 为轻量收尾题**（仍参与计分）。

### 7.2 选项类型分布校验（实现自检用）

每题 4 选项 × 30 题 = 120 个计分槽位。**v1.2 起**：六种 `type_id` 在选项中各出现 **恰好 20 次**（每题仅含其中 4 型，故不存在「30 题全选同一型」的路径；总体对各型无偏）。上线前建议在构建脚本中校验：

`collab_spark`、`deep_focus`、`independent_owner`、`nimble_navigator`、`people_connector`、`systems_orchestrator` → 各 **20**。

---

## 8. 版本与变更

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | — | 12 题初版（已合并进本文 §7 Q1–Q12） |
| 1.1 | 2026-04-10 | 扩展至 30 题；平局规则与 SSOT 说明 |
| 1.2 | 2026-04-10 | 选项映射再平衡（六型各 20 次）；Q30 改为 edge 收尾题；文件路径说明 |
| 1.3 | 2026-04-10 | 新增 Landing 吸引力优化规范（信息层级、文案、验收标准） |
| 1.4 | 2026-04-10 | 新增 Apple-like Hero 规范（全屏大图、单主按钮、信息降噪） |
| 1.5 | 2026-04-10 | 增加 awesome-design-md-main（Apple）参考来源与落地约束 |
| 1.6 | 2026-04-10 | 新增 §2.3 人格测试类落地页 UI 参考（16Personalities 模式）；F9 与实现优先级说明 |

**后续变更流程**：修改题库或类型时，递增文档版本号，并在上表追加一行；代码中的 `QUESTION_VERSION` 或内容哈希应与文档对齐，避免前后端不一致。

---

## 9. 分享模板（英文）

- **通用**：`I got “The ___” on the Work Style Quiz. What’s yours?` + `RESULT_URL`
- **偏 LinkedIn**：`My work style: “The ___”. Curious how you’d show up—take the quiz:` + `RESULT_URL`

---

## 10. 验收标准（与测验相关）

- 30 题全部展示且顺序与 §7 一致（或实现中定义顺序但映射不变）。
- 计分与平局规则与 §5 一致。
- 结果类型仅来自 §4 中的六种 ID。
- 落地页与结果页展示免责声明（§1.3）。

---

*End of PRD*
