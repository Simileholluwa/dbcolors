"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "start 40%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity: springOpacity,
        scale: springScale,
      }}
      className={`relative group overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] ${project.span}`}
    >
      <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
      
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-black mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            Showcase 0{index + 1}
          </span>
          <h3 className="text-3xl font-bold text-white tracking-tighter leading-none">
            {project.name}
          </h3>
        </div>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 45 }}
          className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 text-white group-hover:bg-primary group-hover:text-secondary group-hover:border-primary transition-all duration-500"
        >
          <ArrowUpRight size={24} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const projects = [
    { name: "Mondrian", image: "/gallery/living-room.png", span: "md:col-span-1 md:row-span-1" },
    { name: "Nirnia", image: "/gallery/kitchen.png", span: "md:col-span-1 md:row-span-2" },
    { name: "Artex", image: "/gallery/bedroom.png", span: "md:col-span-1 md:row-span-1" },
    { name: "Brera", image: "/gallery/office.png", span: "md:col-span-2 md:row-span-1" },
    { name: "Alea Pro", image: "/gallery/hero-room.jpg", span: "md:col-span-1 md:row-span-1" },
    { name: "Moderno", image: "/gallery/living-room.png", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section className="py-16 md:py-24 bg-transparent relative z-10" id="gallery">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-primary text-xs font-black uppercase tracking-[0.5em] mb-4 block">PORTFOLIO</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                Archival <br />
                <span className="text-primary italic opacity-90">Chronicles</span>
              </h2>
            </motion.div>
          </div>
          <div className="max-w-md">
            <p className="text-white/40 text-base md:text-lg leading-relaxed font-medium">
              A curated anthology of architectural excellence, where precision 
              meets unconventional luxury across residential and workspace frontiers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px] md:auto-rows-[450px]">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
