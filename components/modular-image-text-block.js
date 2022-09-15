import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'

export default function ModularImageTextBlock({ text, image, layout }) {
  let layoutClass = '';

  if (layout == 'image-right') {
    layoutClass = 'flex-row-reverse'
  }

  return (
    <div className={`flex flex-wrap p-3 ${layoutClass}`}>
      <div className="w-full md:w-1/2 mb-5 md:mb-0 relative overflow-hidden">
        <Image
          image={image}
          width={600}
          height={350}
          className="h-48 w-full object-cover"
          alt={post.title}
        />
      </div>
      <div className="w-full md:w-1/2 indent-12 flex items-center justify-center">
        <div className="w-full md:w-9/12 content">
          <BlockContent serializers={{ container: ({ children }) => children }} blocks={text} />
        </div>
      </div>
    </div>
  )
}