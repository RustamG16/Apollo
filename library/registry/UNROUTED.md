# Unrouted skills

These skills are in the library and are projected to their hosts, but have no derivable phase in Apollo's redesign pipeline (decision 13). They are available capabilities, invoked explicitly, and are excluded from `ROUTING-DIGEST.md`'s active table.

Count: 53

## 02-web-build

- `garden-web-design-engineer` - Build or redesign polished browser-rendered visual artifacts with HTML/CSS/JavaScript/React: pages, dashboards, prototypes, slide decks, ani
- `pick-ui-library` - Pick the right library for a given frontend task from a curated, opinionated list — numbers, OTP inputs, charts, command menus, virtualizati
- `prototype` - Build multiple genuinely different versions of a UI piece you describe, rendered behind a visual picker so you can flip through them live an

## 03-motion-3d

- `animate` - Build an animation from scratch, making the decisions in the order that determines whether it feels right — should it animate at all, what p
- `animation-vocabulary` - Reverse-lookup glossary that turns a vague description of a web animation or motion effect into its exact term ("the bouncy thing when a pop
- `find-animation-opportunities` - Search a codebase or UI for places that don't animate but should, and reject everything that shouldn't. Read-only; it proposes motion with e
- `improve-animations` - Survey a codebase's animation and motion code as a senior motion advisor, then produce a prioritized audit and self-contained implementation
- `remotion-best-practices` - Router for all Remotion skills
- `remotion-captions` - Transcribing, displaying and animating captions
- `remotion-create` - Create a new Remotion video
- `remotion-docs` - Search Remotion documentation
- `remotion-interactivity` - Structure Remotion markup for interactivity
- `remotion-maps` - Remotion Map animation knowledge
- `remotion-markup` - Content, animation and effects best practices
- `remotion-multimedia` - Interacting with Mediabunny
- `remotion-render` - Export a Remotion video
- `remotion-saas` - Build an app with Remotion
- `remotion-studio` - Preview a Remotion video
- `remotion-upgrade` - Upgrade Remotion, and related packages
- `review-animations` - Reviews animation and motion code against a high craft bar derived from Emil Kowalski's design engineering philosophy. Default to flagging; 
- `video` - When the user wants to create, generate, or produce video content using AI tools or programmatic frameworks. Also use when the user mentions

## 04-media-generation

- `garden-gpt-image-2` - 面向 GPT Image 2 的图像生成 / 编辑技能。可在 3 种环境下使用：(A) Garden 本地模式，通过 OpenAI 兼容接口直接出图并落盘；(B) Host-Native 模式，把本 Skill 当作提示词工程指引，把渲染好的 prompt 交给宿主 Agent 
- `higgsfield-brandkit` - |
- `higgsfield-generate` - |
- `higgsfield-marketplace-cards` - |
- `higgsfield-product-photoshoot` - |
- `higgsfield-soul-id` - |
- `higgsfield-video-explainer` - |
- `higgsfield-websites` - |
- `higgsfield-youtube-thumbnail` - |
- `image` - When the user wants to create, generate, edit, or optimize images for marketing — blog heroes, social graphics, product mockups, profile ban

## 08-qa-review

- `superpowers-receiving-code-review` - Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable -
- `superpowers-requesting-code-review` - Use when completing tasks, implementing major features, or before merging to verify work meets requirements

## 09-engineering-workflow

- `project-scaffold` - Use at the start of any new project or major feature, before writing implementation code. Creates the context files an AI agent needs — PRD,
- `superpowers-brainstorming` - You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores u
- `superpowers-dispatching-parallel-agents` - Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies
- `superpowers-executing-plans` - Use when you have a written implementation plan to execute in a separate session with review checkpoints
- `superpowers-finishing-a-development-branch` - Use when implementation is complete, all tests pass, and you need to decide how to integrate the work
- `superpowers-subagent-driven-development` - Use when executing implementation plans with independent tasks in the current session
- `superpowers-systematic-debugging` - Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
- `superpowers-test-driven-development` - Use when implementing any feature or bugfix, before writing implementation code
- `superpowers-using-git-worktrees` - Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated wo
- `superpowers-using-superpowers` - Use when starting any conversation - establishes how to find and use skills, requiring skill invocation before ANY response including clarif
- `superpowers-verification-before-completion` - Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and 
- `superpowers-writing-plans` - Use when you have a spec or requirements for a multi-step task, before touching code

## 10-docs-deliverables

- `garden-beautiful-article` - 把用户提供的素材（网页 URL / PDF / DOCX / Markdown / 纯文本 / 截图 / 粘贴材料）编辑、设计成一篇美丽的、可离线打开和分享的**单文件 HTML 网页文章**。基于 reacticle 组件协议：不手写裸 HTML/CSS，而用语义组件 + 受主
- `garden-web-video-presentation` - 把一篇文章或口播稿，做成"看起来像视频"的点击驱动 16:9 网页演示，可选合成口播音频。流程：原始文章 → **一次产出**口播稿 + outline 开发计划 → 用户**一次对齐** 5 件事（稿子 / outline / 主题 / 素材 / 开发模式）→ 网页开发（逐章 

## 11-meta-system

- `apollo-bootstrap` - First-use analysis, audit, and install flow for Apollo_claude in a target project. Detects whether this is a first install or a re-audit, in
- `apollo-cyberpunk-athens-skin` - Regenerate dashboard/css/tokens.cyberpunk-athens.css from the Cyberpunk Athens doctrine's token block, whenever the doctrine file changes. T
- `apollo-dashboard-sync` - The single write path into a project's dashboard state.json. Any agent that starts, updates, blocks, or completes a task calls this skill ra
- `apollo-loadout-sync` - The single write path for a per-agent skill loadout. Activating, saving, or clearing a named setup goes through this skill rather than hand-
- `garden-kb-retriever` - 面向本地知识库目录的检索和问答助手。核心流程：(1)分层索引导航 (2)遇到PDF/Excel时必须先读取references学习处理方法 (3)处理文件后再检索。按文件类型组合使用 grep、Read、pdfplumber、pandas 进行渐进式检索，避免整文件加载。用户问题
- `superpowers-writing-skills` - Use when creating new skills, editing existing skills, or verifying skills work before deployment

