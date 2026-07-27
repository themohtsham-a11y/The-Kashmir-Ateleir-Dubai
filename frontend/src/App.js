import { useEffect } from "react";
import "@/App.css";
import "@/index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import AIAssistant from "@/components/AIAssistant";
import CostCalculator from "@/components/CostCalculator";
import AppointmentBooking from "@/components/AppointmentBooking";

import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Login from "@/pages/Login";
import ClientDashboard from "@/pages/ClientDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App bg-ink min-h-screen text-white">
      <BrowserRouter>
        <ScrollToTop />
        <SmoothScroll>
          <CursorGlow />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/client" element={<ClientDashboard />} />
          </Routes>
          <Footer />
          <WhatsAppFab />
          <AppointmentBooking />
          <CostCalculator />
          <AIAssistant />
          <Toaster
            position="bottom-center"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0B0B0B",
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#fff",
                fontFamily: "Inter, sans-serif",
              },
            }}
          />
        </SmoothScroll>
      </BrowserRouter>
    </div>
  );
}

export default App;
