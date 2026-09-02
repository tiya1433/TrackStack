# TrackStack REST API

REST API backend for the TrackStack project and task management application.

Built with **Python, FastAPI, and Pydantic**.

## Features

- Project CRUD operations
- Task CRUD operations
- Project-task relationship validation
- Request data validation using Pydantic
- Consistent HTTP status codes
- Error handling
- Automated API tests
- Interactive Swagger API documentation
- ReDoc API documentation

## Tech Stack

- Python 3.11
- FastAPI
- Pydantic
- Uvicorn
- Pytest
- HTTPX

## Project Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── exceptions.py
│   ├── models/
│   │   └── __init__.py
│   ├── schemas/
│   │   └── __init__.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── projects.py
│   │   └── tasks.py
│   └── services/
│       └── __init__.py
├── tests/
│   └── test_api.py
├── pytest.ini
├── requirements.txt
└── README.md