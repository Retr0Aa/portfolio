import { useState, useRef, useEffect } from "react";

// --- Components ---

function DesktopIcon({ icon, title, onClick }) {
    return (
        <div className="mb-2">
            <button
                onClick={onClick}
                className="desktop-icon show-button d-flex flex-column align-items-center"
            >
                <img src={icon} width="50" alt={title} />
                <p className="mt-1 mb-0 text-center">{title}</p>
            </button>
        </div>
    );
}

function Window({
    title,
    children,
    isOpen,
    onClose,
    defaultPosition,
    defaultSize = { width: 400, height: 380 },
    zIndex,
    onFocus
}) {
    const [position, setPosition] = useState(defaultPosition || { x: 100, y: 100 });
    const [size, setSize] = useState(defaultSize);

    // --- Mobile Detection Logic ---
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Dragging Logic ---
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            if (!dragging || isMobile) return;
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y
            });
        };
        const up = () => setDragging(false);

        if (dragging) {
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", up);
        }
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", up);
        };
    }, [dragging, isMobile]);

    // --- Resizing Logic ---
    const startResize = (e, axis) => {
        if (isMobile) return;

        e.preventDefault();
        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const onMouseMove = (moveEvent) => {
            let newWidth = startWidth;
            let newHeight = startHeight;

            if (axis === 'both' || axis === 'x') {
                newWidth = Math.max(250, startWidth + (moveEvent.clientX - startX));
            }
            if (axis === 'both' || axis === 'y') {
                newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
            }

            setSize({ width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    if (!isOpen) return null;

    // Determine inline styles based on whether it is mobile or desktop
    const windowStyles = isMobile
        ? {
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "calc(100% - 40px)", // Leaves room at the bottom for the taskbar
            zIndex: zIndex
        }
        : {
            display: "block",
            position: "absolute",
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            zIndex: zIndex
        };

    return (
        <div
            className="dialog text-dark"
            onMouseDownCapture={onFocus}
            style={windowStyles}
        >
            {/* Title Bar (Draggable Area) */}
            <div
                className="titlebar"
                onMouseDown={(e) => {
                    e.preventDefault();
                    if (isMobile) return; // Disables dragging on mobile

                    setDragging(true);
                    offset.current = {
                        x: e.clientX - position.x,
                        y: e.clientY - position.y
                    };
                }}
                style={{ cursor: isMobile ? 'default' : 'move' }}
            >
                <span>{title}</span>
            </div>

            <button
                className="btn btn-sm mr-2 btn-primary border-dark"
                style={{ position: 'absolute', top: '2px', right: '2px', zIndex: 10 }}
                onClick={onClose}
            >
                <b>X</b>
            </button>

            {/* Window Content */}
            <div className="content p-3" style={{ bottom: '50px', width: '100%', height: 'calc(100% - 72px)', overflow: 'auto' }}>
                {children}
            </div>

            {/* Bottom Button Pane */}
            <div className="buttonpane" style={{ position: 'absolute', bottom: '2px', width: '100%' }}>
                <div className="buttonset pr-2 pb-2" style={{ float: 'right' }}>
                    <button className="btn btn-sm mr-2 btn-primary border-dark" onClick={onClose}>OK</button>
                    <button className="btn btn-sm mr-2 btn-danger border-dark" onClick={onClose}>Cancel</button>
                </div>
            </div>

            {/* --- RESIZE HANDLES (Hidden on Mobile) --- */}
            {!isMobile && (
                <>
                    <div
                        style={{ position: "absolute", top: 0, right: -2, width: "6px", height: "100%", cursor: "e-resize", zIndex: 20 }}
                        onMouseDown={(e) => startResize(e, 'x')}
                    />
                    <div
                        style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: "6px", cursor: "s-resize", zIndex: 20 }}
                        onMouseDown={(e) => startResize(e, 'y')}
                    />
                    <div
                        style={{ position: "absolute", bottom: -2, right: -2, width: "12px", height: "12px", cursor: "se-resize", zIndex: 21 }}
                        onMouseDown={(e) => startResize(e, 'both')}
                    />
                </>
            )}
        </div>
    );
}

function Taskbar() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            );
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer>
            <nav id="navbar-footer" className="navbar navbar-main navbar-expand-lg navbar-dark justify-content-between navbar-footer bg-primary w-100 px-2 py-1" style={{ borderTop: "2px solid white" }}>
                <ul className="navbar-nav navbar-nav-hover flex-row align-items-center mb-0">
                    <li className="nav-item">
                        <button className="nav-link btn btn-primary border-dark text-dark px-2 py-1" style={{ fontWeight: 'bold' }}>
                            <span className="nav-link-inner-text d-flex align-items-center">
                                <img src="./images/start.png" width="16" alt="Start" className="mr-1" /> Start
                            </span>
                        </button>
                    </li>
                </ul>
                <div className="time text-center px-2 border-dark" style={{ border: '2px inset white', background: '#c0c0c0', color: 'black' }}>
                    {time}
                </div>
            </nav>
        </footer>
    );
}

// --- Main App ---

export default function App() {
    const [topZIndex, setTopZIndex] = useState(10);

    // Manage windows state: open status and their specific z-index
    const [windows, setWindows] = useState({
        about: { isOpen: true, zIndex: 10 },
        projects: { isOpen: true, zIndex: 9 },
        deathdash: { isOpen: false, zIndex: 1 },
        skills: { isOpen: false, zIndex: 1 },
        github: { isOpen: false, zIndex: 1 },
        contact: { isOpen: false, zIndex: 1 }
    });

    const [positions, setPositions] = useState({});

    useEffect(() => {
        const generateRandomPosition = (w, h) => {
            const maxX = window.innerWidth - w;
            const maxY = window.innerHeight - h - 60;
            return {
                x: Math.max(0, Math.random() * maxX),
                y: Math.max(0, Math.random() * maxY)
            };
        };

        setPositions({
            about: generateRandomPosition(400, 380),
            projects: generateRandomPosition(400, 450),
            deathdash: generateRandomPosition(400, 380),
            skills: generateRandomPosition(400, 480),
            github: generateRandomPosition(400, 280),
            contact: generateRandomPosition(400, 280),
        });
    }, []);

    const focusWindow = (name) => {
        setTopZIndex(prev => prev + 1);
        setWindows(prev => ({
            ...prev,
            [name]: { ...prev[name], zIndex: topZIndex + 1 }
        }));
    };

    const openWindow = (name) => {
        setTopZIndex(prev => prev + 1);
        setWindows(prev => ({
            ...prev,
            [name]: { isOpen: true, zIndex: topZIndex + 1 }
        }));
    };

    const closeWindow = (name) => {
        setWindows(prev => ({
            ...prev,
            [name]: { ...prev[name], isOpen: false }
        }));
    };

    if (Object.keys(positions).length === 0) return null;

    return (
        <div className="desktop h-100 w-100 p-3" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Desktop Icons */}
            <div className="desktop-icons-container d-flex flex-column align-items-start" style={{ width: '100px' }}>
                <DesktopIcon icon="./images/mypc.png" title="About Me" onClick={() => openWindow("about")} />
                <DesktopIcon icon="./images/documents.png" title="Projects" onClick={() => openWindow("projects")} />
                <DesktopIcon icon="./images/trash.png" title="Skills" onClick={() => openWindow("skills")} />
                <DesktopIcon icon="./images/github.png" title="GitHub" onClick={() => openWindow("github")} />
                <DesktopIcon icon="./images/ie.png" title="Contact Me" onClick={() => openWindow("contact")} />
            </div>

            {/* Windows */}
            <Window title="About Me" isOpen={windows.about.isOpen} onClose={() => closeWindow("about")} onFocus={() => focusWindow("about")} zIndex={windows.about.zIndex} defaultPosition={positions.about} defaultSize={{ width: 400, height: 380 }}>
                <h1 className="helloworldgradient">Hello World!</h1>
                <p>Hello! I'm Alexander Buchkov or <i>Retr0A</i>. I like programming.</p>
                <p>I like to make games and software.</p>
                <h4>Education</h4>
                <ul><li>SoftUni BUDITEL</li><li>Fusion School</li><li>Meridian 22</li></ul>
            </Window>

            <Window title="Projects" isOpen={windows.projects.isOpen} onClose={() => closeWindow("projects")} onFocus={() => focusWindow("projects")} zIndex={windows.projects.zIndex} defaultPosition={positions.projects} defaultSize={{ width: 400, height: 450 }}>
                <p>Most my projects can be found on <a href="https://github.com/Retr0Aa" target="_blank" rel="noreferrer">GitHub</a></p>
                <ul>
                    <li><a href="https://retr0aa.github.io/emoji-painting/" target="_blank" rel="noreferrer">emoji-painting</a></li>
                    <li><a href="https://velocitydrift.netlify.app/" target="_blank" rel="noreferrer">velocity-drift</a></li>
                    <li><a href="https://github.com/Retr0Aa/java-music-player" target="_blank" rel="noreferrer">Java Music Player</a></li>
                    <li><a href="https://github.com/Retr0Aa/VetSense" target="_blank" rel="noreferrer">VetSense</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); openWindow("deathdash"); }}>Death Dash (Info)</a></li>
                </ul>
            </Window>

            <Window title="Death Dash" isOpen={windows.deathdash.isOpen} onClose={() => closeWindow("deathdash")} onFocus={() => focusWindow("deathdash")} zIndex={windows.deathdash.zIndex} defaultPosition={positions.deathdash} defaultSize={{ width: 400, height: 380 }}>
                <h1 className="deathdashgradient">Death Dash</h1>
                <p>Death Dash is a fast-paced, minimalist endless runner game designed to test your reflexes.</p>
                <p>Find more information at <a href="https://deathdash.net" target="_blank" rel="noreferrer">deathdash.net</a></p>
            </Window>

            <Window title="Skills" isOpen={windows.skills.isOpen} onClose={() => closeWindow("skills")} onFocus={() => focusWindow("skills")} zIndex={windows.skills.zIndex} defaultPosition={positions.skills} defaultSize={{ width: 400, height: 480 }}>
                <h4>Programming Languages</h4>
                <ol><li>C# .NET</li><li>Unity Game Engine</li><li>Java</li><li>Javascript</li><li>C++</li></ol>
                <h4>Additional</h4>
                <ul><li>Music Production</li><li>Video Editing</li><li>Basic Photoshop Skills</li></ul>
            </Window>

            <Window title="GitHub" isOpen={windows.github.isOpen} onClose={() => closeWindow("github")} onFocus={() => focusWindow("github")} zIndex={windows.github.zIndex} defaultPosition={positions.github} defaultSize={{ width: 400, height: 280 }}>
                <h1>You can find me on GitHub</h1>
                <a href="https://github.com/Retr0Aa" target="_blank" rel="noreferrer" className="btn btn-primary mt-2">Go to GitHub</a>
            </Window>

            <Window title="Contact Me" isOpen={windows.contact.isOpen} onClose={() => closeWindow("contact")} onFocus={() => focusWindow("contact")} zIndex={windows.contact.zIndex} defaultPosition={positions.contact} defaultSize={{ width: 400, height: 280 }}>
                <h2>Contact Information</h2>
                <p className="d-flex align-items-center">Instagram: @a.buchkov__ <img className="ml-2" width="20px" src="./images/instagram.png" alt="IG" /></p>
                <p className="d-flex align-items-center">Gmail: retr0aalex@icloud.com <img className="ml-2" width="20px" src="./images/gmail.png" alt="Email" /></p>
            </Window>

            <Taskbar />
        </div>
    );
}
