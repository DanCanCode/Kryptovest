import {
  Navbar,
  Welcome,
  Footer,
  Transactions,
  Testimonials,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen bg-black bg-[url(https://cdn.steemitimages.com/DQmSRZAtxgWn5o3V2bajUTmqi5kGPGp4zGCMJp5Lc7Mejx4/ETHEREUM%20BLOCKCHAIN.gif)] bg-no-repeat bg-cover">
      <div className="bg-black/80">
        <div>
          <Navbar />
          <Welcome />
        </div>

        <Testimonials />
        <Transactions />
        <Footer />
      </div>
    </div>
  );
};

export default App;
