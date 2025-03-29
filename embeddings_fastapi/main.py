from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import chromadb
import google.generativeai as genai
import os
from dotenv import load_dotenv
from chromadb.config import Settings
from pdfminer.high_level import extract_text

####Google Embeddings API####
print("fastapi called")
load_dotenv()
genai.configure(api_key=os.getenv('GOOGLE_AI_KEY'))

def generateEmbeddings(content, task_type, doc_title=""):
    if task_type == "retrieval_query":
        embedding = genai.embed_content(model="models/embedding-001",
                                content=content,
                                task_type=task_type)
        return embedding["embedding"]

    embedding = genai.embed_content(model="models/embedding-001",
                                content=content,
                                task_type=task_type,
                                title=doc_title)
    return embedding["embedding"]

#######

# Initialize ChromaDB with persistence
client = chromadb.PersistentClient(path="./chroma_vector_db")
collection = client.get_or_create_collection(name="file_embeddings_collection")


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)


# Request body schema
class FileSchema(BaseModel):
    email: str
    courseName: str
    fileNames: List[str]

# schema for searching a document
class SearchString(BaseModel):
    email: str
    search: str

@app.post("/api/file")
def similar_files(search_string: SearchString):
    email, searchString = search_string.email, search_string.search
    # generate query embeddings
    embedding = generateEmbeddings(searchString, "retrieval_query")

    result = collection.query(
        query_embeddings=embedding,
        n_results=10,
        where={"email": email},
    )

    return result["metadatas"][0]



@app.post("/api/save")
def read_root(file_info: FileSchema):
    email, courseName, fileNames = file_info.email, file_info.courseName, file_info.fileNames
    for file in fileNames:
        content = extract_text(f"../QuizAI_backend/uploads/{email.split('@')[0]}/{courseName}/{file}")
        embedding = generateEmbeddings(content, "retrieval_document", file)

        collection.add(
            documents=[file],
            embeddings=[embedding],  # list of floats
            ids=[f"{email.split('@')[0]}/{courseName}/{file}"],
            metadatas=[{
                "email": email,
                "course": courseName,
                "filename": file
            }]
        )
        print(f"finished adding {email.split('@')[0]}/{courseName}/{file}")
        print(embedding)

    return {"message": "Received", "data": file_info}