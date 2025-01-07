import { fetchContent } from "../lib/contentful";

export default function ProjectIndexPage({
  projectIndex,
  categories,
  selectedCategory,
}) {
  if (!projectIndex) return <p>Loading...</p>;

  // A function to check if a selected category exists within a project’s categories
  const hasSelectedCategory = (categories, selectedCategory) => {
    return categories.some((category) => category.sys.id === selectedCategory);
  };
  // Here we are filtering projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projectIndex.fields.projects // Show all projects if "all" is selected
      : projectIndex.fields.projects.filter(
          (project) =>
            project.fields.category &&
            hasSelectedCategory(project.fields.category, selectedCategory) // Checking if project’s category matches the selected category
        );
  console.log(filteredProjects);
  return (
    <div className="project-index">
      <header className="project-index-header">
        <h1>{projectIndex.fields.title}</h1>
        <p className="project-index-description">
          {projectIndex.fields.description}
        </p>
      </header>

      {/* CUsing a dropdown to select a category */}
      <div className="category-filter">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          className="form-select"
          value={selectedCategory}
          onChange={
            (e) => (window.location.href = `?category=${e.target.value}`) // Change the category by updating the URL
          }
        >
          <option value="all">All</option>
          {/* Map over categories and create an option for each */}
          {categories.map((category) => (
            <option key={category.sys.id} value={category.sys.id}>
              {category.fields.title}
            </option>
          ))}
        </select>
      </div>

      {filteredProjects && (
        <div className="projects">
          {/* Loop through filtered projects and display them */}
          {filteredProjects.map((project) => (
            <div key={project.sys.id} className="project-preview">
              <h2>
                <a
                  href={"/project-single/" + project.fields.link}
                  className="project-link"
                >
                  {project.fields.title}
                </a>
              </h2>
              <p className="project-summary">{project.fields.summary}</p>
              <a
                href={"/project-single/" + project.fields.link}
                className="project-link"
              >
                {project.fields.image &&
                  project.fields.image[0]?.fields?.file && (
                    <div className="project-image">
                      <img
                        src={`https:${project.fields.image[0].fields.file.url}`}
                        alt={project.fields.title}
                        className="project-img"
                      />
                    </div>
                  )}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  // Fetch project index page data from Contentful
  const projectData = await fetchContent("projectIndexPage");
  // Fetch category data from Contentful
  const categoryData = await fetchContent("category");
  // Get the selected category from the query parameters or default to "all"
  const selectedCategory = query.category || "all";

  return {
    props: {
      projectIndex: projectData[0] || null,
      categories: categoryData || [],
      selectedCategory,
    },
  };
}
