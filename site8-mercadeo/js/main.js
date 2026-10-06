/**
 * MercadoEstrategia - Lógica Interactiva
 * Banner RGPD, Acordeones FAQ y Calculadoras de Fijación de Precios y Punto de Equilibrio
 */

document.addEventListener("DOMContentLoaded", () => {
  initCookieConsent();
  initMobileMenu();
  initFaqAccordion();
  initPricingCalculator();
  initBreakEvenCalculator();
});

/* Cookie Consent */
function initCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  if (!banner) return;

  const consent = localStorage.getItem("mercadoestrategia_consent");
  if (!consent) {
    banner.style.display = "block";
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("mercadoestrategia_consent", "accepted");
      banner.style.display = "none";
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem("mercadoestrategia_consent", "essential_only");
      banner.style.display = "none";
    });
  }
}

/* Mobile Nav */
function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav-links");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

/* FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-ed-item");
  items.forEach((item) => {
    const q = item.querySelector(".faq-ed-q");
    if (!q) return;
    q.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

/* Calculadora de Precios: Markup vs Margen Bruto */
function initPricingCalculator() {
  const form = document.getElementById("pricing-calc-form");
  if (!form) return;

  form.addEventListener("input", runPricingCalculation);
  runPricingCalculation();
}

function runPricingCalculation() {
  const cost = parseFloat(document.getElementById("calc-cost")?.value) || 0;
  const targetMargin = parseFloat(document.getElementById("calc-margin-target")?.value) || 0;

  const resPrice = document.getElementById("res-selling-price");
  const resProfit = document.getElementById("res-gross-profit");
  const resMarkup = document.getElementById("res-equiv-markup");
  const resExpl = document.getElementById("res-pricing-expl");

  if (!resPrice) return;

  if (cost <= 0 || targetMargin <= 0 || targetMargin >= 100) {
    resPrice.textContent = "—";
    if (resProfit) resProfit.textContent = "—";
    if (resMarkup) resMarkup.textContent = "—";
    return;
  }

  // Precio de venta = Coste / (1 - MargenDecimal)
  const marginDec = targetMargin / 100;
  const sellingPrice = cost / (1 - marginDec);
  const grossProfit = sellingPrice - cost;
  const markupEquivalent = (grossProfit / cost) * 100;

  resPrice.textContent = "$" + sellingPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (resProfit) {
    resProfit.textContent = "$" + grossProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (resMarkup) {
    resMarkup.textContent = markupEquivalent.toFixed(1) + "%";
  }

  if (resExpl) {
    resExpl.textContent = `Para obtener un margen bruto real del ${targetMargin}%, debes aplicar un Markup de recargo del ${markupEquivalent.toFixed(1)}% sobre tu coste de producción ($${cost.toFixed(2)}).`;
  }
}

/* Calculadora de Punto de Equilibrio (Break-Even Point) */
function initBreakEvenCalculator() {
  const form = document.getElementById("breakeven-calc-form");
  if (!form) return;

  form.addEventListener("input", runBreakEvenCalculation);
  runBreakEvenCalculation();
}

function runBreakEvenCalculation() {
  const fixedCosts = parseFloat(document.getElementById("be-fixed-costs")?.value) || 0;
  const varCost = parseFloat(document.getElementById("be-var-cost")?.value) || 0;
  const unitPrice = parseFloat(document.getElementById("be-unit-price")?.value) || 0;

  const resUnits = document.getElementById("be-res-units");
  const resRevenue = document.getElementById("be-res-revenue");
  const resContrib = document.getElementById("be-res-contrib");
  const resRatio = document.getElementById("be-res-ratio");

  if (!resUnits) return;

  const unitMargin = unitPrice - varCost;
  if (unitMargin <= 0 || unitPrice <= 0 || fixedCosts <= 0) {
    resUnits.textContent = "Inviable (Margen &le; 0)";
    if (resRevenue) resRevenue.textContent = "—";
    if (resContrib) resContrib.textContent = "—";
    if (resRatio) resRatio.textContent = "—";
    return;
  }

  const beUnits = Math.ceil(fixedCosts / unitMargin);
  const beRevenue = beUnits * unitPrice;
  const marginRatio = (unitMargin / unitPrice) * 100;

  resUnits.textContent = beUnits.toLocaleString() + " uds.";
  if (resRevenue) {
    resRevenue.textContent = "$" + beRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (resContrib) {
    resContrib.textContent = "$" + unitMargin.toFixed(2) + " / ud.";
  }
  if (resRatio) {
    resRatio.textContent = marginRatio.toFixed(1) + "%";
  }
}
