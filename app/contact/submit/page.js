"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to import Bootstrap styles
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
    <div className="container">
      <section className="contact-content row">
        <div className="col-md-6">
          {content.contactForm && (
            <div className="contact-form">
              <h2>{content.contactForm.title}</h2>
              <form action={content.contactForm.action} method="POST">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" id="name" name="name" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" id="email" name="email" className="form-control" required />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message:</label>
                  <textarea id="message" name="message" className="form-control" required></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </div>
          )}
        </div>

        <div className="col-md-6">
          {content.image && (
            <img
              src={`https:${content.image.fields.file.url}`}
              alt={content.title}
              className="img-fluid"
            />
          )}
        </div>
      </section>

      <section>
        {content.contactInformation && (
          <div className="contact-info">
            <p>{content.contactInformation}</p>
          </div>
        )}
      </section>

      <section>
        <h4>Follow Me</h4>
        <ul className="list-unstyled">
          {content.socialMedia?.map((link, index) => (
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
