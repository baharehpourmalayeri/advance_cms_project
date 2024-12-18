"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {content.map((item) => (
          <div key={item.sys.id} className="flex flex-col items-center">
            <h2 className="text-xl">{item.fields.title}</h2>
            <h4 className="text-2xl">{item.fields.subtitle}</h4>
            <p>{item.fields.description}</p>
            {item.fields.image && (
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.title}
                width={300}
                height={300}
              />
            )}

            <div className="flex gap-4 mt-4">
              <a
                href="/path/to/your/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Resume
              </a>

              <a
                href="https://www.linkedin.com/in/your-linkedin-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
