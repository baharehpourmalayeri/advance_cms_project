"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";

export default function ContactPage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("contact");
      console.log(data);
      setContent(data);
    };

    fetchData();
  }, []);

  return (
    <div className="contact-page">
      {content.length > 0 ? (
        content.map((item) => (
          <div key={item.sys.id} className="contact-content">

            {item.fields.image && (
              <div className="contact-image">
                <img
                  src={`https:${item.fields.image.fields.file.url}`}
                  alt="Contact"
                  width={300}
                  height={200}
                />
              </div>
            )}

            {item.fields.contactInformation && (
              <div className="contact-info">
                <p>{item.fields.contactInformation}</p>
              </div>
            )}

            {item.fields.socialMedia && item.fields.socialMedia.length > 0 && (
              <div className="social-media-links">
                <h2>Follow Me</h2>
                <ul>
                  {item.fields.socialMedia.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
          </div>
        ))
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
}
