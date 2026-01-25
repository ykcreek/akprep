import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <header className="about-us-hero">
        <div className="about-us-title-wrapper">
          <div className="about-us-line"></div>
          <h1 className="about-us-title">Our Story</h1>
          <div className="about-us-line"></div>
        </div>
      </header>

      {/* The Full Narrative Section */}
      <section className="about-narrative-section">
        <div className="about-us-container">
          <div className="narrative-content">
            <h2>Vita Prep began with a simple realization.</h2>
            <p>
              Arnav and Krissh, two roommates at NYU Stern, both found early success in the college transfer process. 
              What surprised them was not their own outcomes, but what they noticed afterward. Many of their friends, 
              equally motivated and capable, were unable to transfer and were forced to continue at institutions they 
              no longer felt aligned with.
            </p>
            <p>
              Wanting to share their experience, they posted their stories on LinkedIn. Within 48 hours, the response 
              was overwhelming. Their posts reached over <span className="stats-highlight">300,000</span> combined views and generated more than <span className="stats-highlight">200</span> messages 
              from students across the country. Each message carried the same theme. Students felt lost, underguided, 
              and unsure how to approach the transfer process strategically.
            </p>
            <p>
              Having been in those same shoes less than a year earlier, Arnav and Krissh realized this was not just a 
              content moment. It was a gap.
            </p>
            <p>
              Vita Prep was created to fill that gap. The platform was designed to be personal, honest, and accessible, 
              helping students navigate transfers to both top institutions and schools they truly aspire to attend. 
              We focus on mentorship over transactions and relationships over volume.
            </p>
            <p className="narrative-emphasis">
              At Vita, students are not clients. They are students we work with closely, guide individually, and 
              support throughout the process. If you are interested in Vita Prep, explore below to learn more about 
              Arnav and Krissh’s personal journeys and what drives our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Profile: Krissh */}
      <section className="about-founder-detail">
        <div className="founder-line"></div>
        <div className="about-us-container">
          
          <div className="founder-story-flow">
            {/* The Image is now part of the flow */}
            <div className="founder-image-wrapper">
              <div className="image-frame-v2">
                <img src="/krisshk.jpg" alt="Krissh Kolhatkar" />
                <div className="image-label-v2">Krissh Kolhatkar</div>
              </div>
            </div>

            <div className="founder-text-content">
              <p className="lead-p">My name is Krissh Kolhatkar, and I am from Old Bridge, New Jersey. I come from a family of Indian immigrants who emphasized resilience, independence, and learning, even when my own academic direction was not always clear.</p>
              <p>Growing up, I was not naturally drawn to traditional academics. Much of my time was spent playing video games, but when COVID shifted everything online, that time also introduced me to something new. I began learning how to code through online classes, where I was first exposed to Python and basic game development. More importantly, I discovered how powerful mentorship could be. Having someone guide me through something unfamiliar changed how I learned.</p>
              <p>That experience led me to start tutoring elementary and middle school students in Python while I was still in eighth grade. I did it without charging, simply because I enjoyed helping others learn and grow. Teaching and mentorship became a recurring theme in my life long before I realized it would matter professionally.</p>
              <p>In high school, my interests continued to expand. I became involved in clubs such as National Honor Society and the Asian American Club, and I developed a passion for photography. At the time, I was exploring different paths without a clear academic end goal. I briefly considered medicine after shadowing a dentist, but through that process I opened my first investment account and was introduced to finance. That moment shifted everything. Finance combined problem solving, strategy, and creativity in a way that finally felt aligned with how I thought.</p>
              <p>I began my college journey at the Kelley School of Business, where I studied finance and joined organizations such as the Capital Markets club and the Asset Management Club. While Kelley provided a strong foundation, I knew I wanted to challenge myself further. I made the decision to transfer, a process that required clarity, discipline, and honest self-assessment.</p>
              <p>Today, I am a student at NYU Stern pursuing a career in finance, with long-term goals in entrepreneurship. Vita Prep reflects how I approach growth: through mentorship, community, and action. For both Arnav and me, Vita is not a resume line. It is a space where students feel supported, learn from people who have been in their position, and gain the confidence to take control of their own paths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile: Arnav */}
      <section className="about-founder-detail arnav-bg">
        <div className="founder-line"></div>
        <div className="about-us-container">
          <div className="founder-story-flow">
            
            {/* Image Wrapper - Floats Right via CSS */}
            <div className="founder-image-wrapper">
              <div className="image-frame-v2">
                <img src="/arnavr.jpg" alt="Arnav Raghuvanshi" />
                <div className="image-label-v2">Arnav Raghuvanshi</div>
              </div>
            </div>

            {/* Text Content - Wraps around the image */}
            <div className="founder-text-content">
              <p>
                I was born in Providence, Rhode Island, to a family of Indian immigrants who arrived 
                in the United States just two years earlier with little more than a suitcase and a dream.
              </p>
              <p>
                When we first immigrated, my mom was a homemaker and my dad worked in tech. When I was 
                eight, we moved to the suburbs, and my mom began the process of validating her education 
                from India, where she had earned two bachelor’s degrees and a master’s. She worked her 
                way from a teaching assistant to a full time high school math teacher, which had always 
                been her goal.
              </p>
              <p>
                Growing up, our home was where neighborhood kids came for help with math homework or 
                exam prep. Teaching, patience, and genuine care for students were part of my everyday 
                environment, and I admired that deeply.
              </p>
              <p>
                I have always been drawn to entrepreneurship. In high school, I ran a small business 
                selling custom lamps, and I was the first person in my family to pursue finance or 
                business academically. I began college at my state school, UMass Amherst, with the 
                intention of applying as a transfer.
              </p>
              <p>
                Balancing full commitment to a school while preparing to leave it was one of the 
                hardest academic and personal challenges I have faced. That experience is why I am 
                passionate about helping transfer students approach this process strategically and honestly.
              </p>
              <p>
                Today, I am a transfer student at NYU Stern, recruiting for roles in investment 
                banking and private equity, with long term goals in entrepreneurship. Vita Prep 
                reflects my belief that strong guidance should be personal, transparent, and accessible. 
                Our pricing is intentionally less than half of what comparable services charge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}