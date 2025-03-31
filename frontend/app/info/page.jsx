// app/info/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata = {
    title: "NGD",
    description: "Learn about our company, contact us, and read our privacy policy",
};

export default function InfoPage() {
    return (
        <>

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                <h1 className="text-3xl font-bold mb-8 text-center">Company Information</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Navigation */}
                    <div className="md:w-1/4">
                        <nav className="sticky top-20">
                            <h2 className="text-xl font-semibold mb-4">Sections</h2>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#about" className="text-blue-600 hover:underline">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#contact" className="text-blue-600 hover:underline">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="md:w-3/4 space-y-12">
                        <section id="about" className="scroll-mt-20">
                            <h2 className="text-2xl font-bold mb-4">About Us</h2>
                            <div className="space-y-4">
                                <p>
                                    Welcome to NextGenDevices, your premier destination for the latest in technology,
                                    gaming, and entertainment. Founded in 2023, we're dedicated to bringing you
                                    honest reviews, insightful articles, and the most up-to-date news in the tech world.
                                </p>
                                <p>
                                    Our team of passionate tech enthusiasts works tirelessly to test and review products
                                    so you can make informed purchasing decisions. We believe in transparency, quality,
                                    and the power of technology to transform lives.
                                </p>
                                <p>
                                    Whether you're a hardcore gamer, a movie buff, or just someone who appreciates
                                    great technology, you'll find something to love at NextGenDevices.
                                </p>
                            </div>
                        </section>

                        <section id="contact" className="scroll-mt-20">
                            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                            <div className="space-y-4">
                                <p>
                                    Have questions, suggestions, or business inquiries? We'd love to hear from you!
                                </p>
                                <p>
                                    Email us at:{" "}
                                    <a
                                        href="mailto:contact@nextgendevices.com"
                                        className="text-blue-600 hover:underline"
                                    >
                                        contact@nextgendevices.com
                                    </a>
                                </p>
                                <p>
                                    We typically respond to all emails within 24-48 hours. For press inquiries,
                                    please include "Press" in your subject line.
                                </p>
                            </div>
                        </section>

                        <section id="privacy" className="scroll-mt-20">
                            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Information We Collect</h3>
                                    <p>
                                        We collect information you provide directly to us, such as when you create
                                        an account, subscribe to our newsletter, or contact us. This may include
                                        your name, email address, and any other information you choose to provide.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">How We Use Your Information</h3>
                                    <p>
                                        We use the information we collect to:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>Provide, maintain, and improve our services</li>
                                        <li>Respond to your comments, questions, and requests</li>
                                        <li>Send you technical notices, updates, and support messages</li>
                                        <li>Monitor and analyze trends, usage, and activities</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Cookies</h3>
                                    <p>
                                        We use cookies and similar tracking technologies to track activity on our
                                        website and hold certain information to improve your browsing experience.
                                        You can instruct your browser to refuse all cookies or indicate when a
                                        cookie is being sent.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Changes to This Policy</h3>
                                    <p>
                                        We may update our Privacy Policy from time to time. We will notify you of
                                        any changes by posting the new Privacy Policy on this page and updating
                                        the "Last Updated" date at the bottom of this policy.
                                    </p>
                                </div>

                                <p className="text-sm text-gray-500">
                                    Last Updated: {new Date().toLocaleDateString()}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}