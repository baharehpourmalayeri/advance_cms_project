"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";

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

      {projectIndex.fields.image && projectIndex.fields.image.fields?.file && (
        <img
          src={`https:${projectIndex.fields.image.fields.file.url}`}
          alt="Project Index Image"
          width={600}
          height={400}
        />
      )}

      {projectIndex.fields.projects && (
        <div className="projects">
          {projectIndex.fields.projects.map((project) => (
            <div key={project.sys.id} className="project-preview">
              <h2>
                <a href={"/project-single?id=" + project.sys.id}>
                  {project.fields.title}
                </a>
              </h2>
              <p>{project.fields.description}</p>

              {project.fields.image &&
                project.fields.image[0]?.fields?.file && (
                  <img
                    src={`https:${project.fields.image[0].fields.file.url}`}
                    alt={project.fields.title}
                    width={300}
                    height={200}
                  />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
