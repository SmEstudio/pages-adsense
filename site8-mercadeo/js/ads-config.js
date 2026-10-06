/**
 * Configuración Centralizada de Google AdSense - MercadoEstrategia
 */
const ADS_CONFIG = {
  PRODUCTION_MODE: false,
  CLIENT_ID: "ca-pub-XXXXXXXXXXXXXXXX",
  SLOTS: {
    HEADER_BANNER: "9999999999",
    ARTICLE_INLINE: "1010101010",
    SIDEBAR_STICKY: "1212121212",
    FOOTER_BANNER: "1313131313"
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
      <div class="ad-placeholder-editorial">
        <span class="ad-label-ed">Publicidad Editorial Patrocinada [${slotType}]</span>
        <span style="font-size: 0.8rem; color: #78716c; font-family: Georgia, serif; font-style: italic;">
          Inserción publicitaria gestionada por la red certificada de Google AdSense
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
