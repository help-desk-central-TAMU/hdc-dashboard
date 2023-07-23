#!/bin/bash
echo "Starting python webscraping script: scrape_data.py"
python Scripts/service-now.py
if [ $? -eq 0 ]; then
    echo "Python script (scrape_data.py) started successfully!"
else
    echo "Python script (scrape_data.py) encountered an error!"
fi
