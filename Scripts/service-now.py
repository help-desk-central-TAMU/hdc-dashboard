import requests
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from threading import Thread
import schedule
import time

app = Flask(__name__)
cors = CORS(app, origins="http://localhost:5001")
data = {}

@cross_origin()  # This will enable CORS for this route
@app.route('/sn', methods=['GET'])
def get_data():
    return jsonify(data)


def ServiceNow(url, header):

    response = requests.get(url, auth=('ds', 'DkIiGoIs2T0k1A7L'), headers=header)

    if response.status_code == 200:
        result = response.json()["result"]
        if result:
            return [[ticket["number"]] for ticket in result]
        else:
            return []
    else:
        print("Error occurred")
        return []


def getData():
    urls = {
        "call-center": "https://tamu.service-now.com/api/now/table/incident?sysparm_query=active=true^stateNOT IN3,6,7^assignment_group!=ffc70f616f48624049a54e8f1e3ee4a4^assignment_groupIN6755df6d6f30e100cfd1247cbb3ee476,d4ae22ed6f256100b5919e0cbb3ee447,6a614902db4a6bc0de49f27139961973^ORDERBYsys_updated_on&sysparm_fields=number%2Cstate%2Csys_updated_on",
        "triage": "https://tamu.service-now.com/api/now/table/new_call?sysparm_query=u_contact_group.u_unit=7e77fdf46f6c6100cfd1247cbb3ee46d^opened_by!=f06ec18f6f3fda0049a54e8f1e3ee4a9^call_typeINincident,help_request,sc_request^transferred_toISEMPTY^u_contact_group.nameDOES%20NOT%20CONTAIN(HSC)^NQcall_typeINincident,help_request,sc_request^transferred_toISEMPTY^u_contact_groupISEMPTY^company=7e77fdf46f6c6100cfd1247cbb3ee46d^opened_by!=f06ec18f6f3fda0049a54e8f1e3ee4a9^NQcall_type=^transferred_toISEMPTY^u_contact_group.u_unit=7e77fdf46f6c6100cfd1247cbb3ee46d^opened_by!=f06ec18f6f3fda0049a54e8f1e3ee4a9^u_contact_group.nameDOES%20NOT%20CONTAIN(HSC)^NQcall_type=^transferred_toISEMPTY^u_contact_groupISEMPTY^company=7e77fdf46f6c6100cfd1247cbb3ee46d^opened_by!=f06ec18f6f3fda0049a54e8f1e3ee4a9^EQ^u_contact_groupINfc1495676f40f1000798122cbb3ee4d2,9ba560956fac4600b522db3bbb3ee4ce,be60cdbb6fe77d00b522db3bbb3ee428,dad6d2722b16f1409b4c26e405da1553,62e96aa51b3615d89b92ed35624bcb0b,1549cebd6f812100cfd1247cbb3ee4cd,6cea5c736fd92100b5919e0cbb3ee417,6755df6d6f30e100cfd1247cbb3ee476,62efeb896f7c4a00b522db3bbb3ee41b,2eda1c736fd92100b5919e0cbb3ee488,2236d2722b16f1409b4c26e405da151e^ORu_contact_groupNOT%20IN14bffdf76fc0f1000798122cbb3ee4e3,dcaca9696fe16100cfd1247cbb3ee459,968191496f0de60049a51e8f1e3ee4f0,15b45cd32b1a26409b4c26e405da152e,afd75d68db5fba40f63af236bf961923,4fd71de0dbdb764077387ee5bf961953,21417f0f2bb431009b4c26e405da1569,2a1a11a8dbdb764077387ee5bf961995,3dd75aeb6f40f1000798122cbb3ee426,994d59e4db1f764077387ee5bf961955,875c1124db1f764077387ee5bf96193a,383e11a8db1f764077387ee5bf961953,d9fe11e8db1f764077387ee5bf9619ef,4a3c06f5dbd37280f63af236bf9619e0^ORu_contact_group=^ORDERBYopened_at&sysparm_fields=number%2Csys_updated_on%2Cu_category%2Cu_service",
        "advanced": "https://tamu.service-now.com/api/now/table/incident?sysparm_query=assignment_group=97ef44786fed2100cfd1247cbb3ee4b9^active=true^stateNOT IN3,6,7^NQactive=true^assignment_group=97ef44786fed2100cfd1247cbb3ee4b9^state=3^sys_updated_onRELATIVELT@hour@ago@24&sysparm_fields=number%2Cstate%2Csys_updated_on"
        }
    header = {"Accept": "application/json"}

    tickets_cc = (ServiceNow(urls["call-center"], header))
    tickets_t = (ServiceNow(urls["triage"], header))
    tickets_a = (ServiceNow(urls["advanced"], header))

    global data
    data.update({'data':{
        'contactCenter': len(tickets_cc),
        'triage': len(tickets_t),
        'advanced': len(tickets_a)}
    })


def run_schedule():
    while 1:
        schedule.run_pending()
        time.sleep(1)


if __name__ == '__main__':
    schedule.every(15).seconds.do(getData)
    t = Thread(target=run_schedule)
    t.start()
    app.run(port=5001)  # Replace 8080 with your desired port number
