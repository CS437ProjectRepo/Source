export default function Home() {
  return (
    <div className="mx-4">
        <div className="mx-auto max-w-2xl py-32 sm:py-48">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 text-center sm:p-1 py-2 px-8 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Getting started on your term project?{' '}
              <br className="block sm:hidden"/>
              <a href="https://drive.google.com/file/d/1XnfRvOq29L3msrJhd_RknBZRlrMHfblf/view" target="blank" className="font-semibold text-purple-600">
                <span className="absolute inset-0" aria-hidden="true" />
                View the Term Project Description <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
              Welcome to the Term Project Repository
            </h1>
            <p className="mt-6 text-md md:leading-8 text-gray-600">
            Browse through completed projects and gain inspiration for your own work. The project can be filtered by outstanding features, catagories, programming languages, no code solutions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/browse"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Take a Look
              </a>
              <a href="/about" className="text-sm font-semibold leading-6 text-gray-800">
                About Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl" 
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] w-[72.1875rem] aspect-[1155/678] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
  )
}
