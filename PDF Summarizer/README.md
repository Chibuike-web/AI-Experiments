# 📄 PDF Summarizer – AI-Powered Document Summary Tool

**PDF Summarizer** is a web-based application that allows users to upload one or multiple PDF files, extract their content, and generate concise summaries using the **Google Gemini API**. The app is structured into separate pages for single and multiple file workflows to support learning and scalable design.

## ✨ Features

- Upload and process **single or multiple PDF files**
- Two dedicated pages:
  - One for **single PDF upload**
  - One for **multiple PDF muliple pdf uplaods**
- Extract raw text using server-side PDF parsing
- Summarize content via Gemini AI
- Display parsed content and summary side-by-side
- Clean, responsive UI with upload preview and progress states

## 🔧 Tech Stack

### Frontend

- **React** – Component-based UI
- **Vite** – Fast, modern build tool
- **Tailwind CSS** – Utility-first styling for responsive design

### Backend

- **Node.js** – JavaScript runtime for server logic
- **Express.js** – RESTful API for text parsing and summarization
- **pdf-parse** – Server-side library for extracting PDF content
- **Google Gemini API** – AI service for generating summaries
- **express-fileupload** – Middleware for handling file uploads

## 💡 Goal

To demonstrate how to build a document summarization tool using PDF parsing and AI-powered language models. The project emphasizes end-to-end handling of file uploads, backend text extraction, and AI integration. It is structured to support both single and batch processing, making it a hands-on learning experience in full-stack file handling, prompt-based summarization, and modular UI design.
