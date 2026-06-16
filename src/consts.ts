// Central place for site-wide values. Edit these and they update everywhere.

export const SITE = {
  /** Your name — shown in the nav logo, footer, and page titles. */
  name: 'Kaan Eskikalci',
  /** Short role/tagline used in the hero and meta description. */
  title: 'Game Designer',
  tagline: 'Game Design, Game Development',
  /** Used for SEO descriptions and social previews. */
  description:
    'Portfolio of Kaan Eskikalci — Game designer working across 3D art, level design, and C++/C# development in Unity and Unreal.',
  /** Contact email. */
  email: 'kaaneskikalci@gmail.com',
};

// Top navigation links. Order here = order in the nav bar.
export const NAV_LINKS = [
  { href: '/art', label: 'Art & Game Design' },
  { href: '/dev', label: 'Game Development' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Skills grouped for the About page. Edit freely — these render as labelled
// tag groups. Keep them honest and specific.
export const SKILLS = [
  {
    group: 'Art & Game Design',
    items: ['3D Environments', 'Level Design', 'Lighting', 'Composition'],
  },
  {
    group: 'Game Development',
    items: ['C++', 'C#', 'Gameplay Systems', 'AI / Behavior Trees', 'Tools / Editor Scripting'],
  },
  {
    group: 'Software & Engines',
    items: ['Unreal Engine', 'Unity', 'Blender', 'Adobe Creative Cloud', 'Git', 'AI Tools', 'Microsoft Office'],
  },
];

// External profiles. Leave a url empty ('') to hide that link.
// Fill these in with your real profiles when ready.
export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/kaaneskikalci' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kaaneskikalci/' },
  { label: 'itch.io', url: 'https://kaaneskikalci.itch.io' },
];
