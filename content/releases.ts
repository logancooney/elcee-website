export interface Release {
  type: string;
  name: string;
  href: string;
  hrefLabel: string;
  embedSrc: string;
  embedTitle: string;
  embedType: 'spotify' | 'youtube';
  infoBg: string;
  infoBgPosition?: string;
  reversed: boolean;
  minHeight?: number;
}

export const RELEASES: Release[] = [
  {
    type: 'Album · 2024',
    name: 'The Evolution of Self Destruction',
    href: 'https://open.spotify.com/album/7HF3AA4vFQJARAt1ivCn0w',
    hrefLabel: 'Open on Spotify →',
    embedSrc: 'https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator&theme=0',
    embedTitle: 'The Evolution of Self Destruction',
    embedType: 'spotify',
    infoBg: '/teosd-cover.png',
    reversed: false,
    minHeight: 408,
  },
  {
    type: 'Single · 2024',
    name: 'Filthy',
    href: 'https://www.youtube.com/watch?v=K9Bk3Mw7mIc',
    hrefLabel: 'Watch on YouTube →',
    embedSrc: 'https://www.youtube.com/embed/K9Bk3Mw7mIc',
    embedTitle: 'Filthy',
    embedType: 'youtube',
    infoBg: '/filthy-cover.jpg',
    reversed: true,
  },
  {
    type: 'Single · 2023',
    name: '2bad',
    href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7',
    hrefLabel: 'Stream on Spotify →',
    embedSrc: 'https://www.youtube.com/embed/KmekR33sMng',
    embedTitle: '2bad',
    embedType: 'youtube',
    infoBg: '/2bad-cover.png',
    infoBgPosition: 'center 60%',
    reversed: false,
  },
];
