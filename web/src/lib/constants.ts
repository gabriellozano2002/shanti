/** Configuración global del sitio. Valores con TODO: confirmar con el cliente. */

export const SITE = {
  name: "Shanti Essence",
  slogan: "Conecta con tu esencia",
  description:
    "Aceites esenciales 100% naturales para transformar tus rituales diarios en momentos de calma y bienestar.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const CONTACT = {
  // WhatsApp en formato internacional sin "+" (52 + número de 10 dígitos). +52 81 8187 6423
  whatsapp: "528181876423",
  whatsappMessage: "¡Hola! Me gustaría conocer más sobre Shanti Essence.",
  instagram: "https://www.instagram.com/shantiessence.aceites.mx",
  instagramHandle: "@shantiessence.aceites.mx",
} as const;

export const CURRENCY = "MXN" as const;

/** Estados de México para el selector de dirección de envío. */
export const MX_STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;

/** Navegación principal. */
export const NAV_LINKS = [
  { href: "/productos", label: "Tienda" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
