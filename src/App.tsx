import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Send, ChevronDown } from "lucide-react";

const INVITATION = {
  couple: {
    bride: "Misna",
    groom: "Rasmi",
    brideFull: "Fathima Misna",
    groomFull: "Mohamed Rasmi",
  },
  date: {
    displayNumeric: "29 . 07 . 2026",
    displayLong: "Wednesday, 29 July 2026 (Hijri 1448 Safar 14)",
    countdownTarget: "July 29, 2026 19:30:00",
  },
  time: {
    ceremony: "7:30 PM",
    reception: "7:30 PM onwards",
  },
  venue: {
    name: "Shanee Banquets",
    city: "No.50, Waikkal 61110",
    mapQuery: "Shanee Banquets, Waikkal 61110",
    googleMapsLink: "https://maps.app.goo.gl/1zzRrxLd3mqW9tj76",
  },
  rsvpContacts: [
    "RASMI & MISNA : 0770880317",
  ],
} as const;

const backgroundMusic = "/Wedding Nasheed - Muhammad Al Muqit.mp3";
const googleScriptUrl = "https://script.google.com/macros/s/AKfycbxnSFSaqtaiB8PEwXS-CWSCzsdt3D_c7o-8KK33X9q-B45I4IBtU30ZjiNUZgK4qb8n/exec";

const publicImagePath = (fileName: string) => `/images/${fileName.replaceAll(" ", "%20")}`;

const HERO_BACKGROUND_IMAGE = `/${"WhatsApp Image 2026-06-21 at 02.10.46 (3).jpeg".replaceAll(" ", "%20")}`;
const FEATURED_COUPLE_IMAGE = publicImagePath("1 (6).jpg");
const DETAILS_BACKGROUND_IMAGE = `/${"WhatsApp Image 2026-06-18 at 19.43.18.jpeg".replaceAll(" ", "%20")}`;
const SCHEDULE_BACKGROUND_IMAGE = `/${"WhatsApp Image 2026-06-18 at 19.38.20.jpeg".replaceAll(" ", "%20")}`;
const COUNTDOWN_BACKGROUND_IMAGE = `/${"ChatGPT Image Jun 18, 2026, 07_06_21 PM.png".replaceAll(" ", "%20")}`;

function FloatingPetals() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#eedadb", "#dfbfc2", "#cea0a4", "#bd8186", "#ffb7c5"];
    const petalCount = isMobile ? 10 : 18;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_10px_rgba(213,63,140,0.3)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer({ isDark = false }: { isDark?: boolean }) {
  const targetDate = new Date(INVITATION.date.countdownTarget).getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className={`relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] border flex flex-col items-center justify-center overflow-hidden transition-all duration-700 group-hover:-translate-y-3 ${isDark ? "bg-[#9d6065] border-white/20" : "bg-white border-theme-100/60"
            }`}>
            <div className={`absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] rounded-t-full pointer-events-none ${isDark ? "border-white/30" : "border-theme-300/50"
              }`} />

            {/* The Number */}
            <span className={`text-2xl sm:text-3xl md:text-5xl font-playball leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110 ${isDark ? "text-white" : "text-theme-800"
              }`}>
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className={`text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border shadow-sm whitespace-nowrap ${isDark ? "bg-white/10 text-white border-white/20" : "bg-stone-50 text-stone-500 border-theme-100/50"
                }`}>
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className={`absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 ${isDark ? "bg-white/40" : "bg-theme-300"
              }`} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}


export default function WeddingInvitation() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    guests: "1",
  });
  const [wishForm, setWishForm] = useState({
    name: "",
    message: "",
  });
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [wishStatus, setWishStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const introVideoRef = React.useRef<HTMLVideoElement>(null);

  const submitToGoogleSheet = async (payload: Record<string, string>) => {
    if (!googleScriptUrl) {
      throw new Error("Google Script URL is not configured");
    }

    try {
      await fetch(googleScriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
      });
      // With no-cors, we get an opaque response so we can't check response.ok
      // If it didn't throw a network error, we assume it succeeded
    } catch (error) {
      throw new Error("Request failed: " + error);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rsvpForm.name.trim()) {
      setRsvpStatus("error");
      return;
    }

    setRsvpStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "rsvp",
        name: rsvpForm.name.trim(),
        guests: rsvpForm.guests,
        dietaryNotes: "",
      });
      setRsvpStatus("success");
      setRsvpForm({ name: "", guests: "1" });
    } catch {
      setRsvpStatus("error");
    }
  };

  const handleWishSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      setWishStatus("error");
      return;
    }

    setWishStatus("sending");

    try {
      await submitToGoogleSheet({
        action: "wish",
        name: wishForm.name.trim(),
        message: wishForm.message.trim(),
      });
      setWishStatus("success");
      setWishForm({ name: "", message: "" });
    } catch {
      setWishStatus("error");
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  useEffect(() => {
    if (isOpened && !isPlaying && !hasAttemptedAutoplay && audioRef.current) {
      setHasAttemptedAutoplay(true);

      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          const playOnInteraction = () => {
            if (audioRef.current && !isPlaying) {
              audioRef.current
                .play()
                .then(() => {
                  setIsPlaying(true);
                  window.removeEventListener("click", playOnInteraction);
                })
                .catch(() => { });
            }
          };

          window.addEventListener("click", playOnInteraction);
        });
    }
  }, [isOpened, isPlaying, hasAttemptedAutoplay]);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#faf7f2] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={introVideoRef}
              src="/Wedding_invitation_background_go…_202606180200.mp4"
              muted={!hasStarted}
              playsInline
              preload="auto"
              className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${!hasStarted ? "blur-xl scale-110 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              onEnded={() => setIsOpened(true)}
              onError={() => setIsOpened(true)}
            />

            {!hasStarted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[120] bg-black/40 backdrop-blur-[2px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12"
                  >
                    <h2 className="font-playball text-4xl md:text-6xl text-[#9d6065] mb-6 drop-shadow-2xl">The Wedding of</h2>
                    <div className="flex flex-col items-center gap-4">
                      <span className="font-script text-4xl md:text-6xl text-[#9d6065] drop-shadow-lg text-center max-w-[90vw] leading-tight">{INVITATION.couple.groomFull}</span>
                      <span className="font-script text-3xl md:text-5xl text-[#9d6065]/80 drop-shadow-lg">&</span>
                      <span className="font-script text-4xl md:text-6xl text-[#9d6065] drop-shadow-lg text-center max-w-[90vw] leading-tight">{INVITATION.couple.brideFull}</span>
                    </div>
                  </motion.div>

                  <button
                    onClick={() => {
                      setHasStarted(true);
                      if (introVideoRef.current) {
                        introVideoRef.current.muted = false;
                        introVideoRef.current.currentTime = 0;
                        introVideoRef.current.play();
                      }
                    }}
                    className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-[#dfbfc2] opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 font-cinzel font-bold text-black text-sm tracking-[0.4em] uppercase">Open Invitation</span>
                  </button>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 text-white/50 text-[10px] uppercase tracking-[0.4em]"
                  >
                    Click to begin
                  </motion.div>
                </motion.div>
              </div>
            )}

            {hasStarted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-[105] pointer-events-none text-center px-6"
                >
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="font-playball text-4xl md:text-7xl text-[#9d6065] mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                  >
                    Wedding Invitation
                  </motion.h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="h-1 w-32 md:w-48 bg-[#9d6065] mb-6"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <span className="font-script text-5xl md:text-7xl text-[#9d6065] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-center max-w-[90vw] leading-tight">{INVITATION.couple.groomFull}</span>
                    <span className="font-script text-4xl md:text-6xl text-[#9d6065]/80 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">&</span>
                    <span className="font-script text-5xl md:text-7xl text-[#9d6065] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] text-center max-w-[90vw] leading-tight">{INVITATION.couple.brideFull}</span>
                  </motion.div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setIsOpened(true)}
                  className="absolute bottom-10 right-10 z-[110] px-8 py-3 bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.4em] rounded-full border border-white/20 hover:bg-white/20 transition-all font-bold"
                >
                  Skip Intro
                </motion.button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section className="w-full relative flex items-center justify-center overflow-hidden bg-white min-h-[85vh]">


              <div
                className="absolute inset-0 bg-center bg-cover opacity-100"
                style={{ backgroundImage: `url("${HERO_BACKGROUND_IMAGE}")` }}
                aria-hidden="true"
              />
              <div className="relative z-10 w-full max-w-5xl px-6 py-24 md:py-32 text-center">
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-xs tracking-[0.6em] font-bold text-[#7c4146] drop-shadow-sm"
                >
                  Wedding invitation
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.8 }}
                  className="mt-10"
                >
                  <h1 className="font-script text-6xl sm:text-7xl md:text-8xl text-[#9d6065] drop-shadow-md leading-none max-w-[90vw] mx-auto leading-tight">
                    {INVITATION.couple.groomFull}
                  </h1>
                  <div className="mt-6 flex items-center justify-center gap-5">
                    <div className="h-px w-14 bg-[#7c4146]/40" />
                    <span className="font-script text-5xl md:text-6xl text-[#7c4146] drop-shadow-sm">&</span>
                    <div className="h-px w-14 bg-[#7c4146]/40" />
                  </div>
                  <h1 className="mt-6 font-script text-6xl sm:text-7xl md:text-8xl text-[#9d6065] drop-shadow-md leading-none max-w-[90vw] mx-auto leading-tight">
                    {INVITATION.couple.brideFull}
                  </h1>

                  <div className="mt-10 flex justify-center w-full">
                    <p className="text-[#9d6065] text-3xl md:text-4xl drop-shadow-sm font-bold" dir="rtl" style={{ fontFamily: 'Amiri, serif' }}>
                      بسم الله الرحمن الرَّحِيمِ
                    </p>
                  </div>
                  <p className="mt-4 font-serif text-base md:text-sm text-[#9d6065]/80 leading-loose max-w-xl mx-auto px-4">
                    "In the Name of Allah, the most Gracious, the most Merciful. "
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="mt-12 space-y-5"
                >
                  <p className="font-cinzel text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold text-[#7c4146] drop-shadow-sm">
                    {INVITATION.date.displayLong} · {INVITATION.time.reception}
                  </p>
                  <p className="text-[#7c4146] text-base md:text-sm font-bold font-serif leading-loose max-w-2xl mx-auto drop-shadow-sm">
                    Together with our families, we request the honour of your presence as we celebrate our wedding.
                  </p>

                  <a
                    href="#details"
                    className="inline-flex items-center justify-center gap-2 mt-6 px-8 py-4 bg-[#9d6065] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] shadow-xl hover:bg-black transition-colors"
                  >
                    View Details
                    <ChevronDown className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>

              {/* Subtle Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
              >
                <div className="w-px h-14 bg-gradient-to-b from-[#9d6065]/30 to-transparent rounded-full overflow-hidden">
                  <motion.div
                    animate={{ y: [-56, 56] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-1/2 bg-[#bd8186]/45"
                  />
                </div>
              </motion.div>
            </section>


            {/* Wedding Details Section */}
            <section id="details" className="relative pt-12 md:pt-20 pb-24 md:pb-32 w-full flex flex-col items-center bg-[#eedadb]/10 overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover opacity-60"
                style={{ backgroundImage: `url("${DETAILS_BACKGROUND_IMAGE}")` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-[#faf7f2]/80" aria-hidden="true" />

              {/* Ornate Frame Border Overlay */}
              <div className="absolute inset-4 md:inset-8 border-[1.5px] border-[#4a5d23]/30 pointer-events-none z-10" />
              <div className="absolute inset-5 md:inset-10 border-[0.5px] border-[#c1b199]/20 pointer-events-none z-10" />

              <div className="max-w-[1100px] w-full flex flex-col items-center text-center relative z-20 px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-16 space-y-6"
                >
                  <div className="flex items-center gap-4 opacity-40 mb-12">
                    <div className="h-px w-12 bg-[#9d6065]" />
                    <Sparkles className="w-4 h-4 text-[#bd8186]" />
                    <div className="h-px w-12 bg-[#9d6065]" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-6 mb-16 max-w-3xl text-center px-4">
                    <p className="font-serif text-lg md:text-xl text-[#9d6065]/90 leading-loose font-bold mb-4">
                      "Barakkallah Laka, wabaarakka alayka, wajama'a Baynakuma fee Khayirn "
                    </p>
                  </div>

                  <div className="flex items-center gap-4 opacity-40 mt-4 mb-8">
                    <div className="h-px w-8 bg-[#9d6065]" />
                    <Sparkles className="w-3 h-3 text-[#bd8186]" />
                    <div className="h-px w-8 bg-[#9d6065]" />
                  </div>

                  <div className="text-[#9d6065] space-y-4">
                    <p className="font-serif text-base md:text-[15px] font-medium leading-loose max-w-3xl border-t border-b border-[#eedadb]/50 py-8 px-4">
                      <span className="text-xl font-serif text-stone-700 font-bold mb-4 block">Mr. & Mrs. Hilmi Marikkar</span>
                      Request the honour of your presence at the Waleema ceremony of their beloved son<br />
                      <span className="text-[#bd8186] text-3xl my-4 block font-playball">{INVITATION.couple.groomFull}</span>
                      <span className="text-stone-700 text-sm font-bold block mb-4 uppercase tracking-[0.3em]">Weds</span>
                      <span className="text-[#bd8186] text-3xl my-4 block font-playball">{INVITATION.couple.brideFull}</span>
                      <span className="text-[#9d6065] font-serif font-bold italic mt-6 block text-lg">Insha Allah</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="font-cinzel text-xl md:text-2xl text-[#bd8186] tracking-[0.5em] font-bold uppercase">Wedding Celebration</h2>
                </motion.div>



                {/* Names Card */}
                <div className="relative w-full flex flex-col items-center justify-center my-12 mb-24">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-20 w-full max-w-[560px] bg-white p-8 md:p-14 shadow-[0_30px_70px_-15px_rgba(135,147,122,0.2)] border border-[#eedadb]/50 flex flex-col items-center justify-center text-center"
                  >
                    <div className="absolute inset-2 border-[0.5px] border-[#bd8186]/30 pointer-events-none" />

                    <div className="space-y-5 mb-10">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-[#9d6065]/50">Groom</span>
                        <h3 className="text-5xl md:text-7xl font-playball text-[#9d6065] leading-none">{INVITATION.couple.groomFull}</h3>
                      </div>
                    </div>

                    <div className="py-2 flex items-center justify-center w-full relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-[#eedadb]/50"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-6 font-playball text-4xl text-[#bd8186]">With</span>
                      </div>
                    </div>

                    <div className="space-y-5 mt-10">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-[#9d6065]/50">Bride</span>
                        <h3 className="text-5xl md:text-7xl font-playball text-[#9d6065] leading-none">{INVITATION.couple.brideFull}</h3>
                      </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 w-full text-left">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                          <Calendar className="w-4 h-4 text-[#bd8186]" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9d6065]/40 font-cinzel">Date</div>
                          <div className="text-sm md:text-base text-[#9d6065] font-cinzel tracking-wide font-bold">{INVITATION.date.displayLong}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4 text-[#bd8186]" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9d6065]/40 font-cinzel">Time</div>
                          <div className="text-sm md:text-base text-[#9d6065] font-cinzel tracking-wide font-bold">{INVITATION.time.reception}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-[#bd8186]" />
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9d6065]/40 font-cinzel">Venue</div>
                          <div className="text-sm md:text-base text-[#9d6065] font-cinzel tracking-wide font-bold">{INVITATION.venue.name}, {INVITATION.venue.city}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>



            {/* Schedule Section */}
            <section className="relative py-20 md:py-28 bg-white overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover opacity-60"
                style={{ backgroundImage: `url("${SCHEDULE_BACKGROUND_IMAGE}")` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-white/80" aria-hidden="true" />
              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#9d6065] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs opacity-50">THE DAY</span>
                    <div className="h-px w-16 bg-[#bd8186]/30" />
                  </div>
                  <h2 className="font-playball text-5xl md:text-7xl bg-gradient-to-r from-[#bd8186] via-[#9d6065] to-[#bd8186] bg-clip-text text-transparent leading-none drop-shadow-sm italic">Schedule</h2>
                  <p className="text-[#9d6065]/70 text-xs md:text-sm tracking-[0.3em] font-medium uppercase font-cinzel max-w-2xl mx-auto pt-2 leading-loose">
                    A simple outline of the celebration.
                  </p>
                </motion.div>

                <div className="mx-auto max-w-2xl text-left bg-[#faf7f2] border border-[#eedadb]/40 shadow-[0_30px_70px_-20px_rgba(135,147,122,0.15)]">
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-[#bd8186]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9d6065]/40 font-cinzel">Date</div>
                        <div className="text-sm md:text-base text-[#9d6065] font-cinzel tracking-wide font-bold">{INVITATION.date.displayLong}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#bd8186]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9d6065]/40 font-cinzel">Event Time</div>
                        <div className="text-sm md:text-base text-[#9d6065] font-cinzel tracking-wide font-bold">{INVITATION.time.reception}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#bd8186]" />
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9d6065]/40 font-cinzel">Venue</div>
                        <div className="text-sm md:text-base text-[#9d6065] font-cinzel tracking-wide font-bold">{INVITATION.venue.name}, {INVITATION.venue.city}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="relative py-28 md:py-48 bg-[#9d6065] flex flex-col items-center overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${COUNTDOWN_BACKGROUND_IMAGE}")` }}
                aria-hidden="true"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-[#9d6065]/70 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Decorative Shapes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-white blur-[100px] rounded-full pointer-events-none"
              />

              <div className="w-full max-w-[1200px] px-6 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="relative mb-20"
                >
                  {/* Backdrop Title */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[18vw] md:text-[220px] text-white/5 whitespace-nowrap pointer-events-none select-none tracking-wider">
                    Eternity
                  </div>

                  {/* Main Title Container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      viewport={{ once: true }}
                      className="h-px bg-white/40 mb-8"
                    />

                    <h2 className="font-cinzel text-3xl md:text-6xl text-white tracking-[0.25em] md:tracking-[0.4em] font-bold uppercase leading-tight">
                      SAVE <span className="mx-2 md:mx-4 text-[#dfbfc2]">THE</span> DATE
                    </h2>

                    <div className="mt-10 flex items-center justify-center gap-6">
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#dfbfc2]/50" />
                      <span className="font-playball text-3xl md:text-5xl text-[#dfbfc2] drop-shadow-md">{INVITATION.date.displayNumeric}</span>
                      <div className="h-[0.5px] w-8 md:w-16 bg-[#dfbfc2]/50" />
                    </div>
                  </div>
                </motion.div>

                {/* Countdown Component with Dark Theme */}
                <CountdownTimer isDark={true} />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-20 flex flex-col items-center gap-4"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-white font-bold text-center">
                    Wait for the magic
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        className="w-1 h-1 bg-[#dfbfc2] rotate-45"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>


            {/* Venue Location Section */}
            <section className="relative py-28 md:py-48 bg-[#faf7f2] overflow-hidden">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />

              {/* Decorative Geometric Elements (CSS-Based UI Decorations) */}
              <div className="absolute -top-24 -left-24 w-[500px] h-[500px] border border-[#bd8186]/10 rounded-full flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[80%] h-[80%] border border-[#9d6065]/10 rounded-full" />
                <div className="w-[60%] h-[60%] border border-[#bd8186]/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#bd8186]/20 to-transparent rotate-45" />
              </div>

              <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-10 mb-24"
                >
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-[#9d6065] font-bold uppercase tracking-[0.8em] text-[10px] md:text-xs opacity-40">T H E · V E N U E</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`w-1.5 h-1.5 rotate-45 ${i === 2 ? "bg-[#bd8186]" : "bg-[#9d6065]/20"}`} />
                      ))}
                    </div>
                  </div>

                  <h2 className="font-cinzel text-4xl sm:text-5xl md:text-8xl lg:text-9xl bg-gradient-to-br from-[#bd8186] to-[#824d52] bg-clip-text text-transparent leading-tight font-light uppercase tracking-tight relative break-words">
                    {INVITATION.venue.name.split(" ")[0].toUpperCase()} <span className="block md:inline font-playball normal-case text-3xl sm:text-4xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#9d6065] to-[#bd8186] bg-clip-text text-transparent md:-ml-8 relative z-10 translate-y-4 md:translate-y-0 italic drop-shadow-sm">{INVITATION.venue.name.split(" ").slice(1).join(" ")}</span>
                  </h2>

                  <div className="max-w-xl mx-auto pt-10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#eedadb]" />
                    <p className="text-[#9d6065]/80 text-sm md:text-base tracking-[0.2em] font-medium uppercase font-cinzel leading-loose pt-8">
                      WHERE TRADITION MEETS THE BEAUTY OF NEW BEGINNINGS
                    </p>
                  </div>
                </motion.div>

                <div className="flex justify-center items-center">
                  {/* Atmospheric Location Card */}
                  <div className="w-full max-w-2xl text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="bg-white p-10 md:p-16 shadow-[0_60px_100px_-40px_rgba(135,147,122,0.2)] border border-[#eedadb]/30 relative group"
                    >
                      {/* Interactive hover ornament */}
                      <div className="absolute inset-2 border-[0.5px] border-[#bd8186]/20 pointer-events-none group-hover:border-[#bd8186]/40 transition-colors duration-700" />

                      <div className="space-y-12 relative z-10">
                        <div className="space-y-6">
                          <p className="text-[#9d6065] text-xl md:text-2xl font-light italic leading-relaxed font-playball text-center lg:text-left">
                            "May our celebration be as infinite as the ocean and as warm as the tropical sun."
                          </p>
                          <div className="h-0.5 w-12 bg-[#eedadb]/60 mx-auto lg:ml-0" />
                        </div>

                        <div className="space-y-10">
                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-[#bd8186]" />
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-[#9d6065]/40 font-bold text-[10px] uppercase tracking-[0.5em] font-cinzel">The Destination</h4>
                              <p className="text-xl md:text-2xl text-[#9d6065] font-cinzel leading-relaxed tracking-wide font-bold">
                                {INVITATION.venue.name}, {INVITATION.venue.city}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-8">
                            <div className="w-12 h-12 rounded-full border border-[#bd8186]/20 flex items-center justify-center shrink-0">
                              <Clock className="w-5 h-5 text-[#bd8186]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[#9d6065]/40 font-bold text-[10px] uppercase tracking-[0.5em] font-cinzel">The Wedding Celebration</h4>
                              <p className="text-xl md:text-2xl text-[#9d6065] font-cinzel leading-relaxed tracking-wide font-bold">
                                {INVITATION.time.reception}
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => window.open(INVITATION.venue.googleMapsLink, "_blank")}
                          className="w-full group relative inline-flex items-center justify-center gap-4 py-6 bg-[#9d6065] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] overflow-hidden transition-all hover:bg-black shadow-xl mt-4"
                        >
                          <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                          <span className="relative z-10 flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            Launch Digital Map
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  </div>


                </div>
              </div>
            </section>

            {/* RSVP Section (No Images) */}
            <section className="relative py-32 md:py-48 bg-[#f5f2ec] flex flex-col items-center overflow-hidden">
              <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center relative z-10 w-full">
                {/* Heading exactly like image */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-cinzel text-2xl md:text-4xl text-slate-800 tracking-[0.3em] mb-12 uppercase text-center"
                >
                  RSVP
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="relative w-full max-w-[650px] bg-white p-6 md:p-10 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col items-center"
                >
                  {/* Inner rounded border frame exactly like the image mockup */}
                  <div className="w-full border border-slate-300 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center">
                    <h3 className="font-playball text-2xl md:text-4xl text-slate-800 mb-8 text-center">RSVP Confirmation</h3>

                    <form className="w-full space-y-6 text-left" onSubmit={handleRsvpSubmit}>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Your Name</label>
                        <input
                          type="text"
                          placeholder="Type your name here..."
                          value={rsvpForm.name}
                          onChange={(e) => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, name: e.target.value }));
                          }}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400 transition-all font-cinzel text-base"
                          required
                        />
                      </div>

                      <div className="space-y-4 pt-2">
                        <label className="text-xs font-bold text-slate-500 ml-1">Will you join us on our big day?</label>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "1" }));
                          }}
                          aria-pressed={rsvpForm.guests !== "0"}
                          className={`w-full py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all flex items-center justify-center px-4 leading-relaxed active:scale-[0.98] ${
                            rsvpForm.guests !== "0"
                              ? "bg-[#9d6065] text-white shadow-md font-bold"
                              : "bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 shadow-sm"
                          }`}
                        >
                          Yes, I'll be there!
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setRsvpStatus("idle");
                            setRsvpForm((prev) => ({ ...prev, guests: "0" }));
                          }}
                          aria-pressed={rsvpForm.guests === "0"}
                          className={`w-full py-5 md:py-6 rounded-xl font-cinzel text-[11px] md:text-sm tracking-wide transition-all flex items-center justify-center px-4 leading-relaxed active:scale-[0.98] ${
                            rsvpForm.guests === "0"
                              ? "bg-[#9d6065] text-white shadow-md font-bold"
                              : "bg-[#f3f3f3] hover:bg-slate-200 text-slate-700 shadow-sm"
                          }`}
                        >
                          Sadly I can't attend, but you're in my heart
                        </button>
                      </div>

                      {(rsvpStatus === "success" || rsvpStatus === "error") && (
                        <p className={`text-[10px] text-center font-semibold ${rsvpStatus === "success" ? "text-emerald-600" : "text-red-500"}`}>
                          {rsvpStatus === "success" ? "RSVP sent successfully." : "Please enter your name and try again."}
                        </p>
                      )}

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={rsvpStatus === "sending"}
                          className="w-full bg-[#9d6065] text-white py-4 md:py-5 rounded-xl font-cinzel text-xs md:text-sm tracking-[0.2em] font-bold hover:bg-[#1a5c4a] transition-all shadow-md uppercase disabled:opacity-70"
                        >
                          {rsvpStatus === "sending" ? "SENDING..." : "CLICK HERE TO CONFIRM"}
                        </button>
                        <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">No shared details will be public. Your response is private.</p>
                      </div>
                    </form>
                  </div>
                </motion.div>


              </div>
            </section>

            {/* Wishing Section */}
            <section className="relative py-28 md:py-48 bg-[#faf7f2] overflow-hidden">
              {/* Floral Decorations */}
              <img src="/images/44.png" className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />
              <img src="/images/f.png" className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-64 z-20 pointer-events-none opacity-80" alt="" />

              {/* Large Background Text Ornament */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[15vw] text-[#bd8186]/5 whitespace-nowrap pointer-events-none select-none italic">
                Sweet Messages
              </div>

              <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 mb-20"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[#9d6065] font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs opacity-50">GUESTBOOK</span>
                    <div className="h-px w-16 bg-[#bd8186]/30" />
                  </div>

                  <h2 className="font-playball text-5xl md:text-8xl bg-gradient-to-r from-[#bd8186] via-[#9d6065] to-[#bd8186] bg-clip-text text-transparent leading-none drop-shadow-sm italic">
                    Best Wishes
                  </h2>

                  <p className="text-[#9d6065]/70 text-xs md:text-sm tracking-[0.3em] font-medium uppercase font-cinzel max-w-xl mx-auto pt-4 leading-loose">
                    Your love and presence are the greatest gifts. If you wish to leave a note, we'd be honored.
                  </p>
                </motion.div>

                {/* Refined Stationery Form */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="bg-white p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(135,147,122,0.15)] border border-[#eedadb]/40 relative overflow-hidden">
                    {/* Inner elegant border */}
                    <div className="absolute inset-4 border border-[#eedadb]/20 pointer-events-none" />
                    <div className="absolute inset-6 border-[0.5px] border-[#bd8186]/10 pointer-events-none" />

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#bd8186]/40 rounded-tl-xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#bd8186]/40 rounded-br-xl" />

                    <form className="space-y-16 text-left relative z-10" onSubmit={handleWishSubmit}>
                      <div className="space-y-6 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#9d6065]/40 group-focus-within:text-[#bd8186] transition-colors">
                          From
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="YOUR NAME"
                            value={wishForm.name}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, name: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#eedadb]/60 px-0 py-4 text-[#9d6065] placeholder:text-[#eedadb]/30 focus:outline-none focus:border-[#9d6065] transition-all font-cinzel text-xl tracking-widest uppercase"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#9d6065] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      <div className="space-y-6 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#9d6065]/40 group-focus-within:text-[#bd8186] transition-colors">
                          Your Message
                        </label>
                        <div className="relative">
                          <textarea
                            rows={4}
                            placeholder="WISHES FOR THE NEWLYWEDS..."
                            value={wishForm.message}
                            onChange={(e) => {
                              setWishStatus("idle");
                              setWishForm((prev) => ({ ...prev, message: e.target.value }));
                            }}
                            className="w-full bg-transparent border-b border-[#eedadb]/60 px-0 py-4 text-[#9d6065] placeholder:text-[#eedadb]/30 focus:outline-none focus:border-[#9d6065] transition-all font-cinzel text-lg tracking-widest resize-none leading-relaxed"
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#9d6065] transition-all duration-500 group-focus-within:w-full" />
                        </div>
                      </div>

                      {/* Success/Error States */}
                      <AnimatePresence>
                        {(wishStatus === "success" || wishStatus === "error") && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`text-[10px] text-center font-bold tracking-widest uppercase ${wishStatus === "success" ? "text-emerald-600" : "text-red-500"}`}
                          >
                            {wishStatus === "success" ? "Message sent with love" : "Please complete the form"}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className="pt-8 flex justify-center">
                        <button
                          type="submit"
                          disabled={wishStatus === "sending"}
                          className="group relative px-16 py-6 bg-[#9d6065] text-white font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-slate-900 transition-all duration-500 shadow-xl disabled:opacity-70 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                          <span className="relative z-10 flex items-center gap-3">
                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            {wishStatus === "sending" ? "Sending..." : "Send Wishes"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Closing Section (No Images) */}
            <section className="w-full relative overflow-hidden bg-[#faf7f2] py-24 md:py-32">
              <div className="container mx-auto px-6 max-w-5xl text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-center gap-3 opacity-70">
                    <div className="h-px w-10 bg-[#9d6065]/20" />
                    <Sparkles className="w-4 h-4 text-[#bd8186]" />
                    <div className="h-px w-10 bg-[#9d6065]/20" />
                  </div>

                  <h2 className="font-playball text-5xl md:text-7xl bg-gradient-to-r from-[#bd8186] via-[#9d6065] to-[#bd8186] bg-clip-text text-transparent italic">Thank You</h2>
                  <p className="text-[#9d6065]/70 text-xs md:text-sm tracking-[0.25em] font-medium uppercase font-cinzel leading-loose max-w-3xl mx-auto">
                    We look forward to celebrating with you.
                  </p>

                  <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#9d6065]/50 font-bold">
                    © 2026 {INVITATION.couple.bride} & {INVITATION.couple.groom}
                  </p>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={backgroundMusic} loop />

      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[60] bg-white text-[#87937a] p-3 rounded-full shadow-lg border border-[#ccbaa2]/40 hover:bg-[#87937a]/10 transition-colors"
      >
        <div className="flex flex-col items-center">
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
          )}
        </div>
      </motion.button>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #ccbaa233;
        }
        ::-webkit-scrollbar-thumb {
          background: #87937a66;
          border-radius: 10px;
        }
      `}} />
    </main >
  );
}
