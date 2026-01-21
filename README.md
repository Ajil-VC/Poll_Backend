# 🗳️ Poll Backend API

A backend service for the polling application that allows users to create polls, vote on options, and have discussions on it
Built with scalability, clean architecture.

---

## 🚀 Features

- Create polls with multiple options
- Fetch poll details by ID
- Vote on poll options
- Centralized error handling
- RESTful API design

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (Mongoose)
- **JWT Authentication** 

---

## 📂 Project Structure
src/
│── application / #Buisiness Logic
│── domain / #Entities and Interfaces to repo and other services
│── Infrastructure / #Configuration files,DB Model,  Actual repo implementation and services
│── Presentation / #Controller, DTO, Middleware, Routes and Interface to controller
│── Shared / #Error and global variables
│── server.ts #Server Entry point
