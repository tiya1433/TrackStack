import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set.")

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_task_breakdown(task_description: str) -> str:
    prompt = f"""
You are an AI productivity assistant inside a project
management application called TrackStack.

Break the following project/task idea into 5 to 8
practical and actionable subtasks.

Task idea:
{task_description}

Rules:
- Return only the numbered task list.
- Each task should be short and actionable.
- Do not add an introduction or conclusion.
- Keep the tasks suitable for a software development project.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    return response.text.strip()