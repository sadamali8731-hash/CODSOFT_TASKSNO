// ---- Data (edit these) ----
const skillGroups = [
  [
    "Data Analytics & Business Intelligence",
    ["Excel", "Python", "SQL", "Power BI", "Tableau"],
  ],
  ["Frontend Development", ["HTML5", "CSS3", "Tailwind CSS", "React.js"]],
  ["Backend Development", ["Node.js", "Express.js"]],
  ["Database", ["MongoDB"]],
]
const coreSkills = [
  "Data Analysis",
  "Data Cleaning & Preparation",
  "Exploratory Data Analysis (EDA)",
  "Statistical Analysis",
  "Data Visualization",
  "Dashboard Development",
  "Reporting & Insights",
  "Database Management",
  "Full-Stack Web Development",
  "Responsive Web Design",
  "REST API Development",
  "CRUD Operations",
  "Problem Solving",
]
const thumbs = {
  a: '<svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice"><rect width="300" height="170" fill="#dfe3ee"/><rect x="14" y="12" width="272" height="170" rx="8" fill="#fff"/><rect x="14" y="12" width="272" height="16" rx="8" fill="#f1f2f7"/><rect x="14" y="20" width="272" height="8" fill="#f1f2f7"/><circle cx="26" cy="20" r="2.5" fill="#f0553c"/><circle cx="34" cy="20" r="2.5" fill="#f5b942"/><circle cx="42" cy="20" r="2.5" fill="#3cb371"/><rect x="14" y="28" width="52" height="154" fill="#14182b"/><text x="22" y="42" font-family="sans-serif" font-size="7" font-weight="700" fill="#fff">Expenses</text><rect x="18" y="50" width="44" height="12" rx="3" fill="#f0553c"/><g font-family="sans-serif" font-size="5.5" fill="#fff"><text x="23" y="58">Dashboard</text></g><g font-family="sans-serif" font-size="5.5" fill="#a3a8c3"><text x="23" y="76">Income</text><text x="23" y="92">Reports</text></g><text x="76" y="44" font-family="sans-serif" font-size="9" font-weight="700" fill="#14182b">Dashboard</text><rect x="76" y="52" width="62" height="30" rx="5" fill="#f6f7fb"/><text x="82" y="63" font-family="sans-serif" font-size="5.5" fill="#6b7090">Balance</text><text x="82" y="76" font-family="sans-serif" font-size="10" font-weight="800" fill="#14182b">$4,820</text><rect x="144" y="52" width="62" height="30" rx="5" fill="#f6f7fb"/><text x="150" y="63" font-family="sans-serif" font-size="5.5" fill="#6b7090">Income</text><text x="150" y="76" font-family="sans-serif" font-size="10" font-weight="800" fill="#188038">$6,300</text><rect x="212" y="52" width="62" height="30" rx="5" fill="#f6f7fb"/><text x="218" y="63" font-family="sans-serif" font-size="5.5" fill="#6b7090">Expenses</text><text x="218" y="76" font-family="sans-serif" font-size="10" font-weight="800" fill="#f0553c">$1,480</text><rect x="76" y="90" width="120" height="76" rx="5" fill="#f6f7fb"/><text x="82" y="100" font-family="sans-serif" font-size="5.5" fill="#6b7090">Spending this month</text><path d="M84 150 L100 138 L116 144 L132 120 L148 128 L164 108 L188 114 L188 156 L84 156Z" fill="#f0553c" opacity=".15"/><polyline points="84,150 100,138 116,144 132,120 148,128 164,108 188,114" fill="none" stroke="#f0553c" stroke-width="2" stroke-linejoin="round"/><rect x="198" y="90" width="78" height="76" rx="5" fill="#f6f7fb"/><circle cx="204" cy="104" r="2.5" fill="#f0553c"/><text x="210" y="106" font-family="sans-serif" font-size="5.5" fill="#14182b">Groceries</text><text x="248" y="106" font-family="sans-serif" font-size="5.5" font-weight="700" fill="#f0553c">-$54</text><circle cx="204" cy="118" r="2.5" fill="#5b8def"/><text x="210" y="120" font-family="sans-serif" font-size="5.5" fill="#14182b">Salary</text><text x="248" y="120" font-family="sans-serif" font-size="5.5" font-weight="700" fill="#188038">+$3,100</text><circle cx="204" cy="132" r="2.5" fill="#f5b942"/><text x="210" y="134" font-family="sans-serif" font-size="5.5" fill="#14182b">Transport</text><text x="248" y="134" font-family="sans-serif" font-size="5.5" font-weight="700" fill="#f0553c">-$18</text><circle cx="204" cy="146" r="2.5" fill="#3cb371"/><text x="210" y="148" font-family="sans-serif" font-size="5.5" fill="#14182b">Freelance</text><text x="248" y="148" font-family="sans-serif" font-size="5.5" font-weight="700" fill="#188038">+$450</text><circle cx="204" cy="160" r="2.5" fill="#f0553c"/><text x="210" y="162" font-family="sans-serif" font-size="5.5" fill="#14182b">Rent</text><text x="248" y="162" font-family="sans-serif" font-size="5.5" font-weight="700" fill="#f0553c">-$620</text></svg>',
  d: '<svg viewBox="0 0 300 170" preserveAspectRatio="xMidYMid slice"><rect width="300" height="170" fill="#e8e4d8"/><rect x="14" y="12" width="272" height="170" rx="8" fill="#fff"/><rect x="14" y="12" width="272" height="16" rx="8" fill="#f1f2f7"/><rect x="14" y="20" width="272" height="8" fill="#f1f2f7"/><circle cx="26" cy="20" r="2.5" fill="#f0553c"/><circle cx="34" cy="20" r="2.5" fill="#f5b942"/><circle cx="42" cy="20" r="2.5" fill="#3cb371"/><rect x="14" y="28" width="52" height="154" fill="#14182b"/><text x="22" y="42" font-family="sans-serif" font-size="7" font-weight="700" fill="#fff">Tasks</text><rect x="18" y="50" width="44" height="12" rx="3" fill="#f0553c"/><g font-family="sans-serif" font-size="5.5" fill="#fff"><text x="23" y="58">My Tasks</text></g><g font-family="sans-serif" font-size="5.5" fill="#a3a8c3"><text x="23" y="76">Today</text><text x="23" y="92">Completed</text></g><text x="76" y="44" font-family="sans-serif" font-size="9" font-weight="700" fill="#14182b">My Tasks</text><rect x="232" y="34" width="44" height="14" rx="4" fill="#f0553c"/><text x="254" y="43.5" text-anchor="middle" font-family="sans-serif" font-size="6.5" font-weight="700" fill="#fff">+ Add task</text><text x="76" y="56" font-family="sans-serif" font-size="5.5" fill="#6b7090">6 of 10 completed</text><rect x="76" y="60" width="200" height="4" rx="2" fill="#e4e1d8"/><rect x="76" y="60" width="120" height="4" rx="2" fill="#f0553c"/><rect x="76" y="70" width="200" height="18" rx="5" fill="#f6f7fb"/><rect x="82" y="75" width="8" height="8" rx="2" fill="#fff" stroke="#b9bdd0"/><text x="96" y="81.5" font-family="sans-serif" font-size="6.5" fill="#14182b">Design landing page</text><rect x="240" y="74.5" width="30" height="9" rx="4.5" fill="#fde1dc"/><text x="255" y="81.0" text-anchor="middle" font-family="sans-serif" font-size="5" font-weight="700" fill="#d9402b">High</text><rect x="76" y="92" width="200" height="18" rx="5" fill="#f6f7fb"/><rect x="82" y="97" width="8" height="8" rx="2" fill="#fff" stroke="#b9bdd0"/><text x="96" y="103.5" font-family="sans-serif" font-size="6.5" fill="#14182b">Fix login bug</text><rect x="240" y="96.5" width="30" height="9" rx="4.5" fill="#fdf0cc"/><text x="255" y="103.0" text-anchor="middle" font-family="sans-serif" font-size="5" font-weight="700" fill="#b7791f">Medium</text><rect x="76" y="114" width="200" height="18" rx="5" fill="#f6f7fb"/><rect x="82" y="119" width="8" height="8" rx="2" fill="#188038"/><path d="M84 123 l2 2 3.5-4" stroke="#fff" stroke-width="1.4" fill="none"/><text x="96" y="125.5" font-family="sans-serif" font-size="6.5" fill="#8a8fa8" text-decoration="line-through">Write project report</text><rect x="240" y="118.5" width="30" height="9" rx="4.5" fill="#dff3e4"/><text x="255" y="125.0" text-anchor="middle" font-family="sans-serif" font-size="5" font-weight="700" fill="#188038">Low</text><rect x="76" y="136" width="200" height="18" rx="5" fill="#f6f7fb"/><rect x="82" y="141" width="8" height="8" rx="2" fill="#188038"/><path d="M84 145 l2 2 3.5-4" stroke="#fff" stroke-width="1.4" fill="none"/><text x="96" y="147.5" font-family="sans-serif" font-size="6.5" fill="#8a8fa8" text-decoration="line-through">Team meeting notes</text><rect x="240" y="140.5" width="30" height="9" rx="4.5" fill="#dff3e4"/><text x="255" y="147.0" text-anchor="middle" font-family="sans-serif" font-size="5" font-weight="700" fill="#188038">Low</text></svg>',
}
const projects = [
  // To use a real screenshot, add img:"images/expense.png" (a file next to this HTML) to a project.
  {
    t: "Expense Tracker",
    d: "Web app to record income and expenses, group spending by category and see where the money goes.",
    s: "Html · Css · Javascript",
    c: "web",
    i: "a",
    img: "",
    demo: "https://sadamali8731-hash.github.io/CODSOFT_TASKSNO/expense%20tracker/",
    code: "#",
  },
  {
    t: "Task Manager",
    d: "Full-stack task manager to create, organize and track tasks by status, with full CRUD operations.",
    s: "Html · Css · Javascript",
    c: "web",
    i: "d",
    img: "",
    demo: "https://sadamali8731-hash.github.io/CODSOFT_TASKSNO/task%20maneger/",
    code: "#",
  },
]

// ---- Render ----
const $ = (s) => document.querySelector(s)
$("#skillList").innerHTML = skillGroups
  .map(
    ([n, l]) =>
      `<div class="sgroup"><h3>${n}</h3><div class="tags">${l.map((x) => `<span>${x}</span>`).join("")}</div></div>`,
  )
  .join("")
$("#coreTags").innerHTML = coreSkills.map((x) => `<span>${x}</span>`).join("")
$("#grid").innerHTML = projects
  .map(
    (p) =>
      `<article class="card reveal" data-c="${p.c}"><div class="thumb">${p.img ? `<img src="${p.img}" alt="${p.t} screenshot">` : thumbs[p.i]}</div><div class="body"><span class="stack">${p.s}</span><h3>${p.t}</h3><p>${p.d}</p><div class="lnk"><a href="${p.demo}" target="_blank" rel="noopener">Live demo →</a><a href="${p.code}" target="_blank" rel="noopener">Source code →</a></div></div></article>`,
  )
  .join("")
$("#yr").textContent = new Date().getFullYear()

// ---- Mobile menu ----
const links = $("#links"),
  burger = $("#burger")
burger.onclick = () => {
  const o = links.classList.toggle("open")
  burger.setAttribute("aria-expanded", o)
  burger.textContent = o ? "✕" : "☰"
}
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open")
    burger.textContent = "☰"
    burger.setAttribute("aria-expanded", false)
  }
})

// ---- Theme ----
const root = document.documentElement,
  tbtn = $("#theme")
let saved = null
try {
  saved = localStorage.getItem("theme")
} catch (e) {}
const setTheme = (t) => {
  root.dataset.theme = t
  tbtn.textContent = t === "dark" ? "☀" : "☾"
}
setTheme(
  saved ||
    (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"),
)
tbtn.onclick = () => {
  const t = root.dataset.theme === "dark" ? "light" : "dark"
  setTheme(t)
  try {
    localStorage.setItem("theme", t)
  } catch (e) {}
}

// ---- Project filters ----
$("#filters")?.addEventListener("click", (e) => {
  const b = e.target.closest("button")
  if (!b) return
  document
    .querySelectorAll("#filters button")
    .forEach((x) => x.classList.toggle("on", x === b))
  document
    .querySelectorAll(".card")
    .forEach((c) =>
      c.classList.toggle(
        "hide",
        b.dataset.f !== "all" && c.dataset.c !== b.dataset.f,
      ),
    )
})

// ---- Reveal, skill bars, counters ----
const countUp = (el) => {
  const end = +el.dataset.count
  let n = 0
  const id = setInterval(() => {
    n++
    el.textContent = n
    if (n >= end) clearInterval(id)
  }, 900 / end)
}
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return
      e.target.classList.add("in")
      e.target
        .querySelectorAll(".bar i")
        .forEach((i) => (i.style.width = i.dataset.w + "%"))
      e.target.querySelectorAll("[data-count]").forEach(countUp)
      io.unobserve(e.target)
    }),
  { threshold: 0.15 },
)
document.querySelectorAll(".reveal").forEach((el) => io.observe(el))

// ---- Active nav link + back to top ----
const secs = [...document.querySelectorAll("main section")],
  navA = [...links.querySelectorAll("a")]
addEventListener(
  "scroll",
  () => {
    const y = scrollY + 120
    let cur = secs[0].id
    secs.forEach((s) => {
      if (s.offsetTop <= y) cur = s.id
    })
    navA.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + cur),
    )
    $("#top").classList.toggle("show", scrollY > 500)
  },
  { passive: true },
)
$("#top").onclick = () => scrollTo({ top: 0, behavior: "smooth" })

// ---- Contact form validation ----
const form = $("#form"),
  status = $("#status")
const rules = {
  name: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  msg: (v) => v.trim().length >= 10,
}
const check = (el) => {
  const ok = rules[el.name](el.value)
  el.parentElement.classList.toggle("err", !ok)
  return ok
}
form
  .querySelectorAll("input,textarea")
  .forEach((el) => el.addEventListener("blur", () => check(el)))
form.querySelectorAll("input,textarea").forEach((el) =>
  el.addEventListener("input", () => {
    if (el.parentElement.classList.contains("err")) check(el)
  }),
)
form.addEventListener("submit", (e) => {
  e.preventDefault()
  status.className = ""
  const ok = [...form.querySelectorAll("input,textarea")]
    .map(check)
    .every(Boolean)
  if (!ok) {
    status.textContent = "Please fix the highlighted fields."
    return
  }
  const d = new FormData(form)
  location.href =
    "mailto:sadamali8731@gmail.com?subject=" +
    encodeURIComponent("Portfolio message from " + d.get("name")) +
    "&body=" +
    encodeURIComponent(
      d.get("msg") + "\n\nFrom: " + d.get("name") + " (" + d.get("email") + ")",
    )
  status.textContent = "Opening your email app to send the message..."
  status.className = "ok"
  form.reset()
})
