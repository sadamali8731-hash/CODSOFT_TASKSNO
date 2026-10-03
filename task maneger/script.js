;(function () {
  var KEY = "taskflow.tasks.v1",
    THEME = "taskflow.theme"
  var tasks = load(),
    editId = null
  var $ = function (id) {
    return document.getElementById(id)
  }

  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY))
      return Array.isArray(d) ? d : []
    } catch (e) {
      return []
    }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks))
    } catch (e) {}
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  }
  function todayStr() {
    var d = new Date()
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString().slice(0, 10)
  }

  /* theme */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t)
    $("themeBtn").textContent = t === "dark" ? "Light mode" : "Dark mode"
  }
  var saved = null
  try {
    saved = localStorage.getItem(THEME)
  } catch (e) {}
  applyTheme(
    saved ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  )
  $("themeBtn").onclick = function () {
    var next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark"
    applyTheme(next)
    try {
      localStorage.setItem(THEME, next)
    } catch (e) {}
  }

  $("today").textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  /* form */
  function setErr(input, el, msg) {
    el.textContent = msg
    input.setAttribute("aria-invalid", msg ? "true" : "false")
  }
  function validate() {
    var t = $("fTitle").value.trim(),
      ok = true
    if (!t) {
      setErr($("fTitle"), $("eTitle"), "Enter a task name.")
      ok = false
    } else if (t.length < 3) {
      setErr($("fTitle"), $("eTitle"), "Use at least 3 characters.")
      ok = false
    } else if (
      tasks.some(function (x) {
        return (
          x.id !== editId &&
          x.title.toLowerCase() === t.toLowerCase() &&
          !x.done
        )
      })
    ) {
      setErr(
        $("fTitle"),
        $("eTitle"),
        "A pending task with this name already exists.",
      )
      ok = false
    } else setErr($("fTitle"), $("eTitle"), "")
    var d = $("fDue").value
    if (d && d < todayStr() && !editId) {
      setErr($("fDue"), $("eDue"), "Pick today or a later date.")
      ok = false
    } else setErr($("fDue"), $("eDue"), "")
    return ok
  }
  function resetForm() {
    editId = null
    $("form").reset()
    $("fPri").value = "medium"
    $("formTitle").textContent = "Add a task"
    $("saveBtn").textContent = "Add task"
    $("cancelBtn").hidden = true
    setErr($("fTitle"), $("eTitle"), "")
    setErr($("fDue"), $("eDue"), "")
  }
  $("form").onsubmit = function (e) {
    e.preventDefault()
    if (!validate()) return
    var data = {
      title: $("fTitle").value.trim(),
      category: $("fCat").value,
      priority: $("fPri").value,
      due: $("fDue").value,
    }
    if (editId) {
      tasks = tasks.map(function (t) {
        return t.id === editId ? Object.assign({}, t, data) : t
      })
    } else {
      tasks.unshift(
        Object.assign({ id: uid(), done: false, created: Date.now() }, data),
      )
    }
    save()
    resetForm()
    render()
  }
  $("cancelBtn").onclick = resetForm

  /* actions */
  function startEdit(t) {
    editId = t.id
    $("fTitle").value = t.title
    $("fCat").value = t.category
    $("fPri").value = t.priority
    $("fDue").value = t.due || ""
    $("formTitle").textContent = "Edit task"
    $("saveBtn").textContent = "Save changes"
    $("cancelBtn").hidden = false
    $("fTitle").focus()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function remove(t) {
    if (!confirm('Delete "' + t.title + '"?')) return
    tasks = tasks.filter(function (x) {
      return x.id !== t.id
    })
    if (editId === t.id) resetForm()
    save()
    render()
  }
  $("clearDone").onclick = function () {
    var n = tasks.filter(function (t) {
      return t.done
    }).length
    if (
      !n ||
      !confirm("Delete " + n + " completed task" + (n > 1 ? "s" : "") + "?")
    )
      return
    tasks = tasks.filter(function (t) {
      return !t.done
    })
    save()
    render()
  }

  /* render */
  var order = { high: 0, medium: 1, low: 2 }
  function visible() {
    var q = $("q").value.trim().toLowerCase(),
      s = $("fStatus").value,
      c = $("fCategory").value,
      p = $("fPriority").value
    var r = tasks.filter(function (t) {
      return (
        (!q ||
          t.title.toLowerCase().indexOf(q) > -1 ||
          t.category.toLowerCase().indexOf(q) > -1) &&
        (s === "all" || (s === "completed") === t.done) &&
        (c === "all" || t.category === c) &&
        (p === "all" || t.priority === p)
      )
    })
    var by = $("sort").value
    r.sort(function (a, b) {
      if (by === "due") {
        if (!a.due && !b.due) return 0
        if (!a.due) return 1
        if (!b.due) return -1
        return a.due < b.due ? -1 : 1
      }
      if (by === "priority") return order[a.priority] - order[b.priority]
      return b.created - a.created
    })
    return r
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag)
    if (cls) n.className = cls
    if (text != null) n.textContent = text
    return n
  }

  function render() {
    var done = tasks.filter(function (t) {
        return t.done
      }).length,
      total = tasks.length
    $("sTotal").textContent = total
    $("sDone").textContent = done
    $("sPending").textContent = total - done
    var pct = total ? Math.round((done / total) * 100) : 0
    $("barFill").style.width = pct + "%"
    $("bar").setAttribute("aria-valuenow", pct)

    var list = $("list")
    list.textContent = ""
    var rows = visible()
    $("count").textContent = "Showing " + rows.length + " of " + total
    if (!rows.length) {
      list.appendChild(
        el(
          "li",
          "empty",
          total
            ? "No tasks match your search or filters."
            : "No tasks yet. Add your first task above.",
        ),
      )
      return
    }
    var today = todayStr()
    rows.forEach(function (t) {
      var li = el("li", "task p-" + t.priority + (t.done ? " done" : ""))
      var cb = el("input")
      cb.type = "checkbox"
      cb.checked = t.done
      cb.setAttribute(
        "aria-label",
        'Mark "' + t.title + '" as ' + (t.done ? "pending" : "completed"),
      )
      cb.onchange = function () {
        t.done = cb.checked
        save()
        render()
      }
      var body = el("div")
      body.appendChild(el("div", "title", t.title))
      var meta = el("div", "meta")
      meta.appendChild(el("span", "tag", t.category))
      meta.appendChild(
        el(
          "span",
          "tag",
          t.priority.charAt(0).toUpperCase() +
            t.priority.slice(1) +
            " priority",
        ),
      )
      if (t.due) {
        var late = !t.done && t.due < today
        meta.appendChild(
          el(
            "span",
            "tag" + (late ? " overdue" : ""),
            (late ? "Overdue · " : "Due ") +
              new Date(t.due + "T00:00").toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
          ),
        )
      }
      body.appendChild(meta)
      var act = el("div", "row-actions")
      var eb = el("button", null, "Edit")
      eb.onclick = function () {
        startEdit(t)
      }
      var db = el("button", "del", "Delete")
      db.onclick = function () {
        remove(t)
      }
      act.appendChild(eb)
      act.appendChild(db)
      li.appendChild(cb)
      li.appendChild(body)
      li.appendChild(act)
      list.appendChild(li)
    })
  }
  ;["q", "fStatus", "fCategory", "fPriority", "sort"].forEach(function (id) {
    $(id).addEventListener("input", render)
  })
  render()
})()
