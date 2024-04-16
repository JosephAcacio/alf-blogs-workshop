import Navbar from "./Navbar";
import Footer from "./Footer";
import Hero from "./Hero";
import ArticleSection from "./ArticleSection";

const App = () => {
    return (
        <div className="wrapper">
            <Navbar />
            <Hero />
            <ArticleSection />
            <Footer />
        </div>
    );
}

export default App;