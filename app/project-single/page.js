"use client";
import { useEffect, useState } from "react";
import client from "../../../lib/contentful";
import Image from "next/image";

export default function ProjectDetail({ params }) {
  const { id } = params; // Get the dynamic route parameter
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await client.getEntry(id);
        setProject(response);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{project.fields.title}</h1>
      <p>{project.fields.description}</p>
      {project.fields.image && (
        <Image
          src={`https:${project.fields.image.fields.file.url}`}
          alt={project.fields.title}
          width={600}
          height={400}
        />
      )}
    </div>
  );
}
