from fastapi import FastAPI

from app.exceptions import general_exception_handler
from app.routers.projects import router as project_router
from app.routers.tasks import router as task_router


app = FastAPI(
    title="TrackStack API",
    description=(
        "REST API backend for the TrackStack project "
        "and task management application."
    ),
    version="1.0.0",
)


app.add_exception_handler(Exception, general_exception_handler)

app.include_router(project_router)
app.include_router(task_router)


@app.get("/")
def root():
    return {
        "message": "TrackStack API is running",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TrackStack API",
    }