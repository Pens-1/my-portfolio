import { useEffect, useRef, useState } from 'react';

interface Work {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  size: 'large' | 'medium' | 'small';
}

const works: Work[] = [
  {
    id: 1,
    title: 'Luxury E-Commerce Platform',
    category: 'Web Development',
    imageUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'large',
  },
  {
    id: 2,
    title: 'Brand Identity System',
    category: 'Design',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Mobile Experience',
    category: 'UI/UX',
    imageUrl: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Portfolio Architecture',
    category: 'Development',
    imageUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'small',
  },
  {
    id: 5,
    title: 'Digital Art Direction',
    category: 'Creative',
    imageUrl: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'large',
  },
  {
    id: 6,
    title: 'Interactive Experience',
    category: 'Frontend',
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
    size: 'medium',
  },
];

const Works = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const workRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    workRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 h-[600px]';
      case 'medium':
        return 'col-span-1 row-span-1 h-[400px]';
      case 'small':
        return 'col-span-1 row-span-1 h-[280px]';
      default:
        return 'col-span-1 row-span-1 h-[400px]';
    }
  };

  return (
    <section id="works" className="min-h-screen bg-black py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-6xl md:text-7xl mb-6">Selected Works</h2>
          <div className="w-24 h-px bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-auto">
          {works.map((work, index) => (
            <div
              key={work.id}
              ref={(el) => (workRefs.current[index] = el)}
              data-index={index}
              className={`group relative overflow-hidden cursor-pointer ${getSizeClasses(
                work.size
              )} ${
                visibleItems.includes(index)
                  ? `slide-up delay-${Math.min(index * 100, 800)}`
                  : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <img
                src={work.imageUrl}
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold text-sm tracking-widest mb-2 uppercase">
                  {work.category}
                </p>
                <h3 className="text-2xl md:text-3xl font-light">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
