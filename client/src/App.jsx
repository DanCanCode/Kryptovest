import { Navbar, Welcome, Footer, Transactions } from "./components";

const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <div>
        <Navbar />
        <Welcome />
      </div>

      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
