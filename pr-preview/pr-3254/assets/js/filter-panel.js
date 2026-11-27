function initFilterPanel(opts) {
  var toggle = document.getElementById(opts.toggleId);
  var panel = document.getElementById(opts.panelId);
  var closeButton = document.getElementById(opts.closeId);
  if (!toggle || !panel) return;

  var STACK_BREAKPOINT = 770;
  var PANEL_MARGIN = 8;
  var PANEL_VIEWPORT_FILL = 0.7;

  function positionPanel() {
    if (window.innerWidth > STACK_BREAKPOINT) return;
    var vh = window.innerHeight;
    var rect = toggle.getBoundingClientRect();
    panel.style.maxHeight = Math.floor(vh * PANEL_VIEWPORT_FILL) + "px";
    var maxTop = vh - panel.offsetHeight - PANEL_MARGIN;
    var maxLeft = window.innerWidth - panel.offsetWidth - PANEL_MARGIN;
    panel.style.top =
      Math.max(PANEL_MARGIN, Math.min(rect.bottom + PANEL_MARGIN, maxTop)) + "px";
    panel.style.left =
      Math.max(PANEL_MARGIN, Math.min(rect.left, maxLeft)) + "px";
  }

  function resetPanel() {
    panel.style.top = "";
    panel.style.left = "";
    panel.style.maxHeight = "";
  }

  function setOpen(open) {
    var floating = open && window.innerWidth <= STACK_BREAKPOINT;
    panel.classList.toggle("show", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (floating) {
      panel.setAttribute("role", "dialog");
      positionPanel();
      var first = panel.querySelector("input[type='checkbox']");
      if (first) first.focus({ preventScroll: true });
    } else {
      panel.removeAttribute("role");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!panel.classList.contains("show"));
  });

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });
  }

  document.addEventListener("click", function (e) {
    if (!panel.classList.contains("show")) return;
    if (panel.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("show")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > STACK_BREAKPOINT) {
      setOpen(false);
      resetPanel();
    } else if (panel.classList.contains("show")) {
      positionPanel();
    }
  });

  var queued = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!panel.classList.contains("show") || queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        positionPanel();
        queued = false;
      });
    },
    { passive: true }
  );
}