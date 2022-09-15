import Image from 'next/image'

export default function Hero({ data }) {
  let layoutClass = '';

  if (data.imagePlacement == true) {
    layoutClass = 'flex-row-reverse'
  }

  return (
    <div className={`flex flex-wrap p-3 ${layoutClass}`}>
      <div className="w-full md:w-1/2 mb-5 md:mb-0 relative overflow-hidden">
        <Image
          src={data.image.data.attributes.url}
          width={600}
          height={350}
          className="h-48 w-full object-cover"
          alt={data.image.data.attributes.alternativeText}
        />
      </div>
      <div className="w-full md:w-1/2 indent-12 flex items-center justify-center">
        <div className="w-full md:w-9/12 content">
          <p>{data.content}</p>
          {data.cta && (
            <button className="mt-5 py-2 px-5 bg-emerald-700 text-white hover:bg-emerald-900">
              {data.ctaCopy}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}