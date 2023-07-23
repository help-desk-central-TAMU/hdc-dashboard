#!/bin/bash

# Check if server.js is running
if ps aux | grep -v grep | grep -q "node .\cors-anywhere\server.js"; then
    echo "server.js is already running..."
else
    echo "server.js is not running, starting now..."
    node cors-anywhere/server.js &
fi

# Check if React app is running on port 3000
if netstat -ano | grep -E '0.0.0.0:3000\s+LISTENING|127.0.0.1:3000\s+LISTENING'; then
    echo "React app is already running on port 3000..."
else
    echo "React app is not running, starting now..."
    start bash -i -c "npm start"  # This will open npm start in a new Git Bash window
fi

# Run the Python script
echo "Starting python scripts..."


chmod +x "./Scripts/start_service_now.sh" "./Scripts/start_scrape_data.sh"

# Start the first script in a new Git Bash window
start bash -i -c "./Scripts/start_service_now.sh"

# Start the second script in another new Git Bash window
start bash -i -c "./Scripts/start_scrape_data.sh"
