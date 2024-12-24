"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
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
    <div className="contact-container">
       {content.description && (
        <section className="contact-description">
          <p>{content.description}</p>
        </section>
      )}
      <section className="contact-form-section">
        <div className="contact-form">
          <form method="POST">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-contact">
              Send
            </button>
          </form>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          {content.contactInformation && (
            <ul>
              {content.contactInformation.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          )}
          <h4>Follow Me Through</h4>
          <ul className="contact-social-media">
            {content.socialMedia?.map((social, index) => (
              <li key={index}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <i className={`fa fa-${social.icon} fa-2x`}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </section>
    </div>
  );
}
