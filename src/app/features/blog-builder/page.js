import dynamic from "next/dynamic";

// import BlogBuilder from "@containers/features/blog-builder/BlogBuilder";
const BlogBuilder = dynamic(() => import("@containers/features/blog-builder/BlogBuilder"), { ssr: false });


export const metadata = {
  title: "Free Blogging Platform for Students, Marketers | CurateIt",
  description:
    "CurateIt: Your go-to free blogging platform for students and marketers. Share your insights, experiences, and creativity with a global audience.",
};

const BlogBuilderPage = () => {
  return <BlogBuilder />;
};
export default BlogBuilderPage;
