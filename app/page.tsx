import Link from "next/link"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {ArrowRight, CheckCircle} from "lucide-react"
import React from "react";
import Header from "@/components/partials/header";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <Header/>
            <main>
                <HeroSection/>
                <FeaturesSection/>
                <TestimonialsSection/>
                <CtaSection/>
            </main>
            <Footer/>
        </div>
    )
}

function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Modern solutions for your business
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Streamline your operations with our intuitive platform. Designed to help you work
                                smarter, not harder.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button asChild size="lg">
                                <Link href="#contact">Get Started</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link href="#features">
                                    Learn More
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image
                            src="/placeholder.svg?height=550&width=550"
                            alt="Hero Image"
                            width={550}
                            height={550}
                            className="rounded-lg object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

function FeaturesSection() {
    return (
        <section id="features" className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div
                            className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Everything you need to
                            succeed</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform provides all the tools you need to streamline your workflow and boost
                            productivity.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Intuitive Dashboard",
                            description: "Get a clear overview of your performance with our easy-to-use dashboard.",
                        },
                        {
                            title: "Advanced Analytics",
                            description: "Make data-driven decisions with comprehensive analytics and reporting.",
                        },
                        {
                            title: "Seamless Integration",
                            description: "Connect with your favorite tools and services without any hassle.",
                        },
                        {
                            title: "Automated Workflows",
                            description: "Save time with automated processes tailored to your business needs.",
                        },
                        {
                            title: "Secure Platform",
                            description: "Rest easy knowing your data is protected with enterprise-grade security.",
                        },
                        {
                            title: "24/7 Support",
                            description: "Get help whenever you need it with our dedicated support team.",
                        },
                    ].map((feature, index) => (
                        <Card key={index} className="flex flex-col items-start">
                            <CardHeader>
                                <CheckCircle className="h-10 w-10 text-primary"/>
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestimonialsSection() {
    return (
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                            Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What our clients say</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Don't just take our word for it. Here's what our customers have to say about our platform.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            quote:
                                "This platform has completely transformed how we operate. The intuitive interface and powerful features have saved us countless hours.",
                            author: "Sarah Johnson",
                            role: "CEO, TechStart",
                        },
                        {
                            quote:
                                "The analytics capabilities are outstanding. We've gained insights that have directly contributed to our growth over the past year.",
                            author: "Michael Chen",
                            role: "Marketing Director, GrowthCo",
                        },
                        {
                            quote:
                                "Customer support is exceptional. Any time we've had questions, the team has been quick to respond with helpful solutions.",
                            author: "Emma Rodriguez",
                            role: "Operations Manager, Innovate Inc.",
                        },
                    ].map((testimonial, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardHeader>
                                <div className="flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5 text-primary"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardFooter>
                                <div>
                                    <p className="font-semibold">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CtaSection() {
    return (
        <section id="contact" className="w-full bg-primary text-primary-foreground py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to get started?</h2>
                    <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed">
                        Join thousands of satisfied customers who are already using our platform to grow their business.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <form className="flex space-x-2">
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <Button type="submit" variant="secondary">
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-xs text-primary-foreground/70">We respect your privacy. Unsubscribe at any
                        time.</p>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="w-full border-t flex flex-col items-center justify-center bg-background py-6 md:py-12">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
                <div className="flex items-center gap-2">
                    <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32}/>
                    <span className="text-lg font-bold">Company</span>
                </div>
                <nav className="flex gap-4 sm:gap-6">
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Terms
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Privacy
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Cookies
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                        <span className="sr-only">Facebook</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path
                                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                        </svg>
                        <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect width="4" height="12" x="2" y="9"/>
                            <circle cx="4" cy="4" r="2"/>
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </div>
            </div>
            <div className="container mt-6 text-center text-sm text-muted-foreground">
                <p>© 2025 Company, Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}

