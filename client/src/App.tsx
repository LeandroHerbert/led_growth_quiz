import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ResultDetails from "./pages/ResultDetails";
import Dashboard from "./pages/Dashboard";
import QRCodePage from "./pages/QRCodePage";
import Evento from "./pages/Evento";
import CrmLeads from "./pages/CrmLeads";
import Agendar from "./pages/Agendar";
import VSL from "./pages/VSL";
import Diagnostico from "./pages/Diagnostico";
import Sobre from "./pages/Sobre";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/resultado/:model"} component={ResultDetails} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/qrcode"} component={QRCodePage} />
      <Route path={"/evento"} component={Evento} />
      <Route path={"/crm"} component={CrmLeads} />
      <Route path={"/agendar"} component={Agendar} />
      <Route path={"/vsl"} component={VSL} />
      <Route path={"/diagnostico"} component={Diagnostico} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
