// node_modules/@easepick/bundle/dist/index.esm.js
var t = class _t extends Date {
  static parseDateTime(e2, i2 = "YYYY-MM-DD", n2 = "en-US") {
    if (!e2)
      return new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
    if (e2 instanceof _t)
      return e2.toJSDate();
    if (e2 instanceof Date)
      return e2;
    if (/^-?\d{10,}$/.test(String(e2)))
      return new Date(Number(e2));
    if ("string" == typeof e2) {
      const s2 = [];
      let o2 = null;
      for (; null != (o2 = _t.regex.exec(i2)); )
        "\\" !== o2[1] && s2.push(o2);
      if (s2.length) {
        const i3 = { year: null, month: null, shortMonth: null, longMonth: null, day: null, hour: 0, minute: 0, second: 0, ampm: null, value: "" };
        s2[0].index > 0 && (i3.value += ".*?");
        for (const [e3, o4] of Object.entries(s2)) {
          const s3 = Number(e3), { group: a, pattern: r } = _t.formatPatterns(o4[0], n2);
          i3[a] = s3 + 1, i3.value += r, i3.value += ".*?";
        }
        const o3 = new RegExp(`^${i3.value}$`);
        if (o3.test(e2)) {
          const s3 = o3.exec(e2), a = Number(s3[i3.year]);
          let r = null;
          i3.month ? r = Number(s3[i3.month]) - 1 : i3.shortMonth ? r = _t.shortMonths(n2).indexOf(s3[i3.shortMonth]) : i3.longMonth && (r = _t.longMonths(n2).indexOf(s3[i3.longMonth]));
          const c2 = Number(s3[i3.day]) || 1, l = Number(s3[i3.hour]);
          let h = Number.isNaN(l) ? 0 : l;
          const d2 = Number(s3[i3.minute]), p = Number.isNaN(d2) ? 0 : d2, u = Number(s3[i3.second]), g = Number.isNaN(u) ? 0 : u, m = s3[i3.ampm];
          return m && "PM" === m && (h += 12, 24 === h && (h = 0)), new Date(a, r, c2, h, p, g, 0);
        }
      }
    }
    return new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
  }
  static regex = /(\\)?(Y{2,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|A|a)/g;
  static MONTH_JS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  static shortMonths(e2) {
    return _t.MONTH_JS.map((t2) => new Date(2019, t2).toLocaleString(e2, { month: "short" }));
  }
  static longMonths(e2) {
    return _t.MONTH_JS.map((t2) => new Date(2019, t2).toLocaleString(e2, { month: "long" }));
  }
  static formatPatterns(e2, i2) {
    switch (e2) {
      case "YY":
      case "YYYY":
        return { group: "year", pattern: `(\\d{${e2.length}})` };
      case "M":
        return { group: "month", pattern: "(\\d{1,2})" };
      case "MM":
        return { group: "month", pattern: "(\\d{2})" };
      case "MMM":
        return { group: "shortMonth", pattern: `(${_t.shortMonths(i2).join("|")})` };
      case "MMMM":
        return { group: "longMonth", pattern: `(${_t.longMonths(i2).join("|")})` };
      case "D":
        return { group: "day", pattern: "(\\d{1,2})" };
      case "DD":
        return { group: "day", pattern: "(\\d{2})" };
      case "h":
      case "H":
        return { group: "hour", pattern: "(\\d{1,2})" };
      case "hh":
      case "HH":
        return { group: "hour", pattern: "(\\d{2})" };
      case "m":
        return { group: "minute", pattern: "(\\d{1,2})" };
      case "mm":
        return { group: "minute", pattern: "(\\d{2})" };
      case "s":
        return { group: "second", pattern: "(\\d{1,2})" };
      case "ss":
        return { group: "second", pattern: "(\\d{2})" };
      case "a":
      case "A":
        return { group: "ampm", pattern: "(AM|PM|am|pm)" };
    }
  }
  lang;
  constructor(e2 = null, i2 = "YYYY-MM-DD", n2 = "en-US") {
    super(_t.parseDateTime(e2, i2, n2)), this.lang = n2;
  }
  getWeek(t2) {
    const e2 = new Date(this.midnight_ts(this)), i2 = (this.getDay() + (7 - t2)) % 7;
    e2.setDate(e2.getDate() - i2);
    const n2 = e2.getTime();
    return e2.setMonth(0, 1), e2.getDay() !== t2 && e2.setMonth(0, 1 + (4 - e2.getDay() + 7) % 7), 1 + Math.ceil((n2 - e2.getTime()) / 6048e5);
  }
  clone() {
    return new _t(this);
  }
  toJSDate() {
    return new Date(this);
  }
  inArray(t2, e2 = "[]") {
    return t2.some((t3) => t3 instanceof Array ? this.isBetween(t3[0], t3[1], e2) : this.isSame(t3, "day"));
  }
  isBetween(t2, e2, i2 = "()") {
    switch (i2) {
      default:
      case "()":
        return this.midnight_ts(this) > this.midnight_ts(t2) && this.midnight_ts(this) < this.midnight_ts(e2);
      case "[)":
        return this.midnight_ts(this) >= this.midnight_ts(t2) && this.midnight_ts(this) < this.midnight_ts(e2);
      case "(]":
        return this.midnight_ts(this) > this.midnight_ts(t2) && this.midnight_ts(this) <= this.midnight_ts(e2);
      case "[]":
        return this.midnight_ts() >= this.midnight_ts(t2) && this.midnight_ts() <= this.midnight_ts(e2);
    }
  }
  isBefore(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        return new Date(t2.getFullYear(), t2.getMonth(), t2.getDate()).getTime() > new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
      case "month":
      case "months":
        return new Date(t2.getFullYear(), t2.getMonth(), 1).getTime() > new Date(this.getFullYear(), this.getMonth(), 1).getTime();
      case "year":
      case "years":
        return t2.getFullYear() > this.getFullYear();
    }
    throw new Error("isBefore: Invalid unit!");
  }
  isSameOrBefore(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        return new Date(t2.getFullYear(), t2.getMonth(), t2.getDate()).getTime() >= new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime();
      case "month":
      case "months":
        return new Date(t2.getFullYear(), t2.getMonth(), 1).getTime() >= new Date(this.getFullYear(), this.getMonth(), 1).getTime();
    }
    throw new Error("isSameOrBefore: Invalid unit!");
  }
  isAfter(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() > new Date(t2.getFullYear(), t2.getMonth(), t2.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() > new Date(t2.getFullYear(), t2.getMonth(), 1).getTime();
      case "year":
      case "years":
        return this.getFullYear() > t2.getFullYear();
    }
    throw new Error("isAfter: Invalid unit!");
  }
  isSameOrAfter(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() >= new Date(t2.getFullYear(), t2.getMonth(), t2.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() >= new Date(t2.getFullYear(), t2.getMonth(), 1).getTime();
    }
    throw new Error("isSameOrAfter: Invalid unit!");
  }
  isSame(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        return new Date(this.getFullYear(), this.getMonth(), this.getDate()).getTime() === new Date(t2.getFullYear(), t2.getMonth(), t2.getDate()).getTime();
      case "month":
      case "months":
        return new Date(this.getFullYear(), this.getMonth(), 1).getTime() === new Date(t2.getFullYear(), t2.getMonth(), 1).getTime();
    }
    throw new Error("isSame: Invalid unit!");
  }
  add(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        this.setDate(this.getDate() + t2);
        break;
      case "month":
      case "months":
        this.setMonth(this.getMonth() + t2);
    }
    return this;
  }
  subtract(t2, e2 = "days") {
    switch (e2) {
      case "day":
      case "days":
        this.setDate(this.getDate() - t2);
        break;
      case "month":
      case "months":
        this.setMonth(this.getMonth() - t2);
    }
    return this;
  }
  diff(t2, e2 = "days") {
    switch (e2) {
      default:
      case "day":
      case "days":
        return Math.round((this.midnight_ts() - this.midnight_ts(t2)) / 864e5);
      case "month":
      case "months":
        let e3 = 12 * (t2.getFullYear() - this.getFullYear());
        return e3 -= t2.getMonth(), e3 += this.getMonth(), e3;
    }
  }
  format(e2, i2 = "en-US") {
    let n2 = "";
    const s2 = [];
    let o2 = null;
    for (; null != (o2 = _t.regex.exec(e2)); )
      "\\" !== o2[1] && s2.push(o2);
    if (s2.length) {
      s2[0].index > 0 && (n2 += e2.substring(0, s2[0].index));
      for (const [t2, o3] of Object.entries(s2)) {
        const a = Number(t2);
        n2 += this.formatTokens(o3[0], i2), s2[a + 1] && (n2 += e2.substring(o3.index + o3[0].length, s2[a + 1].index)), a === s2.length - 1 && (n2 += e2.substring(o3.index + o3[0].length));
      }
    }
    return n2.replace(/\\/g, "");
  }
  midnight_ts(t2) {
    return t2 ? new Date(t2.getFullYear(), t2.getMonth(), t2.getDate(), 0, 0, 0, 0).getTime() : new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0).getTime();
  }
  formatTokens(e2, i2) {
    switch (e2) {
      case "YY":
        return String(this.getFullYear()).slice(-2);
      case "YYYY":
        return String(this.getFullYear());
      case "M":
        return String(this.getMonth() + 1);
      case "MM":
        return `0${this.getMonth() + 1}`.slice(-2);
      case "MMM":
        return _t.shortMonths(i2)[this.getMonth()];
      case "MMMM":
        return _t.longMonths(i2)[this.getMonth()];
      case "D":
        return String(this.getDate());
      case "DD":
        return `0${this.getDate()}`.slice(-2);
      case "H":
        return String(this.getHours());
      case "HH":
        return `0${this.getHours()}`.slice(-2);
      case "h":
        return String(this.getHours() % 12 || 12);
      case "hh":
        return `0${this.getHours() % 12 || 12}`.slice(-2);
      case "m":
        return String(this.getMinutes());
      case "mm":
        return `0${this.getMinutes()}`.slice(-2);
      case "s":
        return String(this.getSeconds());
      case "ss":
        return `0${this.getSeconds()}`.slice(-2);
      case "a":
        return this.getHours() < 12 || 24 === this.getHours() ? "am" : "pm";
      case "A":
        return this.getHours() < 12 || 24 === this.getHours() ? "AM" : "PM";
      default:
        return "";
    }
  }
};
var e = class {
  picker;
  constructor(t2) {
    this.picker = t2;
  }
  render(e2, i2) {
    e2 || (e2 = new t()), e2.setDate(1), e2.setHours(0, 0, 0, 0), "function" == typeof this[`get${i2}View`] && this[`get${i2}View`](e2);
  }
  getContainerView(t2) {
    this.picker.ui.container.innerHTML = "", this.picker.options.header && this.picker.trigger("render", { date: t2.clone(), view: "Header" }), this.picker.trigger("render", { date: t2.clone(), view: "Main" }), this.picker.options.autoApply || this.picker.trigger("render", { date: t2.clone(), view: "Footer" });
  }
  getHeaderView(t2) {
    const e2 = document.createElement("header");
    this.picker.options.header instanceof HTMLElement && e2.appendChild(this.picker.options.header), "string" == typeof this.picker.options.header && (e2.innerHTML = this.picker.options.header), this.picker.ui.container.appendChild(e2), this.picker.trigger("view", { target: e2, date: t2.clone(), view: "Header" });
  }
  getMainView(t2) {
    const e2 = document.createElement("main");
    this.picker.ui.container.appendChild(e2);
    const i2 = document.createElement("div");
    i2.className = `calendars grid-${this.picker.options.grid}`;
    for (let e3 = 0; e3 < this.picker.options.calendars; e3++) {
      const n2 = document.createElement("div");
      n2.className = "calendar", i2.appendChild(n2);
      const s2 = this.getCalendarHeaderView(t2.clone());
      n2.appendChild(s2), this.picker.trigger("view", { date: t2.clone(), view: "CalendarHeader", index: e3, target: s2 });
      const o2 = this.getCalendarDayNamesView();
      n2.appendChild(o2), this.picker.trigger("view", { date: t2.clone(), view: "CalendarDayNames", index: e3, target: o2 });
      const a = this.getCalendarDaysView(t2.clone());
      n2.appendChild(a), this.picker.trigger("view", { date: t2.clone(), view: "CalendarDays", index: e3, target: a });
      const r = this.getCalendarFooterView(this.picker.options.lang, t2.clone());
      n2.appendChild(r), this.picker.trigger("view", { date: t2.clone(), view: "CalendarFooter", index: e3, target: r }), this.picker.trigger("view", { date: t2.clone(), view: "CalendarItem", index: e3, target: n2 }), t2.add(1, "month");
    }
    e2.appendChild(i2), this.picker.trigger("view", { date: t2.clone(), view: "Calendars", target: i2 }), this.picker.trigger("view", { date: t2.clone(), view: "Main", target: e2 });
  }
  getFooterView(t2) {
    const e2 = document.createElement("footer"), i2 = document.createElement("div");
    i2.className = "footer-buttons";
    const n2 = document.createElement("button");
    n2.className = "cancel-button unit", n2.innerHTML = this.picker.options.locale.cancel, i2.appendChild(n2);
    const s2 = document.createElement("button");
    s2.className = "apply-button unit", s2.innerHTML = this.picker.options.locale.apply, s2.disabled = true, i2.appendChild(s2), e2.appendChild(i2), this.picker.ui.container.appendChild(e2), this.picker.trigger("view", { date: t2, target: e2, view: "Footer" });
  }
  getCalendarHeaderView(t2) {
    const e2 = document.createElement("div");
    e2.className = "header";
    const i2 = document.createElement("div");
    i2.className = "month-name", i2.innerHTML = `<span>${t2.toLocaleString(this.picker.options.lang, { month: "long" })}</span> ${t2.format("YYYY")}`, e2.appendChild(i2);
    const n2 = document.createElement("button");
    n2.className = "previous-button unit", n2.innerHTML = this.picker.options.locale.previousMonth, e2.appendChild(n2);
    const s2 = document.createElement("button");
    return s2.className = "next-button unit", s2.innerHTML = this.picker.options.locale.nextMonth, e2.appendChild(s2), e2;
  }
  getCalendarDayNamesView() {
    const t2 = document.createElement("div");
    t2.className = "daynames-row";
    for (let e2 = 1; e2 <= 7; e2++) {
      const i2 = 3 + this.picker.options.firstDay + e2, n2 = document.createElement("div");
      n2.className = "dayname", n2.innerHTML = new Date(1970, 0, i2, 12, 0, 0, 0).toLocaleString(this.picker.options.lang, { weekday: "short" }), n2.title = new Date(1970, 0, i2, 12, 0, 0, 0).toLocaleString(this.picker.options.lang, { weekday: "long" }), t2.appendChild(n2), this.picker.trigger("view", { dayIdx: i2, view: "CalendarDayName", target: n2 });
    }
    return t2;
  }
  getCalendarDaysView(t2) {
    const e2 = document.createElement("div");
    e2.className = "days-grid";
    const i2 = this.calcOffsetDays(t2, this.picker.options.firstDay), n2 = 32 - new Date(t2.getFullYear(), t2.getMonth(), 32).getDate();
    for (let t3 = 0; t3 < i2; t3++) {
      const t4 = document.createElement("div");
      t4.className = "offset", e2.appendChild(t4);
    }
    for (let i3 = 1; i3 <= n2; i3++) {
      t2.setDate(i3);
      const n3 = this.getCalendarDayView(t2);
      e2.appendChild(n3), this.picker.trigger("view", { date: t2, view: "CalendarDay", target: n3 });
    }
    return e2;
  }
  getCalendarDayView(e2) {
    const i2 = this.picker.options.date ? new t(this.picker.options.date) : null, n2 = new t(), s2 = document.createElement("div");
    return s2.className = "day unit", s2.innerHTML = e2.format("D"), s2.dataset.time = String(e2.getTime()), e2.isSame(n2, "day") && s2.classList.add("today"), [0, 6].includes(e2.getDay()) && s2.classList.add("weekend"), this.picker.datePicked.length ? this.picker.datePicked[0].isSame(e2, "day") && s2.classList.add("selected") : i2 && e2.isSame(i2, "day") && s2.classList.add("selected"), this.picker.trigger("view", { date: e2, view: "CalendarDay", target: s2 }), s2;
  }
  getCalendarFooterView(t2, e2) {
    const i2 = document.createElement("div");
    return i2.className = "footer", i2;
  }
  calcOffsetDays(t2, e2) {
    let i2 = t2.getDay() - e2;
    return i2 < 0 && (i2 += 7), i2;
  }
};
var i = class {
  picker;
  instances = {};
  constructor(t2) {
    this.picker = t2;
  }
  initialize() {
    const t2 = [];
    this.picker.options.plugins.forEach((e2) => {
      "function" == typeof e2 ? t2.push(new e2()) : "string" == typeof e2 && "undefined" != typeof easepick && Object.prototype.hasOwnProperty.call(easepick, e2) ? t2.push(new easepick[e2]()) : console.warn(`easepick: ${e2} not found.`);
    }), t2.sort((t3, e2) => t3.priority > e2.priority ? -1 : t3.priority < e2.priority || t3.dependencies.length > e2.dependencies.length ? 1 : t3.dependencies.length < e2.dependencies.length ? -1 : 0), t2.forEach((t3) => {
      t3.attach(this.picker), this.instances[t3.getName()] = t3;
    });
  }
  getInstance(t2) {
    return this.instances[t2];
  }
  addInstance(t2) {
    if (Object.prototype.hasOwnProperty.call(this.instances, t2))
      console.warn(`easepick: ${t2} already added.`);
    else {
      if ("undefined" != typeof easepick && Object.prototype.hasOwnProperty.call(easepick, t2)) {
        const e2 = new easepick[t2]();
        return e2.attach(this.picker), this.instances[e2.getName()] = e2, e2;
      }
      if ("undefined" !== this.getPluginFn(t2)) {
        const e2 = new (this.getPluginFn(t2))();
        return e2.attach(this.picker), this.instances[e2.getName()] = e2, e2;
      }
      console.warn(`easepick: ${t2} not found.`);
    }
    return null;
  }
  removeInstance(t2) {
    return t2 in this.instances && this.instances[t2].detach(), delete this.instances[t2];
  }
  reloadInstance(t2) {
    return this.removeInstance(t2), this.addInstance(t2);
  }
  getPluginFn(t2) {
    return [...this.picker.options.plugins].filter((e2) => "function" == typeof e2 && new e2().getName() === t2).shift();
  }
};
var n = class {
  Calendar = new e(this);
  PluginManager = new i(this);
  calendars = [];
  datePicked = [];
  cssLoaded = 0;
  binds = { hidePicker: this.hidePicker.bind(this), show: this.show.bind(this) };
  options = { doc: document, css: [], element: null, firstDay: 1, grid: 1, calendars: 1, lang: "en-US", date: null, format: "YYYY-MM-DD", readonly: true, autoApply: true, header: false, inline: false, scrollToDate: true, locale: { nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>', previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>', cancel: "Cancel", apply: "Apply" }, documentClick: this.binds.hidePicker, plugins: [] };
  ui = { container: null, shadowRoot: null, wrapper: null };
  version = "1.2.1";
  constructor(t2) {
    const e2 = { ...this.options.locale, ...t2.locale };
    this.options = { ...this.options, ...t2 }, this.options.locale = e2, this.handleOptions(), this.ui.wrapper = document.createElement("span"), this.ui.wrapper.style.display = "none", this.ui.wrapper.style.position = "absolute", this.ui.wrapper.style.pointerEvents = "none", this.ui.wrapper.className = "easepick-wrapper", this.ui.wrapper.attachShadow({ mode: "open" }), this.ui.shadowRoot = this.ui.wrapper.shadowRoot, this.ui.container = document.createElement("div"), this.ui.container.className = "container", this.options.zIndex && (this.ui.container.style.zIndex = String(this.options.zIndex)), this.options.inline && (this.ui.wrapper.style.position = "relative", this.ui.container.classList.add("inline")), this.ui.shadowRoot.appendChild(this.ui.container), this.options.element.after(this.ui.wrapper), this.handleCSS(), this.options.element.addEventListener("click", this.binds.show), this.on("view", this.onView.bind(this)), this.on("render", this.onRender.bind(this)), this.PluginManager.initialize(), this.parseValues(), "function" == typeof this.options.setup && this.options.setup(this), this.on("click", this.onClick.bind(this));
    const i2 = this.options.scrollToDate ? this.getDate() : null;
    this.renderAll(i2);
  }
  on(t2, e2, i2 = {}) {
    this.ui.container.addEventListener(t2, e2, i2);
  }
  off(t2, e2, i2 = {}) {
    this.ui.container.removeEventListener(t2, e2, i2);
  }
  trigger(t2, e2 = {}) {
    return this.ui.container.dispatchEvent(new CustomEvent(t2, { detail: e2 }));
  }
  destroy() {
    this.options.element.removeEventListener("click", this.binds.show), "function" == typeof this.options.documentClick && document.removeEventListener("click", this.options.documentClick, true), Object.keys(this.PluginManager.instances).forEach((t2) => {
      this.PluginManager.removeInstance(t2);
    }), this.ui.wrapper.remove();
  }
  onRender(t2) {
    const { view: e2, date: i2 } = t2.detail;
    this.Calendar.render(i2, e2);
  }
  onView(t2) {
    const { view: e2, target: i2 } = t2.detail;
    "Footer" === e2 && this.datePicked.length && (i2.querySelector(".apply-button").disabled = false);
  }
  onClickHeaderButton(t2) {
    this.isCalendarHeaderButton(t2) && (t2.classList.contains("next-button") ? this.calendars[0].add(1, "month") : this.calendars[0].subtract(1, "month"), this.renderAll(this.calendars[0]));
  }
  onClickCalendarDay(e2) {
    if (this.isCalendarDay(e2)) {
      const i2 = new t(e2.dataset.time);
      this.options.autoApply ? (this.setDate(i2), this.trigger("select", { date: this.getDate() }), this.hide()) : (this.datePicked[0] = i2, this.trigger("preselect", { date: this.getDate() }), this.renderAll());
    }
  }
  onClickApplyButton(t2) {
    if (this.isApplyButton(t2)) {
      if (this.datePicked[0] instanceof Date) {
        const t3 = this.datePicked[0].clone();
        this.setDate(t3);
      }
      this.hide(), this.trigger("select", { date: this.getDate() });
    }
  }
  onClickCancelButton(t2) {
    this.isCancelButton(t2) && this.hide();
  }
  onClick(t2) {
    const e2 = t2.target;
    if (e2 instanceof HTMLElement) {
      const t3 = e2.closest(".unit");
      if (!(t3 instanceof HTMLElement))
        return;
      this.onClickHeaderButton(t3), this.onClickCalendarDay(t3), this.onClickApplyButton(t3), this.onClickCancelButton(t3);
    }
  }
  isShown() {
    return this.ui.container.classList.contains("inline") || this.ui.container.classList.contains("show");
  }
  show(t2) {
    if (this.isShown())
      return;
    const e2 = t2 && "target" in t2 ? t2.target : this.options.element, { top: i2, left: n2 } = this.adjustPosition(e2);
    this.ui.container.style.top = `${i2}px`, this.ui.container.style.left = `${n2}px`, this.ui.container.classList.add("show"), this.trigger("show", { target: e2 });
  }
  hide() {
    this.ui.container.classList.remove("show"), this.datePicked.length = 0, this.renderAll(), this.trigger("hide");
  }
  setDate(e2) {
    const i2 = new t(e2, this.options.format);
    this.options.date = i2.clone(), this.updateValues(), this.calendars.length && this.renderAll();
  }
  getDate() {
    return this.options.date instanceof t ? this.options.date.clone() : null;
  }
  parseValues() {
    this.options.date ? this.setDate(this.options.date) : this.options.element instanceof HTMLInputElement && this.options.element.value.length && this.setDate(this.options.element.value), this.options.date instanceof Date || (this.options.date = null);
  }
  updateValues() {
    const t2 = this.getDate(), e2 = t2 instanceof Date ? t2.format(this.options.format, this.options.lang) : "", i2 = this.options.element;
    i2 instanceof HTMLInputElement ? i2.value = e2 : i2 instanceof HTMLElement && (i2.innerText = e2);
  }
  hidePicker(t2) {
    let e2 = t2.target, i2 = null;
    e2.shadowRoot && (e2 = t2.composedPath()[0], i2 = e2.getRootNode().host), this.isShown() && i2 !== this.ui.wrapper && e2 !== this.options.element && this.hide();
  }
  renderAll(t2) {
    this.trigger("render", { view: "Container", date: (t2 || this.calendars[0]).clone() });
  }
  isCalendarHeaderButton(t2) {
    return ["previous-button", "next-button"].some((e2) => t2.classList.contains(e2));
  }
  isCalendarDay(t2) {
    return t2.classList.contains("day");
  }
  isApplyButton(t2) {
    return t2.classList.contains("apply-button");
  }
  isCancelButton(t2) {
    return t2.classList.contains("cancel-button");
  }
  gotoDate(e2) {
    const i2 = new t(e2, this.options.format);
    i2.setDate(1), this.calendars[0] = i2.clone(), this.renderAll();
  }
  clear() {
    this.options.date = null, this.datePicked.length = 0, this.updateValues(), this.renderAll(), this.trigger("clear");
  }
  handleOptions() {
    this.options.element instanceof HTMLElement || (this.options.element = this.options.doc.querySelector(this.options.element)), "function" == typeof this.options.documentClick && document.addEventListener("click", this.options.documentClick, true), this.options.element instanceof HTMLInputElement && (this.options.element.readOnly = this.options.readonly), this.options.date ? this.calendars[0] = new t(this.options.date, this.options.format) : this.calendars[0] = new t();
  }
  handleCSS() {
    if (Array.isArray(this.options.css))
      this.options.css.forEach((t2) => {
        const e2 = document.createElement("link");
        e2.href = t2, e2.rel = "stylesheet";
        const i2 = () => {
          this.cssLoaded++, this.cssLoaded === this.options.css.length && (this.ui.wrapper.style.display = "");
        };
        e2.addEventListener("load", i2), e2.addEventListener("error", i2), this.ui.shadowRoot.append(e2);
      });
    else if ("string" == typeof this.options.css) {
      const t2 = document.createElement("style"), e2 = document.createTextNode(this.options.css);
      t2.appendChild(e2), this.ui.shadowRoot.append(t2), this.ui.wrapper.style.display = "";
    } else
      "function" == typeof this.options.css && (this.options.css.call(this, this), this.ui.wrapper.style.display = "");
  }
  adjustPosition(t2) {
    const e2 = t2.getBoundingClientRect(), i2 = this.ui.wrapper.getBoundingClientRect();
    this.ui.container.classList.add("calc");
    const n2 = this.ui.container.getBoundingClientRect();
    this.ui.container.classList.remove("calc");
    let s2 = e2.bottom - i2.bottom, o2 = e2.left - i2.left;
    return "undefined" != typeof window && (window.innerHeight < s2 + n2.height && s2 - n2.height >= 0 && (s2 = e2.top - i2.top - n2.height), window.innerWidth < o2 + n2.width && e2.right - n2.width >= 0 && (o2 = e2.right - i2.right - n2.width)), { left: o2, top: s2 };
  }
};
var s = Object.freeze({ __proto__: null, Core: n, create: n });
var o = class {
  picker;
  options;
  priority = 0;
  dependencies = [];
  attach(t2) {
    const e2 = this.getName(), i2 = { ...this.options };
    this.options = { ...this.options, ...t2.options[e2] || {} };
    for (const n3 of Object.keys(i2))
      if (null !== i2[n3] && "object" == typeof i2[n3] && Object.keys(i2[n3]).length && e2 in t2.options && n3 in t2.options[e2]) {
        const s2 = { ...t2.options[e2][n3] };
        null !== s2 && "object" == typeof s2 && Object.keys(s2).length && Object.keys(s2).every((t3) => Object.keys(i2[n3]).includes(t3)) && (this.options[n3] = { ...i2[n3], ...s2 });
      }
    if (this.picker = t2, this.dependenciesNotFound()) {
      const t3 = this.dependencies.filter((t4) => !this.pluginsAsStringArray().includes(t4));
      return void console.warn(`${this.getName()}: required dependencies (${t3.join(", ")}).`);
    }
    const n2 = this.camelCaseToKebab(this.getName());
    this.picker.ui.container.classList.add(n2), this.onAttach();
  }
  detach() {
    const t2 = this.camelCaseToKebab(this.getName());
    this.picker.ui.container.classList.remove(t2), "function" == typeof this.onDetach && this.onDetach();
  }
  dependenciesNotFound() {
    return this.dependencies.length && !this.dependencies.every((t2) => this.pluginsAsStringArray().includes(t2));
  }
  pluginsAsStringArray() {
    return this.picker.options.plugins.map((t2) => "function" == typeof t2 ? new t2().getName() : t2);
  }
  camelCaseToKebab(t2) {
    return t2.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
  }
};
var c = class extends o {
  tooltipElement;
  triggerElement;
  binds = { setStartDate: this.setStartDate.bind(this), setEndDate: this.setEndDate.bind(this), setDateRange: this.setDateRange.bind(this), getStartDate: this.getStartDate.bind(this), getEndDate: this.getEndDate.bind(this), onView: this.onView.bind(this), onShow: this.onShow.bind(this), onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), onClickCalendarDay: this.onClickCalendarDay.bind(this), onClickApplyButton: this.onClickApplyButton.bind(this), parseValues: this.parseValues.bind(this), updateValues: this.updateValues.bind(this), clear: this.clear.bind(this) };
  options = { elementEnd: null, startDate: null, endDate: null, repick: false, strict: true, delimiter: " - ", tooltip: true, tooltipNumber: (t2) => t2, locale: { zero: "", one: "day", two: "", few: "", many: "", other: "days" }, documentClick: this.hidePicker.bind(this) };
  getName() {
    return "RangePlugin";
  }
  onAttach() {
    this.binds._setStartDate = this.picker.setStartDate, this.binds._setEndDate = this.picker.setEndDate, this.binds._setDateRange = this.picker.setDateRange, this.binds._getStartDate = this.picker.getStartDate, this.binds._getEndDate = this.picker.getEndDate, this.binds._parseValues = this.picker.parseValues, this.binds._updateValues = this.picker.updateValues, this.binds._clear = this.picker.clear, this.binds._onClickCalendarDay = this.picker.onClickCalendarDay, this.binds._onClickApplyButton = this.picker.onClickApplyButton, Object.defineProperties(this.picker, { setStartDate: { configurable: true, value: this.binds.setStartDate }, setEndDate: { configurable: true, value: this.binds.setEndDate }, setDateRange: { configurable: true, value: this.binds.setDateRange }, getStartDate: { configurable: true, value: this.binds.getStartDate }, getEndDate: { configurable: true, value: this.binds.getEndDate }, parseValues: { configurable: true, value: this.binds.parseValues }, updateValues: { configurable: true, value: this.binds.updateValues }, clear: { configurable: true, value: this.binds.clear }, onClickCalendarDay: { configurable: true, value: this.binds.onClickCalendarDay }, onClickApplyButton: { configurable: true, value: this.binds.onClickApplyButton } }), this.options.elementEnd && (this.options.elementEnd instanceof HTMLElement || (this.options.elementEnd = this.picker.options.doc.querySelector(this.options.elementEnd)), this.options.elementEnd instanceof HTMLInputElement && (this.options.elementEnd.readOnly = this.picker.options.readonly), "function" == typeof this.picker.options.documentClick && (document.removeEventListener("click", this.picker.options.documentClick, true), "function" == typeof this.options.documentClick && document.addEventListener("click", this.options.documentClick, true)), this.options.elementEnd.addEventListener("click", this.picker.show.bind(this.picker))), this.options.repick = this.options.repick && this.options.elementEnd instanceof HTMLElement, this.picker.options.date = null, this.picker.on("view", this.binds.onView), this.picker.on("show", this.binds.onShow), this.picker.on("mouseenter", this.binds.onMouseEnter, true), this.picker.on("mouseleave", this.binds.onMouseLeave, true), this.checkIntlPluralLocales();
  }
  onDetach() {
    Object.defineProperties(this.picker, { setStartDate: { configurable: true, value: this.binds._setStartDate }, setEndDate: { configurable: true, value: this.binds._setEndDate }, setDateRange: { configurable: true, value: this.binds._setDateRange }, getStartDate: { configurable: true, value: this.binds._getStartDate }, getEndDate: { configurable: true, value: this.binds._getEndDate }, parseValues: { configurable: true, value: this.binds._parseValues }, updateValues: { configurable: true, value: this.binds._updateValues }, clear: { configurable: true, value: this.binds._clear }, onClickCalendarDay: { configurable: true, value: this.binds._onClickCalendarDay }, onClickApplyButton: { configurable: true, value: this.binds._onClickApplyButton } }), this.picker.off("view", this.binds.onView), this.picker.off("show", this.binds.onShow), this.picker.off("mouseenter", this.binds.onMouseEnter, true), this.picker.off("mouseleave", this.binds.onMouseLeave, true);
  }
  parseValues() {
    if (this.options.startDate || this.options.endDate)
      this.options.strict ? this.options.startDate && this.options.endDate ? this.setDateRange(this.options.startDate, this.options.endDate) : (this.options.startDate = null, this.options.endDate = null) : (this.options.startDate && this.setStartDate(this.options.startDate), this.options.endDate && this.setEndDate(this.options.endDate));
    else if (this.options.elementEnd)
      this.options.strict ? this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length && this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length && this.setDateRange(this.picker.options.element.value, this.options.elementEnd.value) : (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length && this.setStartDate(this.picker.options.element.value), this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length && this.setEndDate(this.options.elementEnd.value));
    else if (this.picker.options.element instanceof HTMLInputElement && this.picker.options.element.value.length) {
      const [t2, e2] = this.picker.options.element.value.split(this.options.delimiter);
      this.options.strict ? t2 && e2 && this.setDateRange(t2, e2) : (t2 && this.setStartDate(t2), e2 && this.setEndDate(e2));
    }
  }
  updateValues() {
    const t2 = this.picker.options.element, e2 = this.options.elementEnd, i2 = this.picker.getStartDate(), n2 = this.picker.getEndDate(), s2 = i2 instanceof Date ? i2.format(this.picker.options.format, this.picker.options.lang) : "", o2 = n2 instanceof Date ? n2.format(this.picker.options.format, this.picker.options.lang) : "";
    if (e2)
      t2 instanceof HTMLInputElement ? t2.value = s2 : t2 instanceof HTMLElement && (t2.innerText = s2), e2 instanceof HTMLInputElement ? e2.value = o2 : e2 instanceof HTMLElement && (e2.innerText = o2);
    else {
      const e3 = `${s2}${s2 || o2 ? this.options.delimiter : ""}${o2}`;
      t2 instanceof HTMLInputElement ? t2.value = e3 : t2 instanceof HTMLElement && (t2.innerText = e3);
    }
  }
  clear() {
    this.options.startDate = null, this.options.endDate = null, this.picker.datePicked.length = 0, this.updateValues(), this.picker.renderAll(), this.picker.trigger("clear");
  }
  onShow(t2) {
    const { target: e2 } = t2.detail;
    this.triggerElement = e2, this.picker.options.scrollToDate && this.getStartDate() instanceof Date && this.picker.gotoDate(this.getStartDate()), this.initializeRepick();
  }
  onView(e2) {
    const { view: i2, target: n2 } = e2.detail;
    if ("Main" === i2 && (this.tooltipElement = document.createElement("span"), this.tooltipElement.className = "range-plugin-tooltip", n2.appendChild(this.tooltipElement)), "CalendarDay" === i2) {
      const e3 = new t(n2.dataset.time), i3 = this.picker.datePicked, s2 = i3.length ? this.picker.datePicked[0] : this.getStartDate(), o2 = i3.length ? this.picker.datePicked[1] : this.getEndDate();
      s2 && s2.isSame(e3, "day") && n2.classList.add("start"), s2 && o2 && (o2.isSame(e3, "day") && n2.classList.add("end"), e3.isBetween(s2, o2) && n2.classList.add("in-range"));
    }
    if ("Footer" === i2) {
      const t2 = 1 === this.picker.datePicked.length && !this.options.strict || 2 === this.picker.datePicked.length;
      n2.querySelector(".apply-button").disabled = !t2;
    }
  }
  hidePicker(t2) {
    let e2 = t2.target, i2 = null;
    e2.shadowRoot && (e2 = t2.composedPath()[0], i2 = e2.getRootNode().host), this.picker.isShown() && i2 !== this.picker.ui.wrapper && e2 !== this.picker.options.element && e2 !== this.options.elementEnd && this.picker.hide();
  }
  setStartDate(e2) {
    const i2 = new t(e2, this.picker.options.format);
    this.options.startDate = i2 ? i2.clone() : null, this.updateValues(), this.picker.renderAll();
  }
  setEndDate(e2) {
    const i2 = new t(e2, this.picker.options.format);
    this.options.endDate = i2 ? i2.clone() : null, this.updateValues(), this.picker.renderAll();
  }
  setDateRange(e2, i2) {
    const n2 = new t(e2, this.picker.options.format), s2 = new t(i2, this.picker.options.format);
    this.options.startDate = n2 ? n2.clone() : null, this.options.endDate = s2 ? s2.clone() : null, this.updateValues(), this.picker.renderAll();
  }
  getStartDate() {
    return this.options.startDate instanceof Date ? this.options.startDate.clone() : null;
  }
  getEndDate() {
    return this.options.endDate instanceof Date ? this.options.endDate.clone() : null;
  }
  onMouseEnter(e2) {
    const i2 = e2.target;
    if (i2 instanceof HTMLElement) {
      this.isContainer(i2) && this.initializeRepick();
      const e3 = i2.closest(".unit");
      if (!(e3 instanceof HTMLElement))
        return;
      if (this.picker.isCalendarDay(e3)) {
        if (1 !== this.picker.datePicked.length)
          return;
        let i3 = this.picker.datePicked[0].clone(), n2 = new t(e3.dataset.time), s2 = false;
        if (i3.isAfter(n2, "day")) {
          const t2 = i3.clone();
          i3 = n2.clone(), n2 = t2.clone(), s2 = true;
        }
        if ([...this.picker.ui.container.querySelectorAll(".day")].forEach((o2) => {
          const a = new t(o2.dataset.time), r = this.picker.Calendar.getCalendarDayView(a);
          a.isBetween(i3, n2) && r.classList.add("in-range"), a.isSame(this.picker.datePicked[0], "day") && (r.classList.add("start"), r.classList.toggle("flipped", s2)), o2 === e3 && (r.classList.add("end"), r.classList.toggle("flipped", s2)), o2.className = r.className;
        }), this.options.tooltip) {
          const t2 = this.options.tooltipNumber(n2.diff(i3, "day") + 1);
          if (t2 > 0) {
            const i4 = new Intl.PluralRules(this.picker.options.lang).select(t2), n3 = `${t2} ${this.options.locale[i4]}`;
            this.showTooltip(e3, n3);
          } else
            this.hideTooltip();
        }
      }
    }
  }
  onMouseLeave(t2) {
    if (this.isContainer(t2.target) && this.options.repick) {
      const t3 = this.getStartDate(), e2 = this.getEndDate();
      t3 && e2 && (this.picker.datePicked.length = 0, this.picker.renderAll());
    }
  }
  onClickCalendarDay(e2) {
    if (this.picker.isCalendarDay(e2)) {
      2 === this.picker.datePicked.length && (this.picker.datePicked.length = 0);
      const i2 = new t(e2.dataset.time);
      if (this.picker.datePicked[this.picker.datePicked.length] = i2, 2 === this.picker.datePicked.length && this.picker.datePicked[0].isAfter(this.picker.datePicked[1])) {
        const t2 = this.picker.datePicked[1].clone();
        this.picker.datePicked[1] = this.picker.datePicked[0].clone(), this.picker.datePicked[0] = t2.clone();
      }
      1 !== this.picker.datePicked.length && this.picker.options.autoApply || this.picker.trigger("preselect", { start: this.picker.datePicked[0] instanceof Date ? this.picker.datePicked[0].clone() : null, end: this.picker.datePicked[1] instanceof Date ? this.picker.datePicked[1].clone() : null }), 1 === this.picker.datePicked.length && (!this.options.strict && this.picker.options.autoApply && (this.picker.options.element === this.triggerElement && this.setStartDate(this.picker.datePicked[0]), this.options.elementEnd === this.triggerElement && this.setEndDate(this.picker.datePicked[0]), this.picker.trigger("select", { start: this.picker.getStartDate(), end: this.picker.getEndDate() })), this.picker.renderAll()), 2 === this.picker.datePicked.length && (this.picker.options.autoApply ? (this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]), this.picker.trigger("select", { start: this.picker.getStartDate(), end: this.picker.getEndDate() }), this.picker.hide()) : (this.hideTooltip(), this.picker.renderAll()));
    }
  }
  onClickApplyButton(t2) {
    this.picker.isApplyButton(t2) && (1 !== this.picker.datePicked.length || this.options.strict || (this.picker.options.element === this.triggerElement && (this.options.endDate = null, this.setStartDate(this.picker.datePicked[0])), this.options.elementEnd === this.triggerElement && (this.options.startDate = null, this.setEndDate(this.picker.datePicked[0]))), 2 === this.picker.datePicked.length && this.setDateRange(this.picker.datePicked[0], this.picker.datePicked[1]), this.picker.trigger("select", { start: this.picker.getStartDate(), end: this.picker.getEndDate() }), this.picker.hide());
  }
  showTooltip(t2, e2) {
    this.tooltipElement.style.visibility = "visible", this.tooltipElement.innerHTML = e2;
    const i2 = this.picker.ui.container.getBoundingClientRect(), n2 = this.tooltipElement.getBoundingClientRect(), s2 = t2.getBoundingClientRect();
    let o2 = s2.top, a = s2.left;
    o2 -= i2.top, a -= i2.left, o2 -= n2.height, a -= n2.width / 2, a += s2.width / 2, this.tooltipElement.style.top = `${o2}px`, this.tooltipElement.style.left = `${a}px`;
  }
  hideTooltip() {
    this.tooltipElement.style.visibility = "hidden";
  }
  checkIntlPluralLocales() {
    if (!this.options.tooltip)
      return;
    const t2 = [.../* @__PURE__ */ new Set([new Intl.PluralRules(this.picker.options.lang).select(0), new Intl.PluralRules(this.picker.options.lang).select(1), new Intl.PluralRules(this.picker.options.lang).select(2), new Intl.PluralRules(this.picker.options.lang).select(6), new Intl.PluralRules(this.picker.options.lang).select(18)])], e2 = Object.keys(this.options.locale);
    t2.every((t3) => e2.includes(t3)) || console.warn(`${this.getName()}: provide locales (${t2.join(", ")}) for correct tooltip text.`);
  }
  initializeRepick() {
    if (!this.options.repick)
      return;
    const t2 = this.getStartDate(), e2 = this.getEndDate();
    e2 && this.triggerElement === this.picker.options.element && (this.picker.datePicked[0] = e2), t2 && this.triggerElement === this.options.elementEnd && (this.picker.datePicked[0] = t2);
  }
  isContainer(t2) {
    return t2 === this.picker.ui.container;
  }
};
var d = class extends o {
  rangePlugin;
  lockPlugin;
  priority = 10;
  binds = { onView: this.onView.bind(this), onColorScheme: this.onColorScheme.bind(this) };
  options = { dropdown: { months: false, years: false, minYear: 1950, maxYear: null }, darkMode: true, locale: { resetButton: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>' } };
  matchMedia;
  getName() {
    return "AmpPlugin";
  }
  onAttach() {
    this.options.darkMode && window && "matchMedia" in window && (this.matchMedia = window.matchMedia("(prefers-color-scheme: dark)"), this.matchMedia.matches && (this.picker.ui.container.dataset.theme = "dark"), this.matchMedia.addEventListener("change", this.binds.onColorScheme)), this.options.weekNumbers && this.picker.ui.container.classList.add("week-numbers"), this.picker.on("view", this.binds.onView);
  }
  onDetach() {
    this.options.darkMode && window && "matchMedia" in window && this.matchMedia.removeEventListener("change", this.binds.onColorScheme), this.picker.ui.container.removeAttribute("data-theme"), this.picker.ui.container.classList.remove("week-numbers"), this.picker.off("view", this.binds.onView);
  }
  onView(t2) {
    this.lockPlugin = this.picker.PluginManager.getInstance("LockPlugin"), this.rangePlugin = this.picker.PluginManager.getInstance("RangePlugin"), this.handleDropdown(t2), this.handleResetButton(t2), this.handleWeekNumbers(t2);
  }
  onColorScheme(t2) {
    const e2 = t2.matches ? "dark" : "light";
    this.picker.ui.container.dataset.theme = e2;
  }
  handleDropdown(e2) {
    const { view: i2, target: n2, date: s2, index: o2 } = e2.detail;
    if ("CalendarHeader" === i2) {
      const e3 = n2.querySelector(".month-name");
      if (this.options.dropdown.months) {
        e3.childNodes[0].remove();
        const i3 = document.createElement("select");
        i3.className = "month-name--select month-name--dropdown";
        for (let e4 = 0; e4 < 12; e4 += 1) {
          const n3 = document.createElement("option"), o3 = new t(new Date(s2.getFullYear(), e4, 2, 0, 0, 0)), a = new t(new Date(s2.getFullYear(), e4, 1, 0, 0, 0));
          n3.value = String(e4), n3.text = o3.toLocaleString(this.picker.options.lang, { month: "long" }), this.lockPlugin && (n3.disabled = this.lockPlugin.options.minDate && a.isBefore(new t(this.lockPlugin.options.minDate), "month") || this.lockPlugin.options.maxDate && a.isAfter(new t(this.lockPlugin.options.maxDate), "month")), n3.selected = a.getMonth() === s2.getMonth(), i3.appendChild(n3);
        }
        i3.addEventListener("change", (t2) => {
          const e4 = t2.target;
          this.picker.calendars[0].setDate(1), this.picker.calendars[0].setMonth(Number(e4.value)), this.picker.renderAll();
        }), e3.prepend(i3);
      }
      if (this.options.dropdown.years) {
        e3.childNodes[1].remove();
        const i3 = document.createElement("select");
        i3.className = "month-name--select";
        const n3 = this.options.dropdown.minYear, o3 = this.options.dropdown.maxYear ? this.options.dropdown.maxYear : (/* @__PURE__ */ new Date()).getFullYear();
        if (s2.getFullYear() > o3) {
          const t2 = document.createElement("option");
          t2.value = String(s2.getFullYear()), t2.text = String(s2.getFullYear()), t2.selected = true, t2.disabled = true, i3.appendChild(t2);
        }
        for (let e4 = o3; e4 >= n3; e4 -= 1) {
          const n4 = document.createElement("option"), o4 = new t(new Date(e4, 0, 1, 0, 0, 0));
          n4.value = String(e4), n4.text = String(e4), this.lockPlugin && (n4.disabled = this.lockPlugin.options.minDate && o4.isBefore(new t(this.lockPlugin.options.minDate), "year") || this.lockPlugin.options.maxDate && o4.isAfter(new t(this.lockPlugin.options.maxDate), "year")), n4.selected = s2.getFullYear() === e4, i3.appendChild(n4);
        }
        if (s2.getFullYear() < n3) {
          const t2 = document.createElement("option");
          t2.value = String(s2.getFullYear()), t2.text = String(s2.getFullYear()), t2.selected = true, t2.disabled = true, i3.appendChild(t2);
        }
        if ("asc" === this.options.dropdown.years) {
          const t2 = Array.prototype.slice.call(i3.childNodes).reverse();
          i3.innerHTML = "", t2.forEach((t3) => {
            t3.innerHTML = t3.value, i3.appendChild(t3);
          });
        }
        i3.addEventListener("change", (t2) => {
          const e4 = t2.target;
          this.picker.calendars[0].setFullYear(Number(e4.value)), this.picker.renderAll();
        }), e3.appendChild(i3);
      }
    }
  }
  handleResetButton(t2) {
    const { view: e2, target: i2 } = t2.detail;
    if ("CalendarHeader" === e2 && this.options.resetButton) {
      const t3 = document.createElement("button");
      t3.className = "reset-button unit", t3.innerHTML = this.options.locale.resetButton, t3.addEventListener("click", (t4) => {
        t4.preventDefault();
        let e3 = true;
        "function" == typeof this.options.resetButton && (e3 = this.options.resetButton.call(this)), e3 && this.picker.clear();
      }), i2.appendChild(t3);
    }
  }
  handleWeekNumbers(e2) {
    if (this.options.weekNumbers) {
      const { view: i2, target: n2 } = e2.detail;
      if ("CalendarDayNames" === i2) {
        const t2 = document.createElement("div");
        t2.className = "wnum-header", t2.innerHTML = "Wk", n2.prepend(t2);
      }
      "CalendarDays" === i2 && [...n2.children].forEach((e3, i3) => {
        if (0 === i3 || i3 % 7 == 0) {
          let i4;
          if (e3.classList.contains("day"))
            i4 = new t(e3.dataset.time);
          else {
            const e4 = n2.querySelector(".day");
            i4 = new t(e4.dataset.time);
          }
          let s2 = i4.getWeek(this.picker.options.firstDay);
          53 === s2 && 0 === i4.getMonth() && (s2 = "53/1");
          const o2 = document.createElement("div");
          o2.className = "wnum-item", o2.innerHTML = String(s2), n2.insertBefore(o2, e3);
        }
      });
    }
  }
};

// Scripts/picker.ts
async function createPicker(options, endDateDiv, dotNetRef) {
  let isRangeEnabled = false;
  if (options.plugins.length > 0) {
    options.plugins = options.plugins.map((plugin) => {
      switch (plugin) {
        case "RangePlugin":
          isRangeEnabled = true;
          if (endDateDiv) {
            options.RangePlugin.elementEnd = endDateDiv;
          }
          return c;
        case "AmpPlugin":
          if (options.AmpPlugin.dropdown.yearsAscending) {
            options.AmpPlugin.dropdown.years = "asc";
          }
          return d;
      }
    });
  }
  const picker = new s.create(options);
  picker.on("select", async (e2) => {
    if (isRangeEnabled) {
      await dotNetRef.invokeMethodAsync("OnDateRangeSelected", e2.detail.start, e2.detail.end);
    } else {
      await dotNetRef.invokeMethodAsync("OnDateSelected", e2.detail.date);
    }
  });
  return picker;
}
export {
  createPicker
};
//# sourceMappingURL=picker.js.map
