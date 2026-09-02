from fastapi import APIRouter, HTTPException, status

from app.schemas import TaskCreate, TaskUpdate, TaskResponse
from app.services import tasks, projects

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.get("/", response_model=list[TaskResponse])
def get_tasks():
    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            return task

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Task not found",
    )


@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_task(task: TaskCreate):

    # Check whether the project exists
    project_exists = any(
        project["id"] == task.project_id
        for project in projects
    )

    if not project_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    new_id = max([t["id"] for t in tasks], default=0) + 1

    new_task = {
        "id": new_id,
        **task.model_dump(),
    }

    tasks.append(new_task)

    return new_task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate):

    for existing_task in tasks:

        if existing_task["id"] == task_id:

            update_data = task.model_dump(exclude_unset=True)

            # If project_id is being changed, verify new project
            if "project_id" in update_data:

                project_exists = any(
                    project["id"] == update_data["project_id"]
                    for project in projects
                )

                if not project_exists:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="Project not found",
                    )

            existing_task.update(update_data)

            return existing_task

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Task not found",
    )


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_task(task_id: int):

    for index, task in enumerate(tasks):

        if task["id"] == task_id:
            tasks.pop(index)
            return

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Task not found",
    )