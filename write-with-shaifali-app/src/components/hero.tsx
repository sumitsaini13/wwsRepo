"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-blue-700 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dr. Shaifali Arora
          </h1>
          <p className="text-lg md:text-xl">
            Ph.D. Scholar, IIT Indore <br />
            Specializing in Colonial & Postcolonial South Asia, with a focus on
            cultural and linguistic history of 20th century North India
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">About</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center">
          Dr. Shaifali Arora is a researcher and academic specializing in
          colonial and postcolonial South Asia, with particular expertise in the
          cultural and linguistic history of 20th century North India. She has
          held multiple faculty positions and international research fellowships
          that reflect her commitment to both teaching and scholarly work.
        </p>
      </section>

      {/* Experience Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              role: "Assistant Professor",
              place: "IIIT-Vadodara",
              duration: "Aug 2023 – Feb 2024 · 7 months",
            },
            {
              role: "Assistant Professor",
              place: "Amity University Punjab",
              duration: "Oct 2022 – May 2023 · 8 months",
            },
            {
              role: "Assistant Professor",
              place: "Lovely Professional University",
              duration: "Mar 2021 – May 2022 · 1 yr 3 mos",
            },
            {
              role: "ASEM-DUO Fellow",
              place: "Lancaster University, UK",
              duration: "May 2020 – Feb 2021 · 10 months",
            },
            {
              role: "Chegg Tutor",
              place: "Chegg Inc.",
              duration: "Apr 2016 – Jan 2021 · 4 yrs 10 mos",
            },
            {
              role: "Doctoral Researcher",
              place: "Indian Institute of Technology, Indore",
              duration: "Jul 2015 – Dec 2020 · 5 yrs 6 mos",
            },
          ].map((exp, idx) => (
            <div
              key={idx}
              className="border-l-4 border-blue-600 pl-4 hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-gray-600">{exp.place}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-6">
          For academic collaborations, talks, or inquiries, feel free to reach
          out.
        </p>
        <a
          href="mailto:arora.shaifali16@gmail.com"
          className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Contact Me
        </a>
      </section>
    </main>
  );
}
