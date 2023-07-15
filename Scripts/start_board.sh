#!/bin/bash

# Check if server.js is running
if ps aux | grep -q "node .\cors-anywhere\server.js"; then
    echo "server.js is already running..."
else
    echo "server.js is not running, starting now..."
    node cors-anywhere/server.js &
fi

netstat -ano | grep -q '3000'
# Check if React app is running on port 3000
if netstat -ano | grep -q '3000'; then
    echo "React app is already running on port 3000..."
else
    echo "React app is not running, starting now..."
    npm start &
fi

# Run the Python script
echo "Starting python scripts..."
./Scripts/run_python_scripts.sh
