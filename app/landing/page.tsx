"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Camera,
  CheckCircle,
  CreditCard,
  Download,
  Heart,
  ImageIcon,
  MessageSquare,
  MousePointer,
  Share2,
  Star,
  Users,
} from "lucide-react"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50])

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const testimonials = [
    {
      quote:
        "Klyck has transformed how I deliver photos to my clients. The selection process is so smooth, and my clients love it!",
      author: "Sarah Johnson",
      role: "Wedding Photographer",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
    },
    {
      quote:
        "Since using Klyck, my delivery workflow is 3x faster and my clients are much happier with the experience.",
      author: "Michael Chen",
      role: "Portrait Photographer",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
    },
    {
      quote: "The platform is intuitive for both me and my clients. It's become an essential part of my business.",
      author: "Emma Rodriguez",
      role: "Family Photographer",
      avatar: "/placeholder.svg?height=100&width=100&text=ER",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-500"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
              />
              <path
                d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                fill="currentColor"
              />
              <path d="M7 14C7 12.34 10.33 11.5 12 11.5C13.67 11.5 17 12.34 17 14V16H7V14Z" fill="currentColor" />
            </svg>
            <span className="text-2xl font-bold">Klyck</span>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/projects">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="sm" className="bg-yellow-500 text-black hover:bg-yellow-600">
                Try for free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-yellow-50 to-white pt-20">
        <motion.div className="absolute inset-0 z-0" style={{ opacity, y }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.15),transparent_70%)]" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                The modern way to <span className="text-yellow-500">deliver photos</span> to your clients
              </h1>
              <p className="mb-8 text-lg text-gray-600 md:text-xl">
                Streamline your photography workflow with an elegant client gallery and selection experience that will
                delight your clients.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/projects">
                  <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 sm:w-auto">
                    Start free trial
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full border-2 border-white bg-gray-200">
                      <Image
                        src={`/placeholder.svg?height=50&width=50&text=${i}`}
                        alt={`User ${i}`}
                        width={32}
                        height={32}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 1,000+ photographers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-2xl bg-white p-2 shadow-xl">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/bride-with-dog.jpg"
                    alt="Photo selection interface"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-black shadow-lg">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 rounded-lg bg-white p-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Selection</span>
                  <span className="text-sm text-yellow-600">12/20</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div className="h-full w-3/5 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 w-40 rounded-lg bg-white p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Client approved</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Everything you need for a seamless delivery</h2>
            <p className="text-lg text-gray-600">
              Klyck provides all the tools you need to streamline your photography workflow and delight your clients.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ImageIcon className="h-6 w-6 text-yellow-500" />,
                title: "Beautiful Galleries",
                description: "Create stunning, customizable galleries that showcase your work in the best light.",
              },
              {
                icon: <MousePointer className="h-6 w-6 text-yellow-500" />,
                title: "Easy Selection",
                description: "Clients can easily select their favorite photos with an intuitive interface.",
              },
              {
                icon: <Download className="h-6 w-6 text-yellow-500" />,
                title: "Simple Downloads",
                description: "Deliver high-resolution images with just a few clicks.",
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-yellow-500" />,
                title: "Client Communication",
                description: "Built-in messaging keeps all communication in one place.",
              },
              {
                icon: <CreditCard className="h-6 w-6 text-yellow-500" />,
                title: "Integrated Payments",
                description: "Accept payments for additional photos or services directly through the platform.",
              },
              {
                icon: <Share2 className="h-6 w-6 text-yellow-500" />,
                title: "Easy Sharing",
                description:
                  "Share galleries with clients via email or custom links with optional password protection.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How Klyck Works</h2>
            <p className="text-lg text-gray-600">
              A simple three-step process that transforms your client delivery experience
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-yellow-200 md:block lg:hidden"></div>

            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  icon: <Camera className="h-8 w-8" />,
                  title: "Upload Your Photos",
                  description:
                    "Upload your photos to create a new project. Organize them into categories for easy navigation.",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Client Selection",
                  description:
                    "Share the gallery with your clients so they can select their favorite photos for editing.",
                },
                {
                  icon: <Heart className="h-8 w-8" />,
                  title: "Deliver & Delight",
                  description:
                    "Deliver the final edited photos through a beautiful gallery that your clients will love.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="relative z-10 rounded-xl bg-white p-8 shadow-md">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                      {step.icon}
                    </div>
                    <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="absolute -left-3 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">See Klyck in Action</h2>
            <p className="text-lg text-gray-600">
              A glimpse of the beautiful, intuitive interface your clients will experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Project Dashboard",
                description: "Manage all your photography projects in one place",
                image: "/placeholder.svg?height=600&width=800&text=Dashboard",
              },
              {
                title: "Photo Selection",
                description: "Intuitive interface for clients to select their favorite photos",
                image: "/placeholder.svg?height=600&width=800&text=Selection",
              },
              {
                title: "Final Gallery",
                description: "Beautiful galleries to showcase the final edited photos",
                image: "/placeholder.svg?height=600&width=800&text=Gallery",
              },
              {
                title: "Client Communication",
                description: "Built-in messaging to streamline communication",
                image: "/placeholder.svg?height=600&width=800&text=Messages",
              },
              {
                title: "Analytics Dashboard",
                description: "Track client engagement and project progress",
                image: "/placeholder.svg?height=600&width=800&text=Analytics",
              },
              {
                title: "Mobile Experience",
                description: "Fully responsive design for on-the-go access",
                image: "/placeholder.svg?height=600&width=800&text=Mobile",
              },
            ].map((screenshot, index) => (
              <motion.div
                key={index}
                className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={screenshot.image || "/placeholder.svg"}
                    alt={screenshot.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">{screenshot.title}</h3>
                  <p className="text-sm text-gray-600">{screenshot.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-yellow-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Photographers Say</h2>
            <p className="text-lg text-gray-600">
              Join thousands of photographers who have transformed their client experience with Klyck
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 100,
                    position: activeTestimonial === index ? "relative" : "absolute",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6 flex-shrink-0 md:mb-0 md:mr-6">
                    <div className="h-20 w-20 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 flex justify-center md:justify-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <blockquote className="mb-4 text-xl font-medium italic">"{testimonial.quote}"</blockquote>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="mt-8 flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${activeTestimonial === index ? "bg-yellow-500" : "bg-gray-300"}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">Choose the plan that works best for your photography business</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$19",
                description: "Perfect for photographers just getting started",
                features: [
                  "10 active projects",
                  "100GB storage",
                  "Client selection",
                  "Basic gallery customization",
                  "Email support",
                ],
              },
              {
                name: "Professional",
                price: "$49",
                description: "For growing photography businesses",
                features: [
                  "Unlimited projects",
                  "500GB storage",
                  "Client selection & comments",
                  "Advanced gallery customization",
                  "Priority support",
                  "Custom branding",
                  "Analytics dashboard",
                ],
                popular: true,
              },
              {
                name: "Studio",
                price: "$99",
                description: "For established studios with multiple photographers",
                features: [
                  "Everything in Professional",
                  "1TB storage",
                  "Multiple user accounts",
                  "Client CRM integration",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "API access",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-xl border ${
                  plan.popular ? "border-yellow-500" : "border-gray-200"
                } bg-white p-8 shadow-sm transition-all hover:shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-medium text-black">
                    Most Popular
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="mb-6 text-gray-600">{plan.description}</p>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  Get started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-500 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl">
              Ready to transform your client experience?
            </h2>
            <p className="mb-8 text-xl text-black/80">
              Join thousands of photographers who are delighting their clients with Klyck.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-black text-white hover:bg-gray-900">
                Start your free trial
              </Button>
              <Button size="lg" variant="outline" className="border-black bg-transparent text-black hover:bg-black/10">
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-yellow-500"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                    fill="currentColor"
                  />
                  <path d="M7 14C7 12.34 10.33 11.5 12 11.5C13.67 11.5 17 12.34 17 14V16H7V14Z" fill="currentColor" />
                </svg>
                <span className="text-xl font-bold">Klyck</span>
              </div>
              <p className="mb-4 text-gray-400">The modern way to deliver photos to your clients.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Webinars
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Klyck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
