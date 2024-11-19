import dynamic from "next/dynamic";
const CitationGenerator = dynamic(() => import("@containers/features/citation-generator/CitationGenerator"), { ssr: false });
// import CitationGenerator from "@containers/features/citation-generator/CitationGenerator";


export const metadata = {
  title: "Online Citation Generator Extension for Google Chrome | CurateIt",
  description:
    "Easily create citations with our Online Citation Generator Extension for Google Chrome. Save time and ensure accurate referencing for your research papers.",
};

const CitationGeneratorPage = () => {
  return <CitationGenerator />;
};
export default CitationGeneratorPage;
