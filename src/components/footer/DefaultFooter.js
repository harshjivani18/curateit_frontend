import Link             from "next/link";
import { Linkedin01Icon } from "src/hugeicons/Solid";
import { InstagramIcon, NewTwitterIcon } from "src/hugeicons/Stroke";

const DefaultFooter = () => {
    return (
      <div className="items-stretch bg-white flex w-full flex-col pb-12 max-md:max-w-full">
        <div className="items-stretch bg-[rgb(229,240,255)] flex w-full flex-col pt-12 px-8 max-md:max-w-full max-md:px-5">
          <div className="items-center border-b-[color:var(--colors-border-border-secondary,#EAECF0)] flex flex-col mt-3.5 pb-12 px-16 border-b border-solid max-md:max-w-full max-md:px-5">
            <div className="flex w-[768px] max-w-full flex-col items-center mb-3.5">
              <div className="self-stretch text-gray-900 text-center text-3xl font-semibold leading-10 max-md:max-w-full">
                Sign up to get your invite
              </div>
              <div className="self-stretch text-slate-600 text-center text-xl leading-8 mt-4 max-md:max-w-full">
                Sign up now and transform the way you save, organize, and access
                your favorite content from across the web
              </div>
              <div className="justify-center items-stretch bg-blue-700 flex gap-2 mt-12 px-8 py-4 rounded-lg max-md:mt-10 max-md:px-5">
                <div className="text-white text-center cursor-pointer text-base font-semibold leading-6 grow whitespace-nowrap">
                  <Link href="/sign-up" className="hover:text-white">
                    Sign up now
                  </Link>
                </div>
                <img
                  loading="lazy"
                  src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/rightarrow.svg`}
                  alt="Right arrow icon"
                  className="aspect-square object-contain object-center w-5 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-center w-full max-w-[1216px] mt-16 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[81%] max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col px-5 max-md:max-w-full max-md:mt-8">
                <Link href="/">
                  <img
                    loading="lazy"
                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/logo1sv.svg`}
                    alt="CurateIt logo"
                    className="aspect-[4.2] object-contain object-center w-[168px] justify-center items-center overflow-hidden max-w-full self-start"
                  />
                </Link>

                <div className="text-slate-600 text-base leading-6 mt-8 max-md:max-w-full">
                  CurateIt is designed for Professionals, Freelancers,
                  entrepreneurs, and small to medium-sized businesses
                </div>
                <div className="flex justify-between items-start">
                  <div className="items-stretch flex flex-col md:flex-row justify-between gap-5 mt-8 md:pr-40 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                    <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/download`}
                      >
                        Download
                      </Link>
                    </div>
                    <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/pricing`}
                      >
                        Pricing
                      </Link>
                    </div>
                    <div className="text-slate-600 text-base font-semibold leading-6">
                      <a
                        href={`https://curateit.notion.site/Whats-New-69ebe81ebc9141cfb348a491f87eef15?pvs=4`}
                      >
                        What's New?
                      </a>
                    </div>{" "}
                    {/* <div className="text-slate-600 text-base font-semibold leading-6">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/the-team`}
                      >
                        Team
                      </Link>
                    </div>{" "}
                    <div className="text-slate-600 text-base font-semibold leading-6">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/careers`}
                      >
                        Careers
                      </Link>
                    </div>{" "} */}
                    {/* <div className="text-slate-600 text-base font-semibold leading-6">
                        Help
                    </div>{" "} */}
                    <div className="text-slate-600 text-base font-semibold leading-6 whitespace-nowrap">
                      <Link
                        href={`/privacy`}
                      >
                        Privacy
                      </Link>
                    </div>
                  </div>
                  <div className="items-stretch flex flex-col px-5 md:hidden ">
                    <Link
                      href={"https://link.curateit.com/SignUpExtension"}
                      target="_blank"
                    >
                      <img
                        loading="lazy"
                        src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/chrome-webstore.png`}
                        alt="Chrome webstore logo"
                        className="aspect-[2.92] object-contain object-center w-[228px] overflow-hidden self-center mt-4"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="md:flex flex-col hidden items-stretch w-[19%] ml-5 max-md:w-full max-md:ml-0">
              <div className="items-stretch flex flex-col px-5 max-md:mt-8">
                <Link
                  href={"https://link.curateit.com/SignUpExtension"}
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src={`${process.env.NEXT_PUBLIC_STATIC_IMAGES_CDN}/webapp/chrome-webstore.png`}
                    alt="Chrome webstore logo"
                    className="aspect-[2.92] object-contain object-center w-[228px] overflow-hidden self-center mt-4"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="justify-between items-stretch content-center gap-y-6 flex-wrap border-t-[color:var(--colors-border-border-secondary,#EAECF0)] self-center flex w-full max-w-[1216px] gap-5 mt-16 pt-8 px-5 border-t border-solid max-md:max-w-full max-md:mt-10">
          <div className="text-gray-500 text-base leading-6 grow whitespace-nowrap">
            © 2023 Curateit Inc. All rights reserved.
          </div>{" "}
          <div className="items-stretch flex justify-between gap-5 max-md:justify-center">
            <div className="text-gray-500">
              <Link href={`https://twitter.com/CurateitHQ`}>
                <NewTwitterIcon />
              </Link>
            </div>
            <div className="text-gray-500">
              <Link href={`https://www.linkedin.com/company/curateit/"`}>
                <Linkedin01Icon />
              </Link>
            </div>
            <div className="text-gray-500">
              <Link href={`https://www.instagram.com/curateithq`}>
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DefaultFooter