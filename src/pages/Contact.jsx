import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Contact BufferRing</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project idea or want to collaborate? Get in touch!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            data-aos="fade-right"
          >
            <motion.h2 
              className="text-2xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Contact Information
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              {[
                { 
                  icon: <FiMail size={24} />, 
                  title: 'Email', 
                  content: 'contact@bufferring.org',
                  link: 'mailto:contact@bufferring.org' 
                },
                { 
                  icon: <FiGithub size={24} />, 
                  title: 'GitHub', 
                  content: '@BufferRing',
                  link: 'https://github.com/bufferring' 
                },
                { 
                  icon: <FiInstagram size={24} />, 
                  title: 'Instagram', 
                  content: '@BufferRingOrg',
                  link: 'https://instagram.com/bufferringorg' 
                },
                { 
                  icon: <FaTiktok size={24} />, 
                  title: 'TikTok', 
                  content: '@BufferRingOrg',
                  link: 'https://tiktok.com/@bufferringorg' 
                }
              ].map((item, index) => (
                <motion.a 
                  key={index} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1 mr-4 text-gray-400 group-hover:text-gray-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-gray-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.content}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div 
              className="mt-12"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400">
                BufferRing is dedicated to creating innovative open-source solutions that
                empower developers and foster collaboration across the digital cosmos.
                We believe in transparency, community-driven development, and
                creating tools that make a difference.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            data-aos="fade-left"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
            
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-500 text-gray-300 p-4 rounded-lg mb-6"
              >
                Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="gradient-border">
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none text-white"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none text-white resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center w-full"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
