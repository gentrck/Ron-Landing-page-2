import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Calendar, ThumbsUp } from "lucide-react";

export default function App() {
  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16 px-4 text-center">
        <motion.img
          src="/ron-headshot.jpg" // Replace with actual headshot from Ron's site
          alt="Ron Queeney"
          className="w-32 h-32 rounded-full mx-auto mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />
        <h1 className="text-4xl font-bold mb-2">Ron Queeney</h1>
        <p className="text-lg mb-6">Certified Hypnotherapist – Transforming Lives in Tampa</p>
        <motion.a
          href="#book"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
          whileHover={{ scale: 1.05 }}
        >
          Book Your Session
        </motion.a>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Watch How Hypnosis Can Change Your Life</h2>
        <div className="max-w-3xl mx-auto">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/your-video-id" // Replace with Ron's actual video
            title="Ron Queeney Hypnosis"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Therapy Benefits Section */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">How Our Therapies Help</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Quit Smoking", desc: "Break free from nicotine addiction in just a few sessions." },
            { title: "Weight Loss", desc: "Reprogram your mind for healthy eating habits." },
            { title: "Stress Relief", desc: "Release anxiety and embrace calmness." }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow text-center"
              whileHover={{ scale: 1.05 }}
            >
              <ThumbsUp className="mx-auto text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
              <a href="#book" className="text-blue-600 font-semibold mt-4 inline-block">
                Book Now →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {["Ron helped me quit smoking after 20 years!", "I lost 30 lbs and feel amazing.", "My anxiety is gone – I sleep peacefully now.", "Ron is truly a miracle worker!"]
            .map((quote, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-6 rounded-lg shadow"
                whileHover={{ scale: 1.03 }}
              >
                <p className="italic mb-2">“{quote}”</p>
                <p className="font-semibold">– Client {i + 1}</p>
              </motion.div>
            ))}
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="bg-blue-900 text-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Book Your Session Now</h2>
        <p className="mb-6">Secure your spot with a deposit of $$xx</p>
        <img
          src="/calendar-placeholder.png" // Replace with embedded booking widget later
          alt="Booking Calendar"
          className="mx-auto mb-6 rounded-lg shadow-lg"
        />
        <a
          href="#pay"
          className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
        >
          Pay & Confirm
        </a>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-4 flex items-center justify-center gap-2">
          <Phone /> <span>(Ron’s Phone from website)</span>
        </p>
        <p className="mb-4 flex items-center justify-center gap-2">
          <Mail /> <span>(Ron’s Email from website)</span>
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>© {new Date().getFullYear()} Ron Queeney Hypnosis Center – All Rights Reserved</p>
      </footer>
    </div>
  );
}
