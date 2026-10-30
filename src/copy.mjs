import { locales } from "./site.config.mjs"
import { productEn, productZh } from "./product-copy.mjs"

const pageIds = ["home", "product", "services", "about", "contact"]

// `base` is Vite's base, always with a trailing slash. "/" keeps the current root-relative URLs.
export function withBase(base, path) {
  const normalized = !base || base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`
  if (path === "/") return normalized
  return normalized + path.replace(/^\//, "")
}

export function pathsFor(lang, base = "/") {
  const href = (path) => withBase(base, path)
  if (lang === "zh") {
    return {
      home: href("/zh/index.html"),
      product: href("/zh/product.html"),
      about: href("/zh/about.html"),
      services: href("/zh/services.html"),
      contact: href("/zh/contact.html"),
    }
  }
  return {
    home: href("/"),
    product: href("/product.html"),
    about: href("/about.html"),
    services: href("/services.html"),
    contact: href("/contact.html"),
  }
}

export function getCopy(lang, base = "/") {
  const site = locales[lang]
  const copy = lang === "zh" ? zh(site) : en(site)
  return {
    lang,
    base,
    site,
    pageIds,
    paths: pathsFor(lang, base),
    ...copy,
    product: lang === "zh" ? productZh : productEn,
  }
}

function en(site) {
  return {
    skip: "Skip to content",
    langLabel: "Language",
    primaryNav: "Primary",
    footerNav: "Footer",
    menuOpen: "Menu",
    menuClose: "Close",
    roleLine: "Full-process Industrial Simulation Software Experts",
    finePrint: "The contact form on this demonstration does not send or store your message.",
    fontLicense: "IBM Plex license",
    pageTitles: {
      home: `${site.name} — Full-process Industrial Simulation Software Experts`,
      product: `VisionX — ${site.name}`,
      about: `About — ${site.name}`,
      services: `Services — ${site.name}`,
      contact: `Contact — ${site.name}`,
    },
    descriptions: {
      home: "Full-process Industrial Simulation Software Experts. VisionX software sales, consulting, customization, operation training, and after-sales support.",
      product: "VisionX is a digital factory design platform for industrial simulation: scene planning, production flow, simulation, and data review.",
      about: `${site.name} sells VisionX. Work starts with a trial, then diagnosis, solution design, go-live, and after-sales support.`,
      services: "Software sales, consulting, customization, operation training, and after-sales support.",
      contact: `Contact ${site.name} for a trial. This demonstration form does not send or store your message.`,
    },
    nav: {
      home: "Home",
      product: "VisionX",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    home: {
      kicker: "Industrial simulation",
      title: "Full-process Industrial Simulation Software Experts",
      lead: "Centered on VisionX, with software sales, consulting, customization, operation training, and after-sales support from solution through go-live.",
      primary: "Request a trial",
      secondary: "See VisionX",
      roleKicker: "The engagement",
      roleTitle: "Who we work with, and what we provide.",
      whoTitle: "Who we work with",
      who: [
        {
          title: "Manufacturers",
          text: "Teams responsible for warehouse and logistics. The project has to match their actual operation.",
        },
        {
          title: "Third-party logistics",
          text: "Operators running sites for their own clients, often across more than one location.",
        },
        {
          title: "Integration teams",
          text: "Teams connecting warehouse systems who need local support on the project.",
        },
      ],
      whatTitle: "What we provide",
      what: [
        {
          title: "Software sales",
          text: "Quotes, licensing, and the purchase of VisionX.",
        },
        {
          title: "Consulting",
          text: "Requirements research and a diagnosis of the operation.",
        },
        {
          title: "Customization",
          text: "Adjustments shaped by that diagnosis.",
        },
        {
          title: "Operation training",
          text: "Training so the people who use it can run it themselves.",
        },
        {
          title: "After-sales support",
          text: "Continued support once the system is live.",
        },
      ],
      servicesKicker: "Services",
      servicesTitle: "How we help",
      servicesLead: "Five services around the software. The full description is on the services page.",
      details: "Details",
      allServices: "See the full service list",
      processKicker: "Process",
      processTitle: "How a sale proceeds",
      steps: [
        {
          title: "Contact us for a trial",
          text: "Leave your details and we provide a trial version.",
        },
        {
          title: "Requirements research and business diagnosis",
          text: "A specialist team studies the operation and where the problems are.",
        },
        {
          title: "Solution design",
          text: "We design the solution from that diagnosis.",
        },
        {
          title: "Implementation and go-live",
          text: "We carry the solution through implementation and go-live.",
        },
        {
          title: "After-sales and ongoing service",
          text: "Support continues after go-live.",
        },
      ],
      closeTitle: "Start with a trial.",
      closeLead: "Contact us for a trial version. This demonstration keeps the note on the page only.",
      closeAction: "Request a trial",
    },
    about: {
      kicker: "About",
      title: "Full-process Industrial Simulation Software Experts",
      demoNote: "The paragraphs below are still placeholder copy. Replace them when the company history is final.",
      body: [
        `${site.name} provides software sales, consulting, customization, operation training, and after-sales support for VisionX.`,
        "Work starts when you contact us for a trial. A specialist team then does requirements research and business diagnosis, followed by solution design, implementation and go-live, and after-sales and ongoing service.",
      ],
      roleTitle: "What we provide",
      roles: [
        {
          title: "Software sales",
          text: "Quotes, licensing, and the purchase of VisionX.",
        },
        {
          title: "Consulting",
          text: "Requirements research and a diagnosis of the operation.",
        },
        {
          title: "Customization",
          text: "Adjustments shaped by that diagnosis.",
        },
        {
          title: "Operation training",
          text: "Training so the people who use it can run it themselves.",
        },
        {
          title: "After-sales support",
          text: "Continued support once the system is live.",
        },
      ],
      principlesTitle: "How we work",
      principles: [
        {
          title: "Start with a trial",
          text: "The first step is to contact us for a trial version.",
        },
        {
          title: "Diagnose before design",
          text: "The team completes requirements research and business diagnosis before solution design.",
        },
        {
          title: "Scope in writing",
          text: "Customization and implementation scope are written down before work starts.",
        },
        {
          title: "Service after go-live",
          text: "Implementation and go-live are not the end. After-sales and ongoing service continue.",
        },
      ],
      teamTitle: "The seats on an engagement",
      teamNote: "Roles only. Personal names will replace these cards later.",
      team: [
        {
          title: "Sales",
          text: "Owns the trial, the quote, and the software sale.",
        },
        {
          title: "Consulting and solution",
          text: "Owns requirements research, business diagnosis, solution design, and customization.",
        },
        {
          title: "Delivery and after-sales",
          text: "Owns implementation and go-live, operation training, and after-sales support.",
        },
      ],
      cta: "Request a trial",
    },
    services: {
      kicker: "Services",
      title: "What we provide.",
      lead: "Software sales, consulting, customization, operation training, and after-sales support.",
      getsLabel: "What you get",
      items: [
        {
          id: "sales",
          title: "Software sales",
          text: "We sell VisionX and handle the quote, the license, and the purchase.",
          gets: [
            "A path to the trial version",
            "A quote explained in plain language",
            "Licensing options and a procurement contact",
          ],
        },
        {
          id: "consulting",
          title: "Consulting",
          text: "A specialist team studies the site, the process, and the problem, then gives a business diagnosis.",
          gets: [
            "Research on the site and the process",
            "A written business diagnosis",
            "The issues to settle before solution design",
          ],
        },
        {
          id: "customization",
          title: "Customization",
          text: "Adjustments follow the diagnosis, rather than one unchanged package.",
          gets: [
            "Changes tied to the diagnosis",
            "A written customization scope",
            "A solution you can confirm before implementation",
          ],
        },
        {
          id: "training",
          title: "Operation training",
          text: "We train the people who will use the software so they can operate it themselves.",
          gets: [
            "Operation training matched to roles",
            "Coverage of the processes they will actually run",
            "A record of who attended and what was covered",
          ],
        },
        {
          id: "support",
          title: "After-sales support",
          text: "After implementation and go-live, after-sales and ongoing service stay with us.",
          gets: [
            "One place to send questions",
            "Follow-up on questions that are still open",
            "Support that continues after go-live",
          ],
        },
      ],
      engageTitle: "Start with a trial",
      engageText: "Contact us for a trial version. Send your organization and what you need. We use that to arrange the trial and the requirements research.",
      engageAction: "Request a trial",
    },
    contact: {
      kicker: "Contact",
      title: "Contact us for a trial.",
      lead: "This is the first step. We use these details to arrange a trial, then requirements research and business diagnosis.",
      required: "All fields are required.",
      labels: {
        name: "Name",
        organization: "Organization",
        phone: "Phone",
        email: "Email",
        message: "Trial and project needs",
      },
      hints: {
        phone: "Include the country code.",
        message: "A few sentences on the operation, the timing, and the problem you want solved.",
      },
      submit: "Send message",
      messages: {
        summary: "Please correct the highlighted fields.",
        name: "Enter your name.",
        organization: "Enter your organization.",
        phone: "Enter a phone number we can call.",
        email: "Enter a valid email address.",
        message: "Tell us briefly what you need.",
      },
      successTitle: "Recorded on this page only.",
      successBody: `This is a demonstration. Your note was not sent and was not stored. On the live site it will reach ${site.name}.`,
      factsTitle: "Direct contact",
      address: "Address",
      hours: "Hours",
    },
  }
}

function zh(site) {
  return {
    skip: "跳到正文",
    langLabel: "语言",
    primaryNav: "主要",
    footerNav: "页脚",
    menuOpen: "菜单",
    menuClose: "关闭",
    roleLine: "全流程工业仿真软件解决方案专家",
    finePrint: "联系表单仅作演示，不会发送或保存留言。",
    fontLicense: "IBM Plex 字体许可",
    pageTitles: {
      home: `${site.name} — 全流程工业仿真软件解决方案专家`,
      product: `VisionX — ${site.name}`,
      about: `关于 — ${site.name}`,
      services: `服务 — ${site.name}`,
      contact: `联系 — ${site.name}`,
    },
    descriptions: {
      home: "全流程工业仿真软件解决方案专家。围绕 VisionX，提供软件销售、咨询、定制、操作培训与售后。",
      product: "VisionX 是新一代的数字工厂设计平台，能助力您搭建革命性的工业仿真系统。",
      about: `${site.name}销售 VisionX。合作从试用版开始，经过调研诊断、方案设计、实施上线，再到售后与持续服务。`,
      services: "软件销售、咨询服务、定制化、操作培训和售后支持。",
      contact: `联系${site.name}获取试用版。此演示表单不会发送或保存您的留言。`,
    },
    nav: {
      home: "首页",
      product: "VisionX",
      about: "关于",
      services: "服务",
      contact: "联系",
    },
    home: {
      kicker: "工业仿真",
      title: "全流程工业仿真软件解决方案专家",
      titleLines: ["全流程工业仿真", "软件解决方案专家"],
      lead: "围绕 VisionX，提供软件销售、咨询、定制、操作培训与售后，覆盖从方案到上线的全过程。",
      primary: "获取试用版",
      secondary: "了解 VisionX",
      roleKicker: "合作范围",
      roleTitle: "我们与谁合作，以及我们提供什么。",
      whoTitle: "我们与谁合作",
      who: [
        {
          title: "制造企业",
          text: "负责仓储与物流的团队。项目要对齐他们的实际运营。",
        },
        {
          title: "第三方物流",
          text: "为客户运营场地的团队，常常同时涉及不止一处地点。",
        },
        {
          title: "集成团队",
          text: "负责把仓储系统接起来，并需要本地配合的集成团队。",
        },
      ],
      whatTitle: "我们提供什么",
      what: [
        {
          title: "软件销售",
          text: "负责 VisionX 的报价、授权和采购。",
        },
        {
          title: "咨询服务",
          text: "做需求调研，并给出业务诊断。",
        },
        {
          title: "定制化",
          text: "按诊断结果做针对性调整。",
        },
        {
          title: "操作培训",
          text: "让使用人员能够独立操作。",
        },
        {
          title: "售后支持",
          text: "上线之后持续响应。",
        },
      ],
      servicesKicker: "服务",
      servicesTitle: "我们如何协助",
      servicesLead: "围绕软件的五项服务。完整说明在服务页。",
      details: "查看",
      allServices: "查看全部服务",
      processKicker: "流程",
      processTitle: "销售如何推进",
      steps: [
        {
          title: "联系我们获取试用版",
          text: "留下联系方式，我们提供试用版。",
        },
        {
          title: "专业团队进行需求调研和业务诊断",
          text: "了解现场、流程和目标，判断问题在哪里。",
        },
        {
          title: "解决方案设计",
          text: "按诊断结果设计方案。",
        },
        {
          title: "实施上线",
          text: "按方案完成实施并上线。",
        },
        {
          title: "售后与持续服务",
          text: "上线之后继续提供支持。",
        },
      ],
      closeTitle: "从试用版开始。",
      closeLead: "联系我们获取试用版。此演示只把内容留在页面上。",
      closeAction: "获取试用版",
    },
    about: {
      kicker: "关于",
      title: "全流程工业仿真软件解决方案专家",
      demoNote: "以下介绍仍是演示文案。公司沿革确定后，直接替换即可。",
      body: [
        `${site.name}提供 VisionX 的软件销售、咨询服务、定制化、操作培训和售后支持。`,
        "合作从联系我们获取试用版开始，接着由专业团队做需求调研和业务诊断，然后是解决方案设计、实施上线，以及售后与持续服务。",
      ],
      roleTitle: "我们提供的服务",
      roles: [
        {
          title: "软件销售",
          text: "负责 VisionX 的报价、授权和采购。",
        },
        {
          title: "咨询服务",
          text: "做需求调研，并给出业务诊断。",
        },
        {
          title: "定制化",
          text: "按诊断结果做针对性调整。",
        },
        {
          title: "操作培训",
          text: "让使用人员能够独立操作。",
        },
        {
          title: "售后支持",
          text: "上线之后持续响应。",
        },
      ],
      principlesTitle: "我们如何工作",
      principles: [
        {
          title: "从试用开始",
          text: "合作的第一步是联系我们获取试用版。",
        },
        {
          title: "先诊断再设计",
          text: "专业团队先做需求调研和业务诊断，再进入解决方案设计。",
        },
        {
          title: "范围先写下来",
          text: "定制化和实施的范围，在开工前写明。",
        },
        {
          title: "上线之后继续服务",
          text: "实施上线不是结束，售后与持续服务还在。",
        },
      ],
      teamTitle: "一次合作里的职能",
      teamNote: "这里只列职能。人名以后再写上这些位置。",
      team: [
        {
          title: "销售",
          text: "负责试用、报价和软件销售。",
        },
        {
          title: "咨询与方案",
          text: "负责需求调研、业务诊断、解决方案设计和定制化。",
        },
        {
          title: "交付与售后",
          text: "负责实施上线、操作培训和售后支持。",
        },
      ],
      cta: "获取试用版",
    },
    services: {
      kicker: "服务",
      title: "我们提供的服务。",
      lead: "软件销售、咨询服务、定制化、操作培训和售后支持。",
      getsLabel: "您可以得到",
      items: [
        {
          id: "sales",
          title: "软件销售",
          text: "我们销售 VisionX，处理报价、授权和采购。",
          gets: [
            "试用版的获取路径",
            "用平常语言说明的报价",
            "授权方式与采购对接",
          ],
        },
        {
          id: "consulting",
          title: "咨询服务",
          text: "专业团队做需求调研和业务诊断，弄清现场、流程和要解决的问题。",
          gets: [
            "对现场和流程的调研",
            "一份业务诊断",
            "进入方案设计前的问题清单",
          ],
        },
        {
          id: "customization",
          title: "定制化",
          text: "按诊断结果做针对性调整，而不是套用一份不变的方案。",
          gets: [
            "与诊断结论对应的调整项",
            "写明的定制范围",
            "实施前可以确认的方案",
          ],
        },
        {
          id: "training",
          title: "操作培训",
          text: "培训使用人员，让他们能够独立操作。",
          gets: [
            "按角色安排的操作培训",
            "覆盖实际会用到的流程",
            "出席人员与培训内容的记录",
          ],
        },
        {
          id: "support",
          title: "售后支持",
          text: "实施上线之后，售后与持续服务仍由我们负责。",
          gets: [
            "一个统一的售后入口",
            "未关闭问题的跟进",
            "上线之后的持续服务",
          ],
        },
      ],
      engageTitle: "从试用版开始",
      engageText: "联系我们获取试用版。留下单位和需求，我们据此安排试用，并进入需求调研。",
      engageAction: "获取试用版",
    },
    contact: {
      kicker: "联系",
      title: "联系我们获取试用版。",
      lead: "这是销售流程的第一步。留下这些信息，我们据此安排试用，并进入需求调研和业务诊断。",
      required: "各项均为必填。",
      labels: {
        name: "姓名",
        organization: "单位",
        phone: "电话",
        email: "邮箱",
        message: "试用与项目需求",
      },
      hints: {
        phone: "请带国家区号。",
        message: "用几句话说明业务场景、时间和希望解决的问题。",
      },
      submit: "提交",
      messages: {
        summary: "请修正标出的项目。",
        name: "请填写姓名。",
        organization: "请填写单位。",
        phone: "请填写可联系的电话。",
        email: "请填写有效的邮箱。",
        message: "请简要说明您的需求。",
      },
      successTitle: "只留在这一页上。",
      successBody: `这是演示。留言没有发送，也没有保存。正式网站上，它会送达${site.name}。`,
      factsTitle: "直接联系",
      address: "地址",
      hours: "工作时间",
    },
  }
}
