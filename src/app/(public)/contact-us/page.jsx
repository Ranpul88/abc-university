'use client'

import Loader from '@/app/components/loader';
import { useState } from 'react'
import toast from 'react-hot-toast';

export default function ContactUs() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function sendEmail(){
      
      setLoading(true);
      
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            })
        })
        
        if(!res.ok){
            toast.error("Error sending message. Please try again.");
            return
        }

        setLoading(false);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        toast.success("Message sent successfully!");
    }
    
  return (
    <div className="w-full min-h-screen bg-primary text-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">Get in Touch</span>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-accent">
              Contact Us
              <span className="block text-secondary mt-2">
                We're Here to Help
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/70 leading-relaxed">
              Have questions about admissions, programs, or campus life? Our dedicated team 
              is ready to assist you. Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
              <p className="text-secondary/60 leading-relaxed">
                123 University Avenue<br />
                Academic City, ST 12345<br />
                Sri Lanka
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <p className="text-secondary/60 leading-relaxed">
                Main: +94 77 123 4567<br />
                Admissions: +94 77 123 4568<br />
                Mon-Fri: 9:00 AM - 5:00 PM
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <p className="text-secondary/60 leading-relaxed">
                General: info@abcuniversity.edu<br />
                Admissions: admissions@abcuniversity.edu<br />
                Support: support@abcuniversity.edu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 relative">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="w-160 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-4 w-full flex flex-col items-center">
                <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                  <span className="text-sm font-medium text-accent">Send us a Message</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary">How Can We Help?</h2>
                <p className="text-secondary/70 text-lg leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-secondary/10 mb-7 p-8 shadow-lg">
                {loading ? <Loader /> :
                 <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                      className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                      className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e)=>{setPhone(e.target.value)}}
                      className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={subject}
                      onChange={(e)=>{setSubject(e.target.value)}}
                      className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="programs">Program Information</option>
                      <option value="financial">Financial Aid</option>
                      <option value="campus">Campus Life</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={message}
                      onChange={(e)=>{setMessage(e.target.value)}}
                      rows="5"
                      className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    onClick={sendEmail}
                    disabled={loading}
                    className="w-full bg-accent text-white font-semibold py-4 px-6 rounded-xl cursor-pointer hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent/20"
                  >
                    Send Message
                  </button>
                </form>}
              </div>
            </div>

            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl border border-secondary/10 p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-6">Office Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-secondary/10">
                    <span className="text-secondary/70">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-secondary/10">
                    <span className="text-secondary/70">Saturday</span>
                    <span className="font-semibold">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary/70">Sunday</span>
                    <span className="font-semibold text-secondary/50">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 relative bg-white/50 backdrop-blur-sm border-y border-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Contact by Department</h2>
            <p className="text-secondary/60 text-lg max-w-2xl mx-auto">
              Reach out to specific departments for specialized assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl border border-secondary/10 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Admissions Office</h3>
              <p className="text-sm text-secondary/60 mb-3">For prospective students</p>
              <p className="text-accent text-sm font-medium">admissions@abcuniversity.edu</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-secondary/10 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Financial Aid</h3>
              <p className="text-sm text-secondary/60 mb-3">Scholarships & aid programs</p>
              <p className="text-accent text-sm font-medium">financialaid@abcuniversity.edu</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-secondary/10 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Academic Affairs</h3>
              <p className="text-sm text-secondary/60 mb-3">Program & course inquiries</p>
              <p className="text-accent text-sm font-medium">academic@abcuniversity.edu</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-secondary/10 hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-lg mb-2">Student Services</h3>
              <p className="text-sm text-secondary/60 mb-3">Current student support</p>
              <p className="text-accent text-sm font-medium">students@abcuniversity.edu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}