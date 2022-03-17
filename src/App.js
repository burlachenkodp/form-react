import "./App.css";
import { Blog } from "./components/Blog/Blog";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Blog />
      </main>

      <Footer year={new Date().getFullYear()}/>
    </div>
  );
}

export default App;
