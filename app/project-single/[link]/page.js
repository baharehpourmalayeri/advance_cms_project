"use client";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
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
            <h1 className="project-title">{item.fields.title}</h1>
            <div className="project-description">
              <p>{item.fields.description}</p>
            </div>

            <div className="image-collage">
              {item.fields.image &&
                item.fields.image.map((image) => (
                  <div key={image.sys.id} className="image-item">
                    <img
                      src={`https:${image.fields.file.url}`}
                      alt={item.fields.title}
                    />
                  </div>
                ))}
            </div>

            <div className="project-link">
             <a
                  href="/project-index"
                  className="btn btn-primary btn-project-index"
                >
                  Back to Projects
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
