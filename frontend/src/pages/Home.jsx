import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Activity,
  Cpu,
  BarChart3,
  Wifi,
  Shield,
  Zap,
  Monitor,
  Settings,
  TrendingUp,
  Database,
  Globe,
  Bell,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const GlassCard = ({
  icon: Icon,
  title,
  description,
  index,
}) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    whileHover={{ scale: 1.04, y: -4 }}
    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-center shadow-lg transition-shadow hover:shadow-2xl"
  >
    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20">
      <Icon className="h-7 w-7 text-cyan-300" />
    </div>
    <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white/60">{description}</p>
  </motion.div>
);

const SectionHeading = ({
  badge,
  title,
  subtitle,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    className="mx-auto mb-16 max-w-2xl text-center"
  >
    <span className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-cyan-300">
      {badge}
    </span>
    <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
      {title}
    </h2>
    <p className="text-base leading-relaxed text-white/60 md:text-lg">
      {subtitle}
    </p>
  </motion.div>
);

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, show the main dashboard
  if (user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900">
        {/* Background overlay with pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Decorative tech elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Circuit lines */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Glowing orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating IoT Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-1/4"
          >
            <Wifi className="w-24 h-24 text-cyan-300" strokeWidth={1} />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-48 right-1/4"
          >
            <Globe className="w-32 h-32 text-blue-300" strokeWidth={1} />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-1/3"
          >
            <Database className="w-20 h-20 text-purple-300" strokeWidth={1} />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-1/3"
          >
            <Monitor className="w-28 h-28 text-cyan-200" strokeWidth={1} />
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-12"
          >
            <Activity className="w-36 h-36 text-blue-400" strokeWidth={1} />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl backdrop-blur-sm bg-slate-900/30 p-12 rounded-3xl border border-white/10"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Centralized IoT Dashboard for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Real-Time Project Monitoring
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
            >
              Track and manage all IoT devices in one place. Access live data, analytics, and seamless project tracking within your campus network.
            </motion.p>

            {/* Get Started Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/projects')}
              className="px-12 py-4 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border border-blue-600"
            >
              Get Started
            </motion.button>

            {/* Decorative Icons at bottom - smaller and more subtle */}
            <div className="mt-16 flex justify-center gap-12 opacity-30">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wifi className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <Globe className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <Activity className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Database className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <Monitor className="w-8 h-8 text-cyan-300" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <TrendingUp className="w-8 h-8 text-blue-300" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // If not logged in, show the landing page
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[hsl(228,50%,12%)] via-[hsl(228,50%,18%)] to-[hsl(228,50%,10%)] text-white">
      {/* ─── Hero ─── */}
      <section className="flex min-h-screen items-center justify-center px-4 py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
          >
            Smart{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              IoT Dashboard
            </span>{" "}
            for the Future
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mb-12 max-w-2xl text-lg text-white/60 md:text-xl"
          >
            Monitor, manage, and analyse all your connected devices in real time
            with a beautifully crafted, intelligent dashboard.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => navigate('/login')}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Why Choose ─── */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Why Choose Us"
            title="Why Choose Our IoT Dashboard"
            subtitle="Built for engineers and enterprises alike — fast, reliable, and beautiful."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <GlassCard index={0} icon={Zap} title="Lightning Fast" description="Sub-second latency for all device commands and data streams." />
            <GlassCard index={1} icon={Shield} title="Enterprise Security" description="End-to-end encryption, role-based access, and audit logs." />
            <GlassCard index={2} icon={Globe} title="Global Scale" description="Manage millions of devices across regions effortlessly." />
          </motion.div>
        </div>
      </section>

      {/* ─── Real-Time Monitoring ─── */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Live Data"
            title="Real-Time Monitoring"
            subtitle="Visualise sensor feeds, device health, and network traffic as it happens."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <GlassCard index={0} icon={Activity} title="Live Telemetry" description="Stream real-time telemetry from thousands of sensors simultaneously." />
            <GlassCard index={1} icon={Monitor} title="Health Dashboard" description="Instant visibility into device uptime, battery, and connectivity." />
            <GlassCard index={2} icon={Bell} title="Smart Alerts" description="AI-powered anomaly detection with instant push notifications." />
          </motion.div>
        </div>
      </section>

      {/* ─── Device Management ─── */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Control Center"
            title="Device Management"
            subtitle="Provision, configure, and maintain your entire fleet from one place."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <GlassCard index={0} icon={Cpu} title="OTA Updates" description="Push firmware updates to device groups with zero-downtime rollouts." />
            <GlassCard index={1} icon={Settings} title="Remote Config" description="Change device parameters remotely without physical access." />
            <GlassCard index={2} icon={Wifi} title="Network Mapping" description="Visualise mesh topologies and troubleshoot connectivity instantly." />
          </motion.div>
        </div>
      </section>

      {/* ─── Analytics & Insights ─── */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            badge="Intelligence"
            title="Analytics & Insights"
            subtitle="Transform raw device data into actionable business intelligence."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <GlassCard index={0} icon={BarChart3} title="Custom Reports" description="Build drag-and-drop dashboards tailored to your KPIs." />
            <GlassCard index={1} icon={TrendingUp} title="Predictive Analytics" description="ML-driven forecasts for maintenance, usage, and demand." />
            <GlassCard index={2} icon={Database} title="Data Export" description="Export to CSV, JSON, or stream directly to your data warehouse." />
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/10 px-4 py-12 text-center text-sm text-white/40">
        © {new Date().getFullYear()} IoT Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
