/**
 * Configuración Centralizada de Google AdSense - GrowthMatrix
 */
const ADS_CONFIG = {
  PRODUCTION_MODE: false,
  CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX",
  SLOTS: {
    HEADER_BANNER: "5555555555",
    ARTICLE_INLINE: "6666666666",
    SIDEBAR_STICKY: "7777777777",
    FOOTER_BANNER: "8888888888"
  }
};

function renderAdSenseSlot(elementId, slotType) {
  const container = document.getElementById(elementId);
  if (!container) return;

  if (ADS_CONFIG.PRODUCTION_MODE) {
    container.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="${ADS_CONFIG.CLIENT_ID}"
           data-ad-slot="${ADS_CONFIG.SLOTS[slotType] || ''}"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    `;
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense push error:", e);
    }
  } else {
    container.innerHTML = `
      <div class="ad-placeholder-saas">
        <span class="ad-tag-label">Espacio Publicitario Programático [${slotType}]</span>
        <span style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.3rem;">
          Publicidad contextual y de display gestionada a través de la red certificada de Google AdSense.
        </span>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll("[data-ad-slot]");
  slots.forEach((slot) => {
    const slotType = slot.getAttribute("data-ad-slot");
    renderAdSenseSlot(slot.id, slotType);
  });
});
