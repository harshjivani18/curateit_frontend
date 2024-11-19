import Image from "next/image";

const Footer = () => {

  const sf = `<div class="sf-root" data-id="3726552" data-badge="customers-love-us-white" data-variant-id="sf" style="width:125px">
    <a href="https://sourceforge.net/software/product/CurateIt/" target="_blank"></a>
</div>
<script>(function () {var sc=document.createElement('script');sc.async=true;sc.src='https://b.sf-syn.com/badge_js?sf_id=3726552&variant_id=sf';var p=document.getElementsByTagName('script')[0];p.parentNode.insertBefore(sc, p);})();
</script>`;

  return (
    <div className="items-stretch bg-white flex w-full flex-col pb-12 max-md:max-w-full">
      <div className="self-center w-full max-w-[1250px] mt-16 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[81%] max-md:w-full max-md:ml-0">
            <div className="items-stretch flex grow flex-col px-5 max-md:max-w-full max-md:mt-8">
              <a href="/">
                <Image
                  width={1000}
                  height={1000}
                  loading="lazy"
                  src="https://d3jrelxj5ogq5g.cloudfront.net/200x200_min/webapp/logo1sv.svg"
                  className="aspect-[4.2] w-[168px] object-contain object-center justify-center items-center overflow-hidden max-w-full self-start"
                  alt="CurateIt | CurateIt is designed for Professionals, Freelancers, entrepreneurs, and small to medium-sized businesses"
                  style={{
                    maxWidth: "100%",
                  }}
                />
              </a>
              <div className="text-slate-600 text-base leading-6 mt-8 max-md:max-w-full">
                CurateIt is designed for Professionals, Freelancers,
                entrepreneurs, and small to medium-sized businesses
              </div>
              <div className="flex justify-between items-start">
                <div className="items-stretch flex flex-col md:flex-row justify-between gap-5 mt-8 md:pr-40 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                    <a href={`/download`}>Download</a>
                  </div>
                  <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                    <a href={`/pricing`}>Pricing</a>
                  </div>
                  <div className="text-slate-600 text-base font-semibold leading-6">
                    <a
                      href="https://curateit.notion.site/Whats-New-69ebe81ebc9141cfb348a491f87eef15?pvs=4"
                      target="_blank"
                    >
                      What&apos;s New?
                    </a>
                  </div>
                  {/* <div className="text-slate-600 text-base font-semibold leading-6">
                    <a href="https://web.curateit.com/the-team">Team</a>
                  </div> */}
                  {/* <div className="text-slate-600 text-base font-semibold leading-6">
                    <a href="https://web.curateit.com/careers">Careers</a>
                  </div> */}
                  <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                    <a href={`/privacy`}>Privacy</a>
                  </div>
                </div>
                <div className="items-stretch flex flex-col px-5 md:hidden ">
                  <a
                    target="_blank"
                    href="https://link.curateit.com/SignUpExtension"
                  >
                    <Image
                      width={228}
                      height={100}
                      loading="lazy"
                      src="https://d3jrelxj5ogq5g.cloudfront.net/200x200_min/webapp/chrome-webstore.png"
                      className="aspect-[2.92] object-contain object-center w-[228px] overflow-hidden self-center mt-4"
                      alt="CurateIt | CurateIt is designed for Professionals, Freelancers, entrepreneurs, and small to medium-sized businesses"
                      style={{
                        maxWidth: "100%",
                      }}
                    />
                  </a>

                  <Image
                    src={
                      "https://d3jrelxj5ogq5g.cloudfront.net/200x200_min/feature-pages/footer_rating.png"
                    }
                    width={200}
                    height={100}
                    className="mt-2"
                    loading="lazy"
                    alt="CurateIt | CurateIt is designed for Professionals, Freelancers, entrepreneurs, and small to medium-sized businesses"
                    style={{
                      maxWidth: "100%",
                    }}
                  />

                  <div
                    dangerouslySetInnerHTML={{ __html: sf }}
                    className="h-[100px] mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex flex-col hidden items-stretch w-[19%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch flex flex-col px-5 max-md:mt-8">
              <a
                target="_blank"
                href="https://link.curateit.com/SignUpExtension"
              >
                <Image
                  width={228}
                  height={100}
                  loading="lazy"
                  src="https://d3jrelxj5ogq5g.cloudfront.net/200x200_min/webapp/chrome-webstore.png"
                  className="aspect-[2.92] object-contain object-center w-[228px] overflow-hidden self-center mt-4"
                  alt="CurateIt | CurateIt is designed for Professionals, Freelancers, entrepreneurs, and small to medium-sized businesses"
                  style={{maxWidth:'100%'}}
                />
              </a>

              <Image
                src={
                  "https://d3jrelxj5ogq5g.cloudfront.net/200x200_min/feature-pages/footer_rating.png"
                }
                width={5000}
                height={5000}
                className="mt-2"
                loading="lazy"
                alt="CurateIt | CurateIt is designed for Professionals, Freelancers, entrepreneurs, and small to medium-sized businesses"
                style={{maxWidth:'100%'}}
              />

              <div
                dangerouslySetInnerHTML={{ __html: sf }}
                className="h-[100px] mt-4"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between items-stretch content-center gap-y-6 flex-wrap border-t-[color:var(--colors-border-border-secondary,#EAECF0)] self-center flex w-full max-w-[1250px] gap-5 mt-16 pt-8 px-5 border-t border-solid max-md:max-w-full max-md:mt-10">
        <div className="text-gray-500 text-base leading-6 grow whitespace-nowrap">
          © 2024 Curateit Inc. All rights reserved.
        </div>
        <div className="items-stretch flex justify-between gap-5 max-md:justify-center">
          <div className="text-gray-500">
            <a href="https://twitter.com/CurateitHQ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
          <div className="text-gray-500">
            <a href='https://www.linkedin.com/company/curateit/"'>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.9428 1.75H12.0572C14.2479 1.74999 15.9686 1.74998 17.312 1.93059C18.6886 2.11568 19.7809 2.50271 20.6391 3.36091C21.4973 4.21911 21.8843 5.31137 22.0694 6.68802C22.25 8.03144 22.25 9.75214 22.25 11.9428V12.0572C22.25 14.2479 22.25 15.9686 22.0694 17.312C21.8843 18.6886 21.4973 19.7809 20.6391 20.6391C19.7809 21.4973 18.6886 21.8843 17.312 22.0694C15.9686 22.25 14.2479 22.25 12.0572 22.25H11.9428C9.7521 22.25 8.03144 22.25 6.68802 22.0694C5.31137 21.8843 4.21911 21.4973 3.36091 20.6391C2.50272 19.7809 2.11568 18.6886 1.93059 17.312C1.74998 15.9686 1.74999 14.2479 1.75 12.0572V12.0572V11.9428V11.9428C1.74999 9.75211 1.74998 8.03144 1.93059 6.68802C2.11568 5.31137 2.50272 4.21911 3.36091 3.36091C4.21911 2.50271 5.31137 2.11568 6.68802 1.93059C8.03143 1.74998 9.75214 1.74999 11.9428 1.75ZM8.00195 10.5C8.00195 9.94771 7.55424 9.5 7.00195 9.5C6.44967 9.5 6.00195 9.94771 6.00195 10.5L6.00195 17C6.00195 17.5523 6.44967 18 7.00195 18C7.55424 18 8.00195 17.5523 8.00195 17L8.00195 10.5ZM11.002 9C11.4073 9 11.7564 9.2412 11.9134 9.58791C12.5213 9.215 13.2365 9 14.002 9C16.2111 9 18.002 10.7909 18.002 13V17C18.002 17.5523 17.5542 18 17.002 18C16.4497 18 16.002 17.5523 16.002 17V13C16.002 11.8954 15.1065 11 14.002 11C12.8974 11 12.002 11.8954 12.002 13L12.002 17C12.002 17.5523 11.5542 18 11.002 18C10.4497 18 10.002 17.5523 10.002 17L10.002 10C10.002 9.44771 10.4497 9 11.002 9ZM8.25977 7C8.25977 7.69036 7.70012 8.25 7.00977 8.25H7.00078C6.31043 8.25 5.75078 7.69036 5.75078 7C5.75078 6.30964 6.31043 5.75 7.00078 5.75H7.00977C7.70012 5.75 8.25977 6.30964 8.25977 7Z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
          <div className="text-gray-500">
            <a href="https://www.instagram.com/curateithq">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M17.5078 6.5L17.4988 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
