import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppShell, PlainShell } from "./components/AppShell";
import Home from "./screens/Home";
import Search from "./screens/Search";
import ListingDetail from "./screens/ListingDetail";
import CreatePost from "./screens/CreatePost";
import Messages from "./screens/Messages";
import ChatThread from "./screens/ChatThread";
import Agreement from "./screens/Agreement";
import Profile from "./screens/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PlainShell />}>
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/messages/:id" element={<ChatThread />} />
          <Route path="/agreement/:listingId" element={<Agreement />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
