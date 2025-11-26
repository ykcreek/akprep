# Use official Python image
FROM python:3.10-slim

# Install OS-level dependencies if required
RUN apt-get update && apt-get install -y gcc

# Set working dir
WORKDIR /app

# Copy project files
COPY . .

# Install Python deps
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask default port
ENV PORT=4242

# Start Flask app
CMD ["python", "app.py"]
