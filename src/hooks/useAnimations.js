import { useState, useEffect, useRef } from 'react';

// Hook for countdown timer
export const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

function calculateTimeLeft(targetDate) {
  const difference = targetDate - new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// Hook for mouse position
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

// Hook for intersection observer (scroll animations)
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once) {
          observer.unobserve(element);
        }
      } else if (!options.once) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.once, options.threshold, options.rootMargin]);

  return [ref, isInView];
};

// Hook for scroll position
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Hook for window size
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// Hook for particle canvas
export const useParticles = (canvasRef, options = {}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const blocks = [];
    let animationId;
    let mouseX = null;
    let mouseY = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = (count = 80) => {
      const colors = [
        'rgba(0, 212, 255,',
        'rgba(139, 92, 246,',
        'rgba(0, 255, 136,',
      ];
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const createBlocks = (count = 12) => {
      const colors = ['#5d9e3c', '#4aedd9', '#8b5d3b', '#1e1033', '#ffd700'];
      
      for (let i = 0; i < count; i++) {
        blocks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 12 + 6,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: -Math.random() * 0.4 - 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          opacity: Math.random() * 0.2 + 0.05,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticle = (particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color}${particle.opacity})`;
      ctx.fill();
    };

    const drawBlock = (block) => {
      ctx.save();
      ctx.translate(block.x, block.y);
      ctx.rotate(block.rotation);
      ctx.globalAlpha = block.opacity;
      ctx.fillStyle = block.color;
      ctx.fillRect(-block.size / 2, -block.size / 2, block.size, block.size);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(-block.size / 2, -block.size / 2, block.size, block.size / 3);
      ctx.restore();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const update = () => {
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (mouseX !== null && mouseY !== null) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 80) {
            const force = (80 - distance) / 80;
            p.x += dx * force * 0.02;
            p.y += dy * force * 0.02;
          }
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      blocks.forEach((b) => {
        b.x += b.speedX;
        b.y += b.speedY;
        b.rotation += b.rotationSpeed;

        if (b.y < -b.size) {
          b.y = canvas.height + b.size;
          b.x = Math.random() * canvas.width;
        }
        if (b.x < -b.size) b.x = canvas.width + b.size;
        if (b.x > canvas.width + b.size) b.x = -b.size;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blocks.forEach(drawBlock);
      drawConnections();
      particles.forEach(drawParticle);
      update();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    resize();
    createParticles(options.particleCount || 80);
    createBlocks(options.blockCount || 12);
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef, options.particleCount, options.blockCount]);
};
