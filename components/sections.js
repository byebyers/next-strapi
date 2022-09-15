import { useRouter } from "next/router"
import Hero from "@/components/hero"

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
}

// Display a section individually
const Section = ({ sectionData, type }) => {
  
  const compType = type.charAt(0).toUpperCase() + type.slice(1);

  // Prepare the component
  const SectionComponent = sectionComponents[`ComponentSections${compType}`]

  if (!SectionComponent) {
    return null
  }


  // Display the section
  return <SectionComponent data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}
//str = str.substring(str.indexOf(":") + 1);
// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => {
        const comp = section.__component
        const type = comp.substring(comp.indexOf(".") + 1);
        return (
          <Section
            sectionData={section}
            type={type}
            key={`${type}${section.id}`}
          />
        )
      })}
    </div>
  )
}

export default Sections