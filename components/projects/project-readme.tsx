import { EnrichedProjectProps } from "@/lib/types";
import ReactMarkdown from "../ui/react-markdown";
import ProjectContentWrapper from "./project-content-wrapper";

export default function ProjectReadme({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  return (
    <ProjectContentWrapper className="py-8">
      <ReactMarkdown>{project.readme}</ReactMarkdown>
    </ProjectContentWrapper>
  );
}
