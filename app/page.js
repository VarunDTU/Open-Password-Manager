export default function Home() {
  return (
    <main className="w-full h-screen bg-black">
      <section>
        <div class="bg-black text-white py-20">
          <div class="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
            <div class="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
              <h1 class="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
                Open
              </h1>
              <h2 class="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
                Password Manager
              </h2>
              <p class="text-sm md:text-base text-gray-50 mb-4">
                Secure and open sourced password manager for everyone.
              </p>
              <a
                href="/dashboard"
                class="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
              >
                Explore Now
              </a>
            </div>
            <div class="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
              <div class="h-48 flex flex-wrap content-center">
                <div>
                  <img
                    class="inline-block mt-28 hidden xl:block w-40 rounded-large m-5"
                    src="./lock.jpeg"
                  />
                </div>
                <div>
                  <img
                    class="inline-block mt-24 md:mt-0 p-8 md:p-0 w-full md:w-40 rounded-large m-5"
                    src="./home.jpeg"
                  />
                </div>
                <div>
                  <img
                    class="inline-block mt-28 hidden lg:block w-40 rounded-large m-5"
                    src="./lock2.jpeg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
