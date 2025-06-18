import React from 'react';

const skills = [
  "JavaScript/TypeScript", "Python", "React", "MongoDB", "Flask/Django",
  "Tailwind/Bootstrap", "Supabase", "Git", "HTML/CSS", "PostgreSQL/SQLServer"
];

const HeroSection = () => {
  return (
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left">

          {/* Profile Image */}
          <div className="w-40 h-40 md:w-52 md:h-52 relative rounded-full overflow-hidden shadow-lg border-2 border-gray-300 dark:border-gray-600 flex-shrink-0">
            <img
                src="public/profilepicture.jpg"
                alt="Fayyad Rahman"
                className="w-100 h-55 object-cover"
            />
          </div>

          {/* Info Text */}
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">Fayyad Rahman</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Aspiring Software Engineer | Interested in Data Science
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              I'm a Computer Science student passionate about building impactful web applications and solving real-world problems through technology. Aiming to specialize in backend development and data-driven solutions, combining thoughtful design with scalable, functional code.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {skills.map((skill) => (
                  <span
                      key={skill}
                      className="px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm"
                  >
                {skill}
              </span>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;
