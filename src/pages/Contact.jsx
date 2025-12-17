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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/bufferring7@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Contact from BufferRing Website",
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000); // Increased timeout for better visibility
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="mb-4 text-4xl font-bold text-white">Contact BufferRing</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Have a project idea or want to collaborate? Get in touch!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="mb-6 text-2xl font-bold text-white"
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
                  <div className="flex-shrink-0 mt-1 mr-4 text-gray-400 transition-colors group-hover:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-gray-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 transition-colors group-hover:text-gray-300">{item.content}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="mt-12"
              variants={itemVariants}
            >
              <h3 className="mb-4 text-xl font-semibold text-white">Our Mission</h3>
              <p className="leading-relaxed text-gray-400">
                BufferRing is dedicated to creating innovative open-source solutions that
                empower developers and foster collaboration across the digital globe.
                We believe in transparency, community-driven development, and
                creating tools that make a difference.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Send Message</h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 mb-6 text-green-300 rounded-lg border border-green-500/30 bg-green-500/10"
              >
                Thank you for your message! Please check your email to activate the form endpoint if this is your first time.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

              <div className="relative p-8 rounded-xl backdrop-blur-sm bg-gray-900">
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 w-full text-white bg-gray-800 rounded-lg border border-gray-700 outline-none transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="px-4 py-3 w-full text-white bg-gray-800 rounded-lg border border-gray-700 outline-none transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="px-4 py-3 w-full text-white bg-gray-800 rounded-lg border border-gray-700 outline-none resize-none transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center px-6 py-3 w-full font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="mr-3 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
