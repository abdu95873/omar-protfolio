import { useEffect, useState } from "react";
import SectionReveal from '../../../components/motion/SectionReveal';
import SectionHeading from '../../../components/ui/SectionHeading';
import InfiniteMarquee from '../../../components/ui/InfiniteMarquee';

const Portfolio = () => {
    const [loadImages, setLoadImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://omar-server-side.vercel.app/portfolioImage');
                const data = await response.json();
                setLoadImages(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const images = loadImages.map((image) => (
        <div key={image._id} className="mx-3 sm:mx-4 shrink-0">
            <figure className="relative w-52 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft">
                <img
                    src={image.image}
                    alt="Portfolio"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                />
            </figure>
        </div>
    ));

    return (
        <SectionReveal className="section-shell section-no-scrollbar overflow-x-clip">
            <SectionHeading
                label="PORTFOLIO"
                title="OUR LATEST WORK"
                subtitle="A glimpse of stories we've brought to life through lens and edit."
                align="left"
            />

            {/* Full-width clip — padding বাইরে, scrollbar হবে না */}
            <div className="relative -mx-5 sm:-mx-8 md:-mx-10 lg:-mx-14 xl:-mx-16 2xl:-mx-20 overflow-hidden">
                <div className="marquee-clip mb-6">
                    <InfiniteMarquee duration={55}>{images}</InfiniteMarquee>
                </div>
            </div>
        </SectionReveal>
    );
};

export default Portfolio;
