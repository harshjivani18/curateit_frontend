import Image from "next/image";

const Testimonials = ({ blob, title, subTitle, testimonials, cta }) => {
  const Blob = () => {
    return (
      <div className="flex py-1 px-[10px] flex flex-row items-center justify-center gap-[6px] border-[1px] border-[#B8D4FE] rounded-[8px]">
        <span className="text-[20px] text-[#347AE2] mb-[2px] leading-[21px]">
          •
        </span>
        <span className="text-[14px] text-[#062046] font-medium leading-[21px]">
          {blob}
        </span>
      </div>
    );
  };

  const Title = () => {
    return (
      <div>
        <p className="text-[40px] text-[#062046] font-semibold">{title}</p>
        <p className="text-[20px] text-[#475467] mt-1">{subTitle}</p>
      </div>
    );
  };

  const TestimonialBlocks = () => {
    const TestimonialsMapper = () => {
      return testimonials?.map(
        ({ profile, name, profession, testimonial }, index) => {
          return (
            <div
              className="w-full flex flex-col p-6 text-start rounded-[12px] bg-[#F8FBFF] hover:bg-[#FFFFFF] hover:drop-shadow-md border-[1px] border-[#E5F0FF]"
              key={`ext-testimonial-block-${index}`}
            >
              <span className="text-[18px] text-[#062046] leading-tight">
                {testimonial}
              </span>
              <div className="w-full flex flex-row items-center justify-start mt-10 gap-4">
                <Image
                  src={profile?.source}
                  alt={profile?.altText}
                  className="w-[40px] h-[40px] rounded-full"
                  width={1000}
                  height={1000}
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <p className="text-[16px] text-[#062046]">{name}</p>
                  <p className="text-[14px] text-[#97A0B5]">{profession}</p>
                </div>
              </div>
            </div>
          );
        }
      );
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <TestimonialsMapper />
      </div>
    );
  };

  const TestimonialBlocksMobile = () => {
    const TestimonialsMapper = () => {
      return testimonials
        ?.slice(0, 2)
        ?.map(({ profile, name, profession, testimonial }, index) => {
          return (
            <div
              className="w-full flex flex-col p-6 text-start rounded-[12px] bg-[#F8FBFF] hover:bg-[#FFFFFF] hover:drop-shadow-md border-[1px] border-[#E5F0FF]"
              key={`ext-testimonial-sec-${index}`}
            >
              <span className="text-[18px] text-[#062046] leading-tight">
                {testimonial}
              </span>
              <div className="w-full flex flex-row items-center justify-start mt-10 gap-4">
                <Image
                  src={profile?.source}
                  alt={profile?.altText}
                  className="w-[40px] h-[40px] rounded-full"
                  width={1000}
                  height={1000}
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <p className="text-[16px] text-[#062046]">{name}</p>
                  <p className="text-[14px] text-[#97A0B5]">{profession}</p>
                </div>
              </div>
            </div>
          );
        });
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <TestimonialsMapper />
      </div>
    );
  };

  const Cta = () => {
    return (
      <button className="lg:block bg-[#105FD3] py-3 px-8 lg:py-4 lg:px-8 rounded-[8px]">
        <a
          className="text-white text-[16px] font-semibold w-full flex grow flex-row items-center justify-center gap-2"
          href={cta?.href}
          target="_self"
        >
          {cta?.title}
        </a>
      </button>
    );
  };

  return (
    <div className="page-layout flex flex-col items-center justify-start text-center">
      <div>
        <Blob />
      </div>

      <div className="mt-3">
        <Title />
      </div>

      <div className="hidden md:block my-16">
        <TestimonialBlocks />
      </div>

      <div className="block md:hidden my-8">
        <TestimonialBlocksMobile />
      </div>

      <Cta />
    </div>
  );
};

export default Testimonials;
