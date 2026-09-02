from pydantic import BaseModel, Field
from typing import Optional


# -------------------------
# Project Schemas
# -------------------------

class ProjectBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: str = Field(..., min_length=5, max_length=500)
    status: str = Field(default="active")


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    description: Optional[str] = Field(None, min_length=5, max_length=500)
    status: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: int


# -------------------------
# Task Schemas
# -------------------------

class TaskBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    description: str = Field(..., min_length=5, max_length=500)
    status: str = Field(default="todo")
    priority: str = Field(default="medium")
    project_id: int


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=150)
    description: Optional[str] = Field(None, min_length=5, max_length=500)
    status: Optional[str] = None
    priority: Optional[str] = None
    project_id: Optional[int] = None


class TaskResponse(TaskBase):
    id: int