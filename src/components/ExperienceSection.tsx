import React from 'react';
import { Calendar } from 'lucide-react';

interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    skills: string[];
    emoji?: string;
}

const experiences: Experience[] = [
    {
        company: "Hogwarts School of Witchcraft and Wizardry",
        role: "Data Analyst Intern",
        period: "June 2025 – Present",
        description: "Wingardium Leviosa! Analyzed large datasets to extract actionable insights. Developed interactive dashboards and reports to visualize data trends.",
        skills: ["Python", "Pandas", "Numpy"],
        emoji: "💻",
    },
    {
        company: "Rolta EMEA",
        role: "Software Engineer Intern",
        period: "July 2023 – August 2023",
        description: "Developed Admin and Employee Dashboards for project hour management. Collaborated with cross-functional teams using full-stack development skills.",
        skills: ["ASP.NET MVC", "C#", "SQL Server"],
        emoji: "💻",
    }
];

const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Experience</h2>
                    <p className="text-lg text-muted-foreground">

                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className="w-1/2 px-6">
                                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-lg transition duration-300">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xl font-semibold">{exp.company}</h3>
                                            <span className="text-2xl">{exp.emoji}</span>
                                        </div>
                                        <p className="text-muted-foreground font-medium">{exp.role}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 mb-4">
                                            <Calendar className="h-4 w-4" />
                                            <span>{exp.period}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                                                >
                          {skill}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse"></div>
                                </div>

                                <div className="w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
