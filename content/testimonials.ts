export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export const STUDIO_TESTIMONIALS: Testimonial[] = [
  {
    quote: "I've been working with Elcee for the past year, you won't find a better space to build your craft.",
    author: 'Malaki',
    location: 'Recording client · Salford',
  },
  {
    quote: "Elcee provides not only an exceptional studio environment with everything an artist might need, but he's also an excellent creative partner to bounce ideas off. It's really useful to talk to someone who has direct experience producing music for brands.",
    author: 'Fieves',
    location: 'Recording client · Manchester',
  },
  {
    quote: 'Elcee is a true multi-disciplinary creative and master of his crafts — from creative direction, song-writing, production, mixing and mastering and more.',
    author: 'Ninja Tea',
    location: 'Recording client · Manchester',
  },
];

export const TUTORING_TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Absolutely delighted with the vocal engineering course from Logan. He is great at breaking down complex topics, explaining them in a way I can easily understand. He built a plan around my needs and mapped out how we will get there over the course of the sessions.',
    author: 'Caroline',
    location: 'Tutoring client',
  },
  {
    quote: 'Always very helpful, able to cover all topics and recommend best ways to learn.',
    author: 'Yuting',
    location: 'Tutoring client',
  },
  {
    quote: 'Great teacher — only had a few lessons but already increased to twice a week.',
    author: 'Aaliyah',
    location: 'Tutoring client',
  },
];
