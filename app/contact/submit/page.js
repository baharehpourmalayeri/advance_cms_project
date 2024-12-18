"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "./style.css";

export default function ContactPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchContent("contact");
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
      <section className="contact-content">
        {item.fields.contactForm && (
          <div className="contact-form">
            <h2>{item.fields.contactForm.title}</h2>
            <form action={item.fields.contactForm.action} method="POST">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>

              <button type="submit">Send</button>
            </form>
          </div>
        )}
        <div className="contact-image">
          {content.image && (
            <img
              src={`https:${content.image.fields.file.url}`}
              alt={content.title}
              width={400}
            />
          )}
        </div>
      </section>
      <section>
        {item.fields.contactInformation && (
          <div className="contact-info">
            <p>{item.fields.contactInformation}</p>
          </div>
        )}
      </section>

      <section>
        <h4>Follow Me</h4>
        <ul>
          {item.fields.socialMedia.map((link, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
