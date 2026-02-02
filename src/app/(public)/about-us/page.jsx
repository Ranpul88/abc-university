'use client'

export default function AboutUs() {
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
              <span className="text-sm font-medium text-accent">Est. 2026</span>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-accent">
              About ABC University
              <span className="h-22 block text-secondary mt-2">
                Where Excellence Meets Innovation
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/70 leading-relaxed">
              For over three decades, ABC University has been at the forefront of academic excellence, 
              nurturing minds and transforming futures through innovative education and cutting-edge research.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                <span className="text-sm font-medium text-accent">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">Empowering Tomorrow's Leaders</h2>
              <p className="text-secondary/70 text-lg leading-relaxed">
                Our mission is to provide transformative education that equips students with the knowledge, 
                skills, and values needed to excel in an ever-evolving global landscape. We are committed 
                to fostering critical thinking, creativity, and ethical leadership.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <p className="text-secondary">Excellence in teaching and research across all disciplines</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <p className="text-secondary">Inclusive learning environment that celebrates diversity</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <p className="text-secondary">Innovation and entrepreneurship at the core of our curriculum</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                <span className="text-sm font-medium text-accent">Our Vision</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">A Beacon of Knowledge</h2>
              <p className="text-secondary/70 text-lg leading-relaxed">
                We envision ABC University as a globally recognized institution that leads the way in 
                academic innovation, research excellence, and societal impact. Our goal is to create 
                graduates who are not just career-ready, but life-ready.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <p className="text-secondary">Becoming a top-tier global university by 2030</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <p className="text-secondary">Pioneering breakthrough research that solves real-world challenges</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/30 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  </div>
                  <p className="text-secondary">Building strategic partnerships with industry and academia worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-y border-secondary/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">38+</div>
              <div className="text-sm md:text-base text-secondary/60">Years of Excellence</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">100K+</div>
              <div className="text-sm md:text-base text-secondary/60">Alumni Worldwide</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">200+</div>
              <div className="text-sm md:text-base text-secondary/60">Research Projects</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">85+</div>
              <div className="text-sm md:text-base text-secondary/60">Industry Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold ">Our Core Values</h2>
            <p className="text-secondary/60 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at ABC University
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Academic Excellence</h3>
              <p className="text-secondary/60 leading-relaxed">
                We maintain the highest standards in teaching, research, and scholarship, 
                ensuring our students receive world-class education.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation & Discovery</h3>
              <p className="text-secondary/60 leading-relaxed">
                We foster a culture of curiosity and creativity, encouraging students and faculty 
                to push boundaries and explore new frontiers.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Diversity & Inclusion</h3>
              <p className="text-secondary/60 leading-relaxed">
                We celebrate differences and create an environment where everyone feels valued, 
                respected, and empowered to succeed.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Integrity & Ethics</h3>
              <p className="text-secondary/60 leading-relaxed">
                We uphold the highest ethical standards in all our endeavors, building trust 
                through transparency and accountability.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Global Citizenship</h3>
              <p className="text-secondary/60 leading-relaxed">
                We prepare students to be responsible global citizens who contribute positively 
                to society and address global challenges.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Collaboration</h3>
              <p className="text-secondary/60 leading-relaxed">
                We believe in the power of teamwork and partnerships, working together to achieve 
                greater impact and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-accent/10 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="h-90 bg-white rounded-3xl p-12 md:p-16 shadow-2xl border border-secondary/10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-secondary/60 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of scholars, innovators, and leaders who are shaping 
              the future and making a difference in the world.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}