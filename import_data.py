from appwrite.client import Client
from appwrite.services.databases import Databases

# --- CONFIGURATION ---
APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"
APPWRITE_PROJECT_ID = "68593619001fd1bf7d43"
APPWRITE_API_KEY = "standard_452b6ea7b415c5c2834296a5ea054fb84977255abc60c0b1cffd0e233455558df53124899edc8ef41438fc91d027f28f26ee784cdfbe89a607b4a55c6c5e36b0121342e22ff8eea6a5efe0cc90c7b26a884975c5cb090e6ce95a7fa5df03058fdd0d0ba0956b79258147e156168f50ecdd88b084406bdb855ec389b76307a4bc"
DATABASE_ID = "68597f02002b29f05826"
EXPERIENCES_COLLECTION_ID = "68597f0c00162bcc6dc8"
PROJECTS_COLLECTION_ID = "68597f9a0036c4dd2a46"

# --- YOUR DATA ---
experiences = [
    {
        "company": "Hogwarts School of Witchcraft and Wizardry",
        "role": "Data Analyst Intern",
        "period": "June 2025 – Present",
        "description": "Wingardium Leviosa! Analyzed large datasets to extract actionable insights. Developed interactive dashboards and reports to visualize data trends.",
        "skills": "Python, Pandas, Numpy",
        "emoji": "💻"
    },
    {
        "company": "Rolta EMEA",
        "role": "Software Engineer Intern",
        "period": "July 2023 – August 2023",
        "description": "Developed Admin and Employee Dashboards for project hour management. Collaborated with cross-functional teams using full-stack development skills.",
        "skills": "ASP.NET MVC, C#, SQL Server",
        "emoji": "💻"
    }
    # Add more experiences here...
]

projects = [
    {
        "title": "Expense Manager",
        "description": "A comprehensive expense tracking application built with modern web technologies. Features include expense categorization, budget tracking, and detailed financial reports with data visualization.",
        "technologies": "Python, Flask, HTML, CSS, Bootstrap, MongoDB",
        "status": "Completed",
        "github": "https://github.com/fayyadrc/ExpenseTracker",
        "liveLink": ""
    },
    {
        "title": "CraveAI",
        "description": "An intelligent food recommendation app that uses AI to suggest personalized meal options. Built with modern React architecture and real-time data synchronization.",
        "technologies": "React, Tailwind CSS, Supabase, Authentication, Real-time DB",
        "status": "Under Development",
        "github": "https://github.com/fayyadrc/CraveAI",
        "liveLink": ""
    }
    # Add more projects here...
]

# --- APPWRITE CLIENT SETUP ---
client = Client()
client.set_endpoint(APPWRITE_ENDPOINT)
client.set_project(APPWRITE_PROJECT_ID)
client.set_key(APPWRITE_API_KEY)

db = Databases(client)

# --- INSERT EXPERIENCES ---
for exp in experiences:
    try:
        result = db.create_document(
            database_id=DATABASE_ID,
            collection_id=EXPERIENCES_COLLECTION_ID,
            document_id="unique()",
            data=exp
        )
        print("Inserted experience:", result["$id"])
    except Exception as e:
        print("Error inserting experience:", e)

# --- INSERT PROJECTS ---
for proj in projects:
    try:
        result = db.create_document(
            database_id=DATABASE_ID,
            collection_id=PROJECTS_COLLECTION_ID,
            document_id="unique()",
            data=proj
        )
        print("Inserted project:", result["$id"])
    except Exception as e:
        print("Error inserting project:", e)