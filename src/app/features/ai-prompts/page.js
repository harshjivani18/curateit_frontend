import dynamic    from "next/dynamic";
// import AiPrompts from "@containers/features/ai-prompts/AiPrompts";
const AiPrompts = dynamic(() => import("@containers/features/ai-prompts/AiPrompts"), { ssr: false });

export const metadata = {
  title: "Free AI Prompts Library Chrome Extension for Everyone | CurateIt",
  description:
    "Access a diverse collection of AI prompts through the Prompts Library Chrome Extension for Everyone. Let CurateIt spark your imagination and innovation.",
};

const AiPromptsPage = () => {
  return <AiPrompts />;
};
export default AiPromptsPage;
