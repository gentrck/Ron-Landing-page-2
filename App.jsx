import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, CreditCard, Shield, Star, CheckCircle2, Phone, PlayCircle, Quote } from "lucide-react";

// =============================
// RON QUEENEY — DEMO LANDING PAGE (Updated)
// Tailwind + React (GHL-friendly wireframe)
// Implementation notes (per client request):
// - Real phone/address pulled from site: (813) 919-5884 • 7320 E. Fletcher Ave, Suite 1A, Tampa, FL 33637
// - Calendar: image mock instead of a live embed (so Ron doesn't need technical setup now)
// - Deposit & Stripe product shown as $$xx per instruction
// - Added YouTube video gallery (links open on click)
// - Added "Clients & Outcomes" section: therapy → benefits → mini testimonial → CTA → jump to booking
// - All dynamic lists (therapies, testimonials, videos) are simple arrays for easy edits
// =============================

const HEADSHOT_URL = "https://tampahypnosiscenter.com/wp-content/uploads/tampa-hypnosis-center-logo-v3.png"; // replace with actual headshot if desired
const PHONE = "(813) 919-5884";
const ADDRESS = "7320 E. Fletcher Ave, Suite 1A, Tampa, FL 33637";
const YOUTUBE_CHANNEL = "https://www.youtube.com/user/TampaHypnosis";

const brand = {
  primary: "from-indigo-900 via-indigo-800 to-indigo-700",
};

const therapies = [
  {
    id: "weight-loss",
    title: "Weight Loss",
    who: "Busy professionals struggling with evening cravings and stress eating.",
    helps: ["Reduce cravings & emotional eating", "Build consistent habits", "Accountability between sessions"],
    benefits: ["Down 8–15 lbs in 6–8 weeks (typical when paired with diet/exercise)", "Better sleep and energy", "Sustainable routines"],
    testimonial: { quote: "Identified 3 triggers for late‑night snacking. Down 11 lbs in 6 weeks.", author: "S. L." },
  },
  {
    id: "quit-smoking",
    title: "Quit Smoking",
    who: "Long‑time smokers ready for a clean break with support and relapse prevention.",
    helps: ["Rapid craving control", "Relapse prevention plan", "Breathing & state anchors"],
    benefits: ["Craving intensity drops quickly", "Clear plan for high‑risk moments", "Calmer baseline"],
    testimonial: { quote: "After two sessions I stopped smoking. The calm breathing trick was a lifesaver.", author: "M. M." },
  },
  {
    id: "stress-anxiety",
    title: "Stress & Anxiety",
    who: "High‑performers dealing with overthinking, spikes, or sleep issues.",
    helps: ["Portable calming techniques", "Sleep support routines", "Cognitive reframing"],
    benefits: ["Fewer spikes & faster recovery", "More focus during the day", "Better sleep"],
    testimonial: { quote: "I finally have tools to ground myself during anxiety spikes.", author: "J. R." },
  },
  {
    id: "virtual-gastric-band",
    title: "Virtual Gastric Band",
    who: "Clients wanting portion control without surgery (4‑session protocol).",
    helps: ["Evidence‑informed scripts", "Portion control mindset", "Progress checks"],
    benefits: ["Mindful eating becomes simpler", "Less snacking between meals", "Consistent loss when paired with plan"],
    testimonial: { quote: "Felt in control at meals for the first time in years.", author: "K. T." },
  },
];

const videos = [
  {
    id: "vid1",
    title: "World Hypnotism Day Demo (NLP Circle of Power)",
    url: "https://www.youtube.com/watch?v=XX4JR2fKq3g",
  },
  {
    id: "vid2",
    title: "Tampa Hypnosis Center — Overview",
    url: YOUTUBE_CHANNEL,
  },
];

const testimonials = [
  { quote: "Amazing experience… made me aware of different parts of my mind.", author: "Shazia", context: "General Hypnosis" },
  { quote: "Ron personalizes his sessions — 100% organic and unscripted.", author: "Client Review", context: "Private Session" },
  { quote: "Professional and effective. Helped me get back in control.", author: "Pat", context: "Strategy Session" },
];

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
    <div className="rounded-xl bg-black/20 p-3">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  </div>
);

const ServiceCard = ({ title, bullets }) => (
  <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
    <ul className="mt-4 space-y-2 text-slate-600">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />{b}</li>
      ))}
    </ul>
  </div>
);

const Testimonial = ({ quote, author, context }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-1 text-amber-500" aria-label="rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
    <p className="mt-4 text-slate-700 leading-relaxed">“{quote}”</p>
    <div className="mt-3 text-sm font-medium text-slate-900">{author}</div>
    <div className="text-xs text-slate-500">{context}</div>
  </div>
);

function YouTubeThumb({ url, title }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow hover:shadow-md">
      <div className="aspect-video w-full bg-slate-100 grid place-items-center">
        <PlayCircle className="h-12 w-12 text-slate-500 group-hover:scale-110 transition" />
      </div>
      <div className="p-4 text-sm font-medium">{title}</div>
    </a>
  );
}

export default function RonQueeneyLanding() {
  const [email, setEmail] = useState("");
  const [phoneVal, setPhoneVal] = useState("");

  const submitLeadMagnet = (e) => {
    e.preventDefault();
    alert("Demo only. In GHL, embed your Form and map to a workflow.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg`}> 
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-indigo-700 shadow-inner`} />
            <div className="text-sm uppercase tracking-widest text-slate-500">Tampa Hypnosis Center</div>
          </a>
          <div className="flex items-center gap-3">
            <a href={`tel:+18139195884`} className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:flex">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a href="#book" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">Book Now</a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section id="top" className="bg-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                <Shield className="h-4 w-4" /> Since 2005 • Certified Hypnotherapist
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Break Habits. Reduce Stress. <span className="text-indigo-600">Feel in Control.</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Private hypnotherapy with <strong>Ron Queeney</strong> in Tampa, FL. Evidence‑informed approaches for weight loss, smoking cessation, and anxiety reduction.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#book" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Book Your Session
                </a>
                <a href="#videos" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" /> Watch Ron on YouTube
                </a>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-slate-600">
                <div className="rounded-xl bg-slate-50 p-3 text-center"><div className="text-xl font-bold">1:1</div><div>Personalized</div></div>
                <div className="rounded-xl bg-slate-50 p-3 text-center"><div className="text-xl font-bold">Hybrid</div><div>In‑person / Virtual</div></div>
                <div className="rounded-xl bg-slate-50 p-3 text-center"><div className="text-xl font-bold">HIPAA</div><div>Client privacy</div></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative">
              <div className={`absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-indigo-900 via-indigo-800 to-indigo-700 opacity-10`} />
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow grid place-items-center">
                <img src={HEADSHOT_URL} alt="Ron Queeney" className="h-28 w-28 rounded-full object-cover" />
                <div className="mt-4 text-xl font-semibold">Ron Queeney</div>
                <div className="text-slate-500">Certified Hypnotherapist • Health & Life Coach</div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Specialties</h2>
            <p className="mt-3 text-slate-600">Targeted programs designed to help you change faster and keep results longer.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard title="Weight Loss" bullets={["Reduce cravings & emotional eating","Build consistent habits","Accountability between sessions"]} />
            <ServiceCard title="Quit Smoking" bullets={["Rapid craving control","Relapse prevention plan","Breathing & state anchors"]} />
            <ServiceCard title="Stress & Anxiety" bullets={["Calming techniques you can use anywhere","Sleep support routines","Cognitive reframing"]} />
            <ServiceCard title="Virtual Gastric Band" bullets={["Evidence‑informed scripts","Portion control mindset","4‑session protocol"]} />
          </div>
        </Container>
      </Section>

      {/* CLIENTS & OUTCOMES */}
      <Section id="outcomes" className="bg-white">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Clients & Outcomes</h2>
              <p className="mt-2 text-slate-600">Explore who benefits, how each therapy helps, and the key results you can expect.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {therapies.map((t) => (
              <div key={t.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm uppercase tracking-wider text-slate-500">{t.title}</div>
                <h3 className="mt-1 text-lg font-semibold">Who this helps</h3>
                <p className="mt-1 text-sm text-slate-600">{t.who}</p>
                <h4 className="mt-4 font-semibold">How it helps</h4>
                <ul className="mt-2 space-y-2 text-slate-600 text-sm">
                  {t.helps.map((h, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />{h}</li>
                  ))}
                </ul>
                <h4 className="mt-4 font-semibold">Benefits</h4>
                <ul className="mt-2 space-y-2 text-slate-600 text-sm">
                  {t.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />{b}</li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm">
                  <div className="flex items-start gap-2"><Quote className="mt-0.5 h-4 w-4 text-slate-400" /><em>“{t.testimonial.quote}”</em></div>
                  <div className="mt-1 text-xs text-slate-500">— {t.testimonial.author}</div>
                </div>
                <a href={`#book`} className="mt-5 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700">Book {t.title}</a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ABOUT RON */}
      <Section id="about" className="bg-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Meet Ron</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Ron Queeney is a certified hypnotherapist and integrative health & life coach serving Tampa since 2005. Sessions combine hypnosis, NLP, and practical coaching to help you change beliefs and daily behaviors.
              </p>
              <ul className="mt-6 space-y-2 text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> IMDHA • IACT • NLP practitioner (placeholders)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> Private, confidential 1:1 support</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> In‑person in Tampa & secure tele‑sessions</li>
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Stat icon={Shield} label="Certified" value="Board‑recognized" />
              <Stat icon={Calendar} label="Flexible" value="Weekday & evening" />
              <Stat icon={CreditCard} label="Deposit" value="$$xx refundable" />
              <Stat icon={Star} label="Reviews" value="Client‑rated high" />
            </div>
          </div>
        </Container>
      </Section>

      {/* BOOKING + PAYMENT (IMAGE MOCK) */}
      <Section id="book" className="bg-slate-50">
        <Container>
          <div className="grid items-start gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold tracking-tight">Reserve Your Strategy Session</h2>
              <p className="mt-3 text-slate-600">Choose a time that works for you. A small refundable deposit ("$$xx") holds your spot and reduces no‑shows.</p>
              {/* CALENDAR IMAGE PLACEHOLDER */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow">
                {/* Simple SVG image mock so it renders without external assets */}
                <img
                  alt="Calendar preview"
                  className="w-full rounded-xl"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='520'>
                      <rect width='100%' height='100%' fill='white' />
                      <rect x='20' y='20' width='1160' height='480' rx='16' ry='16' fill='rgb(248,250,252)' stroke='rgb(226,232,240)' />
                      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui' font-size='22' fill='rgb(100,116,139)'>Calendar Embed Image Mock — replace with GHL Calendar later</text>
                    </svg>`
                  )}`}
                />
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <Shield className="h-4 w-4" /> Secure payments via Stripe • Attach product priced at <strong>$$xx</strong> in GHL Paid Calendar
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
                <h3 className="text-lg font-semibold">What’s Included</h3>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> 45–60 min strategy session</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> Personalized plan + first techniques</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> Deposit <strong>$$xx</strong> applied to first package or refunded per policy</li>
                </ul>
                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm">
                  <div className="font-semibold">How payment works</div>
                  <p className="mt-1 text-slate-600">Enable <strong>Paid Booking</strong> on your GHL calendar and attach a Stripe product priced <strong>$$xx</strong>. Confirmation email + SMS are sent automatically.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* SOCIAL PROOF */}
      <Section id="testimonials" className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Client Stories</h2>
            <p className="mt-3 text-slate-600">Real experiences from private clients. Individual results vary.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Testimonial key={i} quote={t.quote} author={t.author} context={t.context} />
            ))}
          </div>
        </Container>
      </Section>

      {/* VIDEOS */}
      <Section id="videos" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Watch Ron</h2>
            <p className="mt-3 text-slate-600">Short demos and overviews from the Tampa Hypnosis Center YouTube channel.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map(v => <YouTubeThumb key={v.id} url={v.url} title={v.title} />)}
          </div>
        </Container>
      </Section>

      {/* LEAD MAGNET */}
      <Section id="guide" className="bg-white">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Not ready to book?</h2>
              <p className="mt-2 text-slate-600">Get Ron’s <strong>7‑Minute Reset</strong> audio and 3 practical tips to feel calmer today. We’ll also send info on programs and pricing.</p>
              {/* Replace the form below with a GHL Form embed later */}
              <form onSubmit={submitLeadMagnet} className="mt-5 grid gap-3 sm:grid-cols-2">
                <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500" />
                <input required type="tel" value={phoneVal} onChange={(e)=>setPhoneVal(e.target.value)} placeholder="Mobile (for SMS tips)" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500" />
                <button className="sm:col-span-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700" type="submit">Send me the audio</button>
              </form>
              <p className="mt-2 text-xs text-slate-500">By submitting, you agree to receive helpful emails/SMS from Tampa Hypnosis Center. Reply STOP to opt out.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
              <h3 className="text-lg font-semibold">What you’ll get</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> MP3 audio to reset in minutes</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> 3 simple techniques for cravings/stress</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600"/> Pricing & next‑step guide</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
            <div className="mt-6 divide-y divide-slate-200">
              {[
                { q: "How does the refundable deposit work?", a: "It’s charged when you book and fully applied to your first package or refunded if you cancel within the policy window. Configure this later with a Paid Calendar and a Stripe product priced $$xx in GHL." },
                { q: "How many sessions will I need?", a: "Most programs run 3–6 sessions depending on goals and progress. Your plan is tailored after the initial strategy session." },
                { q: "Can we meet virtually?", a: "Yes, secure tele‑sessions are available. You’ll receive a join link in your confirmation email/SMS." },
                { q: "Is hypnosis safe?", a: "Yes for most people. It’s a natural, focused state of attention. This is not a substitute for medical or psychological care." },
              ].map((item, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-slate-900">
                    {item.q}
                    <span className="ml-4 text-slate-400 transition group-open:rotate-180">▾</span>
                  </summary>
                  <p className="mt-2 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className={`mt-10 border-t bg-gradient-to-tr from-indigo-900 via-indigo-800 to-indigo-700 text-white`}>
        <Container className="py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-lg font-semibold">Tampa Hypnosis Center</div>
              <p className="mt-2 text-sm text-white/80">{ADDRESS}</p>
              <a href={`tel:+18139195884`} className="mt-1 block text-sm text-white/90">{PHONE}</a>
            </div>
            <div className="text-sm">
              <div className="font-semibold">Quick Links</div>
              <ul className="mt-2 space-y-1 text-white/80">
                <li><a href="#services" className="hover:underline">Services</a></li>
                <li><a href="#outcomes" className="hover:underline">Clients & Outcomes</a></li>
                <li><a href="#book" className="hover:underline">Book Session</a></li>
                <li><a href="#videos" className="hover:underline">Videos</a></li>
                <li><a href="#guide" className="hover:underline">Free Audio</a></li>
                <li><a href="#faq" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div className="text-xs text-white/80">
              <div className="font-semibold">Disclaimer</div>
              <p className="mt-2">Hypnotherapy is a complementary approach and not a substitute for medical or psychological care. Individual results vary.</p>
              <div className="mt-3">© {new Date().getFullYear()} Tampa Hypnosis Center • <a href="#" className="underline">Privacy</a> • <a href="#" className="underline">Terms</a></div>
            </div>
          </div>
        </Container>
      </footer>

      {/* Optional: LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Tampa Hypnosis Center',
            image: HEADSHOT_URL,
            url: 'https://tampahypnosiscenter.com',
            telephone: '+18139195884',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '7320 E. Fletcher Ave, Suite 1A',
              addressLocality: 'Tampa',
              addressRegion: 'FL',
              postalCode: '33637',
              addressCountry: 'US'
            },
            areaServed: 'Tampa Bay',
            sameAs: [ YOUTUBE_CHANNEL ]
          }),
        }}
      />
    </div>
  );
}
