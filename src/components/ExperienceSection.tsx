import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { fetchExperiences } from '../lib/data';
import { Experience } from '../types';
import { useIsMobile } from '../hooks/use-mobile';

const ExperienceSection: React.FC = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        fetchExperiences().then(data => {
            setExperiences(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading experiences...</div>;
    }

    return (
        <section id="experience" className="py-12 md:py-20 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
                    <p className="text-base md:text-lg text-muted-foreground">

                    </p>
                </div>

                <div className="relative">
                    {/* Timeline line - hidden on mobile, visible on desktop */}
                    {!isMobile && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
                    )}

                    <div className="space-y-6 md:space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.$id}
                                className={`flex items-center ${
                                    isMobile 
                                        ? 'flex-col' 
                                        : index % 2 === 0 
                                            ? 'flex-row' 
                                            : 'flex-row-reverse'
                                }`}
                            >
                                {/* Experience card */}
                                <div className={`${isMobile ? 'w-full' : 'w-1/2'} px-2 md:px-6`}>
                                    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-lg md:text-xl font-semibold">{exp.company}</h3>
                                            <span className="text-xl md:text-2xl">{exp.emoji}</span>
                                        </div>
                                        <p className="text-muted-foreground font-medium text-sm md:text-base">{exp.role}</p>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-2 mb-3 md:mb-4">
                                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                            <span>{exp.period}</span>
                                        </div>
                                        <p className="text-xs md:text-sm text-muted-foreground mb-3">{exp.description}</p>
                                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                                            {(
                                                typeof exp.skills === 'string'
                                                    ? (exp.skills as string).split(',').map((s: string) => s.trim())
                                                    : (exp.skills as string[])
                                            ).map((skill: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="px-2 md:px-3 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline dot - only show on desktop */}
                                {!isMobile && (
                                    <div className="relative z-10">
                                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse"></div>
                                    </div>
                                )}

                                {/* Spacer - only on desktop */}
                                {!isMobile && <div className="w-1/2" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
