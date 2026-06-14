import { Button, Card, Nav } from "react-bootstrap";

export default function ProjectCard({ title, description, image, link }) {
    return (
        <Card className="project-card" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Nav.Link className="btn" as="button" onClick={() => window.location.href = link}>
                    View Project
                </Nav.Link>
            </Card.Body>
        </Card>
    );
}
