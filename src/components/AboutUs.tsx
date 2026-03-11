"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-24 bg-white overflow-hidden" id="about">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-secondary/40 font-bold uppercase tracking-widest text-sm mb-6">About Us</h4>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
                Crafting Inspired <br />
                <span className="text-secondary italic">Spaces</span> for Over <br />
                15 Years
              </h2>
              <p className="text-secondary/60 text-lg leading-relaxed mb-10 max-w-xl">
                Established with a passion for creativity and a commitment to excellence, 
                dbcolors.ng has been transforming spaces since 2009. With a keen eye for 
                detail and a focus on innovation, we strive to exceed our clients' 
                expectations with every project we undertake.
              </p>
              
              <button className="bg-secondary text-primary px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all group active:scale-95">
                Read More <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Image Grid Mockup 2 Inspiration */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative rounded-3xl overflow-hidden mt-12"
            >
              <Image 
                src="/gallery/living-room.png" 
                alt="Interior design process" 
                fill 
                className="object-cover"
              />
            </motion.div>
            
            <div className="flex-1 flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-2/3 relative rounded-3xl overflow-hidden"
              >
                <Image 
                  src="/gallery/kitchen.png" 
                  alt="Modern kitchen design" 
                  fill 
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1/3 relative rounded-3xl overflow-hidden"
              >
                <Image 
                  src="/gallery/bedroom.png" 
                  alt="Luxury bedroom design" 
                  fill 
                  className="object-cover"
                />
              </motion.div>
            </div>
            
            {/* Design detail circle */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center border-8 border-white z-10 hidden md:flex">
              <span className="text-secondary font-black text-2xl">15+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
