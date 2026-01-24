import './Home.css';
import About from '../../components/About/About';
import Admissions from '../../components/Admissions/Admissions';
import Results from '../../components/Results/Results';
import Process from '../../components/Process/Process';
import Services from '../../components/Services/Services';

function Home() {
    return (
        <div className='home-container'>
            <About />
            <Admissions />
            <Results />
            <Process />
            <Services />
        </div>
    );
}

export default Home;