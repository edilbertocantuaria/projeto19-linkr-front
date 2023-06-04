import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn.js";
import styled from "styled-components";
import Header from "./components/header/Header.js";
import TimelinePage from "./pages/Timeline/TimelinePage.js";
import SignUp from "./pages/SignUp/signUp.js";
import HashtagPage from "./pages/Hashtag/HashtagPage.js";
import Provider from "./contexts/all.provider.js";
import UserContext1 from "./contexts/use.context.js";
import React, { useState } from "react";
import UserPage from "./pages/User/UserPage.js";

export default function App() {
  const [user, setUser] = useState("");

  return (
    <UserContext1.Provider value={{ user, setUser }}>
      <Provider>
        <PagesContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/timeline"
                element={<HeaderRoute><TimelinePage /></HeaderRoute>}
              />
              <Route
                path="/hashtag/:hashtag"
                element={<HeaderRoute><HashtagPage /></HeaderRoute>}
              />
              <Route
              path="/user/:id"
              element={<HeaderRoute><UserPage/></HeaderRoute>}
              />
            </Routes>
          </BrowserRouter>
        </PagesContainer>
      </Provider>
    </UserContext1.Provider>
  );
}

const PagesContainer = styled.main``;

const HeaderRoute = ({ children }) => {
  const location = window.location.pathname;
  const hideHeaderRoutes = ["/"];

  if (hideHeaderRoutes.includes(location)) {
    return children;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};
