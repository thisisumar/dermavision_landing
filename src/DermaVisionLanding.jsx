import React, { useState, useEffect, useRef } from "react";
import appHome from "./dermavision_home.jpeg";
import logoMark from "./assets/dermavision_mark.png";
import logoLockup from "./assets/dermavision_logo.png";

/* ------------------------------------------------------------------
   Derma Vision - Landing Page
   Design language mirrors the reference screenshots:
   pink / yellow / purple flat-illustration style, soft blobs,
   generous whitespace, rounded geometric sans.
------------------------------------------------------------------- */

const C = {
  // sampled straight off the DermaVision+ app home screen
  blue: "#1668C4",      // primary brand blue (app accent)
  blueDeep: "#0D48A2",  // gradient end on the app's cards
  blueSoft: "#D6E9FA",
  sky: "#3995E8",       // bright secondary blue
  skySoft: "#ECF5FE",
  indigo: "#3141A0",    // the app's violet-blue tile
  indigoSoft: "#DEE4F4",
  teal: "#029AA8",      // the app's teal tile
  tealSoft: "#D3ECF3",
  ink: "#0B1F3A",       // navy headings
  grey: "#5F6C7B",
  wash: "#F4F8FE",      // the app's cool off-white background
};

/* ---------------------------- Fonts + base ---------------------------- */
function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Nunito+Sans:wght@400;600;700&display=swap');
      .dv { font-family: 'Nunito Sans', system-ui, sans-serif; }
      .dv h1, .dv h2, .dv h3, .dv h4, .dv .display { font-family: 'Poppins', system-ui, sans-serif; }
      @keyframes dv-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
      @keyframes dv-rise { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: none } }
      @keyframes dv-sweep { 0% { transform: translateY(-4%) } 100% { transform: translateY(104%) } }
      .dv-float { animation: dv-float 6s ease-in-out infinite; }
      .dv-rise { animation: dv-rise .7s cubic-bezier(.2,.7,.3,1) both; }
      .dv-sweep { animation: dv-sweep 2.4s ease-in-out infinite alternate; }
      .dv-scroll::-webkit-scrollbar { display: none; }
      .dv-scroll { scrollbar-width: none; }

      /* Testimonial rail. Slides are 100% of the *content* box, so the
         side padding is exactly the peek - the two stay in sync at every
         breakpoint and each slide centres itself on snap. */
      .dv-rail {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        padding: 0.75rem 6%;
      }
      .dv-rail > * { flex: 0 0 100%; scroll-snap-align: center; }
      @media (min-width: 768px)  { .dv-rail { padding-left: 14%; padding-right: 14%; } }
      @media (min-width: 1024px) { .dv-rail { padding-left: 19%; padding-right: 19%; } }

      @media (prefers-reduced-motion: reduce) {
        .dv-float, .dv-rise, .dv-sweep { animation: none !important; }
        .dv * { transition: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------- Logo -------------------------------- */
function Logo({ dark = true }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* The app icon itself. Decorative - the wordmark beside it carries the name. */}
      <img
        src={logoMark}
        alt=""
        width="36"
        height="36"
        className="h-9 w-9 flex-none rounded-[11px] bg-white object-contain p-[3px]"
        style={{ boxShadow: "0 6px 14px rgba(22,104,196,.22)" }}
      />
      <span className="leading-none">
        <span
          className="display block text-lg font-extrabold tracking-tight"
          style={{ color: dark ? C.ink : "#fff" }}
        >
          DermaVision<span style={{ color: C.blue }}>+</span>
        </span>
        <span className="mt-0.5 block text-[10px]" style={{ color: dark ? "#536579" : "rgba(255,255,255,.8)" }}>
          AI Skin Care
        </span>
      </span>
    </div>
  );
}

/* -------------------------------- Nav -------------------------------- */
const NAV = [
  { label: "home", href: "#home" },
  { label: "how it works", href: "#how-it-works" },
  { label: "why derma vision", href: "#why" },
  { label: "faq", href: "#faq" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: solid ? "rgba(255,255,255,.92)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        boxShadow: solid ? "0 4px 24px rgba(11,31,58,.06)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" aria-label="Derma Vision home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: C.grey }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.grey)}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: C.blue, boxShadow: "0 10px 22px rgba(22,104,196,.35)" }}
          >
            download
          </a>
        </nav>

        <button
          className="md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round">
            {open ? <><path d="M5 5l14 14" /><path d="M19 5L5 19" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-6 py-4 md:hidden" style={{ borderColor: "#E3ECF7" }}>
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm"
              style={{ color: C.grey }}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full py-3 text-center text-sm font-bold text-white"
            style={{ background: C.blue }}
          >
            download
          </a>
        </div>
      )}
    </header>
  );
}

/* --------------------------- Phone mockup ---------------------------- */

function PhoneScan({ className = "" }) {
  return (
    <div className={"relative mx-auto w-[248px] sm:w-[286px] " + className}>
      <div
        className="relative rounded-[40px] p-[10px]"
        style={{
          background: "linear-gradient(160deg,#3A3A46,#1B1B22)",
          boxShadow: "0 44px 80px rgba(11,31,58,.34), 0 0 0 1px rgba(255,255,255,.06) inset",
        }}
      >
        {/* screen */}
        <div className="relative overflow-hidden rounded-[31px] bg-white">
          <img
            src={appHome}
            alt="The DermaVision+ home screen: a greeting card, quick stats, and the list of the 22 skin conditions the app detects."
            className="block w-full"
            style={{ aspectRatio: "770 / 1600", objectFit: "cover" }}
            loading="lazy"
            decoding="async"
          />
          {/* notch */}
          <div
            className="absolute left-1/2 top-0 h-[18px] w-[92px] -translate-x-1/2 rounded-b-[12px]"
            style={{ background: "#1B1B22" }}
          />
          {/* glass sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 42%)",
            }}
          />
        </div>

        {/* side buttons */}
        <span className="absolute -left-[2px] top-[112px] h-9 w-[3px] rounded-l" style={{ background: "#2C2C36" }} />
        <span className="absolute -left-[2px] top-[158px] h-9 w-[3px] rounded-l" style={{ background: "#2C2C36" }} />
        <span className="absolute -right-[2px] top-[130px] h-14 w-[3px] rounded-r" style={{ background: "#2C2C36" }} />
      </div>
    </div>
  );
}

/* -------------------------------- Hero -------------------------------- */
/* Composition: phone centred, seated figure lower-left, standing figure
   pointing in from the right, soft blobs and confetti behind. */

function SeatedFigure({ className = "" }) {
  return (
    <svg viewBox="0 0 300 260" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dvSeatHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FB4EF" />
          <stop offset="100%" stopColor="#1F5FB5" />
        </linearGradient>
        <linearGradient id="dvSeatTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#45C8CE" />
          <stop offset="100%" stopColor="#029AA8" />
        </linearGradient>
        <linearGradient id="dvSeatLeg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4E93E0" />
          <stop offset="100%" stopColor="#1F63C0" />
        </linearGradient>
      </defs>

      {/* legs stretched to the right, feet toward the phone */}
      <path d="M96 196 C 140 176, 206 178, 246 190 L 250 212 C 200 226, 132 224, 96 214 Z" fill="url(#dvSeatLeg)" />
      <path d="M240 186 q22 -4 30 8 q6 12 -10 16 q-18 4 -26 -8 z" fill="#EFEFF5" />
      <path d="M236 206 q22 -2 28 10 q4 10 -12 12 q-18 2 -22 -10 z" fill="#E2E2EC" />

      {/* seat / hip */}
      <path d="M62 176 C 60 148, 84 132, 112 136 C 140 140, 152 166, 142 196 C 116 212, 74 208, 62 176 Z" fill="url(#dvSeatLeg)" />

      {/* torso, leaning forward over the phone */}
      <path d="M76 148 C 70 112, 92 88, 122 88 C 154 88, 172 114, 166 150 C 144 168, 100 168, 76 148 Z" fill="url(#dvSeatTop)" />

      {/* head + hair */}
      <path d="M84 96 C 66 62, 84 26, 120 22 C 158 18, 182 48, 174 84 C 170 104, 174 122, 166 142 C 158 122, 156 108, 154 96 C 138 108, 112 110, 98 100 C 94 122, 90 140, 84 158 C 74 138, 82 116, 84 96 Z" fill="url(#dvSeatHair)" />
      <path d="M118 52 C 152 48, 168 74, 162 104 C 156 130, 132 140, 114 130 C 104 106, 106 74, 118 52 Z" fill="#F6D2B4" />
      <path d="M110 48 C 142 32, 176 52, 176 88 C 168 62, 142 50, 116 60 Z" fill="#2A6FCB" />

      {/* arm reaching down to her own phone */}
      <path d="M140 150 C 164 160, 180 176, 178 190" fill="none" stroke="#F6D2B4" strokeWidth="15" strokeLinecap="round" />
      <g transform="rotate(24 180 192)">
        <rect x="168" y="176" width="24" height="34" rx="5" fill={C.blue} />
        <rect x="171" y="180" width="18" height="24" rx="2" fill="#fff" opacity=".4" />
      </g>

      {/* ground shadow */}
      <ellipse cx="150" cy="228" rx="104" ry="10" fill="#0B1F3A" opacity=".07" />
    </svg>
  );
}

function StandingFigure({ className = "" }) {
  return (
    <svg viewBox="0 0 260 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dvStandTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#45C8CE" />
          <stop offset="100%" stopColor="#029AA8" />
        </linearGradient>
        <linearGradient id="dvStandLeg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4E93E0" />
          <stop offset="100%" stopColor="#1F5FB5" />
        </linearGradient>
      </defs>

      {/* legs */}
      <path d="M92 210 C 128 202, 172 204, 196 212 L 190 330 q-2 42 -10 62 h-30 q4 -50 2 -92 q-14 44 -24 92 h-30 q6 -56 4 -100 z" fill="url(#dvStandLeg)" />
      <path d="M116 388 q24 -6 34 6 q6 12 -14 14 h-30 q-6 -14 10 -20 z" fill="#EFEFF5" />
      <path d="M158 388 q24 -6 34 6 q6 12 -14 14 h-30 q-6 -14 10 -20 z" fill="#E2E2EC" />

      {/* sweater */}
      <path d="M84 118 C 96 92, 130 80, 164 88 C 196 96, 208 124, 204 164 L 200 220 C 160 234, 116 232, 88 218 Z" fill="url(#dvStandTop)" />

      {/* arm pointing left, toward the phone */}
      <path d="M96 138 C 60 146, 26 152, 8 146" fill="none" stroke="url(#dvStandTop)" strokeWidth="26" strokeLinecap="round" />
      <path d="M14 146 q-14 -2 -12 6 q2 8 16 6 q12 -2 10 -8 z" fill="#F6D2B4" />
      <circle cx="10" cy="150" r="9" fill="#F6D2B4" />

      {/* head */}
      <circle cx="138" cy="52" r="30" fill="#F6D2B4" />
      <path d="M108 46 C 106 14, 148 4, 170 24 C 182 36, 178 54, 172 62 C 170 40, 150 30, 128 38 q-12 4 -20 8 z" fill="#1F5FB5" />
      <path d="M108 44 q-10 6 -6 16 q4 8 10 4 z" fill="#1F5FB5" />
      <path d="M132 82 q12 8 24 0 l0 12 q-14 8 -24 0 z" fill="#EFC49E" />

      {/* ground shadow */}
      <ellipse cx="150" cy="410" rx="72" ry="9" fill="#0B1F3A" opacity=".07" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg,${C.sky},${C.blue},${C.indigo})` }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h1 className="dv-rise display mx-auto max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" style={{ color: C.ink }}>
          With DermaVision+ you
          <br />
          <span style={{ color: C.blue }}>know your skin sooner</span>
        </h1>

        <p className="dv-rise mx-auto mt-5 max-w-lg text-sm sm:text-base lg:text-lg" style={{ color: C.grey, animationDelay: ".08s" }}>
          Point your camera at a spot, mole or rash. Get a clear read on what it
          looks like, how it's changing, and whether it's worth a doctor's time.
        </p>

        <div className="dv-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: ".16s" }}>
          <a
            href="#download"
            className="rounded-full px-8 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.blue, boxShadow: "0 12px 26px rgba(22,104,196,.35)" }}
          >
            download the app
          </a>
          <a
            href="#how-it-works"
            className="rounded-full border-2 px-8 py-3 text-sm font-bold transition-colors"
            style={{ borderColor: C.blueSoft, color: C.blue }}
          >
            see how it works
          </a>
        </div>

        <div className="dv-rise mt-7 flex flex-wrap items-center justify-center gap-2 text-xs" style={{ color: C.grey, animationDelay: ".22s" }}>
          <span>Detects 22 skin conditions, across every skin tone</span>
          <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: C.blue }}>
            22 Diseases
          </span>
        </div>

        {/* ---------------- illustration stage ---------------- */}
        <div className="relative mx-auto mt-12 w-full max-w-3xl" style={{ minHeight: 420 }}>
          {/* blobs */}
          <svg viewBox="0 0 800 520" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="dvBlobA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#C4E0F8" stopOpacity=".85" />
                <stop offset="100%" stopColor="#ECF5FE" stopOpacity=".5" />
              </linearGradient>
              <linearGradient id="dvBlobB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#45C8CE" />
                <stop offset="100%" stopColor="#029AA8" />
              </linearGradient>
            </defs>
            {/* big soft blob behind the phone, left */}
            <path
              d="M112 306 C 84 216, 158 130, 268 118 C 372 106, 430 168, 424 254 C 418 344, 340 418, 236 414 C 152 410, 138 372, 112 306 Z"
              fill="url(#dvBlobA)"
            />
            {/* yellow blob, upper right */}
            <path
              d="M556 96 C 604 66, 664 84, 668 132 C 672 182, 622 210, 578 196 C 534 182, 514 122, 556 96 Z"
              fill="url(#dvBlobB)"
            />
          </svg>

          {/* confetti */}
          <svg viewBox="0 0 800 520" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {/* dashed curve, left */}
            <path d="M104 176 q42 -44 88 -6" fill="none" stroke={C.sky} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 10" />
            {/* dashed curve, right */}
            <path d="M600 172 q56 22 44 76" fill="none" stroke={C.indigo} strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 10" />
            {/* teal dot, left */}
            <circle cx="150" cy="132" r="10" fill="#5AC8E8" />
            <circle cx="150" cy="132" r="3.5" fill="#fff" />
            {/* pink bar, far left */}
            <rect x="0" y="284" width="72" height="5" rx="2.5" fill={C.blue} />
            {/* leaves, bottom left */}
            <path d="M92 468 C 108 436, 108 402, 96 372 C 74 402, 72 440, 92 468 Z" fill="#5AC8E8" />
            <path d="M126 476 C 148 448, 156 412, 148 380 C 120 406, 112 446, 126 476 Z" fill={C.sky} />
            {/* leaves, bottom right */}
            <path d="M700 462 C 718 428, 720 392, 708 362 C 684 392, 682 432, 700 462 Z" fill={C.indigo} />
            <path d="M742 470 C 766 438, 774 398, 764 366 C 734 396, 726 438, 742 470 Z" fill={C.sky} />
            <path d="M664 472 C 678 446, 680 418, 672 394 C 654 418, 652 450, 664 472 Z" fill="#5AC8E8" />
          </svg>

          {/* seated figure, lower left - desktop only */}
          <SeatedFigure className="pointer-events-none absolute bottom-0 left-0 hidden w-56 lg:block xl:w-64" />

          {/* phone, centre */}
          <div className="dv-float relative z-10 flex justify-center pb-6 pt-4">
            <PhoneScan />
          </div>

          {/* standing figure, right - desktop only */}
          <StandingFigure className="pointer-events-none absolute bottom-0 right-0 hidden w-40 lg:block xl:w-48" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Testimonials ---------------------------- */
const QUOTES = [
  {
    role: "Sami",
    city: "LAHORE",
    initials: "SA",
    tint: C.blue,
    text: "Tried the app out of curiosity and it is genuinely well made. Clean layout, quick results, and it covers a good range of skin conditions. Nice work.",
  },
  {
    role: "Aqib",
    city: "KARACHI",
    initials: "AQ",
    tint: C.teal,
    text: "Tested it on a few different photos and the results came back fast. The design is simple and the AI part actually feels useful, not just a gimmick.",
  },
  {
    role: "Mustafa",
    city: "ISLAMABAD",
    initials: "MU",
    tint: C.indigo,
    text: "What I like is how honest it is. It gives you a confidence score and tells you when to see a doctor instead of pretending to know everything. Solid app.",
  },
  {
    role: "Aneela",
    city: "FAISALABAD",
    initials: "AN",
    tint: C.sky,
    text: "Gave it a proper try and it works nicely across different skin tones. Everything is easy to find and the reports are clear. A polished little app.",
  },
  {
    role: "Rohit",
    city: "PESHAWAR",
    initials: "RO",
    tint: C.blue,
    text: "Downloaded it to test and ended up keeping it. Light on the phone, quick to open, and the results are easy to understand. Good product overall.",
  },
  {
    role: "Ilyas",
    city: "MULTAN",
    initials: "IL",
    tint: C.teal,
    text: "Been testing it for a couple of weeks. Fast, clean, and it detects a lot of conditions. For a free app the quality is honestly impressive.",
  },
];

function Arrow({ dir, onClick }) {
  const back = dir === "back";
  return (
    <button
      onClick={onClick}
      aria-label={back ? "Previous testimonial" : "Next testimonial"}
      className="absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full transition hover:scale-110 md:grid"
      style={{
        [back ? "left" : "right"]: "1.25rem",
        background: "rgba(255,255,255,.92)",
        boxShadow: "0 8px 20px rgba(11,31,58,.18)",
      }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={back ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} />
      </svg>
    </button>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const rail = useRef(null);

  /* Scroll so slide n sits in the middle of the rail. The scroll position
     is the single source of truth - `i` follows it, not the other way. */
  const goTo = (n) => {
    const track = rail.current;
    const slide = track?.children[n];
    if (!slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  /* Whichever slide is nearest the centre is the active one - keeps the
     dots honest when the user swipes or drags instead of using the arrows. */
  const syncFromScroll = () => {
    const track = rail.current;
    if (!track) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((slide, n) => {
      const dist = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = n;
      }
    });
    setI(best);
  };

  /* Advance 6s after settling on a slide; pausing cancels the pending hop. */
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => goTo((i + 1) % QUOTES.length), 6000);
    return () => clearTimeout(id);
  }, [i, paused]);

  /* Slide widths are percentage-based, so a resize moves every centre. */
  useEffect(() => {
    const onResize = () => goTo(i);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [i]);

  const step = (delta) => goTo((i + delta + QUOTES.length) % QUOTES.length);

  return (
    <section className="relative overflow-hidden py-16" style={{ background: C.blue }}>
      <h2 className="display text-center text-2xl font-extrabold md:text-3xl text-white">
        What people say about Derma Vision
      </h2>

      <div
        className="relative mx-auto mt-8 max-w-6xl"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Arrow dir="back" onClick={() => step(-1)} />
        <Arrow dir="fwd" onClick={() => step(1)} />

        <div
          ref={rail}
          onScroll={syncFromScroll}
          className="dv-rail dv-scroll"
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {QUOTES.map((q, n) => {
            const active = n === i;
            return (
              <article
                key={q.role}
                className="min-w-0 rounded-lg p-6 transition-all duration-500"
                style={{
                  background: active ? "#fff" : "rgba(255,255,255,.35)",
                  boxShadow: active ? "0 22px 44px rgba(11,31,58,.14)" : "none",
                  transform: active ? "none" : "scale(.94)",
                }}
                aria-label={`${n + 1} of ${QUOTES.length}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="display flex h-11 w-11 flex-none items-center justify-center rounded-full text-sm font-extrabold text-white"
                    style={{
                      background: `linear-gradient(145deg, ${q.tint}, ${C.blueDeep})`,
                      boxShadow: "0 6px 14px rgba(11,31,58,.18)",
                    }}
                    aria-hidden="true"
                  >
                    {q.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="display truncate text-sm font-bold" style={{ color: C.ink }}>
                      {q.role}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold tracking-widest" style={{ color: C.indigo }}>
                      {q.city}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed lg:text-base" style={{ color: C.ink }}>
                  <span className="mr-1 text-lg font-bold" style={{ color: C.blue }}>
                    "
                  </span>
                  {q.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {QUOTES.map((_, n) => (
          <button
            key={n}
            onClick={() => goTo(n)}
            aria-label={`Show testimonial ${n + 1}`}
            className="h-2 rounded-full transition-all"
            style={{ width: n === i ? 22 : 8, background: n === i ? "#fff" : "rgba(255,255,255,.5)" }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Welcome ------------------------------ */
function Welcome() {
  return (
    <section id="why" className="relative overflow-hidden py-20 md:py-28" style={{ background: C.wash }}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <div className="mb-4 h-1 w-12 rounded-full" style={{ background: C.blue }} />
          <h2 className="display text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: C.ink }}>
            Welcome to Derma Vision
          </h2>
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: C.grey }}>
            Your skin is the only organ you can actually see. We help you catch changes early.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 4px 24px rgba(11,31,58,.08)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.blueSoft }}>
              <span style={{ color: C.blue, fontSize: "24px" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg></span>
            </div>
            <h3 className="display text-lg font-bold mb-3" style={{ color: C.ink }}>
              Turn your phone into a dermatologist's tool
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
              Your phone camera becomes a record of what your skin is doing, week by week. Track changes others miss.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 4px 24px rgba(11,31,58,.08)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.indigoSoft }}>
              <span style={{ color: C.indigo, fontSize: "24px" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4z" /><path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></svg></span>
            </div>
            <h3 className="display text-lg font-bold mb-3" style={{ color: C.ink }}>
              AI trained on dermatology expertise
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
              Computer vision trained on reviewed imagery and your history. Spots changes your eyes can filter out.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 4px 24px rgba(11,31,58,.08)" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: C.skySoft }}>
              <span style={{ color: C.sky, fontSize: "24px" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg></span>
            </div>
            <h3 className="display text-lg font-bold mb-3" style={{ color: C.ink }}>
              A clear next step, every time
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
              Get a plain-language read and confidence score. Know whether to watch, treat at home, or see a doctor.
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-8 md:p-10" style={{ background: "#fff", border: `2px solid ${C.blueSoft}` }}>
          <p className="text-center text-base md:text-lg leading-relaxed" style={{ color: C.ink }}>
            <span style={{ fontWeight: 700 }}>Derma Vision doesn't diagnose.</span> It helps you decide when a real doctor needs to.
          </p>
        </div>

        <div className="relative mt-10 hidden">
          <svg viewBox="0 0 640 420" className="w-full" aria-hidden="true">
            <defs>
              <radialGradient id="dvNeb" cx="62%" cy="46%" r="72%">
                <stop offset="0%" stopColor="#1B4F97" />
                <stop offset="55%" stopColor="#0E2F63" />
                <stop offset="100%" stopColor="#071C3E" />
              </radialGradient>
              <linearGradient id="dvBeam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={C.blue} stopOpacity=".85" />
                <stop offset="100%" stopColor="#0E2F63" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="dvHair" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6BA6EE" />
                <stop offset="100%" stopColor="#1F5FB5" />
              </linearGradient>
              <linearGradient id="dvTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#45C8CE" />
                <stop offset="100%" stopColor="#029AA8" />
              </linearGradient>
              <clipPath id="dvNebClip">
                <path d="M212 258 C 214 214, 262 176, 322 158 C 372 100, 452 92, 496 128 C 566 116, 624 152, 622 208 C 634 262, 588 316, 522 326 C 468 372, 386 368, 344 330 C 272 336, 210 306, 212 258 Z" />
              </clipPath>
            </defs>

            {/* nebula of everything the scan sees */}
            <path
              d="M212 258 C 214 214, 262 176, 322 158 C 372 100, 452 92, 496 128 C 566 116, 624 152, 622 208 C 634 262, 588 316, 522 326 C 468 372, 386 368, 344 330 C 272 336, 210 306, 212 258 Z"
              fill="url(#dvNeb)"
            />

            <g clipPath="url(#dvNebClip)">
              {/* beam entering from the phone */}
              <path d="M206 268 L 340 190 L 340 330 Z" fill="url(#dvBeam)" opacity=".5" />

              {/* stars */}
              {[[268,214,1.6],[300,182,1.2],[352,146,2],[404,124,1.4],[470,138,1.8],[532,152,1.2],[588,190,1.6],[560,254,1.3],[498,296,1.9],[430,318,1.2],[368,300,1.7],[286,286,1.4],[330,248,1.1],[452,214,1.5],[600,244,1.3],[248,246,1.2]].map(([x, y, r], n) => (
                <circle key={n} cx={x} cy={y} r={r} fill="#fff" opacity={0.5 + (n % 3) * 0.2} />
              ))}

              {/* orbit / atom motif */}
              <g stroke="#6FA4E4" strokeWidth="1.6" fill="none" opacity=".5">
                <ellipse cx="404" cy="212" rx="44" ry="17" />
                <ellipse cx="404" cy="212" rx="44" ry="17" transform="rotate(60 404 212)" />
                <ellipse cx="404" cy="212" rx="44" ry="17" transform="rotate(-60 404 212)" />
              </g>
              <circle cx="404" cy="212" r="4" fill={C.blue} />

              {/* skin patches under observation, floating in the cloud */}
              {[
                { x: 470, y: 178, r: 24, tone: "#E7B394", spot: "#B4705A" },
                { x: 352, y: 268, r: 19, tone: "#8D5A3C", spot: "#5E3524" },
                { x: 548, y: 244, r: 16, tone: "#F2D3B8", spot: "#C08A6A" },
              ].map((s, n) => (
                <g key={n}>
                  <circle cx={s.x} cy={s.y} r={s.r + 5} fill="none" stroke={C.blue} strokeWidth="1.6" opacity=".7" />
                  <circle cx={s.x} cy={s.y} r={s.r} fill={s.tone} opacity=".95" />
                  <ellipse cx={s.x + 2} cy={s.y - 1} rx={s.r * 0.42} ry={s.r * 0.34} fill={s.spot} opacity=".85" transform={`rotate(${20 + n * 30} ${s.x} ${s.y})`} />
                </g>
              ))}

              {/* faint measurement rings + data ticks */}
              <circle cx="300" cy="222" r="26" fill="none" stroke={C.teal} strokeWidth="1.4" opacity=".55" />
              <circle cx="588" cy="212" r="18" fill="none" stroke="#6FA4E4" strokeWidth="1.4" opacity=".5" />
              <path d="M250 300 l16 -14 l14 10 l20 -22" fill="none" stroke={C.blue} strokeWidth="2" opacity=".7" strokeLinecap="round" />
              <path d="M496 316 h44" stroke="#6FA4E4" strokeWidth="2" opacity=".5" strokeLinecap="round" />
              <path d="M496 306 h26" stroke={C.teal} strokeWidth="2" opacity=".5" strokeLinecap="round" />
            </g>

            {/* woman, seen from behind-left */}
            <g>
              {/* hair */}
              <path
                d="M60 214 C 46 150, 78 96, 132 94 C 186 92, 214 138, 206 190 C 202 224, 210 250, 200 286 C 190 260, 186 240, 184 220 C 168 236, 140 240, 120 228 C 110 262, 104 300, 96 336 C 74 300, 62 258, 60 214 Z"
                fill="url(#dvHair)"
              />
              {/* face */}
              <path d="M126 130 C 166 126, 186 156, 182 192 C 178 226, 152 244, 128 238 C 116 210, 114 166, 126 130 Z" fill="#F6D2B4" />
              {/* front hair sweep */}
              <path d="M118 128 C 152 112, 190 130, 194 168 C 186 146, 160 134, 130 142 Z" fill="#2A6FCB" />
              {/* shoulders / top */}
              <path d="M78 420 C 74 356, 106 300, 148 292 C 196 284, 236 322, 240 420 Z" fill="url(#dvTop)" />
              {/* arm extended toward the nebula */}
              <path d="M172 336 C 196 328, 214 300, 206 272" fill="none" stroke="#F6D2B4" strokeWidth="17" strokeLinecap="round" />
              {/* phone in hand */}
              <g transform="rotate(-16 206 268)">
                <rect x="186" y="242" width="34" height="50" rx="7" fill={C.blue} />
                <rect x="191" y="248" width="24" height="34" rx="3" fill="#fff" opacity=".45" />
                <circle cx="203" cy="288" r="2.6" fill="#fff" opacity=".7" />
              </g>
              {/* glow where beam leaves the phone */}
              <circle cx="214" cy="262" r="9" fill={C.blue} opacity=".35" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- How AI helps --------------------------- */
function HowAI() {
  return (
    <section id="how-it-works" className="py-20 md:py-28" style={{ background: C.wash }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div className="relative">
          <div className="mb-6 h-1 w-12 rounded-full" style={{ background: C.blue }} />
          <svg viewBox="0 0 460 300" className="w-full" aria-hidden="true">
            <defs>
              <linearGradient id="dvFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B9B9C6" />
                <stop offset="100%" stopColor="#B9B9C6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="dvSkinArm" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FBDCC4" />
                <stop offset="100%" stopColor="#F0BE9B" />
              </linearGradient>
              <clipPath id="dvScreen">
                <rect x="126" y="86" width="150" height="94" rx="7" />
              </clipPath>
            </defs>

            {/* thin construction frame, as in the reference */}
            <rect x="96" y="52" width="220" height="150" fill="none" stroke={C.blueSoft} strokeWidth="1.6" />

            {/* the crowd, greyed and fading out - what you see unaided */}
            <g fill="url(#dvFade)">
              {/* left figure */}
              <circle cx="86" cy="96" r="15" />
              <path d="M66 128 q20 -12 40 0 l6 60 h-52 z" />
              <rect x="74" y="186" width="12" height="66" />
              <rect x="92" y="186" width="12" height="66" />
              {/* mid-right figure */}
              <circle cx="300" cy="88" r="15" />
              <path d="M280 120 q20 -12 40 0 l6 62 h-52 z" />
              <rect x="288" y="180" width="12" height="70" />
              <rect x="306" y="180" width="12" height="70" />
              {/* far right figure */}
              <circle cx="368" cy="98" r="16" />
              <path d="M346 132 q22 -13 44 0 l6 58 h-56 z" />
              <rect x="354" y="188" width="13" height="64" />
              <rect x="374" y="188" width="13" height="64" />
              {/* the one being scanned - grey outside the screen */}
              <circle cx="196" cy="92" r="15" />
              <path d="M176 124 q20 -12 40 0 l6 60 h-52 z" />
              <rect x="184" y="182" width="12" height="70" />
              <rect x="202" y="182" width="12" height="70" />
            </g>

            {/* phone body */}
            <rect x="114" y="74" width="174" height="118" rx="14" fill={C.blue} />
            <rect x="126" y="86" width="150" height="94" rx="7" fill="#FDFDFF" />
            <circle cx="299" cy="133" r="3.5" fill="#fff" opacity=".7" />

            {/* what the camera actually reveals - same person, in full colour */}
            <g clipPath="url(#dvScreen)">
              <rect x="126" y="86" width="150" height="94" fill="#FDFDFF" />
              <circle cx="196" cy="112" r="15" fill="#F6D2B4" />
              <path d="M182 100 q14 -12 28 0 q-14 -5 -28 0 z" fill={C.indigo} />
              <path d="M176 144 q20 -12 40 0 l4 36 h-48 z" fill={C.sky} />
              <rect x="184" y="176" width="10" height="8" fill={C.indigo} />
              <rect x="202" y="176" width="10" height="8" fill={C.indigo} />
              {/* the finding: a marked patch and its trend */}
              <circle cx="207" cy="150" r="6" fill="#C0785E" />
              <circle cx="207" cy="150" r="11" fill="none" stroke={C.blue} strokeWidth="1.8" />
              <path d="M138 168 l16 -14 l12 8 l14 -20 l12 10 l20 -30" fill="none" stroke={C.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="232" cy="122" r="2.5" fill={C.teal} />
              <circle cx="248" cy="140" r="2.5" fill={C.teal} />
              <path d="M232 122 L248 140" stroke={C.teal} strokeWidth="1.2" />
            </g>

            {/* hand holding the phone from below-left */}
            <g fill="url(#dvSkinArm)">
              <path d="M2 292 C 24 236, 62 202, 108 190 C 132 184, 152 192, 158 208 C 164 226, 150 242, 128 246 C 104 250, 82 266, 70 296 Z" />
              {/* fingers curling over the front edge */}
              <path d="M126 186 q26 -8 34 8 q6 14 -12 18 q-18 4 -26 -8 z" />
              <path d="M148 176 q24 -8 32 6 q6 12 -10 16 q-18 4 -24 -8 z" />
              <path d="M172 170 q22 -8 30 6 q5 12 -10 15 q-16 3 -22 -8 z" />
              {/* thumb across the back */}
              <path d="M96 214 q34 -22 64 -16 q14 4 8 16 q-8 14 -34 12 q-22 -2 -38 -12 z" />
            </g>

            {/* ground line */}
            <path d="M20 254 H 440" stroke={C.blueSoft} strokeWidth="1.6" />
          </svg>
        </div>

        <div>
          <h2 className="display text-2xl font-extrabold md:text-3xl leading-snug" style={{ color: C.ink }}>
            How AI helps you
            <br />
            <span style={{ color: C.blue }}>catch it earlier</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: C.grey }}>
            Skin changes slowly enough that you stop noticing. Derma Vision's
            model was trained on reviewed dermatology imagery across every skin
            tone, then checked by consultant dermatologists. Each scan is
            measured against your own previous scans - so what you get isn't a
            verdict, it's a trend. Go Derma Vision, and stop waiting to see.
          </p>

          <div className="mt-6 space-y-3">
            {[
              ["Scan", "Ten seconds, any light, any skin tone."],
              ["Compare", "Matched against your history and reviewed imagery."],
              ["Act", "A clear next step, and a report your GP can read."],
            ].map(([t, d], n) => (
              <div key={t} className="flex gap-3">
                <span
                  className="display flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: n === 2 ? C.blue : C.indigo }}
                >
                  {n + 1}
                </span>
                <p className="text-sm" style={{ color: C.grey }}>
                  <strong style={{ color: C.ink }}>{t}.</strong> {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Secret weapon --------------------------- */
function Pocket() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: C.wash }}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-2">
        <div>
          <div className="mb-6 h-1 w-12 rounded-full" style={{ background: C.blue }} />
          <h2 className="display text-2xl font-extrabold md:text-3xl leading-snug" style={{ color: C.ink }}>
            A dermatologist's eye
            <br />
            <span style={{ color: C.blue }}>in your back pocket</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: C.grey }}>
            Waiting lists are long and mirrors are unreliable. Derma Vision
            gives you a second look whenever you want one - in the bathroom, on
            a hike, at 2am with a worried toddler. Scan it, log it, and stop
            carrying the question around. Go Derma Vision.
          </p>
        </div>

        <div className="relative flex justify-center">
          <svg viewBox="0 0 260 300" className="w-64" aria-hidden="true">
            <path d="M40 0 h180 v70 h-180 z" fill={C.sky} />
            <path d="M40 65 h180 v170 q-90 40 -180 0 z" fill={C.indigo} />
            <rect x="140" y="105" width="52" height="66" rx="7" fill={C.blue} />
            <text x="166" y="148" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800" fontFamily="Poppins, sans-serif">
              d
            </text>
            <path d="M70 150 q30 26 62 22" fill="none" stroke="#2A6FCB" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- In numbers ---------------------------- */
const STATS = [
  { n: "99%", t: "of melanoma cases are survivable when they're found at stage 1.", tint: C.indigoSoft, accent: C.indigo, icon: "shield" },
  { n: "14", t: "weeks is the average wait for a routine dermatology referral.", tint: C.skySoft, accent: C.sky, icon: "clock" },
  { n: "1 in 4", t: "GP appointments involve a skin complaint that could start at home.", tint: C.blueSoft, accent: C.blue, icon: "pulse" },
  { n: "10s", t: "is all a Derma Vision scan takes, from camera to clear answer.", tint: C.tealSoft, accent: C.teal, icon: "timer" },
];

/* Line icons for the stat medallions; each inherits the circle's accent via currentColor. */
function StatIcon({ name }) {
  const paths = {
    shield: <><path d="M12 3l7 3v5c0 4.4-3 7.4-7 8.5C8 18.4 5 15.4 5 11V6z" /><path d="M9 11.8l2 2 4-4" /></>,
    clock: <><circle cx="12" cy="12" r="8.4" /><path d="M12 7.4V12l3.1 2" /></>,
    pulse: <path d="M3 12.5h3.5L9 6l3 12 2.5-7.5H21" />,
    timer: <><path d="M9.5 2.5h5" /><path d="M12 2.5v2" /><path d="M18.4 6.9l1.1-1.1" /><circle cx="12" cy="13.5" r="7.5" /><path d="M12 13.5V9.7" /></>,
  };
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Numbers() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="display text-center text-2xl font-extrabold md:text-3xl" style={{ color: C.ink }}>
          In numbers
        </h2>
        <p className="mt-2 text-center text-sm" style={{ color: C.grey }}>
          Why looking early matters more than looking hard.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {STATS.map((s) => (
            <div
              key={s.n}
              className="relative flex items-center gap-4 overflow-hidden rounded-lg bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 14px 34px rgba(11,31,58,.08)" }}
            >
              <div className="flex-1">
                <p className="display text-3xl font-extrabold" style={{ color: C.blue }}>
                  {s.n}
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: C.grey }}>
                  {s.t}
                </p>
              </div>
              <div
                className="flex h-16 w-16 flex-none items-center justify-center rounded-full"
                style={{ background: s.tint, color: s.accent }}
              >
                <StatIcon name={s.icon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FAQ -------------------------------- */
const FAQS = [
  ["Is this a diagnosis?", "No. Derma Vision is a screening and tracking tool. It tells you what a change looks like and how confident it is, then points you to a clinician when that's the right call. Only a doctor can diagnose."],
  ["Does it work on my skin tone?", "Yes. The model is trained and evaluated across the full Fitzpatrick range, and we publish accuracy per skin-tone group rather than a single headline number."],
  ["Where do my photos go?", "Scans are encrypted on your device and processed on our servers, then stored only in your private history. We never sell images and never use them for training without you opting in."],
  ["What if it misses something?", "It will sometimes. That's why every result includes a confidence score, and why anything ambiguous is routed to 'see a doctor' rather than 'looks fine'. If something worries you, go anyway."],
  ["Why an APK instead of the Play Store?", "We ship the APK direct so you always get the current build without waiting on store review. Download it from dermavision.app only - an APK from anywhere else isn't ours, and we can't vouch for what's in it."],
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="display text-center text-2xl font-extrabold md:text-3xl" style={{ color: C.ink }}>
          Questions people actually ask
        </h2>
        <div className="mt-10 space-y-3">
          {FAQS.map(([q, a], n) => {
            const isOpen = open === n;
            return (
              <div key={q} className="overflow-hidden rounded-lg" style={{ background: C.wash }}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : n)}
                  aria-expanded={isOpen}
                >
                  <span className="display text-sm font-bold" style={{ color: C.ink }}>
                    {q}
                  </span>
                  <span
                    className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-white transition-transform"
                    style={{ background: C.blue, transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: C.grey }}>
                    {a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Team -------------------------------- */
const TEAM = [
  { name: "Umar Azam", role: "Developer" },
  { name: "Zoahib Arshad", role: "Developer" },
  { name: "Rameen ", role: "Designer" },
  { name: "Rohit Kumar", role: "Product Manager" },
];

function Team() {
  const [active, setActive] = useState(2);
  return (
    <section className="py-20 md:py-28" style={{ background: C.wash }}>
      <h2 className="display text-center text-xl font-extrabold" style={{ color: C.ink }}>
        Team and advisors
      </h2>

      <div className="dv-scroll mx-auto mt-10 flex max-w-5xl justify-start gap-6 overflow-x-auto px-6 md:justify-center">
        {TEAM.map((m, n) => {
          const on = active === n;
          return (
            <button
              key={m.name}
              onMouseEnter={() => setActive(n)}
              onFocus={() => setActive(n)}
              className="flex-none text-center transition-all"
              style={{ opacity: on ? 1 : 0.55 }}
            >
              <div
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full transition-colors"
                style={{ background: on ? C.blue : C.blueSoft }}
              >
                <svg viewBox="0 0 60 60" className="h-16 w-16" aria-hidden="true">
                  <circle cx="30" cy="22" r="11" fill="none" stroke={on ? "#fff" : C.blue} strokeWidth="1.6" />
                  <path d="M12 52 q18 -22 36 0" fill="none" stroke={on ? "#fff" : C.blue} strokeWidth="1.6" />
                </svg>
              </div>
              <p className="display mt-3 text-xs font-bold" style={{ color: on ? C.ink : C.grey }}>
                {m.name}
              </p>
              <p className="text-[11px]" style={{ color: on ? C.indigo : C.grey }}>
                {m.role}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ Download ----------------------------- */
const APK = {
  href: "/derma_vision.apk",   // served from public/ at the site root
  filename: "DermaVision.apk", // name the browser saves it as
  version: "1.0.4",
  size: "85 MB",
  minAndroid: "Android 8.0+",
  updated: "July 2026",
};

function Download() {
  return (
    <section id="download" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-2">
        <div className="relative flex justify-center">
          <div className="absolute -top-4 left-0 h-1 w-12 rounded-full" style={{ background: C.blue }} />
          <PhoneScan />
        </div>

        <div>
          {/* Full brand lockup - this is the one spot with room for the tagline. */}
          <img
            src={logoLockup}
            alt="DermaVision+ - see better, care better."
            width="150"
            height="150"
            className="mb-4 h-[150px] w-[150px] object-contain"
            loading="lazy"
            decoding="async"
          />
          <h2 className="display text-2xl font-extrabold leading-snug md:text-3xl" style={{ color: C.ink }}>
            Get Derma Vision.
            <br />
            It's free.
          </h2>
          <p className="mt-3 max-w-sm text-sm" style={{ color: C.grey }}>
            Download the Android app and let AI help you spot the changes that
            matter, before they become the ones that don't wait.
          </p>

          <a
            href={APK.href}
            download={APK.filename}
            className="mt-6 inline-flex items-center gap-4 rounded-xl px-6 py-4 text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.blue, boxShadow: "0 14px 30px rgba(22,104,196,.35)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="M7 11l5 5 5-5" />
              <path d="M4 20h16" />
            </svg>
            <span className="text-left leading-tight">
              <span className="block text-[9px] uppercase tracking-widest opacity-90">Direct download</span>
              <span className="display block text-base font-bold">Download APK</span>
            </span>
          </a>

          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: C.grey }}>
            {[
              ["Version", APK.version],
              ["Size", APK.size],
              ["Requires", APK.minAndroid],
              ["Updated", APK.updated],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-1.5">
                <dt>{k}:</dt>
                <dd className="font-semibold" style={{ color: C.ink }}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-lg p-4" style={{ background: C.wash }}>
            <p className="display text-xs font-bold" style={{ color: C.ink }}>
              Installing an APK
            </p>
            <ol className="mt-2 space-y-1.5 text-xs leading-relaxed" style={{ color: C.grey }}>
              <li>1. Tap Download APK - the file lands in your Downloads folder.</li>
              <li>2. Open it. Android will ask permission to install from this source; allow it for your browser.</li>
              <li>3. Tap Install, then open Derma Vision and run your first scan.</li>
            </ol>
            <p className="mt-3 text-[11px]" style={{ color: C.grey }}>
              Only ever install this file from dermavision.app. If you got it
              anywhere else, delete it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Footer ------------------------------ */
function Footer() {
  return (
    <footer className="relative overflow-hidden pb-10 pt-14" style={{ background: C.wash }}>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <Logo />

        <div>
          <p className="display text-xs font-bold" style={{ color: C.ink }}>
            Visiting address
          </p>
          <p className="mt-3 text-xs leading-relaxed" style={{ color: C.grey }}>
            DHA SUFFA University
            <br />
            Defence extension 7
            <br />
            Pakistan,karachi
          </p>
        </div>

        <div>
          <p className="display text-xs font-bold" style={{ color: C.ink }}>
            Contact
          </p>
          <p className="mt-3 text-xs" style={{ color: C.blue }}>
            Tel: +44 161 000 0000
          </p>
          <p className="mt-1 text-xs font-bold" style={{ color: C.blue }}>
            Mail: uazam100@gmail.com
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xs" style={{ color: C.grey }}>
            (c) 2026 Derma Vision .
          </p>
          <p className="text-xs" style={{ color: C.grey }}>
            All rights reserved.
          </p>
          <div className="mt-4 flex gap-2 md:justify-end">
            {["in", "f", "t", "ig"].map((s) => (
              <span
                key={s}
                className="flex h-6 w-6 items-center justify-center rounded text-[9px] font-bold text-white"
                style={{ background: C.blue }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl px-6 text-[10px]" style={{ color: C.grey }}>
        Derma Vision is a wellness and screening tool. It does not diagnose,
        treat or replace medical advice. If something concerns you, see a
        doctor.
      </p>

      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{ background: `linear-gradient(90deg,${C.sky},${C.blue},${C.indigo})` }}
      />
    </footer>
  );
}

/* -------------------------------- Page ------------------------------- */
export default function DermaVisionLanding() {
  return (
    <div className="dv min-h-screen bg-white antialiased">
      <Fonts />
      <Nav />
      <main>
        <Hero />
        <Testimonials />
        <Welcome />
        <HowAI />
        <Pocket />
        <Numbers />
        <FAQ />
        <Team />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
