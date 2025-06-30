// Home.jsx
import Hero from '../components/Hero';
import Resources from '../components/Resources';
import FranjaAzul from '../components/FranjaAzul';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Footer from '../../utils/footer/Footer.jsx';
import NavbarHome from "../../utils/navbar/NavbarHome.jsx";

const Home = () => {
  return (
    <div>
      <NavbarHome />
      <Hero />
      <FranjaAzul />
      <Resources />
      <HowItWorks />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Home;
