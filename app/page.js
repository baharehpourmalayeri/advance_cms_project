"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./home.css";

export default function Home() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("homepage");
      setContent(data);
    };

    fetchData();
  }, []);

  return (
    <div className="main-content">
      <main className="main">
        {content.map((item) => (
          <div key={item.sys.id} className="content-container">
            <div className="content-left">
              <h4>{item.fields.title}</h4>
              <div>{documentToReactComponents(item.fields.description)}</div>
              <div className="button-container">
                <a
                  href="/path/to/your/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-resume"
                >
                  Resume
                </a>

                <a
                  href="https://www.linkedin.com/in/your-linkedin-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-linkedin"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="content-right">
              {item.fields.image && (
                <img
                  className="image"
                  src={`https:${item.fields.image.fields.file.url}`}
                  alt={item.fields.title}
                />
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
