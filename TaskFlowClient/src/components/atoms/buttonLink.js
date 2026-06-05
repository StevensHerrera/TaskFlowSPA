export function buttonLink(href, texto) {
  return `
    <a href="${href}"  class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500" href="${href} ">
    ${texto}
    </a>
    `;
}
