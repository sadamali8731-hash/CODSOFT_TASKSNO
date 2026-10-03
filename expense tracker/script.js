const CATS = {
  expense: [
    "Food",
    "Transport",
    "Rent",
    "Bills",
    "Shopping",
    "Health",
    "Entertainment",
    "Education",
    "Other",
  ],
  income: ["Salary", "Freelance", "Business", "Gift", "Investment", "Other"],
}
const KEY = "expense-tracker-v1"
const $ = (id) => document.getElementById(id)
let txs = [],
  type = "expense",
  editId = null

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(d)) txs = d
  } catch (e) {
    txs = []
  }
}
function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(txs))
  } catch (e) {}
}
const CUR_KEY = "expense-tracker-currency"
let currency = "USD"
try {
  currency = localStorage.getItem(CUR_KEY) || "USD"
} catch (e) {}
const money = (n) => {
  try {
    return n.toLocaleString(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  } catch (e) {
    return n.toFixed(2)
  }
}
const esc = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  )
const today = () => new Date().toISOString().slice(0, 10)

function fillCats() {
  $("category").innerHTML = CATS[type]
    .map((c) => `<option>${c}</option>`)
    .join("")
  const all = [...new Set([...CATS.expense, ...CATS.income])]
  const cur = $("fCat").value || "all"
  $("fCat").innerHTML =
    '<option value="all">All categories</option>' +
    all.map((c) => `<option>${c}</option>`).join("")
  $("fCat").value = all.includes(cur) ? cur : "all"
}
function setType(t) {
  type = t
  document
    .querySelectorAll(".seg button")
    .forEach((b) => b.classList.toggle("on", b.dataset.type === t))
  const keep = $("category").value
  $("category").innerHTML = CATS[t].map((c) => `<option>${c}</option>`).join("")
  if (CATS[t].includes(keep)) $("category").value = keep
}
function resetForm() {
  editId = null
  $("title").value = ""
  $("amount").value = ""
  $("date").value = today()
  $("formTitle").textContent = "Add transaction"
  $("save").textContent = "Add transaction"
  $("cancel").hidden = true
}
function save() {
  const title = $("title").value.trim(),
    amount = parseFloat($("amount").value),
    date = $("date").value
  if (!title) {
    $("title").focus()
    return
  }
  if (!(amount > 0)) {
    $("amount").focus()
    return
  }
  if (!date) {
    $("date").focus()
    return
  }
  const rec = { type, title, amount, category: $("category").value, date }
  if (editId) {
    txs = txs.map((t) => (t.id === editId ? { ...t, ...rec } : t))
  } else
    txs.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      ...rec,
    })
  persist()
  resetForm()
  render()
}
function edit(id) {
  const t = txs.find((x) => x.id === id)
  if (!t) return
  editId = id
  setType(t.type)
  $("title").value = t.title
  $("amount").value = t.amount
  $("category").value = t.category
  $("date").value = t.date
  $("formTitle").textContent = "Edit transaction"
  $("save").textContent = "Save changes"
  $("cancel").hidden = false
  $("title").focus()
  window.scrollTo({ top: 0, behavior: "smooth" })
}
function del(id) {
  if (!confirm("Delete this transaction?")) return
  txs = txs.filter((t) => t.id !== id)
  if (editId === id) resetForm()
  persist()
  render()
}
function render() {
  const inc = txs.filter((t) => t.type === "income"),
    ex = txs.filter((t) => t.type === "expense")
  const ti = inc.reduce((s, t) => s + t.amount, 0),
    te = ex.reduce((s, t) => s + t.amount, 0),
    bal = ti - te
  $("inc").textContent = money(ti)
  $("exp").textContent = money(te)
  $("bal").textContent = money(bal)
  $("bal").className = bal < 0 ? "exp" : ""
  $("incN").textContent =
    inc.length + " transaction" + (inc.length === 1 ? "" : "s")
  $("expN").textContent =
    ex.length + " transaction" + (ex.length === 1 ? "" : "s")
  $("balNote").textContent =
    ti > 0 ? "Spent " + Math.round((te / ti) * 100) + "% of income" : "\u00a0"

  const by = {}
  ex.forEach((t) => (by[t.category] = (by[t.category] || 0) + t.amount))
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1])
  $("top").textContent = rows.length ? rows[0][0] : "—"
  $("topN").textContent = rows.length
    ? Math.round((rows[0][1] / te) * 100) + "% of expenses"
    : "\u00a0"
  $("breakdown").innerHTML = rows.length
    ? rows
        .map(
          ([c, v]) =>
            `<div class="cat"><span>${esc(c)}</span><div class="track"><div class="fill" style="width:${(v / rows[0][1]) * 100}%"></div></div><b>${money(v)}</b></div>`,
        )
        .join("")
    : '<div class="empty">No expenses yet.</div>'

  const ft = $("fType").value,
    fc = $("fCat").value,
    q = $("fSearch").value.trim().toLowerCase()
  const list = txs
    .filter(
      (t) =>
        (ft === "all" || t.type === ft) &&
        (fc === "all" || t.category === fc) &&
        (!q || t.title.toLowerCase().includes(q)),
    )
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
  $("list").innerHTML = list.length
    ? list
        .map((t) => {
          const d = new Date(t.date + "T00:00:00").toLocaleDateString(
            undefined,
            { day: "numeric", month: "short", year: "numeric" },
          )
          const col = t.type === "income" ? "inc" : "exp"
          return `<div class="tx"><div class="dot" style="background:var(--${col === "inc" ? "inc" : "exp"})"></div>
      <div class="info"><b>${esc(t.title)}</b><span>${esc(t.category)} · ${d}</span></div>
      <div class="amt ${col}">${t.type === "income" ? "+" : "−"}${money(t.amount)}</div>
      <div class="acts"><button type="button" data-edit="${t.id}">Edit</button><button type="button" data-del="${t.id}">Delete</button></div></div>`
        })
        .join("")
    : '<div class="empty">No transactions to show.</div>'
}

$("currency").value = currency
$("currency").addEventListener("change", () => {
  currency = $("currency").value
  try {
    localStorage.setItem(CUR_KEY, currency)
  } catch (e) {}
  render()
})
$("export").addEventListener("click", () => {
  if (!txs.length) {
    alert("No transactions to export.")
    return
  }
  const q = (v) => '"' + String(v).replace(/"/g, '""') + '"'
  const rows = [
    ["Date", "Type", "Category", "Description", "Amount (" + currency + ")"],
  ].concat(
    [...txs]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((t) => [t.date, t.type, t.category, t.title, t.amount.toFixed(2)]),
  )
  const blob = new Blob(
    ["\ufeff" + rows.map((r) => r.map(q).join(",")).join("\n")],
    { type: "text/csv;charset=utf-8" },
  )
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "transactions.csv"
  document.body.appendChild(a)
  a.click()
  a.remove()
})
document
  .querySelectorAll(".seg button")
  .forEach((b) => b.addEventListener("click", () => setType(b.dataset.type)))
$("save").addEventListener("click", save)
$("cancel").addEventListener("click", resetForm)
;["fType", "fCat"].forEach((i) => $(i).addEventListener("change", render))
$("fSearch").addEventListener("input", render)
$("list").addEventListener("click", (e) => {
  const b = e.target.closest("button")
  if (!b) return
  if (b.dataset.edit) edit(b.dataset.edit)
  else if (b.dataset.del) del(b.dataset.del)
})
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.matches("#title,#amount,#date")) save()
})
$("theme").addEventListener("click", () => {
  const r = document.documentElement,
    dark = r.dataset.theme
      ? r.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches
  r.dataset.theme = dark ? "light" : "dark"
})

load()
fillCats()
setType("expense")
resetForm()
render()
