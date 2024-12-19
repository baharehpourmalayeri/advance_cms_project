"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./style.css";

export default function About() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchContent("aboutMe");
        console.log(response[0]);
        setContent(response[0]?.fields);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
      }
    };
    fetchData();
  }, []);

  if (!content) return <p>Loading...</p>;

  return (
    <div className="about-container">
      <section className="about-content">
        <div className="about-text">
          <h2 className="title">{content.title}</h2>
          <div>{documentToReactComponents(content.presentation)}</div>
        </div>
        <div className="about-image">
          {content.image && (
            <img
              src={`https:${content.image.fields.file.url}`}
              alt={content.title}
              width={400}
            />
          )}
        </div>
      </section>
      <section className="education">
        {Array.isArray(content.educationInformation) ? (
          <>
            <h4 className="headline">Educations</h4>
            <ul>
              {content.educationInformation.map((education, index) => (
                <li key={index}>{education}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{content.educationInformation}</p>
        )}
      </section>

      <section className="education">
        {Array.isArray(content.workExperience) ? (
          <>
            <h4 className="headline">Experiences</h4>
            <ul>
              {content.workExperience.map((experience, index) => (
                <li key={index}>{experience}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{content.workExperience}</p>
        )}
      </section>
    </div>
  );
}
