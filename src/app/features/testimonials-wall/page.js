// import Testimonials from "@containers/features/testimonials-wall/Testimonials";
import dynamic from "next/dynamic";
const Testimonials = dynamic(() => import("@containers/features/testimonials-wall/Testimonials"), { ssr: false });

export const metadata = {
  title:
    "Free Testimonial Collection Software to collect, add the Testimonials | CurateIt",
  description:
    "Collect, add, and curate testimonials effortlessly with our Free Testimonial Collection Software. Elevate your website with CurateIt.",
};

const TestimonialsPage = () => {
  return <Testimonials />;
};
export default TestimonialsPage;
