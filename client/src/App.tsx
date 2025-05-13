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
    window.location.href = "https://api.whatsapp.com/send?phone=56966261804&text=Hola%2C%20Quisiera%20solicitar%20un%20chamber%20en%20______%2C%20para%20ma%C3%B1ana%20a%20las%2017%20hrs.";
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
