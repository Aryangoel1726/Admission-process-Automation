# Admission Process Automation — API Documentation

> 🚧 Detailed API docs are planned. Below is a quick reference.

## Base URL

```
http://localhost:5000/api
```

## Authentication Endpoints

| Method | Endpoint          | Description              | Auth Required |
|--------|-------------------|--------------------------|:-------------:|
| POST   | `/auth/register`  | Register a new student   | No            |
| POST   | `/auth/login`     | Login and get JWT token  | No            |
| GET    | `/auth/me`        | Get current user profile | Yes           |

## Application Endpoints

| Method | Endpoint                     | Description                     | Auth Required |
|--------|------------------------------|---------------------------------|:-------------:|
| POST   | `/applications`              | Create a new application        | Yes (student) |
| GET    | `/applications/my`           | List logged-in user's apps      | Yes (student) |
| GET    | `/applications/:id`          | Get single application details  | Yes           |
| PUT    | `/applications/:id/submit`   | Submit a draft application      | Yes (student) |

## Planned Endpoints

| Method | Endpoint                            | Description                        |
|--------|-------------------------------------|------------------------------------|
| GET    | `/applications`                     | Admin — list all applications      |
| PUT    | `/applications/:id/review`          | Admin — approve/reject application |
| GET    | `/merit-list/:program`              | Generate merit list for a program  |
| POST   | `/documents/upload`                 | Upload student documents           |
| POST   | `/payments/initiate`                | Initiate fee payment               |
| POST   | `/notifications/send`               | Send email/SMS notifications       |

## Authentication

All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```
