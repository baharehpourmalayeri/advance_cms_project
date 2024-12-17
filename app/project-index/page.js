"use client";
import { useEffect, useState } from "react";
import client from "../../lib/contentful";
import Link from "next/link";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({ content_type: "project" });
        setProjects(response.items);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.sys.id}>
            <Link href={`/projects/${project.sys.id}`}>
              {project.fields.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
