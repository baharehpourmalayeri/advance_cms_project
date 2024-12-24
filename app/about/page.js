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

  const images = content.image || []; // Assuming "images" is the multi-image field

  return (
    <div className="about-container">
    <h2 className="about-title">{content.title}</h2>
    <section className="about-content">
  <div className="about-image">
    {images[0] && (
      <img
        src={`https:${images[0].fields.file.url}`}
        alt="About Me"
        width={400}
      />
    )}
  </div>
  <div className="about-text">
    <div>{documentToReactComponents(content.presentation)}</div>
  </div>
</section>

<section className="education-content reverse">
  <div className="education-image">
    {images[1] && (
      <img
        src={`https:${images[1].fields.file.url}`}
        alt="Education"
        width={400}
      />
    )}
  </div>
  <div className="education-text">
    <h2 className="headline">Education</h2>
    {Array.isArray(content.educationInformation) ? (
      <ul>
        {content.educationInformation.map((education, index) => (
          <li key={index}>{education}</li>
        ))}
      </ul>
    ) : (
      <p>{content.educationInformation}</p>
    )}
  </div>
</section>

<section className="experience-content">
  <div className="experience-image">
    {images[2] && (
      <img
        src={`https:${images[2].fields.file.url}`}
        alt="Experience"
        width={400}
      />
    )}
  </div>
  <div className="experience-text">
    <h2 className="headline">Experience</h2>
    {Array.isArray(content.workExperience) ? (
      <ul>
        {content.workExperience.map((experience, index) => (
          <li key={index}>{experience}</li>
        ))}
      </ul>
    ) : (
      <p>{content.workExperience}</p>
    )}
  </div>
</section>
    </div>
  );
}
