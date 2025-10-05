#!/bin/bash

# Local Debug Startup Script for Impacto Estelar
# This script handles virtual environment activation and server startup

echo "🚀 Starting Impacto Estelar Debug Server..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found!"
    echo "💡 Create it with: python3 -m venv venv"
    exit 1
fi

# Activate virtual environment
echo "📦 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
echo "📋 Installing dependencies..."
pip install -r simul/requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your API keys"
fi

# Make debug server executable
chmod +x debug_server.py

# Start the debug server
echo "🐛 Starting debug server..."
python debug_server.py