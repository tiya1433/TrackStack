from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import Base, engine
from app.exceptions import general_exception_handler
from app.models import Project, Task
from app.routers.projects import router as project_router
from app.routers.tasks import router as task_router
from app.routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.routers.ai import router as ai_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="TrackStack API",
    description=(
        "REST API backend for the TrackStack project "
        "and task management application."
    ),
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://track-stack-nine.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(Exception, general_exception_handler)
app.include_router(auth_router)
app.include_router(project_router)
app.include_router(task_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {
        "message": "TrackStack API is running",
        "version": "2.0.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TrackStack API",
    }