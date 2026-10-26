import React from 'react'
import jayImg from '../assets/jayhome.png'

function About() {
  return (
    <section className="w-full min-h-screen bg-white text-black flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 py-16 selection:bg-black selection:text-white">
      <div className="max-w-[85rem] w-full mx-auto flex flex-col justify-between my-auto">
        
        {/* Top Headline Block */}
        <div className="mb-14 sm:mb-18 lg:mb-24">
          <p className="font-gilroy-medium text-lg sm:text-xl md:text-2xl text-[#737373] mb-4 sm:mb-5 tracking-tight">
            Human first. Always.
          </p>
          <h2 className="font-gilroy-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.12] tracking-[-0.03em] text-black max-w-[73.75rem]">
            A Research studio based in Chicago,<br className="hidden md:inline" />
            operating worldwide. We design technology<br className="hidden md:inline" />
            where empathy, precision, and impact are<br className="hidden md:inline" />
            felt, not compromised.
          </h2>
        </div>

        {/* Content Columns (Image + 2 Text Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Image & Caption */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start">
            <div className="w-[45vw] sm:w-[28vw] md:w-[20vw] lg:w-[15vw] max-w-[15vw] min-w-[10vw]">
              <img
                src={jayImg}
                alt="Jay L. Cunningham"
                className="w-[45vw] sm:w-[28vw] md:w-[20vw] lg:w-[15vw] h-auto max-h-[35vh] aspect-[3/4] object-cover"
              />
              <p className="font-gilroy-medium text-xs sm:text-[0.8125rem] text-[#666666] text-center mt-2 tracking-tight">
                Jay L. Cunningham
              </p>
            </div>
          </div>

          {/* Column 2: Middle Text Column */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col gap-6 font-gilroy-medium text-xs sm:text-[0.8125rem] md:text-[0.84375rem] lg:text-[0.875rem] leading-[1.45] text-black max-w-[20rem]">
            <p>
              Solvari turns human-centered research into technology built for the real world. We bring together research, design, engineering, and responsible AI to understand complex problems and build systems that serve people better.
            </p>
            <p>
              Because every system exists within a human context, we start by understanding the people,
            </p>
          </div>

          {/* Column 3: Right Text Column */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-6 font-gilroy-medium text-xs sm:text-[0.8125rem] md:text-[0.84375rem] lg:text-[0.875rem] leading-[1.45] text-black max-w-[22.5rem]">
            <p>
              environments, and constraints around it. Our approach combines rigorous research with contextual design, creating solutions grounded in evidence rather than assumptions.
            </p>
            <p>
              Rather than stopping at insights, we take research into action — designing, building, and evaluating technology that can make a meaningful difference in the world.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default About
