import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import React, { useEffect } from "react";

const RedirectToWhatsAppQR1 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, navigate] = useLocation();
  useEffect(() => {
    // Alternancia simple usando localStorage (persistente por navegador)
    const numbers = [
      "56966261804",
      "56942987869"
    ];
    let lastIndex = parseInt(localStorage.getItem("wa_last_index") || "0", 10);
    const nextIndex = (lastIndex + 1) % numbers.length;
    localStorage.setItem("wa_last_index", nextIndex.toString());
    const phone = numbers[nextIndex];
    const text = encodeURIComponent("Hola, Quisiera solicitar un chamber en ______, para mañana a las 17 hrs.");
    window.location.href = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
  }, [navigate]);
  return null; // O un componente de carga mientras redirige
};


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/qr1" component={RedirectToWhatsAppQR1} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
