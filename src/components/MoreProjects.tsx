import ProjectsSection from "./ProjectsSection";
import Navigation from "./Navigation";

const MoreProjects = () => {
    return (
        <>
            <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
            <ProjectsSection projects={projects} />
        </>
    );
};

export default MoreProjects;
