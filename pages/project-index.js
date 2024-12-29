import { fetchContent } from "../lib/contentful";
import "./css/project-index.css";

export default function ProjectIndexPage({ projectIndex }) {
  if (!projectIndex) return <p>Loading...</p>;

  return (
    <div className="project-index">
      <header className="project-index-header">
        <h1>{projectIndex.fields.title}</h1>
        <p className="project-index-description">
          {projectIndex.fields.description}
        </p>
      </header>
      {projectIndex.fields.projects && (
        <div className="projects">
          {projectIndex.fields.projects.map((project) => (
            <div key={project.sys.id} className="project-preview">
              <h2>
                <a
                  href={"/project-single/" + project.fields.link}
                  className="project-link"
                >
                  {project.fields.title}
                </a>
              </h2>
              <p className="project-summary">{project.fields.summary}</p>
              <a
                href={"/project-single/" + project.fields.link}
                className="project-link"
              >
                {project.fields.image &&
                  project.fields.image[0]?.fields?.file && (
                    <div className="project-image">
                      <img
                        src={`https:${project.fields.image[0].fields.file.url}`}
                        alt={project.fields.title}
                        className="project-img"
                      />
                    </div>
                  )}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetchContent("projectIndexPage");
  return {
    props: {
      projectIndex: data[0] || null,
    },
  };
}
