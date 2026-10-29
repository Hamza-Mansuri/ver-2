export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

// Exactly 9 curated perspectives (2 rows of 3 by default = 6, expanding to 3 rows of 3 = 9)
export const gallery: GalleryItem[] = [
  {
    id: '01',
    title: 'Automated filling calibration',
    image: '/assets/gallery/gallery-03.webp',
    srcSet: '/assets/gallery/gallery-03-400.webp 400w, /assets/gallery/gallery-03.webp 1536w',
    alt: 'Manufacturing operators calibrating digital touch panel controls of powder packaging machinery',
    width: 1536,
    height: 1024,
  },
  {
    id: '02',
    title: 'Finished product inspection',
    image: '/assets/gallery/gallery-04.webp',
    srcSet: '/assets/gallery/gallery-04-400.webp 400w, /assets/gallery/gallery-04.webp 1536w',
    alt: 'Quality inspection of manufactured Whey ON premium protein container on the plant floor',
    width: 1536,
    height: 1024,
  },
  {
    id: '03',
    title: 'Precision auger powder dispensing',
    image: '/assets/gallery/gallery-05.webp',
    srcSet: '/assets/gallery/gallery-05-400.webp 400w, /assets/gallery/gallery-05.webp 1536w',
    alt: 'Close-up view of industrial auger nozzle accurately dispensing protein powder into container',
    width: 1536,
    height: 1024,
  },
  {
    id: '04',
    title: 'Vibro sifting & blending line',
    image: '/assets/gallery/gallery-07.webp',
    srcSet: '/assets/gallery/gallery-07-400.webp 400w, /assets/gallery/gallery-07.webp 1536w',
    alt: 'Operators managing stainless steel vibro sifter and octagonal powder blender unit',
    width: 1536,
    height: 1024,
  },
  {
    id: '05',
    title: 'Executive conference & boardroom',
    image: '/assets/gallery/gallery-08.webp',
    srcSet: '/assets/gallery/gallery-08-400.webp 400w, /assets/gallery/gallery-08.webp 1536w',
    alt: 'Modern executive boardroom and client consultation table with ambient lighting',
    width: 1536,
    height: 1024,
  },
  {
    id: '06',
    title: 'High-speed automated packaging line',
    image: '/assets/gallery/gallery-09.webp',
    srcSet: '/assets/gallery/gallery-09-400.webp 400w, /assets/gallery/gallery-09.webp 1536w',
    alt: 'Industrial packaging line conveyor and precision sealing station in manufacturing facility',
    width: 1536,
    height: 1024,
  },
  {
    id: '07',
    title: 'Raw ingredient staging & cleanroom inspection',
    image: '/assets/gallery/gallery-10.webp',
    srcSet: '/assets/gallery/gallery-10-400.webp 400w, /assets/gallery/gallery-10.webp 1536w',
    alt: 'Technicians inspecting incoming active raw nutraceutical ingredients and batch staging containers',
    width: 1536,
    height: 1024,
  },
  {
    id: '08',
    title: 'Sifter charging & inspection',
    image: '/assets/gallery/gallery-11.webp',
    srcSet: '/assets/gallery/gallery-11-400.webp 400w, /assets/gallery/gallery-11.webp 1536w',
    alt: 'Specialists charging powder ingredients into stainless steel vibro sifter',
    width: 1536,
    height: 1024,
  },
  {
    id: '09',
    title: 'Supervised batch packaging',
    image: '/assets/gallery/gallery-15.webp',
    srcSet: '/assets/gallery/gallery-15-400.webp 400w, /assets/gallery/gallery-15.webp 1536w',
    alt: 'Technicians overseeing container fill cycle at the precision powder packaging station',
    width: 1536,
    height: 1024,
  },
];
