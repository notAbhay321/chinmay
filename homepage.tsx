'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const AnimatedSection = ({ children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed w-full bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-400">Dr. Chinmay</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Home</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">About</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Services</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <AnimatedSection>
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Future of Holistic Healing
              </h1>
              <p className="text-xl mb-6 text-gray-300">Experience the power of advanced homeopathic treatments with Dr. Chinmay's cutting-edge approach.</p>
              <Button className="bg-green-500 text-white hover:bg-green-600 transition duration-300">
                Book a Virtual Consultation
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="md:w-1/2">
              <Image 
                src="/placeholder.svg" 
                alt="Dr. Chinmay" 
                width={500} 
                height={500} 
                className="rounded-full shadow-lg border-4 border-green-400"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Benefits of Next-Gen Homeopathy Consultation
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Diagnosis", description: "Cutting-edge AI assists in precise diagnosis", icon: "🤖" },
              { title: "Virtual Reality Sessions", description: "Immersive healing experiences from home", icon: "🥽" },
              { title: "Quantum Remedies", description: "Advanced quantum-based homeopathic solutions", icon: "⚛️" },
              { title: "Biofeedback Integration", description: "Real-time health monitoring for personalized care", icon: "📊" },
              { title: "Global Expert Network", description: "Access to worldwide homeopathy specialists", icon: "🌐" },
              { title: "Blockchain Health Records", description: "Secure and transparent medical history", icon: "🔗" },
            ].map((benefit, index) => (
              <AnimatedSection key={index}>
                <Card className="bg-gray-700 border-green-400 hover:border-blue-400 transition duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold flex items-center text-green-400">
                      <span className="mr-2 text-3xl">{benefit.icon}</span>
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              What Our Patients Say
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Alex Johnson", quote: "Dr. Chinmay's futuristic approach to homeopathy changed my life. The VR sessions were incredibly calming and effective." },
              { name: "Samantha Lee", quote: "The AI-assisted diagnosis was spot-on. I've never felt so understood by a healthcare professional before." },
            ].map((testimonial, index) => (
              <AnimatedSection key={index}>
                <Card className="bg-gray-800 border-green-400">
                  <CardContent className="pt-6">
                    <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                    <p className="text-green-400 font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <AnimatedSection>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4 text-green-400">Dr. Chinmay</h3>
                <p className="text-gray-300">Pioneering the future of holistic healing through advanced homeopathy.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4 text-green-400">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">About Us</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Services</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Testimonials</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-green-400 transition duration-300">Contact</Link></li>
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold mb-4 text-green-400">Contact Us</h3>
                <p className="text-gray-300">Virtual Clinic, Cyberspace</p>
                <p className="text-gray-300">Hologram: (123) 456-7890</p>
                <p className="text-gray-300">Quantum Mail: future@drchinmay.com</p>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection>
            <div className="mt-8 text-center text-gray-400">
              <p>&copy; 2023 Dr. Chinmay Advanced Homeopathy. All rights reserved.</p>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  )
}