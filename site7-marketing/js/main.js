/**
 * GrowthMatrix - Lógica Interactiva
 * Banner RGPD, Acordeones FAQ y Calculadoras de Performance / Unit Economics
 */

document.addEventListener("DOMContentLoaded", () => {
  initCookieConsent();
  initMobileMenu();
  initFaqAccordion();
  initGrowthCalculator();
  initFunnelCalculator();
});

/* Cookie Consent */
function initCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");

  if (!banner) return;

  const consent = localStorage.getItem("growthmatrix_consent");
  if (!consent) {
    banner.style.display = "block";
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("growthmatrix_consent", "accepted");
      banner.style.display = "none";
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem("growthmatrix_consent", "essential_only");
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
  const items = document.querySelectorAll(".faq-item-saas");
  items.forEach((item) => {
    const q = item.querySelector(".faq-q-saas");
    if (!q) return;
    q.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

/* Calculadora de Unit Economics & ROAS */
function initGrowthCalculator() {
  const form = document.getElementById("growth-calc-form");
  if (!form) return;

  form.addEventListener("input", runGrowthCalculation);
  runGrowthCalculation();
}

function runGrowthCalculation() {
  const spend = parseFloat(document.getElementById("calc-spend")?.value) || 0;
  const revenue = parseFloat(document.getElementById("calc-revenue")?.value) || 0;
  const customers = parseInt(document.getElementById("calc-customers")?.value) || 1;
  const marginPct = parseFloat(document.getElementById("calc-margin")?.value) || 0;
  const aov = parseFloat(document.getElementById("calc-aov")?.value) || 0;
  const repeatPurchases = parseFloat(document.getElementById("calc-repeats")?.value) || 1;

  const resRoas = document.getElementById("res-roas");
  const resRoi = document.getElementById("res-roi");
  const resCac = document.getElementById("res-cac");
  const resLtv = document.getElementById("res-ltv");
  const resRatio = document.getElementById("res-ratio");
  const resBeRoas = document.getElementById("res-be-roas");
  const resDiagnosis = document.getElementById("res-diagnosis");

  if (!resRoas) return;

  // ROAS
  const roas = spend > 0 ? (revenue / spend) : 0;
  resRoas.textContent = roas.toFixed(2) + "x";

  // Break-even ROAS = 1 / margin decimal
  const marginDecimal = marginPct / 100;
  const beRoas = marginDecimal > 0 ? (1 / marginDecimal) : 0;
  if (resBeRoas) resBeRoas.textContent = beRoas.toFixed(2) + "x";

  // ROI Neto (%) = ((Revenue * margin) - Spend) / Spend * 100
  const grossProfit = revenue * marginDecimal;
  const netProfit = grossProfit - spend;
  const roi = spend > 0 ? ((netProfit / spend) * 100) : 0;
  if (resRoi) {
    resRoi.textContent = (roi > 0 ? "+" : "") + roi.toFixed(1) + "%";
    resRoi.className = "m-value " + (roi >= 0 ? "success" : "danger");
  }

  // CAC = Spend / Customers
  const cac = customers > 0 ? (spend / customers) : 0;
  if (resCac) resCac.textContent = "$" + cac.toFixed(2);

  // LTV = AOV * marginDecimal * repeatPurchases
  const ltv = aov * marginDecimal * repeatPurchases;
  if (resLtv) resLtv.textContent = "$" + ltv.toFixed(2);

  // Ratio LTV:CAC
  const ratio = cac > 0 ? (ltv / cac) : 0;
  if (resRatio) {
    resRatio.textContent = ratio.toFixed(2) + " : 1";
  }

  // Diagnóstico
  if (resDiagnosis) {
    if (ratio >= 3.0) {
      resDiagnosis.innerHTML = `<strong style="color: #10b981;">&check; Salud Financiera Excelente (LTV:CAC &gt; 3:1):</strong> Tienes margen suficiente para escalar agresivamente el presupuesto en Meta Ads y Google Ads sin comprometer el flujo de caja.`;
    } else if (ratio >= 1.5) {
      resDiagnosis.innerHTML = `<strong style="color: #f59e0b;">&excl; Zona de Equilibrio Ajustada (1.5:1 - 3:1):</strong> Tu adquisición es rentable a nivel unitario, pero los costes operativos o retrasos en recompras pueden tensionar la tesorería.`;
    } else {
      resDiagnosis.innerHTML = `<strong style="color: #ef4444;">&cross; Adquisición Deficitaria (LTV:CAC &lt; 1.5:1):</strong> Estás perdiendo dinero por cada cliente nuevo adquirido. Necesitas optimizar el CTR de los anuncios, aumentar el ticket medio (AOV) o mejorar la retención.`;
    }
  }
}

/* Calculadora de Embudo de Conversión (Funnel) */
function initFunnelCalculator() {
  const form = document.getElementById("funnel-calc-form");
  if (!form) return;

  form.addEventListener("input", runFunnelCalculation);
  runFunnelCalculation();
}

function runFunnelCalculation() {
  const impressions = parseInt(document.getElementById("funnel-impr")?.value) || 0;
  const ctr = parseFloat(document.getElementById("funnel-ctr")?.value) || 0;
  const leadCr = parseFloat(document.getElementById("funnel-lead-cr")?.value) || 0;
  const saleCr = parseFloat(document.getElementById("funnel-sale-cr")?.value) || 0;
  const aov = parseFloat(document.getElementById("funnel-aov")?.value) || 0;

  const resClicks = document.getElementById("funnel-res-clicks");
  const resLeads = document.getElementById("funnel-res-leads");
  const resSales = document.getElementById("funnel-res-sales");
  const resRev = document.getElementById("funnel-res-rev");

  if (!resClicks) return;

  const clicks = Math.round(impressions * (ctr / 100));
  const leads = Math.round(clicks * (leadCr / 100));
  const sales = Math.round(leads * (saleCr / 100));
  const totalRev = sales * aov;

  resClicks.textContent = clicks.toLocaleString();
  if (resLeads) resLeads.textContent = leads.toLocaleString();
  if (resSales) resSales.textContent = sales.toLocaleString();
  if (resRev) resRev.textContent = "$" + totalRev.toLocaleString("en-US", { minimumFractionDigits: 2 });
}
