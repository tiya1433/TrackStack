from fastapi import APIRouter, HTTPException, status

from app.schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services import projects

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.get("/", response_model=list[ProjectResponse])
def get_projects():
    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int):
    for project in projects:
        if project["id"] == project_id:
            return project

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Project not found",
    )


@router.post(
    "/",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_project(project: ProjectCreate):
    new_id = max([p["id"] for p in projects], default=0) + 1

    new_project = {
        "id": new_id,
        **project.model_dump(),
    }

    projects.append(new_project)

    return new_project


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: int, project: ProjectUpdate):
    for existing_project in projects:
        if existing_project["id"] == project_id:

            update_data = project.model_dump(exclude_unset=True)

            existing_project.update(update_data)

            return existing_project

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Project not found",
    )


@router.delete(
    "/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_project(project_id: int):
    for index, project in enumerate(projects):
        if project["id"] == project_id:
            projects.pop(index)
            return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Project not found",
    )