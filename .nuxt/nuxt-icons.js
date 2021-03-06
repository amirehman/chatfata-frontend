export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64.99190b.png","120x120":"/_nuxt/icons/icon_120.99190b.png","144x144":"/_nuxt/icons/icon_144.99190b.png","152x152":"/_nuxt/icons/icon_152.99190b.png","192x192":"/_nuxt/icons/icon_192.99190b.png","384x384":"/_nuxt/icons/icon_384.99190b.png","512x512":"/_nuxt/icons/icon_512.99190b.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
