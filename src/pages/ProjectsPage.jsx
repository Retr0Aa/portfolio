import Page from "../components/Page";
import ProjectCard from "../components/ProjectCard";

import Retr0GUIScreenshot from "../assets/retr0guiscreenshot.png";
import TagTuneScreenshot from "../assets/tagtunescreenshot.png";
import PrismOSScreenshot from "../assets/prismosscreenshot.png";

export default function ProjectsPage() {
  return (
    <Page>

      <div className="centered-content">
        <h1>Projects</h1>
        <p>Here are some of my projects:</p>

        <div className="project-list">
          <ProjectCard
            title="Retr0GUI"
            description="A simple console GUI"
            image={Retr0GUIScreenshot}
            link="https://retr0aa.github.io/Retr0GUI/"
          />
          <ProjectCard
            title="TagTune"
            description="A music tagging tool"
            image={TagTuneScreenshot}
            link="https://retr0aa.github.io/TagTune/"
          />
          <ProjectCard
            title="PrismOS"
            description="A simple operating system"
            image={PrismOSScreenshot}
            link="https://retr0aa.github.io/PrismOS/"
          />
        </div>
      </div>
    </Page>
  );
}
