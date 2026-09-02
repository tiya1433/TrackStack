from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"] == "TrackStack API is running"


def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_create_project():
    response = client.post(
        "/projects/",
        json={
            "name": "Test Project",
            "description": "Project created during testing",
            "status": "active",
        },
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Test Project"
    assert "id" in data


def test_get_projects():
    response = client.get("/projects/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_project_not_found():
    response = client.get("/projects/99999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Project not found"


def test_create_task_with_invalid_project():
    response = client.post(
        "/tasks/",
        json={
            "title": "Invalid Task",
            "description": "This task should fail",
            "status": "todo",
            "priority": "medium",
            "project_id": 99999,
        },
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Project not found"


def test_invalid_project_data():
    response = client.post(
        "/projects/",
        json={
            "name": "A",
            "description": "Hi",
            "status": "active",
        },
    )

    assert response.status_code == 422