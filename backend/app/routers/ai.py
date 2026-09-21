from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.models import User
from app.security import get_current_user
from app.services.ai_service import generate_task_breakdown


router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


class AITaskRequest(BaseModel):
    description: str = Field(
        ...,
        min_length=5,
        max_length=1000,
    )


class AITaskResponse(BaseModel):
    breakdown: str


@router.post(
    "/task-breakdown",
    response_model=AITaskResponse,
)
def task_breakdown(
    request: AITaskRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        breakdown = generate_task_breakdown(
            request.description
        )

        return {
            "breakdown": breakdown
        }

    except Exception as exc:
        print("Gemini error:", exc)

        raise HTTPException(
            status_code=500,
            detail="Unable to generate AI task breakdown.",
        )