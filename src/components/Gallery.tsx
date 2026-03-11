"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const Gallery = () => {
  const projects = [
    {
      name: "Mondrian",
      image: "/gallery/living-room.png",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      name: "Nirnia",
      image: "/gallery/kitchen.png",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      name: "Artex",
      image: "/gallery/bedroom.png",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      name: "Brera",
      image: "/gallery/office.png",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      name: "Alea Pro",
      image: "/gallery/hero-room.jpg",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      name: "Moderno",
      image: "/gallery/living-room.png",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Explore Our Proudly <br />
              <span className="text-secondary italic">Collection</span>
            </motion.h2>
          </div>
          <div className="max-w-md text-right md:text-left">
            <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
              dbcolors.ng will showcase its vision of contemporary architecture, 
              interior design trends, and innovative living solutions for modern homes and offices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-3xl ${project.span}`}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {project.name}
                </h3>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white group-hover:bg-primary group-hover:text-secondary transition-colors duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
