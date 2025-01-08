import Head from "next/head";
import { fetchContent } from "../lib/contentful";

// This component renders the Contact Page and receives 'content' as a prop.
export default function ContactPage({ content }) {
  // Content is fetched from Contentful
  if (!content) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>Project: Bahareh's Portfolio - Contact</title>
        <meta
          name="description"
          content={`Get in touch with me! I'm available via email or contact form to discuss your next web development project.`}
        />
      </Head>
      <div className="contact-page">
        {content.image && (
          <div className="contact-image">
            <img
              src={`https:${content.image.fields.file.url}`}
              alt="Contact"
              className="contact-top-image"
            />
          </div>
        )}

        <div className="contact-content-wrapper">
          <div className="contact-details">
            {content.description && (
              <section className="contact-description">
                <p>{content.description}</p>
              </section>
            )}
            <section className="contact-form-section">
              <div className="contact-form">
                {/* Simple contact form with Bootstrap */}
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
            <section className="contact-info-section">
              <div className="contact-info">
                {content.contactInformation && (
                  <ul className="info-list">
                    {content.contactInformation.map((info, index) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
                )}
                <h4>Follow Me Through</h4>
                <ul className="contact-social-media">
                  {content.socialMedia?.map((social, index) => (
                    <li key={index}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`fa fa-${social.icon} fa-2x`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetchContent("contact");
    const content = response[0]?.fields || null;
    return {
      props: { content },
    };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return {
      props: { content: null },
    };
  }
}
