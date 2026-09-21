"""add users and project ownership

Revision ID: 45db0d2a49d3
Revises:
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "45db0d2a49d3"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Users table already exists in the database,
    # so we only add project ownership here.

    # Add owner_id temporarily as nullable
    # so existing projects can be assigned an owner.
    op.add_column(
        "projects",
        sa.Column(
            "owner_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    # Existing projects belong to the existing user (ID 1).
    op.execute(
        "UPDATE projects SET owner_id = 1 WHERE owner_id IS NULL"
    )

    # owner_id is now safe to make required.
    op.alter_column(
        "projects",
        "owner_id",
        existing_type=sa.Integer(),
        nullable=False,
    )

    # Connect projects to users.
    op.create_foreign_key(
        "fk_projects_owner_id_users",
        "projects",
        "users",
        ["owner_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint(
        "fk_projects_owner_id_users",
        "projects",
        type_="foreignkey",
    )

    op.drop_column(
        "projects",
        "owner_id",
    )