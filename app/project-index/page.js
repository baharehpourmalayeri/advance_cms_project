"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import "./style.css";

export default function ProjectIndexPage() {
  const [projectIndex, setProjectIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("projectIndexPage");
      setProjectIndex(data[0]);
    };

    fetchData();
  }, []);

  if (!projectIndex) return <p>Loading...</p>;

  return (
    <div className="project-index">
      <header className="project-index-header">
        <h1>{projectIndex.fields.title}</h1>
        <p className="project-index-description">{projectIndex.fields.description}</p>
      </header>
      {projectIndex.fields.projects && (
        <div className="projects">
          {projectIndex.fields.projects.map((project) => (
            <div key={project.sys.id} className="project-preview">
              <h2>
                <a href={"/project-single/" + project.fields.link} className="project-link">
                  {project.fields.title}
                </a>
              </h2>
              <p className="project-summary">{project.fields.summary}</p> {/* Changed to summary */}
              <a href={"/project-single/" + project.fields.link} className="project-link">
              {project.fields.image && project.fields.image[0]?.fields?.file && (
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
