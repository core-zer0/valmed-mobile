export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("user-agent") || "";
    
    // Expresión regular para detectar dispositivos móviles comunes
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    let url = new URL(request.url);

    // Si es móvil y estamos en la raíz, redirigimos internamente a mobile.html
    if (isMobile && url.pathname === "/") {
      url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    // Por defecto, sirve el flujo normal (index.html para PC)
    return env.ASSETS.fetch(request);
  },
};