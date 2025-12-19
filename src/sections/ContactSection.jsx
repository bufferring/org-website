import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMail, FiGithub, FiInstagram } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import useSectionObserver from '../hooks/useSectionObserver';
import { submitContactForm } from '../utils/formSubmit';

const contactItems = [
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
];

export default function ContactSection({ id }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  useSectionObserver(id, sectionRef);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const ok = await submitContactForm(formData);
      if (ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            staggerChildren: 0.12,
          },
        },
      };

  const itemVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: 'easeOut' },
        },
      };

  return (
    <section id={id} ref={sectionRef} className="relative pt-24 pb-32">
      <div className="relative z-10 px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="mb-4 text-4xl font-bold text-white">Contact BufferRing</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Have a project idea or want to collaborate? Get in touch!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="space-y-10"
          >
            <motion.h2 className="text-2xl font-bold text-white" variants={itemVariants}>
              Contact Information
            </motion.h2>

            <motion.div className="space-y-6" variants={containerVariants}>
              {contactItems.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start group"
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? undefined : { x: 6 }}
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

            <motion.div className="pt-6 border-t border-gray-800" variants={itemVariants}>
              <h3 className="mb-4 text-xl font-semibold text-white">Our Mission</h3>
              <p className="leading-relaxed text-gray-400">
                BufferRing is dedicated to creating innovative open-source solutions that empower developers and foster collaboration across the digital globe. We believe in transparency, community-driven development, and creating tools that make a difference.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Send Message</h2>

            {submitted && (
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                className="p-4 mb-6 text-green-300 rounded-lg border border-green-500/30 bg-green-500/10"
              >
                Thank you for your message! Please check your email to activate the form endpoint if this is your first time.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="relative group">
              <span className="absolute -inset-0.5 bg-gradient-to-r from-gray-700/60 via-gray-800/60 to-gray-900/60 rounded-2xl opacity-75 blur transition duration-700 group-hover:opacity-100" aria-hidden="true" />

              <div className="relative p-8 rounded-2xl backdrop-blur-xl bg-black/60 border border-gray-800/60">
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
                    className="px-4 py-3 w-full text-white bg-gray-900/50 rounded-lg border border-gray-700 outline-none transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50"
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
                    className="px-4 py-3 w-full text-white bg-gray-900/50 rounded-lg border border-gray-700 outline-none transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50"
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
                    className="px-4 py-3 w-full text-white bg-gray-900/50 rounded-lg border border-gray-700 outline-none resize-none transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 disabled:opacity-50"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center px-6 py-3 w-full font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={prefersReducedMotion || isSubmitting ? undefined : { scale: 1.02 }}
                  whileTap={prefersReducedMotion || isSubmitting ? undefined : { scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="mr-3 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
