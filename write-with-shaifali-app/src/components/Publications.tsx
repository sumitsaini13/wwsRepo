"use client"

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "../styles/Publications.module.css";

interface Publication  {
  id: number;
  title: string;
  author: string;
  content: string;
  image: string;
  video?: string | null;
  link: string;
  date: string;
};

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/publications')
      .then(response => setPublications(response.data))
      .catch(error => console.error('Error fetching publications:', error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,       // enable auto-scrolling
    autoplaySpeed: 2000,  // 2 seconds per slide
    pauseOnHover: true,   // pause when user hovers
    cssEase: "linear",  
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={`p-6 ${styles.glassCard}`}>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Ideas that Took Flight
      </h1>
      <Slider {...settings}>
        {publications.map((pub) => (
          <div key={pub.id} className="px-2">
            <div
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg w-100 h-80"
              onClick={() => window.open(pub.link, "_blank")}
            >
              {/* Image */}
              {/* <img
                src={pub.image}
                alt={pub.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
              /> */}
              <Image
                src={pub.image}
                alt={pub.title}
                fill
                className="rounded-lg object-cover"
                priority={false} // lazy load by default
              />
              {/* Video overlay */}
              {pub.video && pub.video !== "null" && (
                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <iframe
                    src={pub.video}
                    title={pub.title}
                    className="w-full h-full object-cover"
                    allow="autoplay; encrypted-media"
                  />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h2 className="text-lg font-semibold text-white">
                  {pub.title}
                </h2>
                <p className="text-sm text-gray-300">{pub.author}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}