#!/bin/bash

VENV_NAME="env3.11"

if [ -d "$VENV_NAME" ]; then
    echo "Activating virtual environment $VENV_NAME..."
    source $VENV_NAME/Scripts/activate
else
    echo "Creating virtual environment $VENV_NAME..."
    python -m venv $VENV_NAME
    source $VENV_NAME/Scripts/activate
fi

echo "Ensuring Python packages are installed..."
pip install asyncio pyppeteer beautifulsoup4 keyboard flask flask-cors configparser
pip list

# Start the first script in a new Git Bash window
start bash -i -c "
echo \"Starting python script: service-now.py\";
python Scripts/scrape_data.py;
if [ $? -eq 0 ]; then
    echo \"Python script (service-now.py) started successfully!\";
else
    echo \"Python script (service-now.py) encountered an error!\";
fi
"

# Start the second script in another new Git Bash window
start bash -i -c "
echo \"Starting python webscraping script: scrape_data.py\";
python Scripts/scrape_data.py;
if [ $? -eq 0 ]; then
    echo \"Python script (scrape_data.py) started successfully!\";
else
    echo \"Python script (scrape_data.py) encountered an error!\";
fi
"
