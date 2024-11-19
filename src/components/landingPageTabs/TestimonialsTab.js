import Link from "next/link";
import { testimonialsContent } from "@containers/landing-page/pageData";

const TestimonialsTab = () => {
  const STATIC_IMAGES_CDN = process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN;

  return (
    <div className="items-center flex w-full flex-col justify-center px-16 py-4 md:py-8 lg:py-12 max-md:max-w-full max-md:px-5">
      <div className="flex w-full max-w-[1120px] flex-col my-12 max-md:max-w-full max-md:my-10">
        <div className="text-blue-700 text-center flex gap-1 text-sm font-medium leading-5 whitespace-nowrap items-stretch border-[color:var(--primary-500-base,#105FD3)] self-center justify-center px-3 py-1 rounded-full border-[1.5px] border-solid">
          <img
            loading="lazy"
            src={`${STATIC_IMAGES_CDN}/webapp/Dot.svg`}
            alt="Testimonials three dot icon"
            className="aspect-square object-contain object-center w-2  overflow-hidden shrink-0 max-w-full my-auto"
          />
          Testimonials
        </div>
        <div className="self-stretch text-sky-950 text-center text-4xl font-semibold leading-10 tracking-tighter mt-3 max-md:max-w-full">
          What Customer Says
        </div>
        <div className="self-stretch text-slate-600 text-center text-xl leading-8 mt-4 max-md:max-w-full">
          Tool and strategies modern teams need to help their companies grow.
        </div>
        <div className="self-stretch mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto">
              {testimonialsContent.map((item) => (
                <div
                  key={item.key}
                  className="items-stretch border border-[color:var(--primary-100,#E5F0FF)] shadow-sm cursor-pointer hover:bg-slate-50 flex w-full grow flex-col mx-auto p-6 rounded-xl border-solid max-md:mt-6 max-md:px-5"
                >
                  <div className="text-sky-950 text-lg leading-7">
                    {item.testimonial}
                  </div>
                  <div className="items-center flex justify-between gap-4 mt-10">
                    {/* <img
                      loading="lazy"
                      src={item.useImageSrc}
                      className="aspect-square object-contain object-center w-10 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
                    /> */}
                    <div className="bg-blue-100 relative rounded-full p-1  w-12 h-12 flex justify-center items-center">
                      <img
                        loading="lazy"
                        src={item.useImageSrc}
                        alt="User profile image"
                        className="rounded-full w-12 h-12 object-cover"
                      />
                    </div>
                    <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                      <div className="text-sky-950 text-base leading-6">
                        {item.userName}
                      </div>
                      <div className="text-slate-400 text-sm leading-6 whitespace-nowrap mt-1.5">
                        {item.userDesignation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-white bg-blue-700 text-center text-base font-semibold leading-6 whitespace-nowrap justify-center items-stretch  self-center mt-16 px-8 py-4 rounded-lg border-2 border-solid max-md:mt-10 max-md:px-5">
          <Link href={`/sign-up`} className="hover:text-blue-50">
            Get Started -&gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsTab;
