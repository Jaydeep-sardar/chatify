#!/bin/bash
# MongoDB URI Update Script
# Usage: ./update-mongo-uri.sh "your_mongodb_cluster_uri_here"

if [ -z "$1" ]; then
    echo "Usage: $0 \"your_mongodb_cluster_uri\""
    echo "Example: $0 \"mongodb+srv://username:password@cluster.mongodb.net/chatify\""
    exit 1
fi

MONGO_URI="$1"
ENV_FILE="./backend/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: .env file not found at $ENV_FILE"
    exit 1
fi

# Update MONGO_URI in .env file
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows/Git Bash
    sed -i "s|MONGO_URI=.*|MONGO_URI=$MONGO_URI|" "$ENV_FILE"
else
    # Linux/Mac
    sed -i '' "s|MONGO_URI=.*|MONGO_URI=$MONGO_URI|" "$ENV_FILE"
fi

echo "✅ MongoDB URI updated successfully!"
echo "Updated MONGO_URI to: $MONGO_URI"
echo ""
echo "You can now restart the backend server with:"
echo "cd backend && npm run dev"