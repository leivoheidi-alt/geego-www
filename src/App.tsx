import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import SchoolsPage from "./pages/SchoolsPage";
import CampaignPage from "./pages/CampaignPage";
import AdventurePage from "./pages/AdventurePage";
import PartnersPage from "./pages/PartnersPage";
import FaqPage from "./pages/FaqPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/fi" replace />} />
          <Route path="/fi" element={<HomePage />} />
          <Route path="/fi/lataa" element={<DownloadPage />} />
          <Route path="/fi/kouluille" element={<SchoolsPage />} />
          <Route path="/fi/kumppanit" element={<PartnersPage />} />
          <Route path="/fi/sisalto-ratkaisee" element={<CampaignPage />} />
          <Route path="/fi/perheseikkailu" element={<AdventurePage />} />
          <Route path="/fi/faq" element={<FaqPage />} />
          <Route path="/download" element={<Navigate to="/fi/lataa" replace />} />
          <Route path="/schools" element={<Navigate to="/fi/kouluille" replace />} />
          <Route path="/perheseikkailu" element={<Navigate to="/fi/perheseikkailu" replace />} />
          <Route path="/faq" element={<Navigate to="/fi/faq" replace />} />
          <Route path="/kumppanit" element={<Navigate to="/fi/kumppanit" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
