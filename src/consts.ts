// Central place for site-wide values. Edit these and they update everywhere.

export const SITE = {
  /** Your name — shown in the nav logo, footer, and page titles. */
  name: 'Kaan Eskikalci',
  /** Short role/tagline used in the hero and meta description. */
  title: 'Game Designer & Developer',
  tagline: 'Game design, 3D art, and gameplay programming.',
  /** Used for SEO descriptions and social previews. */
  description:
    'Portfolio of Kaan Eskikalci — game designer working across 3D art, level design, and C++/C# development in Unity and Unreal.',
  /** Contact email. */
  email: 'kaaneskikalci@hotmail.com',
};

// Top navigation links. Order here = order in the nav bar.
export const NAV_LINKS = [
  { href: '/art', label: 'Art & Game Design' },
  { href: '/dev', label: 'Development' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Skills grouped for the About page. Edit freely — these render as labelled
// tag groups. Keep them honest and specific.
export const SKILLS = [
  {
    group: 'Art & Game Design',
    items: ['3D Environments', 'Level Design', 'Prop Art', 'Lighting', 'Composition'],
  },
  {
    group: 'Development',
    items: ['C++', 'C#', 'Gameplay Systems', 'AI / Behavior Trees', 'Tools / Editor Scripting'],
  },
  {
    group: 'Software & Engines',
    items: ['Unreal Engine', 'Unity', 'Blender', 'Substance Painter', 'Git'],
  },
];

// External profiles. Leave a url empty ('') to hide that link.
// Fill these in with your real profiles when ready.
export const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/' },
  { label: 'LinkedIn', url: '' },
  { label: 'itch.io', url: '' },
  { label: 'ArtStation', url: '' },
];
