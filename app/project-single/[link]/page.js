"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { fetchContentByLink } from "../../../lib/contentful";
import "./style.css";


export default function ProjectSinglePage() {
  const [content, setContent] = useState([]);
  const params = useParams();


  const [link, setLink] = useState(null);

  useEffect(() => {
    if (params.link) {
      setLink(params.link);
    }
  }, [params]);

  useEffect(() => {
    if (link) {
      const fetchData = async () => {
        const data = await fetchContentByLink("projectSinglePage", link);
        console.log(data);

        setContent(data);
      };

      fetchData();
    }
  }, [link]);

  return (
    <div className="project-single-page">
      {content.length > 0 ? (
        content.map((item) => (
          <div key={item.sys.id} className="project-single-content">
            {item.fields.image && (
              <div className="project-single-image">
                  {item.fields.image.map((image) => (
                <img key={image.sys.id}
                  src={`https:${image.fields.file.url}`}
                  alt={item.fields.title}
                  width={300}
                  height={200}
                />
                  ))}
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

            <div className="project-link">
                <a
                  href="/project-index"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
          </div>
        ))
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
}
