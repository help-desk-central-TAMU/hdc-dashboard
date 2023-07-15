import asyncio
from pyppeteer import launch
from bs4 import BeautifulSoup
import keyboard
from flask import Flask, jsonify
from threading import Thread
from flask_cors import CORS
import configparser
import os


#import credentials.ini file

# Get the path to the credentials.ini file
config_file = os.path.join(os.path.dirname(__file__), '../config/credentials.ini')

# Create a ConfigParser instance
config = configparser.ConfigParser()

# Read the credentials.ini file
config.read(config_file)

cisco_username = config.get('Credentials', 'cisco_username')
cisco_password = config.get('Credentials', 'cisco_password')

bomgar_username = config.get('Credentials', 'bomgar_username')
bomgar_password = config.get('Credentials', 'bomgar_password')


app = Flask(__name__)
cors = CORS(app, origins="http://localhost:3000")
data = {}


chrome_path = os.path.join(os.environ['PROGRAMFILES'], 'Google', 'Chrome', 'Application', 'chrome.exe')




@app.route('/data')
def get_data():
    return jsonify(data)

async def authenticate_cisco(page):
    await page.type('#rawUserName', cisco_username)
    await page.click('#identitySubmitBtn')
    await asyncio.sleep(0.5)
    await page.type('#j_password', cisco_password)
    await page.click('.btn.btn--people')

async def authenticate_bomgar(page):
    await page.type('#username', bomgar_username)
    await page.type('#password', bomgar_password)
    await page.click('#login')

async def launch_cond():
    while True:
        command = await asyncio.get_event_loop().run_in_executor(None, input, 'Enter "start" to start scraping: ')
        if command.lower() == 'start':
            break

async def scrape_data(page1, page2, page3):
    while True:
        if keyboard.is_pressed('shift'):
            print("Scraping paused")
            break

        data_total_agent = []
        html_content = await page1.evaluate('document.documentElement.outerHTML')
        soup = BeautifulSoup(html_content, 'html.parser')

        for i in range(0, 62):
            row_style = soup.select_one('#dgrid_0-row-' + str(i))['style']
            if 'display: none;' in row_style:
                break
            table_rows = soup.select('#dgrid_0-row-' + str(i))
            columns = table_rows[0].select('td')
            row_data = [column.get_text(strip=True) for column in columns]
            data_total_agent.append(row_data)

        data_total_queue = []
        html_content = await page2.evaluate('document.documentElement.outerHTML')
        soup = BeautifulSoup(html_content, 'html.parser')

        for i in range(0, 3):
            table_rows = soup.select('#dgrid_0-row-' + str(i))
            columns = table_rows[0].select('td')
            row_data = [column.get_text(strip=True) for column in columns]
            data_total_queue.append(row_data)

        bomgar_data = []
        html_content = await page3.content()
        soup = BeautifulSoup(html_content, 'html.parser')
        rows = soup.select('tbody tr')


        for row in rows:
            td_elements = row.select('td')
            data_list = [td.get_text(strip=True) for td in td_elements]
            data_list = [e for e in data_list if
                         e not in ('', 'Session', 'Team: T1a: HDC Consultants', 'There are no sessions in this queue.')]
            if data_list == []:
                break
            del data_list[3]
            bomgar_data.append(data_list)

        data.update({
            'agent_data': data_total_agent,
            'queue_data': data_total_queue,
            'bomgar_data': bomgar_data
        })

        print(data_total_agent)
        print(data_total_queue)
        print(bomgar_data)

        await asyncio.sleep(0.3)

async def page_setup(page1, page2, page3):
    await page1.goto('https://callcenter1.telecom.tamu.edu:8444/cuicui/Main.jsp')
    await asyncio.sleep(3)
    await authenticate_cisco(page1)
    await asyncio.sleep(1)
    await page1.goto('https://callcenter1.telecom.tamu.edu:8444/cuicui/permalink/?viewId=C0FF9E401000017B0006C90D0A120216&linkType=htmlType&viewType=Grid&refreshRate=3600')
    await page2.goto('https://callcenter1.telecom.tamu.edu:8444/cuicui/permalink/?viewId=566E9BC9DAE44D9BA227B85D74C7C69E&linkType=htmlType&viewType=Grid&refreshRate=3600')
    await page3.goto('https://bomgar-app.tamu.edu/console')
    await asyncio.sleep(2)
    await authenticate_bomgar(page3)

    # Add below code to keep the page active.
    for page in [page1, page2, page3]:
        await page.evaluate('''() => {
               setInterval(() => {
                   const event = new MouseEvent('mousemove', {
                       'view': window,
                       'bubbles': true,
                       'cancelable': true
                   });
                   document.dispatchEvent(event);
               }, 5000);  // Every 5000 milliseconds
           }''')

    await launch_cond()

def run_flask_app():
    app.run()

async def main():
    browser = await launch({
        'executablePath': chrome_path,
    })

    page1 = await browser.newPage()
    page2 = await browser.newPage()
    page3 = await browser.newPage()

    await page_setup(page1, page2, page3)

    flask_thread = Thread(target=run_flask_app)
    flask_thread.start()

    while True:
        await scrape_data(page1, page2, page3)

    await browser.close()

    exit()

if __name__ == '__main__':
    asyncio.run(main())

