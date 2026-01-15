'use client';

import { useEffect, useRef } from 'react';

export function Scene3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system
        const particles: Array<{
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            size: number;
        }> = [];

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 1000,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: Math.random() * 2 + 1,
                size: Math.random() * 2 + 1,
            });
        }

        // Animation loop
        let animationFrameId: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const focalLength = 500;

            particles.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.z -= particle.vz;

                // Reset if particle goes off screen
                if (particle.z <= 0) {
                    particle.z = 1000;
                    particle.x = Math.random() * canvas.width;
                    particle.y = Math.random() * canvas.height;
                }

                // Calculate 3D to 2D projection
                const scale = focalLength / (focalLength + particle.z);
                const x2d = centerX + (particle.x - centerX) * scale;
                const y2d = centerY + (particle.y - centerY) * scale;
                const size2d = particle.size * scale;

                // Draw particle
                ctx.beginPath();
                ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(26, 26, 26, ${0.5 * scale})`;
                ctx.fill();

                // Draw connections
                particles.forEach((other) => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dz = particle.z - other.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < 150) {
                        const scale1 = focalLength / (focalLength + particle.z);
                        const scale2 = focalLength / (focalLength + other.z);
                        const x1 = centerX + (particle.x - centerX) * scale1;
                        const y1 = centerY + (particle.y - centerY) * scale1;
                        const x2 = centerX + (other.x - centerX) * scale2;
                        const y2 = centerY + (other.y - centerY) * scale2;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = `rgba(26, 26, 26, ${(1 - distance / 150) * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'transparent' }}
        />
    );
}
