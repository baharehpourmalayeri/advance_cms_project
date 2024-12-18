"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchContentById } from "../../lib/contentful";

export default function ProjectSinglePage() {
  const [content, setContent] = useState([]);
  const searchParams = useSearchParams();


  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (searchParams.has("id")) {
      setProjectId(searchParams.get("id"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (projectId) {
      const fetchData = async () => {
        const data = await fetchContentById("projectSinglePage", projectId);
        console.log(data);

        setContent(data);
      };

      fetchData();
    }
  }, [projectId]);

  return (
    <div className="project-single-page">
      {content.length > 0 ? (
        content.map((item) => (
          <div key={item.sys.id} className="project-single-content">
            {item.fields.image && (
              <div className="project-single-image">
                <img
                  src={`https:${item.fields.image[0].fields.file.url}`}
                  alt={item.fields.title}
                  width={300}
                  height={200}
                />
              </div>
            )}

            {item.fields.title && (
              <h1 className="project-title">{item.fields.title}</h1>
            )}

            {item.fields.description && (
              <div className="project-description">
                <p>{item.fields.description}</p>
              </div>
            )}

            {item.fields.link && (
              <div className="project-link">
                <a
                  href={item.fields.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
}
