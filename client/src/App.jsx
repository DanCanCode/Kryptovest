import {
  Navbar,
  Welcome,
  Footer,
  Transactions,
  Testimonials,
  Login,
  Profile,
} from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black bg-[url(https://cdn.steemitimages.com/DQmSRZAtxgWn5o3V2bajUTmqi5kGPGp4zGCMJp5Lc7Mejx4/ETHEREUM%20BLOCKCHAIN.gif)] bg-no-repeat bg-cover">
        <div className="min-h-screen bg-black/80">
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Welcome />
                  <Testimonials />
                  <Transactions />
                </>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="profile" element={<Profile />} />

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
