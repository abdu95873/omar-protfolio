import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import SectionReveal from '../../../components/motion/SectionReveal';
import SectionHeading from '../../../components/ui/SectionHeading';

const Contact = () => {
    const handleAddClass = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const email = form.email.value;
        const subject = form.subject.value;
        const massage = form.massage.value;
        const states = 'unread';
        const currentDate = new Date().toLocaleDateString('en-GB');
        const body = { name, number, email, subject, massage, date: currentDate, states };

        axios.post('https://omar-server-side.vercel.app/customerInfo', body, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.data.acknowledged) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your query has been saved',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            }
        })
        .catch(error => console.error(error));
    };

    return (
        <SectionReveal id="contact" className="section-shell">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <motion.div
                    className="hidden lg:block sticky top-28"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                >
                    <SectionHeading
                        align="left"
                        label="CONTACT"
                        title="REQUEST CALL BACK"
                        subtitle="Fill out the form and our team will get back to you promptly. We're here to help."
                        className="mb-0"
                    />
                </motion.div>

                <motion.div
                    className="rounded-3xl bg-white shadow-soft border border-gray-100 p-6 md:p-10"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                >
                    <div className="lg:hidden mb-6 sm:mb-8">
                        <SectionHeading
                            align="left"
                            label="CONTACT"
                            title="REQUEST CALL BACK"
                            subtitle="We'll get back to you as soon as possible."
                            className="mb-0"
                        />
                    </div>

                    <form onSubmit={handleAddClass} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input type="text" name="name" placeholder="First Name" className="input input-bordered w-full input-smooth" required />
                            <input type="tel" name="number" placeholder="Number" className="input input-bordered w-full input-smooth" inputMode="numeric" pattern="[0-9]{11}" required />
                            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full input-smooth" required />
                            <input type="text" name="subject" placeholder="Subject" className="input input-bordered w-full input-smooth" required />
                        </div>
                        <textarea name="massage" placeholder="Message" className="textarea textarea-bordered w-full h-32 input-smooth" required />
                        <motion.button
                            type="submit"
                            className="btn-brand w-full md:w-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </SectionReveal>
    );
};

export default Contact;
