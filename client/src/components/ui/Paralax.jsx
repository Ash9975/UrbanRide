"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useMediaQuery } from "react-responsive";

export const products = [
  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
  {
    title: "",
    link: "https://userogue.com",
    thumbnail:
      "https://img.freepik.com/premium-photo/luxury-car-rental-car-sale-social-media-instagram-post-template-design_1126722-2530.jpg",
  },
  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
];

export const HeroParallax = () => {
  const firstRow = products.slice(0, 1);
  const secondRow = products.slice(1, 2);

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const isMobile = useMediaQuery({ maxWidth: 500 });
  const isTablet = useMediaQuery({ minWidth: 510, maxWidth: 900 });
  const isDesktop = useMediaQuery({ minWidth: 901, maxWidth: 1400 });

  const translateXReverseMobile = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1000, 70]
  );
  const translateXTablet = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1000, 300]
  );
  const translateXReverseDesktop = useTransform(
    scrollYProgress,
    [0, 0.4],
    [1000, 90]
  );

  const translateX = useSpring(
    isMobile
      ? translateXReverseMobile
      : isTablet
        ? translateXTablet
        : translateXReverseDesktop,
    springConfig
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0.7, 1], [250, -1000]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [15, 0]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.35], [20, 0]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], isMobile ? [-50, 50] : [150, 250]),
    springConfig
  );


  return (
    <div
      ref={ref}
      className="relative min-h-[150vh] overflow-hidden antialiased flex flex-col"

    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse pt-40">
          {firstRow.map((product, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center gap-15
             bg-white/10 backdrop-blur-xl border border-white/20
             shadow-2xl rounded-3xl
             max-w-5xl w-full px-10 py-24 mx-auto"
            >
              <div className="flex-2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-700">
                  Ride smarter, travel better
                </h2>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Find the perfect ride at unbeatable prices. Whether it’s a weekend escape
                  or long-term rental, we make every journey smooth and affordable.
                </p>

                <button className="mt-4 inline-flex items-center gap-2
                     bg-green-400 hover:bg-green-600  text-2xl
                     text-white font-semibold px-6 py-5 rounded-full
                     transition">
                  Explore Cars →
                </button>
              </div>


              <ProductCard product={product} translate={translateX} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto my-10 px-6 py-24 text-center md:text-left">
      <h1 className="text-3xl md:text-7xl font-extrabold leading-tight">
        The Ultimate <br />
        <span className="text-green-600">Car Rental</span> Experience
      </h1>

      <p className="max-w-2xl mx-auto md:mx-0 mt-6 text-gray-600 text-base md:text-xl">
        Affordable. Reliable. Designed for modern travelers.
      </p>
    </div>
  );
};


export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -10 }}
      className="relative flex-shrink-0
                 h-56 w-70 md:h-[350px] md:w-[420px]
                 rounded-2xl overflow-hidden
                 shadow-xl bg-black/20"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-full w-full object-contain p-6"
      />

      {/* subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </motion.div>
  );
};

