"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";

export default function About() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchContent("aboutMe");
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
      <h1>About Me</h1>
      <section>
        <h2>Presentation Text</h2>
        <p>{content.presentationText}</p>
      </section>
      <section>
        <h2>Education Information</h2>
        <p>{content.educationInformation}</p>
      </section>
      <section>
        <h2>Work Experience</h2>
        <p>{content.workExperience}</p>
      </section>
    </div>
  );
}
