import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

import { PhoneFrame } from './components/PhoneFrame.jsx';
import { ScenarioProvider } from './mock/scenario.jsx';

import Onboarding from './screens/Onboarding.jsx';
import StyleGuide from './screens/StyleGuide.jsx';
import SignIn from './screens/SignIn.jsx';
import SignUp from './screens/SignUp.jsx';
import Home from './screens/Home.jsx';
import Bookings from './screens/Bookings.jsx';
import Profile from './screens/Profile.jsx';
import Addresses from './screens/Addresses.jsx';
import Support from './screens/Support.jsx';

import TechSignIn from './screens/tech/SignIn.jsx';
import TechHome from './screens/tech/Home.jsx';
import TechJobs from './screens/tech/Jobs.jsx';
import TechJobDetail from './screens/tech/JobDetail.jsx';
import TechSchedule from './screens/tech/Schedule.jsx';
import TechProfile from './screens/tech/Profile.jsx';
import TechEarnings from './screens/tech/Earnings.jsx';
import TechReviews from './screens/tech/Reviews.jsx';
import TechSupport from './screens/tech/Support.jsx';

import BookingFlow from './screens/book/BookingFlow.jsx';
import Category from './screens/book/Category.jsx';
import AirconUnit from './screens/book/AirconUnit.jsx';
import Issue from './screens/book/Issue.jsx';
import JobDetails from './screens/book/JobDetails.jsx';
import Technician from './screens/book/Technician.jsx';

/* Routes mirror the navigation graph the mobile dev has to build, one route
   per screen. The booking flow is a nested layout so the four steps share one
   draft object — the Flutter equivalent is a single ChangeNotifier scoped to
   the flow's Navigator, disposed when the flow is popped.

   Every step is also reachable directly by URL (the rail in PhoneFrame links
   straight to them), so each screen falls back to sane defaults rather than
   assuming a previous step ran. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScenarioProvider>
      <PhoneFrame>
        <Routes>
          {/* First run lands on onboarding. In the app this is gated on a
              "seen onboarding" flag in SharedPreferences — once it is set the
              launcher route becomes /sign-in and this screen is unreachable
              except from a fresh install. */}
          <Route path="/" element={<Navigate to="/onboarding" replace />} />

          {/* Documentation for the mobile dev — not a screen in the app. */}
          <Route path="/style" element={<StyleGuide />} />

          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/addresses" element={<Addresses />} />
          <Route path="/support" element={<Support />} />

          <Route path="/book" element={<BookingFlow />}>
            <Route index element={<Category />} />
            <Route path=":category/unit" element={<AirconUnit />} />
            <Route path=":category/issue" element={<Issue />} />
            <Route path=":category/details" element={<JobDetails />} />
            <Route path=":category/technician" element={<Technician />} />
          </Route>

          {/* ---- Technician app ----
              Same components, same tokens, different screens. The colour
              roles invert under data-app='technician' (see tokens.css);
              nothing below picks a hue. */}
          <Route path="/tech" element={<Navigate to="/tech/sign-in" replace />} />
          <Route path="/tech/sign-in" element={<TechSignIn />} />
          <Route path="/tech/home" element={<TechHome />} />
          <Route path="/tech/jobs" element={<TechJobs />} />
          <Route path="/tech/jobs/:id" element={<TechJobDetail />} />
          <Route path="/tech/schedule" element={<TechSchedule />} />
          <Route path="/tech/profile" element={<TechProfile />} />
          <Route path="/tech/earnings" element={<TechEarnings />} />
          <Route path="/tech/reviews" element={<TechReviews />} />
          <Route path="/tech/support" element={<TechSupport />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </PhoneFrame>
      </ScenarioProvider>
    </BrowserRouter>
  </StrictMode>
);
