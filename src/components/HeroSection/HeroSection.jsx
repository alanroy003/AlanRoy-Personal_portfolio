// src/components/HeroSection/HeroSection.jsx
import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width for responsive animations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive scroll ranges
  const heroMoveRange =
    windowWidth > 1024 ? 500 : windowWidth > 768 ? 350 : 200;
  const heroScaleRange =
    windowWidth > 1024 ? 1.05 : windowWidth > 768 ? 1.03 : 1.02;

  // Hero image parallax (Y movement + opacity + scale)
  const heroY = useSpring(
    useTransform(scrollY, [0, heroMoveRange], [0, -100]),
    { stiffness: 100, damping: 30 }
  );
  const heroOpacity = useSpring(
    useTransform(scrollY, [0, heroMoveRange], [1, 0.3]),
    { stiffness: 100, damping: 30 }
  );
  const heroScale = useSpring(
    useTransform(scrollY, [0, heroMoveRange], [1, heroScaleRange]),
    { stiffness: 100, damping: 30 }
  );

  // Social icons parallax (less movement)
  const socialsY = useSpring(
    useTransform(scrollY, [0, heroMoveRange], [0, -70]),
    { stiffness: 100, damping: 30 }
  );
  const socialsOpacity = useSpring(
    useTransform(scrollY, [0, heroMoveRange], [1, 0.3]),
    { stiffness: 100, damping: 30 }
  );

  // Name letters parallax (subtle)
  const nameY = useSpring(useTransform(scrollY, [0, heroMoveRange], [0, -80]), {
    stiffness: 100,
    damping: 30,
  });
  const nameOpacity = useSpring(
    useTransform(scrollY, [0, heroMoveRange], [1, 0.3]),
    { stiffness: 100, damping: 30 }
  );

  // Framer Motion variants for staggered letters
  const letterVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  return (
    <section id="home">
      <section className="hero-section">
        <div className="hero-content">
          {/* Rotating Circles Background */}
          <motion.section
            className="Circles_component"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.img
              src="/assets/imgs/HeroSection/Circle_triangle.svg"
              alt="Circletriangle"
              className="Circletriangle"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </motion.section>

          {/* LEFT SIDE — Hero Image + Arrows */}
          <motion.div
            className="hero-left"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="arrow-design">
              <svg className="arrow arrow1" viewBox="0 0 100 80">
                <polygon points="35,10 10,35 35,60 70,60 45,35 70,10" />
              </svg>
              <img
                src="/assets/imgs/HeroSection/Hero-main.png"
                alt="Alan Roy"
                className="hero-image"
              />

              <svg className="arrow arrow2" viewBox="0 0 80 80">
                <polygon points="35,10 10,35 35,60 60,60 35,35 60,10" />
              </svg>

              <svg className="arrow arrow3" viewBox="0 0 80 80">
                <polygon points="35,10 10,35 35,60 60,60 35,35 60,10" />
              </svg>
            </div>
          </motion.div>

          {/* RIGHT SIDE — Name + Socials */}
          <div className="hero-right">
            <motion.img
              src="/assets/imgs/HeroSection/Group-9.svg"
              alt="Arrow"
              className="Arrow-image"
              style={{ y: socialsY, opacity: socialsOpacity }}
            />

            <motion.div
              className="hero-socials"
              style={{ y: socialsY, opacity: socialsOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1, duration: 1.2 }}
            >
              <a
                href="https://www.linkedin.com/in/alanroy2024"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://github.com/Alan21303"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="mailto:alanroy3002@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </motion.div>

            <motion.h1
              className="hero-name"
              style={{ y: nameY, opacity: nameOpacity }}
            >
              <section className="hero-name-section">
                <div className="hero_Firstname">
                  {"Alan".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="char firstname"
                      custom={i}
                      variants={letterVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="hero_Lastname">
                  {"Roy".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      className="char lastname"
                      custom={i}
                      variants={letterVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              </section>
            </motion.h1>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="scroll-down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </motion.div>
      </section>
    </section>
  );
};

export default HeroSection;
