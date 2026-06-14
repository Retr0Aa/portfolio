import { Button, Nav } from "react-bootstrap";
import Page from "../components/Page";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const titleText = "Hello World!";

    return (
        <Page>
            <div className="title-container">
                <h1 className="glitch" data-text={titleText}>
                    {titleText}
                </h1>
            </div>

            <div className="centered-content">
                <h4 className="subtitle">
                    Hello! I'm Alexander Buchkov or Retr0A. I like programming.
                    I like to make games and software.
                </h4>

                <Nav.Link className="btn" as="button" onClick={() => navigate("/about")}>
                    About Me
                </Nav.Link>
            </div>
        </Page>
    );
}