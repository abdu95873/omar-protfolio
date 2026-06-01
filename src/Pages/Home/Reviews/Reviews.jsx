import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import SectionReveal from '../../../components/motion/SectionReveal';
import SectionHeading from '../../../components/ui/SectionHeading';
import InfiniteMarquee from '../../../components/ui/InfiniteMarquee';

const Reviews = () => {
    const [loadData, setLoadData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://omar-server-side.vercel.app/reviewSection');
                const data = await response.json();
                setLoadData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const cards = loadData.map((data) => (
        <div
            key={data._id}
            className="mx-3 sm:mx-4 w-[min(88vw,20rem)] sm:w-72 lg:w-80 shrink-0"
        >
            <div className="h-full rounded-2xl bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 sm:p-8 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                <FaQuoteRight className="text-orange-400 text-2xl mb-4" />
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed line-clamp-5">
                    {data.review}
                </p>
                <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="font-semibold text-orange-500 text-lg">{data.name}</p>
                    <p className="text-sm sm:text-base italic text-gray-500">{data.designation}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <SectionReveal className="section-shell section-no-scrollbar overflow-x-clip">
            <SectionHeading
                label="TESTIMONIAL"
                title="WHAT THEY SAY ABOUT OUR STUDIO"
                subtitle="Real feedback from clients who trusted us with their vision."
            />

            <div className="relative -mx-5 sm:-mx-8 md:-mx-10 lg:-mx-14 xl:-mx-16 2xl:-mx-20 overflow-hidden">
            <div className="marquee-clip relative pb-1">
                {/* Edge fade */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />

                {loadData.length > 0 && (
                    <InfiniteMarquee duration={50}>
                        {cards}
                    </InfiniteMarquee>
                )}
            </div>
            </div>
        </SectionReveal>
    );
};

export default Reviews;
