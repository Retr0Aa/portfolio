import Page from "../components/Page";

export default function AboutPage() {
  let titleStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textUnderlineOffset: '9px',
    marginBottom: "1rem"
  };

  return (
    <Page>
      <h1>About</h1>
      <p>I'm Alexander Buchkov. I study Computer Science in SoftUni BUDITEL.</p>
      <br />
      <div className="centered-content about-list" style={{ alignItems: "start", justifyContent: "center", flexDirection: "row", gap: "7rem" }}>
        <div style={{ textAlign: 'left' }}>
          <h3 style={titleStyle}>Education</h3>
          <ul>
            <li>SoftUni BUDITEL</li>
            <li>Fusion School</li>
            <li>Meridian 22</li>
          </ul>
        </div>

        <div style={{ textAlign: 'left' }}>
          <h3 style={titleStyle}>Skills</h3>
          <h5>Programming Languages</h5>
          <ul>
            <li>C# .NET</li>
            <li>Unity Game Engine</li>
            <li>Unreal Engine</li>
            <li>Java</li>
            <li>Javascript</li>
            <li>Basic C++</li>
          </ul>
          <h5>Additional</h5>
          <ul>
            <li>Music Production</li>
            <li>Video Editing</li>
            <li>Basic Photoshop Skills</li>
          </ul>
        </div>

        <div style={{ textAlign: 'left' }}>
          <h3 style={titleStyle}>Experience</h3>
          <h5>Internships</h5>
          <ul>
            <li>Hobbyt (2026)</li>
          </ul>
          <h5>Other</h5>
          <ul>
            <li>14th Place in AMTIS competition</li>
          </ul>
        </div>
      </div>
    </Page>
  );
}
