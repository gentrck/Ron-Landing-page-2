import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CreditCard,
  Shield,
  Star,
  CheckCircle2,
  Phone,
  PlayCircle,
  Quote,
  ArrowRight
} from "lucide-react";

/**
 * SIMON-SINEK STYLE THEME FOR RON
 * - Dark textured background with white text
 * - Orange accents (#ff6a00) + electric blue CTA band (#2563eb by default Tailwind)
 * - Big hero with image overlay + bold headline
 * - Section blocks with grayscale imagery & accent chips
 * - Retains your original arrays (therapies, videos, testimonials) + calendar image mock + $$xx
 */

// ----------- CONFIG -----------
const HEADSHOT_URL =
  "https://tampahypnosiscenter.com/wp-content/uploads/tampa-hypnosis-center-logo-v3.png";
const PHONE = "(813) 919-5884";
const ADDRESS = "7320 E. Fletcher Ave, Suite 1A, Tampa, FL 33637";
const YOUTUBE_CHANNEL = "https://www.youtube.com/user/TampaHypnosis";

// Replace with your hero background (wide image). Can be texture or a clinic photo.
const HERO_BG =
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop"; // placeholder texture

const ORANGE = "bg-[#ff6a00]"; // accent
const ORANGE_TEXT = "text-[#ff6a00]";
const BLUE = "bg-[#2563eb]"; // CTA band

// ----------- CONTENT DATA -----------
const therapies = [
  {
    id: "weight-loss",
    title: "Weight Loss",
    who: "Busy professionals struggling with evening cravings and stress eating.",
    helps: [
      "Reduce cravings & emotional eating",
      "Build consistent habits",
      "Accountability between sessions",
    ],
    benefits: [
      "Down 8–15 lbs in 6–8 weeks (with plan)",
      "Better sleep and energy",
      "Sustainable routines",
    ],
    testimonial: {
      quote:
        "Identified 3 triggers for late-night snacking. Down 11 lbs in 6 weeks.",
      author: "S. L.",
    },
  },
  {
    id: "quit-smoking",
    title: "Quit Smoking",
    who: "Long-time smokers ready for a clean break with relapse prevention.",
    helps: ["Rapid craving control", "Relapse prevention plan", "Breathing anchors"],
    benefits: [
      "Craving intensity drops quickly",
      "Clear plan for high-risk moments",
      "Calmer baseline",
    ],
    testimonial: {
      quote:
        "After two sessions I stopped smoking. The calm breathing trick was a lifesaver.",
      author: "M. M.",
    },
  },
  {
    id: "stress-anxiety",
    title: "Stress & Anxiety",
    who: "High-performers dealing with overthinking, spikes, or sleep issues.",
    helps: ["Portable calming techniques", "Sleep support routines", "Reframing"],
    benefits: ["Fewer spikes & faster recovery", "More focus", "Better sleep"],
    testimonial: {
      quote: "I finally have tools to ground myself during anxiety spikes.",
      author: "J. R.",
    },
  },
  {
    id: "virtual-gastric-band",
    title: "Virtual Gastric Band",
    who: "Portion control without surgery (4-session protocol).",
    helps: ["Evidence-informed scripts", "Portion mindset", "Progress checks"],
    benefits: [
      "Mindful eating becomes simpler",
      "Less snacking between meals",
      "Consistent results with plan",
    ],
    testimonial: {
      quote: "Felt in control at meals for the first time in years.",
      author: "K. T.",
    },
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
    title: "Tampa Hypnosis Center — YouTube Channel",
    url: YOUTUBE_CHANNEL,
  },
];

const testimonials = [
  {
    quote: "Amazing experience… made me aware of different parts of my mind.",
    author: "Shazia",
    context: "General Hypnosis",
  },
  {
    quote: "Ron personalizes his sessions — 100% organic and unscripted.",
    author: "Client Review",
    context: "Private Session",
  },
  {
    quote: "Professional and effective. Helped me get back in control.",
    author: "Pat",
    context: "Strategy Session",
  },
];

// ----------- UI BASICS -----------
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Kicker = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
    {children}
  </span>
);

const ServiceCard = ({ title, bullets }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90 shadow-sm backdrop-blur transition hover:bg-white/10">
    <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
    <ul className="mt-4 space-y-2 text-sm">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
          {b}
        </li>
      ))}
    </ul>
  </div>
);

const Testimonial = ({ quote, author, context }) => (
  <div className="rounded-2xl border border-white/10 bg-white p-6 text-slate-800 shadow">
    <div className="flex items-center gap-1 text-amber-500" aria-label="rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
    <p className="mt-4 leading-relaxed">“{quote}”</p>
    <div className="mt-3 text-sm font-semibold">{author}</div>
    <div className="text-xs text-slate-500">{context}</div>
  </div>
);

function YouTubeThumb({ url, title }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow hover:bg-white/10"
    >
      <div className="aspect-video grid place-items-center bg-black/40">
        <PlayCircle className="h-12 w-12 text-white/80 transition group-hover:scale-110" />
      </div>
      <div className="p-4 text-sm font-medium text-white">{title}</div>
    </a>
  );
}

// ----------- PAGE -----------
export default function RonQueeneyLanding() {
  const [email, setEmail] = useState("");
  const [phoneVal, setPhoneVal] = useState("");

  const submitLeadMagnet = (e) => {
    e.preventDefault();
    alert("Demo only. In GHL, embed your Form and map to a workflow.");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10" />
            <div className="text-sm uppercase tracking-widest text-white/70">
              Tampa Hypnosis Center
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="tel:+18139195884"
              className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 md:flex"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a
              href="#book"
              className={`rounded-xl ${ORANGE} px-4 py-2 text-sm font-semibold text-black shadow`}
            >
              Book Now
            </a>
          </div>
        </Container>
      </header>

      {/* HERO */}
      <Section id="top" className="py-28">
        <div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Kicker>Believing Changes Everything</Kicker>
              <h1 className="mt-4 text-5xl font-extrabold tracking-tight md:text-6xl">
                Break Habits. Reduce Stress.{" "}
                <span className={ORANGE_TEXT}>Feel in Control.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/80">
                Private hypnotherapy with <strong>Ron Queeney</strong> in
                Tampa, FL. Evidence-informed approaches for weight loss,
                smoking cessation, and anxiety reduction.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#book"
                  className={`inline-flex items-center gap-2 rounded-xl ${ORANGE} px-5 py-3 text-sm font-semibold text-black`}
                >
                  <Calendar className="h-4 w-4" />
                  Book Your Session
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#videos"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  <PlayCircle className="h-4 w-4" />
                  Watch Videos
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow grid place-items-center">
                <img
                  src={HEADSHOT_URL}
                  alt="Ron Queeney"
                  className="h-28 w-28 rounded-full object-cover"
                />
                <div className="mt-4 text-xl font-semibold">Ron Queeney</div>
                <div className="text-white/70">
                  Certified Hypnotherapist • Health & Life Coach
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ABOUT / SPECIALTIES ON DARK */}
      <Section id="services" className="pt-0">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                About <span className={ORANGE_TEXT}>Ron</span>
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                Since 2005, Ron has helped clients change faster with practical
                hypnosis and coaching. Sessions combine NLP, hypnosis, and
                behavior design to convert insight into daily action.
              </p>
              <ul className="mt-6 grid gap-3 text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  Private, confidential 1:1 support (in-person & virtual)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  Practical techniques for cravings & stress
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  Tailored plan after strategy session
                </li>
              </ul>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ServiceCard
                title="Weight Loss"
                bullets={[
                  "Reduce cravings & emotional eating",
                  "Build consistent habits",
                  "Accountability",
                ]}
              />
              <ServiceCard
                title="Quit Smoking"
                bullets={[
                  "Rapid craving control",
                  "Relapse prevention plan",
                  "Breathing anchors",
                ]}
              />
              <ServiceCard
                title="Stress & Anxiety"
                bullets={[
                  "Calming techniques anywhere",
                  "Sleep support routines",
                  "Reframing",
                ]}
              />
              <ServiceCard
                title="Virtual Gastric Band"
                bullets={["Evidence-informed scripts", "Portion mindset", "4-session protocol"]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* BIG QUOTE BAND / IMAGE SECTION */}
      <Section className="py-24">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[url('https://images.unsplash.com/photo-1559757175-08b0da59bb2b?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
            <div className="bg-black/60 p-10 md:p-16">
              <div className="max-w-3xl">
                <h3 className="text-3xl font-extrabold leading-tight">
                  “We imagine a version of you that feels calm, focused, and in control.”
                </h3>
                <p className="mt-4 text-white/80">
                  Start with a strategy session. If it’s not a fit, your deposit is refunded per policy.
                </p>
                <a
                  href="#book"
                  className={`mt-6 inline-flex items-center gap-2 rounded-xl ${ORANGE} px-5 py-3 text-sm font-semibold text-black`}
                >
                  Reserve Your Session <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CLIENT STORIES (LIGHT CARDS ON DARK) */}
      <Section id="testimonials" className="pt-0">
        <Container>
          <h2 className="text-3xl font-extrabold tracking-tight">Client Stories</h2>
          <p className="mt-2 text-white/70">
            Real experiences from private clients. Individual results vary.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Testimonial
                key={i}
                quote={t.quote}
                author={t.author}
                context={t.context}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* VIDEOS (DARK THUMBS) */}
      <Section id="videos">
        <Container>
          <h2 className="text-3xl font-extrabold tracking-tight">Watch Ron</h2>
          <p className="mt-2 text-white/70">Short demos and overviews from the YouTube channel.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <YouTubeThumb key={v.id} url={v.url} title={v.title} />
            ))}
          </div>
        </Container>
      </Section>

      {/* PROGRAMS / OUTCOMES GRID */}
      <Section id="outcomes" className="pt-0">
        <Container>
          <h2 className="text-3xl font-extrabold tracking-tight">Programs & Outcomes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {therapies.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/90"
              >
                <div className="text-xs uppercase tracking-wider text-white/60">
                  {t.title}
                </div>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Who this helps
                </h3>
                <p className="mt-1 text-sm text-white/70">{t.who}</p>

                <h4 className="mt-4 font-semibold text-white">How it helps</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  {t.helps.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-4 font-semibold text-white">Benefits</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  {t.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-xl bg-black/30 p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Quote className="mt-0.5 h-4 w-4 text-white/50" />
                    <em>“{t.testimonial.quote}”</em>
                  </div>
                  <div className="mt-1 text-xs text-white/50">— {t.testimonial.author}</div>
                </div>

                <a
                  href="#book"
                  className={`mt-5 inline-block rounded-xl ${ORANGE} px-4 py-2 text-sm font-semibold text-black`}
                >
                  Book {t.title}
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* BIG BLUE CTA BAND */}
      <div className={`${BLUE} py-12 text-center`}>
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="text-sm uppercase tracking-widest text-white/80">
              Ready when you are
            </div>
            <h3 className="mt-2 text-3xl font-extrabold">LET’S TALK!</h3>
            <p className="mt-2 text-white/90">
              Book a strategy session and get practical steps you can use today.
            </p>
            <a
              href="#book"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow"
            >
              Reserve Your Time <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </div>

      {/* BOOKING + PAYMENT (kept as IMAGE MOCK) */}
      <Section id="book" className="bg-black/40">
        <Container>
          <div className="grid items-start gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="text-3xl font-extrabold tracking-tight">Reserve Your Strategy Session</h2>
              <p className="mt-3 text-white/80">
                Choose a time that works for you. A small refundable deposit
                (“$$xx”) holds your spot and reduces no-shows.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white p-4 shadow">
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
              <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
                <Shield className="h-4 w-4" /> Secure payments via Stripe • Attach
                product priced at <strong>$$xx</strong> in GHL Paid Calendar
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">What’s Included</h3>
                <ul className="mt-4 space-y-2 text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                    45–60 min strategy session
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                    Personalized plan + first techniques
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                    Deposit <strong>$$xx</strong> applied or refunded per policy
                  </li>
                </ul>
                <div className="mt-6 rounded-xl bg-black/30 p-4 text-sm text-white/80">
                  <div className="font-semibold">How payment works</div>
                  <p className="mt-1">
                    Enable <strong>Paid Booking</strong> on your GHL calendar and
                    attach a Stripe product priced <strong>$$xx</strong>. Confirmation
                    email + SMS are automatic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* LEAD MAGNET (LIGHT-on-DARK) */}
      <Section id="guide" className="pt-0">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                Not ready to book?
              </h2>
              <p className="mt-2 text-white/80">
                Get Ron’s <strong>7-Minute Reset</strong> audio and 3 practical
                tips to feel calmer today. We’ll also send info on programs and
                pricing.
              </p>
              <form
                onSubmit={submitLeadMagnet}
                className="mt-5 grid gap-3 sm:grid-cols-2"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
                />
                <input
                  required
                  type="tel"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  placeholder="Mobile (for SMS tips)"
                  className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/40"
                />
                <button
                  className={`sm:col-span-2 rounded-xl ${ORANGE} px-5 py-3 text-sm font-semibold text-black`}
                  type="submit"
                >
                  Send me the audio
                </button>
              </form>
              <p className="mt-2 text-xs text-white/50">
                By submitting, you agree to receive helpful emails/SMS from Tampa
                Hypnosis Center. Reply STOP to opt out.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">What you’ll get</h3>
              <ul className="mt-3 space-y-2 text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  MP3 audio to reset in minutes
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  3 simple techniques for cravings/stress
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                  Pricing & next-step guide
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight">FAQ</h2>
            <div className="mt-6 divide-y divide-white/10">
              {[
                {
                  q: "How does the refundable deposit work?",
                  a: "It’s charged when you book and fully applied to your first package or refunded if you cancel within the policy window. Configure this later with a Paid Calendar and a Stripe product priced $$xx in GHL.",
                },
                {
                  q: "How many sessions will I need?",
                  a: "Most programs run 3–6 sessions depending on goals and progress. Your plan is tailored after the initial strategy session.",
                },
                {
                  q: "Can we meet virtually?",
                  a: "Yes, secure tele-sessions are available. You’ll receive a join link in your confirmation email/SMS.",
                },
                {
                  q: "Is hypnosis safe?",
                  a: "Yes for most people. It’s a natural, focused state of attention. This is not a substitute for medical or psychological care.",
                },
              ].map((item, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    {item.q}
                    <span className="ml-4 text-white/40 transition group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-2 text-white/80">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FOOTER (DARK) */}
      <footer className="mt-10 border-t border-white/10 bg-black py-10 text-white/80">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-lg font-semibold text-white">
                Tampa Hypnosis Center
              </div>
              <p className="mt-2 text-sm">{ADDRESS}</p>
              <a href="tel:+18139195884" className="mt-1 block text-sm">
                {PHONE}
              </a>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-white">Quick Links</div>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#services" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#outcomes" className="hover:underline">
                    Programs & Outcomes
                  </a>
                </li>
                <li>
                  <a href="#book" className="hover:underline">
                    Book Session
                  </a>
                </li>
                <li>
                  <a href="#videos" className="hover:underline">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#guide" className="hover:underline">
                    Free Audio
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-white">Disclaimer</div>
              <p className="mt-2">
                Hypnotherapy is a complementary approach and not a substitute
                for medical or psychological care. Individual results vary.
              </p>
              <div className="mt-3">
                © {new Date().getFullYear()} Tampa Hypnosis Center •{" "}
                <a href="#" className="underline">
                  Privacy
                </a>{" "}
                •{" "}
                <a href="#" className="underline">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Tampa Hypnosis Center",
              image: HEADSHOT_URL,
              url: "https://tampahypnosiscenter.com",
              telephone: "+18139195884",
              address: {
                "@type": "PostalAddress",
                streetAddress: "7320 E. Fletcher Ave, Suite 1A",
                addressLocality: "Tampa",
                addressRegion: "FL",
                postalCode: "33637",
                addressCountry: "US",
              },
              areaServed: "Tampa Bay",
              sameAs: [YOUTUBE_CHANNEL],
            }),
          }}
        />
      </footer>
    </div>
  );
}
