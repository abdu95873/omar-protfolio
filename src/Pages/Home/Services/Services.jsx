import { motion } from 'framer-motion';
import SectionReveal from '../../../components/motion/SectionReveal';
import SectionHeading from '../../../components/ui/SectionHeading';
import clapperboard from '../../../assets/Service/clapperboard.png';
import camera from '../../../assets/Service/photo.png';
import music from '../../../assets/Service/music-notes.png';
import film from '../../../assets/Service/film-reel.png';

const services = [
  { icon: clapperboard, title: 'FILM PRODUCTION', desc: 'We produce high-quality films with attention to detail and creativity.' },
  { icon: camera, title: 'PHOTOGRAPHY', desc: 'Capturing stunning moments with professional cameras and techniques.' },
  { icon: music, title: 'MUSIC PRODUCTION', desc: 'Composing and producing music tracks that leave a lasting impact.' },
  { icon: film, title: 'VIDEO EDITING', desc: 'Editing videos with professional tools to create visually stunning results.' },
];

const Services = () => {
    return (
        <SectionReveal className="section-shell">
            <SectionHeading
                label="SERVICES"
                title="WHAT WE OFFER AT OUR STUDIO"
                subtitle="From concept to delivery — cinematic quality across every medium."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                {services.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="flex items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-soft card-hover"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                        <img src={item.icon} alt={item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0" />
                        <div className="min-w-0">
                            <h5 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-gray-900">{item.title}</h5>
                            <p className="text-body">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionReveal>
    );
};

export default Services;
