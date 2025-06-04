import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiInstagram, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import TeamCarousel from '../components/TeamCarousel';
import logo from '../img/logo.png';

export default function Home() {
  const containerRef = useRef(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="pt-12">
      <section className="flex overflow-hidden relative items-center min-h-screen">
        <div className="grid gap-12 items-center px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 md:grid-cols-2">
          <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="mb-4 text-4xl font-bold text-white md:text-6xl"
              variants={itemVariants}
            >
              Welcome to <span className="text-gray-300">BufferRing</span>
            </motion.h1>
            <motion.h2 
              className="mb-6 text-2xl font-bold text-gray-300 md:text-4xl"
              variants={itemVariants}
            >
              Collaboration is a Circle
            </motion.h2>
            <motion.p 
              className="mb-8 max-w-lg text-lg text-gray-400"
              variants={itemVariants}
            >
              We build innovative open-source solutions that empower developers
              and create meaningful impact across the globe.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link to="/contact" className="flex items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-950">
                Contact Us <FiArrowRight className="ml-2" />
              </Link>
              <Link to="/projects" className="px-6 py-3 font-medium text-gray-300 rounded-lg border-2 border-gray-700 transition-all duration-300 hover:border-gray-500 hover:text-white">
                Explore Projects
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              variants={itemVariants}
            >
              {[
                { 
                  icon: <FiGithub size={24} />, 
                  url: "https://github.com/bufferring",
                  label: "GitHub"
                },
                { 
                  icon: <FiInstagram size={24} />, 
                  url: "https://instagram.com/bufferringorg",
                  label: "Instagram"
                },
                { 
                  icon: <FaTiktok size={24} />, 
                  url: "https://tiktok.com/@bufferringorg",
                  label: "TikTok"
                },
                { 
                  icon: <FiMail size={24} />, 
                  url: "mailto:contact@bufferring.org",
                  label: "Email"
                }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 transition-colors duration-300 hover:text-white"
                  title={social.label}
                >
                  {social.icon}
                  <span className="ml-2">{social.label}</span>
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex relative justify-center"
          >
            <div className="overflow-hidden relative w-64 h-64 rounded-full border-4 border-gray-800 shadow-2xl md:w-80 md:h-80 float-element">
              <div className="absolute inset-0 bg-gradient-to-br backdrop-blur-sm from-gray-900/20 to-gray-800/20"></div>
              <div className="flex absolute inset-0 justify-center items-center">
                <div className="flex justify-center items-center w-48 h-48 bg-gray-800 rounded-full shadow-2xl">
                  {/* Usar la imagen importada */}
                  <img 
                    src={logo} 
                    alt="BufferRing" 
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="flex absolute inset-0 justify-center items-center">
                  <div className="w-56 h-56 rounded-full border-2 border-gray-500/30 animate-pulse-slow"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white">The Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Meet the factions driving our open-source journey
            </p>
          </motion.div>
          
          <TeamCarousel />
        </div>
      </section>
    </div>
  );
}