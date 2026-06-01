import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionReveal from '../../../components/motion/SectionReveal';
import SectionHeading from '../../../components/ui/SectionHeading';

const Story = () => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {
    axios.get('https://omar-server-side.vercel.app/storySection')
      .then(response => {
        if (response.data.length > 0) {
          setStoryData(response.data[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!storyData) {
    return (
      <div className="section-shell flex justify-center py-20">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SectionReveal className="section-shell">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
        <motion.div
          className="space-y-4 sm:space-y-6 order-2 md:order-1"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading align="left" label="STORY" title="FEATURED PROJECT" className="mb-4 sm:mb-6" />
          <p className="text-lead text-gray-900">{storyData.textOne}</p>
          <p className="text-body">{storyData.textTwo}</p>
          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-orange-400">{storyData.name}</p>
            <p className="text-base sm:text-lg italic text-gray-500">{storyData.designation}</p>
          </div>
          <Link to="/allStory" className="inline-block">
            <motion.span
              className="text-orange-400 font-semibold text-base sm:text-lg lg:text-xl hover:text-orange-500 transition-colors"
              whileHover={{ x: 6 }}
            >
              See More →
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          className="flex justify-center md:justify-end order-1 md:order-2"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[4/5] sm:aspect-auto sm:h-80 md:h-[28rem] lg:h-[32rem] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-soft"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={storyData.image}
              alt={storyData.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default Story;
